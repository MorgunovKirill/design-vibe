# План: Supabase Auth + Динамический Dashboard

## Контекст

Taskflow — Trello-клон на Next.js 15. Сейчас auth-страницы (sign-in, sign-up) — UI-only без логики, дашборд работает на моковых данных. Нужно подключить Supabase для аутентификации (email/пароль + OAuth Google/GitHub) и хранения задач в БД с RLS.

**Решения пользователя:**
- Смена статуса задачи — через выпадающее меню (без drag-and-drop)
- Без верификации email (сразу на дашборд после регистрации)
- `due_date` — опциональное поле
- Supabase проект уже существует

---

## Фаза 1: Фундамент (Supabase клиенты, env, middleware)

### 1.1 Установка пакетов
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 1.2 Получение ключей и создание `.env.local`
- Через MCP plugin: `list_projects` → найти проект → `get_project_url` + `get_publishable_keys`
- Создать `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=<url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

### 1.3 Supabase клиенты

**Новый файл `src/lib/supabase/client.ts`** — браузерный клиент:
- `createBrowserClient<Database>()` из `@supabase/ssr`
- Автоматически использует `document.cookie`

**Новый файл `src/lib/supabase/server.ts`** — серверный клиент:
- `createServerClient<Database>()` из `@supabase/ssr`
- `await cookies()` (async в Next.js 15!)
- `getAll/setAll` паттерн, `try/catch` в `setAll` для Server Components

**Новый файл `src/lib/supabase/types.ts`** — типы БД:
- Сначала placeholder, потом сгенерировать через MCP `generate_typescript_types`

### 1.4 Middleware — `src/middleware.ts`
- Обновление сессии через `getUser()` (НЕ `getSession()` — безопасность)
- Auth guard: `/dashboard*` без сессии → redirect `/sign-in`
- Обратный guard: `/sign-in`, `/sign-up` с сессией → redirect `/dashboard`
- Matcher исключает статику (`_next/static`, изображения и т.д.)

**Проверка:** `npm run dev` — приложение запускается без ошибок.

---

## Фаза 2: База данных

### 2.1 Миграция через MCP `apply_migration`

```sql
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  status text not null default 'To Start'
    check (status in ('To Start', 'In Progress', 'Done')),
  category text not null
    check (category in ('Design', 'Front-end')),
  due_date date,  -- опциональное
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index tasks_user_id_idx on public.tasks(user_id);

alter table public.tasks enable row level security;

-- RLS: пользователь видит/редактирует только свои задачи
create policy "Users can view own tasks" on public.tasks for select using (auth.uid() = user_id);
create policy "Users can insert own tasks" on public.tasks for insert with check (auth.uid() = user_id);
create policy "Users can update own tasks" on public.tasks for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own tasks" on public.tasks for delete using (auth.uid() = user_id);

-- Триггер auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger tasks_updated_at before update on public.tasks
  for each row execute function public.handle_updated_at();
```

### 2.2 Генерация типов
- MCP `generate_typescript_types` → заменить placeholder в `src/lib/supabase/types.ts`

**Проверка:** MCP `list_tables` — таблица `tasks` существует.

---

## Фаза 3: Аутентификация

### 3.1 Общие типы — новый файл `src/lib/types.ts`
- `TaskCategory`, `TaskStatus`, `Task` интерфейс (с `due_date` snake_case, nullable)

### 3.2 Auth server actions — новый файл `src/lib/actions/auth.ts`
- `signInWithEmail(formData)` — `supabase.auth.signInWithPassword()` + redirect `/dashboard`
- `signUpWithEmail(formData)` — `supabase.auth.signUp()` с `data.full_name` + redirect `/dashboard`
- `signOut()` — `supabase.auth.signOut()` + redirect `/sign-in`
- OAuth обрабатывается клиентским SDK (нужен browser redirect на внешний URL)

### 3.3 OAuth callback — новый файл `src/app/auth/callback/route.ts`
- **Важно:** НЕ внутри `(auth)` group — URL должен быть `/auth/callback`
- `exchangeCodeForSession(code)` → redirect `/dashboard`

### 3.4 Модификация `src/app/(auth)/sign-in/page.tsx`
- Добавить `name` атрибуты к input-ам (`name="email"`, `name="password"`)
- `onSubmit` → вызов `signInWithEmail` через `useTransition`
- Google/GitHub кнопки → `onClick` с browser client `signInWithOAuth()`
- Добавить `useState` для ошибок, отображать под формой
- Disabled state на кнопке во время `isPending`

### 3.5 Модификация `src/app/(auth)/sign-up/page.tsx`
- Аналогично sign-in + `name="name"` для поля имени
- `signUpWithEmail` вместо `signInWithEmail`

### 3.6 Модификация `src/app/(platform)/layout.tsx`
- Async server component, `createClient()` → `getUser()`
- Если нет user → `redirect("/sign-in")` (defense-in-depth, основной guard в middleware)
- Сохранить существующий skip-to-content link

### 3.7 Auth listener — новый файл `src/components/auth/auth-listener.tsx`
- Client component с `onAuthStateChange()` → `router.refresh()`
- Добавить в `src/app/layout.tsx`

**Проверка:** Регистрация → попадание на дашборд. Выход → редирект на sign-in. Прямой доступ к /dashboard без сессии → редирект.

---

## Фаза 4: Динамический Dashboard

### 4.1 Task server actions — новый файл `src/lib/actions/tasks.ts`
- `getTasks()` — select * from tasks, order by created_at
- `createTask(formData)` — insert (title, category, due_date, status)
- `updateTaskStatus(taskId, status)` — update status
- `deleteTask(taskId)` — delete
- Все используют `revalidatePath("/dashboard")`

### 4.2 Модификация `src/app/(platform)/dashboard/page.tsx`
- Заменить `MOCK_TASKS` → `createClient()` + query из Supabase
- Группировка по статусу → columns → `DashboardView`

### 4.3 Модификация `src/components/dashboard/task-card.tsx`
- Импорт `Task` из `@/lib/types` вместо `@/lib/mock-tasks`
- `task.dueDate` → `task.due_date` (nullable, показывать только если есть)
- Форматирование даты: `new Date(due_date).toLocaleDateString(...)`

### 4.4 Модификация `src/components/dashboard/task-column.tsx`
- Обновить импорт `Task`
- Добавить empty state при `tasks.length === 0`

### 4.5 Модификация `src/components/dashboard/dashboard-view.tsx`
- Обновить импорт типов
- Кнопка "Create task" → открывает CreateTaskDialog

**Проверка:** Дашборд загружается, показывает empty state. После создания задачи — задача появляется в колонке.

---

## Фаза 5: UI компоненты

### 5.1 Установка shadcn компонентов
```bash
npx shadcn@latest add dialog select dropdown-menu
```

### 5.2 Новый файл `src/components/dashboard/create-task-dialog.tsx`
- Dialog с формой: title (input), category (select: Design / Front-end), due_date (date input, опционально), status (select, default "To Start")
- `createTask` server action через `useTransition`
- Стилизация под тёмную тему дашборда

### 5.3 Смена статуса на карточке — модификация `task-card.tsx`
- DropdownMenu с тремя вариантами статуса + кнопка удаления
- `updateTaskStatus` / `deleteTask` через `useTransition`

### 5.4 Sign-out кнопка — модификация `src/app/(platform)/dashboard/layout.tsx`
- Добавить header с кнопкой выхода (вызов `signOut` action)

### 5.5 `src/lib/mock-tasks.ts` — удалить (больше не используется)

**Проверка:** Полный CRUD: создание → отображение → смена статуса → удаление. Sign-out работает.

---

## Сводка файлов

### Новые файлы (10)
| Файл | Назначение |
|---|---|
| `.env.local` | Ключи Supabase |
| `src/lib/supabase/client.ts` | Browser client |
| `src/lib/supabase/server.ts` | Server client |
| `src/lib/supabase/types.ts` | Типы БД (генерируются) |
| `src/middleware.ts` | Session refresh + auth guard |
| `src/app/auth/callback/route.ts` | OAuth code exchange |
| `src/lib/actions/auth.ts` | Auth server actions |
| `src/lib/actions/tasks.ts` | Task CRUD server actions |
| `src/lib/types.ts` | Общие типы Task/Status/Category |
| `src/components/dashboard/create-task-dialog.tsx` | Модал создания задачи |

### Модифицируемые файлы (8)
| Файл | Изменения |
|---|---|
| `src/app/(auth)/sign-in/page.tsx` | Реальные обработчики, ошибки, loading |
| `src/app/(auth)/sign-up/page.tsx` | То же |
| `src/app/(platform)/layout.tsx` | Auth guard (server-side) |
| `src/app/(platform)/dashboard/page.tsx` | Данные из Supabase вместо моков |
| `src/app/(platform)/dashboard/layout.tsx` | Sign-out кнопка |
| `src/components/dashboard/dashboard-view.tsx` | Create task dialog, импорт типов |
| `src/components/dashboard/task-column.tsx` | Empty state, импорт типов |
| `src/components/dashboard/task-card.tsx` | due_date, dropdown статуса, удаление |

### Удаляемые файлы (1)
| Файл | Причина |
|---|---|
| `src/lib/mock-tasks.ts` | Заменён данными из Supabase |

### Существующие утилиты для переиспользования
- `cn()` из `src/lib/utils.ts` — для условных классов
- `useInView` из `src/hooks/use-in-view.ts` — анимации остаются
- shadcn/ui: `button`, `card`, `badge`, `input`, `label` — уже установлены
- `src/app/layout.tsx` — добавить AuthListener

---

## Верификация (end-to-end)

1. `npm run dev` → приложение запускается
2. `/sign-up` → регистрация email/пароль → редирект на `/dashboard`
3. Sign-out → редирект на `/sign-in`
4. `/sign-in` → вход → дашборд с пустым состоянием
5. Создать задачу → появляется в колонке "To Start"
6. Сменить статус через dropdown → задача перемещается в другую колонку
7. Удалить задачу → исчезает
8. Прямой доступ `/dashboard` без сессии → редирект на `/sign-in`
9. `npm run build` → сборка без ошибок
