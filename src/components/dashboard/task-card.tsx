import { Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Task, TaskCategory } from '@/lib/mock-tasks'

const categoryStyles: Record<TaskCategory, string> = {
  'Design': 'bg-amber-50 text-amber-300',
  'Front-end': 'bg-emerald-50 text-emerald-400',
}

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="rounded-md border-gray-200 bg-white p-[17px] py-[17px] gap-1 shadow-[0px_4px_4px_0px_rgba(174,174,174,0.25)]">
      <Badge
        className={cn(
          'rounded border-transparent px-1.5 py-1 text-sm font-semibold',
          categoryStyles[task.category],
        )}
      >
        {task.category}
      </Badge>
      <p className="text-sm text-slate-900 line-clamp-2">{task.title}</p>
      <div className="flex items-center gap-1">
        <Calendar className="size-4 text-slate-400" />
        <span className="text-xs text-slate-500">{task.dueDate}</span>
      </div>
    </Card>
  )
}
