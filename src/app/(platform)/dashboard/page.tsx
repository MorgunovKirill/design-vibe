import { DashboardView } from "@/components/dashboard/dashboard-view";
import { MOCK_TASKS, type Task, type TaskStatus } from "@/lib/mock-tasks";

const COLUMNS: TaskStatus[] = ["To Start", "In Progress", "Done"];

export default function DashboardPage() {
  const grouped = MOCK_TASKS.reduce<Record<TaskStatus, Task[]>>(
    (acc, task) => {
      acc[task.status].push(task);
      return acc;
    },
    { "To Start": [], "In Progress": [], Done: [] },
  );

  const columns = COLUMNS.map((status) => ({ status, tasks: grouped[status] }));

  return <DashboardView columns={columns} />;
}
