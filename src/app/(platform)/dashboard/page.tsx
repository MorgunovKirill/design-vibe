"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskColumn } from "@/components/dashboard/task-column";
import { MOCK_TASKS, type TaskStatus } from "@/lib/mock-tasks";
import { useInView } from "@/hooks/use-in-view";

const COLUMNS: TaskStatus[] = ["To Start", "In Progress", "Done"];

export default function DashboardPage() {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="min-h-full">
      {/* Header */}
      <div
        className={`flex items-center gap-4 mb-20 transition-all duration-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <Button className="bg-slate-900 text-white hover:bg-slate-800 gap-2 rounded-md">
          <Plus className="size-4" />
          Create task
        </Button>
      </div>

      {/* Kanban columns */}
      <div className="flex flex-row gap-[70px]">
        {COLUMNS.map((status, i) => (
          <div
            key={status}
            className={`transition-all duration-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: `${i * 150 + 200}ms` }}
          >
            <TaskColumn
              title={status}
              tasks={MOCK_TASKS.filter((t) => t.status === status)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
