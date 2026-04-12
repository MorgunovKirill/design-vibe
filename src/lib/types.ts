export type TaskCategory = "Design" | "Front-end";
export type TaskStatus = "To Start" | "In Progress" | "Done";

export interface Task {
  id: string;
  user_id: string;
  title: string;
  category: TaskCategory;
  status: TaskStatus;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}
