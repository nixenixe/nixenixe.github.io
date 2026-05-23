import { supabase } from "@/supabaseClient";
import type { FetchResult } from "@/types";
import type { Task, TodoSettings } from "./types";

export async function getTodos(): Promise<FetchResult<Task[]>> {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return "ERROR";
  }

  return data satisfies Task[];
}

export async function addTodo(
  title: string,
  durationMinutes: number,
): Promise<FetchResult<unknown>> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "ERROR";
  }

  const { data, error } = await supabase
    .from("todos")
    .insert({
      title,
      duration_minutes: durationMinutes,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return "ERROR";
  }

  return data;
}

export async function deleteTodo(id: string): Promise<"ERROR" | "SUCCESS"> {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    return "ERROR";
  }
  return "SUCCESS";
}

export async function getTodoSettings(): Promise<FetchResult<TodoSettings>> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "ERROR";
  }

  const { data, error } = await supabase
    .from("todo_settings")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return "ERROR";
  }

  return data satisfies TodoSettings;
}

export async function saveTodoEndTime(endTime: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "ERROR";
  }

  const { data, error } = await supabase
    .from("todo_settings")
    .upsert({
      user_id: user.id,
      end_time: endTime,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return "ERROR";
  }

  return data;
}

export async function updateTodoValues(
  id: string,
  values: {
    title: string;
    duration_minutes: number;
    completed: boolean;
  },
) {
  const { data, error } = await supabase
    .from("todos")
    .update({
      title: values.title,
      duration_minutes: values.duration_minutes,
      completed: values.completed,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return "ERROR";
  }

  return data;
}
