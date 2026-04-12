"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { TaskCategory, TaskStatus } from "@/lib/types";

export async function createTask(formData: FormData) {
  const supabase = await createClient();

  const dueDateValue = formData.get("due_date") as string;

  const { error } = await supabase.from("tasks").insert({
    title: formData.get("title") as string,
    category: formData.get("category") as TaskCategory,
    due_date: dueDateValue || null,
    status: (formData.get("status") as TaskStatus) ?? "To Start",
  });

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
}

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", taskId);

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
}

export async function deleteTask(taskId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
}
