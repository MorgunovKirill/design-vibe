import { TaskCard } from '@/components/dashboard/task-card'
import type { Task, TaskStatus } from '@/lib/mock-tasks'

export function TaskColumn({ title, tasks }: { title: TaskStatus; tasks: Task[] }) {
  return (
    <section className="flex flex-col w-[264px]" aria-label={title}>
      <h2 className="text-lg font-semibold text-foreground mb-3.5">{title}</h2>
      <ul className="flex flex-col gap-3 list-none p-0 m-0">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </section>
  )
}
