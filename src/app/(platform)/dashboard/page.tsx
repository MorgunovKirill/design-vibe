import { DashboardView } from "@/components/dashboard/dashboard-view";
import { createClient } from "@/lib/supabase/server";
import type { Task, TaskStatus } from "@/lib/types";

const COLUMNS: TaskStatus[] = ["To Start", "In Progress", "Done"];

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const grouped = (tasks as Task[]).reduce<Record<TaskStatus, Task[]>>(
    (acc, task) => {
      acc[task.status].push(task);
      return acc;
    },
    { "To Start": [], "In Progress": [], Done: [] },
  );

  const columns = COLUMNS.map((status) => ({ status, tasks: grouped[status] }));

  return <DashboardView columns={columns} />;
}
