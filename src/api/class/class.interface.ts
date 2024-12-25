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

export interface IClass {
  id: string;
  date: Date;
  start: string;
  end: string;
  capacity: number;
  currentCount: number;
}
