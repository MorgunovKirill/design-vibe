# Plan: Dashboard My Tasks Page

## Context

Реализация страницы `/dashboard` по спецификации `specs/user-dashboard-my-tasks.md` и дизайну Figma (node 0:64). Страница показывает задачи пользователя в 3 колонках по статусу (Kanban-стиль). Аутентификация не нужна — данные статические. Все shadcn-компоненты уже установлены.

---

## Текущее состояние

- `src/app/(platform)/dashboard/page.tsx` — стаб (заменяем полностью)
- `src/app/(platform)/dashboard/layout.tsx` — `min-h-screen` + `<main className="p-8">` (не трогаем)
- `src/components/ui/button.tsx` — стандартный shadcn, `variant="default"` → `bg-primary`
- `src/components/ui/card.tsx` — `Card` с дефолтами `rounded-xl py-6 gap-6` (переопределяем через `className`)
- `src/components/ui/badge.tsx` — поддерживает `className` для кастомных цветов

---

## Шаги реализации

### 1. Создать `src/lib/mock-tasks.ts`

```ts
export type TaskCategory = 'Design' | 'Front-end'
export type TaskStatus = 'To Start' | 'In Progress' | 'Done'

export interface Task {
  id: string
  title: string
  category: TaskCategory
  dueDate: string  // "December 12, 2023"
  status: TaskStatus
}

export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Build design for Dashboard in Figma', category: 'Design', dueDate: 'December 12, 2023', status: 'To Start' },
  { id: '2', title: 'Build components for Card, Notification and Button', category: 'Front-end', dueDate: 'December 12, 2023', status: 'To Start' },
  { id: '3', title: 'Build components for Card, Notification and Button', category: 'Front-end', dueDate: 'December 12, 2023', status: 'To Start' },
  { id: '4', title: 'Build design for Dashboard in Figma', category: 'Design', dueDate: 'December 12, 2023', status: 'In Progress' },
  { id: '5', title: 'Build design for Dashboard in Figma', category: 'Design', dueDate: 'December 12, 2023', status: 'Done' },
]
```

---

### 2. Создать `src/components/dashboard/task-card.tsx`

Использует: `Card`, `Badge`, `CalendarIcon` из `lucide-react`.

**Стили карточки** (переопределение дефолтов `Card`):
- `className="rounded-md p-[17px] gap-1 flex flex-col shadow-[0px_4px_4px_0px_rgba(174,174,174,0.25)] border-gray-200"`

**Маппинг цветов бейджа по категории:**
```ts
const categoryStyles: Record<TaskCategory, string> = {
  'Design': 'rounded bg-amber-50 text-amber-300 font-semibold',
  'Front-end': 'rounded bg-emerald-50 text-emerald-400 font-semibold',
}
```

**Структура:**
1. `<Badge className={categoryStyles[task.category]}>` — категория
2. `<p className="text-sm text-slate-900 line-clamp-2">` — название задачи
3. `<div className="flex items-center gap-1">` — `<CalendarIcon className="size-4 text-slate-400" />` + `<span className="text-xs text-slate-500">`

---

### 3. Создать `src/components/dashboard/task-column.tsx`

```tsx
// Props: title: TaskStatus, tasks: Task[]
<div className="flex flex-col w-[264px]">
  <h2 className="text-lg font-semibold text-black mb-[14px]">{title}</h2>
  <div className="flex flex-col gap-3">
    {tasks.map(task => <TaskCard key={task.id} task={task} />)}
  </div>
</div>
```

---

### 4. Обновить `src/app/(platform)/dashboard/page.tsx`

Полная замена стаба:

```tsx
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TaskColumn } from '@/components/dashboard/task-column'
import { MOCK_TASKS, type TaskStatus } from '@/lib/mock-tasks'

const COLUMNS: TaskStatus[] = ['To Start', 'In Progress', 'Done']

export default function DashboardPage() {
  return (
    <div className="bg-slate-50 min-h-full">
      <div className="flex items-center justify-between mb-[81px]">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <Button className="bg-slate-900 text-white hover:bg-slate-800 gap-2 rounded-md">
          <Plus className="size-4" />
          Create task
        </Button>
      </div>
      <div className="flex flex-row gap-[70px]">
        {COLUMNS.map(status => (
          <TaskColumn
            key={status}
            title={status}
            tasks={MOCK_TASKS.filter(t => t.status === status)}
          />
        ))}
      </div>
    </div>
  )
}
```

---

## Файлы

| Действие | Файл |
|---|---|
| Создать | `src/lib/mock-tasks.ts` |
| Создать | `src/components/dashboard/task-card.tsx` |
| Создать | `src/components/dashboard/task-column.tsx` |
| Заменить | `src/app/(platform)/dashboard/page.tsx` |
| Не трогать | `src/app/(platform)/dashboard/layout.tsx` |
| Не трогать | `src/components/ui/*.tsx` |

---

## Проверка

```bash
pnpm dev     # открыть http://localhost:3000/dashboard
pnpm build   # убедиться в отсутствии TypeScript-ошибок
```
