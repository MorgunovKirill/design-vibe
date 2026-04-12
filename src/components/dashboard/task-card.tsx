"use client";

import { useTransition } from "react";
import { Calendar, MoreHorizontal, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { updateTaskStatus, deleteTask } from "@/lib/actions/tasks";
import type { Task, TaskCategory, TaskStatus } from "@/lib/types";

const categoryStyles: Record<TaskCategory, string> = {
  Design: "bg-amber-50 text-amber-700",
  "Front-end": "bg-emerald-50 text-emerald-700",
};

const ALL_STATUSES: TaskStatus[] = ["To Start", "In Progress", "Done"];

export function TaskCard({ task }: { task: Task }) {
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(status: TaskStatus) {
    startTransition(async () => {
      await updateTaskStatus(task.id, status);
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteTask(task.id);
    });
  }

  return (
    <Card
      className={cn(
        "rounded-md border-border bg-card p-[17px] gap-1 shadow-[0px_4px_4px_0px_rgba(174,174,174,0.25)]",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <Badge
          className={cn(
            "rounded border-transparent px-1.5 py-1 text-sm font-semibold",
            categoryStyles[task.category]
          )}
        >
          {task.category}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:text-foreground transition-colors">
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {ALL_STATUSES.filter((s) => s !== task.status).map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => handleStatusChange(status)}
              >
                Move to {status}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-500 focus:text-red-500"
            >
              <Trash2 className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-sm text-foreground line-clamp-2">{task.title}</p>
      {task.due_date && (
        <div className="flex items-center gap-1">
          <Calendar
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="text-xs text-muted-foreground">
            <span className="sr-only">Due date: </span>
            {new Date(task.due_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      )}
    </Card>
  );
}
