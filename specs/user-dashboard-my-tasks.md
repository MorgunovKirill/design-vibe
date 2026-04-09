# Spec for User Dashboard — My Tasks

figma_component (if used): Dashboard (node-id: 0:64)

## Summary

Страница `/dashboard` отображает все задачи, назначенные текущему пользователю, сгруппированные в три колонки по статусу: **To Start**, **In Progress**, **Done**. Аутентификация в рамках этого спека не реализуется — данные задач передаются статически или через заглушку.

---

## Figma Design Reference

- File: `https://www.figma.com/design/f6Hi4L6Q9xTCcANU4Q0UnP`
- Node: `0:64` — фрейм "Dashboard" (1280×720, фон `#F8FAFC`)
- Component name: `button` (shadcn instance `type=with icon, state=Default`)

### Key visual points

| Элемент | Описание |
|---|---|
| Фон страницы | `#F8FAFC` (Tailwind: `bg-slate-50`) |
| Заголовок "Dashboard" | Inter 600, 24px, `#0F172A`; позиция x:174, y:83 |
| Кнопка "Create task" | Тёмная (`bg-slate-900`), плюс-иконка слева, padding 8/16px, border-radius 6px |
| Сетка колонок | 3 колонки по 264px, горизонтальный отступ 70px между ними, начало y:164 |
| Заголовок колонки | Inter 600, 18px, `#000000` |
| Карточка задачи | Белый фон, border `#E5E7EB` 1px, shadow `0 4px 4px rgba(174,174,174,0.25)`, border-radius 6px, padding 17px, gap 4px (column) |
| Бейдж категории Design | bg `#FFFBEB`, text `#FCD34D`, Inter 600 14px, padding 4/6px, border-radius 4px |
| Бейдж категории Front-end | bg `#ECFDF5`, text `#34D399`, Inter 600 14px, padding 4/6px, border-radius 4px |
| Название задачи | Inter 400, 14px, `#0F172A`, ширина 230px |
| Дата дедлайна | Calendar-иконка 16×16 + текст Inter 400, 12px, `#64748B` |

---

## Functional Requirements

### 1. Страница `/dashboard`

- Роут: `src/app/(platform)/dashboard/page.tsx`
- Layout: уже существует в `(platform)/layout.tsx` (рендерит `children` без guard)
- Фон страницы: `bg-slate-50`
- Горизонтальные отступы содержимого: `px-[174px]` (или через контейнер `max-w-screen-xl mx-auto px-10`)

### 2. Header страницы

- Заголовок `<h1>Dashboard</h1>` — `text-2xl font-semibold text-slate-900`
- Кнопка **"Create task"** справа от заголовка:
  - Использует shadcn `<Button>` из `src/components/ui/button.tsx`
  - Вариант: `default` (dark), с иконкой `Plus` из `lucide-react` слева
  - На данном этапе кнопка может быть нефункциональна (TODO-заглушка)

### 3. Kanban-сетка задач

- Три колонки, расположенные горизонтально (`flex flex-row gap-[70px]`)
- Колонки: **To Start** | **In Progress** | **Done**
- Заголовок каждой колонки — `text-lg font-semibold text-black mb-[14px]`
- Список карточек внутри колонки — `flex flex-col gap-3`

### 4. Карточка задачи (TaskCard)

Компонент `src/components/dashboard/task-card.tsx` — **строится на shadcn `<Card>`**.

Структура карточки (сверху вниз):
1. **Бейдж категории** — shadcn `<Badge>` с кастомными цветами через `cn()` в зависимости от категории:
   - `Design` → `bg-amber-50 text-amber-300`
   - `Front-end` → `bg-emerald-50 text-emerald-400`
   - Будущие категории добавляются через маппинг
2. **Название задачи** — `text-sm font-normal text-slate-900`, ширина ограничена (230px / `w-full`)
3. **Дата дедлайна** — иконка `CalendarIcon` из `lucide-react` (16×16, `text-slate-400`) + строка даты `text-xs text-slate-500`

### 5. Данные

Пока нет бэкенда — данные определяются как статический массив в `src/lib/mock-tasks.ts`:

```ts
export type TaskCategory = 'Design' | 'Front-end' | 'Backend' | 'QA'
export type TaskStatus = 'To Start' | 'In Progress' | 'Done'

export interface Task {
  id: string
  title: string
  category: TaskCategory
  dueDate: string   // ISO string, e.g. "2023-12-12"
  status: TaskStatus
}

export const MOCK_TASKS: Task[] = [...]
```

Страница группирует задачи по `status` и рендерит колонки.

---

## Shadcn Components Used

| Компонент | Файл | Уже установлен |
|---|---|---|
| `Button` | `src/components/ui/button.tsx` | ✅ |
| `Card`, `CardContent` | `src/components/ui/card.tsx` | ✅ |
| `Badge` | `src/components/ui/badge.tsx` | ✅ |

Дополнительная установка **не требуется**.

---

## File Structure

```
src/
  app/
    (platform)/
      dashboard/
        page.tsx          ← главная страница дашборда (новый файл)
  components/
    dashboard/
      task-card.tsx       ← карточка задачи (новый файл)
      task-column.tsx     ← колонка с заголовком и списком карточек (новый файл)
  lib/
    mock-tasks.ts         ← статические данные (новый файл)
```

---

## Possible Edge Cases

- Пустая колонка — отображать только заголовок без карточек (не скрывать колонку)
- Очень длинное название задачи — ограничить через `line-clamp-2`
- Неизвестная категория — показывать нейтральный серый бейдж

---

## Acceptance Criteria

- [ ] Страница `/dashboard` рендерится без ошибок
- [ ] Видны три колонки: To Start, In Progress, Done
- [ ] Карточки отображают: бейдж категории с правильным цветом, название задачи, дату дедлайна с иконкой
- [ ] Кнопка "Create task" отображается в header (может быть нефункциональной)
- [ ] Визуально соответствует Figma: фон страницы `slate-50`, тёмные карточки с тенью и рамкой
- [ ] Нет TypeScript-ошибок (`noUnusedLocals`, `noUnusedParameters`)
- [ ] `pnpm build` проходит без ошибок

---

## Open Questions

- Нужен ли sidebar/навигация внутри `(platform)/layout.tsx` или он добавляется позже? да, добавь
- Какой формат хранения дат предпочтителен для отображения (`toLocaleDateString` vs `date-fns`)? date-fns
- Нужна ли возможность перетаскивания карточек между колонками (drag & drop) в этой итерации? пока нет
