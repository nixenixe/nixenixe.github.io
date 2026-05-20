export type VacationType = "VACATION" | "TO_DAY" | "TO_HOURS";

export interface Vacation {
  id: string;
  type: VacationType;
  startDate: string;
  endDate: string;
  label: string;
}
