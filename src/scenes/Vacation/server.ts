import { supabase } from "@/supabaseClient";
import type { TimeOffType } from "./types";

export async function createTimeOffEntry(values: {
  title: string;
  start_date: string;
  end_date: string;
  type: TimeOffType;
  start_time?: string;
  end_time?: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "ERROR";
  }

  const title = values.title.trim();

  const { data, error } = await supabase
    .from("time_off_entries")
    .insert({
      user_id: user.id,
      title,
      start_date: values.start_date,
      end_date: values.end_date,
      type: values.type,
      start_time: values.type === "TIMEOFF_HOURS" ? values.start_time : null,
      end_time: values.type === "TIMEOFF_HOURS" ? values.end_time : null,
    })
    .select()
    .single();

  if (error) {
    return "ERROR";
  }

  return data;
}
