export interface Task {
  id: string;
  user_id: string;
  title: string;
  completed: boolean;
  duration_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface SortType {
  by: "title" | "duration_minutes";
  direction: "asc" | "desc";
}

export type TodoSettings = {
  user_id: string;
  end_time: string | null;
  updated_at: string;
};
