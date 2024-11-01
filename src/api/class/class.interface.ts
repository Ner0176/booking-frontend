import { DayOfWeek } from "../../components";

export interface CreateClassPayload {
  startDate?: string;
  endDate?: string;
  capacity: number;
  weekDay?: DayOfWeek;
  date?: string;
  startTime: string;
  endTime: string;
}
