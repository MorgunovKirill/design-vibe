import { TaskCard } from '@/components/dashboard/task-card'
import type { Task, TaskStatus } from '@/lib/mock-tasks'

export function TaskColumn({ title, tasks }: { title: TaskStatus; tasks: Task[] }) {
  return (
    <div className="flex flex-col w-[264px]">
      <h2 className="text-lg font-semibold text-black mb-[14px]">{title}</h2>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
