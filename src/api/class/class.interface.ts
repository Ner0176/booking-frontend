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
  endTime: string;
  startTime: string;
  maxAmount: number;
  currentCount: number;
  recurrentId: string | null;
}
