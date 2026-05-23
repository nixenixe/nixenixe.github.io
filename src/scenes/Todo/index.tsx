import type { FetchResult } from "@/types";
import type { Task, TodoSettings } from "./types";
import { useEffect, useState } from "react";
import { getTodos, getTodoSettings } from "./server";
import { TodoPage } from "./TodoPage";
import { FullPageSpinner } from "@/components/FullPageSpinner";
import { Message } from "@/components/Message";

export const Todo = () => {
  const [tasks, setTasks] = useState<FetchResult<Task[]> | null>(null);
  const [settings, setSettings] = useState<FetchResult<TodoSettings> | null>(
    null,
  );

  useEffect(() => {
    async function fetchTodos() {
      const result = await Promise.all([getTodos(), getTodoSettings()]);
      setTasks(result[0]);
      setSettings(result[1]);
    }

    fetchTodos();
  }, []);

  const refreshTasks = async () => {
    const result = await getTodos();
    setTasks(result);
  }

  const refreshSettings = async () => {
    const result = await getTodoSettings();
    setSettings(result);
  };

  if (tasks === null || settings === null) {
    return <FullPageSpinner />;
  }

  if (tasks === "ERROR" || settings === "ERROR") {
    return <Message type="error">Couldn't load tasks</Message>;
  }

  return (
    <TodoPage
      tasks={tasks}
      settings={settings}
      refreshSettings={refreshSettings}
      refreshTasks={refreshTasks}
    />
  );
};
