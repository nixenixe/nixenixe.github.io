export type TimeOffType = "VACATION" | "TIMEOFF_FULLDAY" | "TIMEOFF_HOURS";

export type TimeOffEntry = {
  id: string;
  user_id: string;
  title: string;
  start_date: string;
  end_date: string;
  start_time: string | null;
  end_time: string | null;
  type: TimeOffType;
  created_at: string;
  updated_at: string;
};
