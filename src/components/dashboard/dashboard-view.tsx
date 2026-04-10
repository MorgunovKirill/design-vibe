"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskColumn } from "@/components/dashboard/task-column";
import { useInView } from "@/hooks/use-in-view";
import type { Task, TaskStatus } from "@/lib/mock-tasks";

interface DashboardColumn {
  status: TaskStatus;
  tasks: Task[];
}

export function DashboardView({ columns }: { columns: DashboardColumn[] }) {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="min-h-full">
      <div
        className={`flex items-center gap-4 mb-20 transition-all duration-[600ms] motion-reduce:transition-none ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <Button className="gap-2 rounded-md">
          <Plus className="size-4" aria-hidden="true" />
          Create task
        </Button>
      </div>

      <section
        aria-label="Kanban board"
        className="flex flex-row gap-[70px]"
      >
        {columns.map(({ status, tasks }, i) => (
          <div
            key={status}
            className={`transition-all duration-500 motion-reduce:transition-none ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: `${i * 150 + 200}ms` }}
          >
            <TaskColumn title={status} tasks={tasks} />
          </div>
        ))}
      </section>
    </div>
  );
}
