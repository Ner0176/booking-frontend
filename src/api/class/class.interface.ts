import { ClassDatesFilter, ClassStatusType } from "../../components";

export interface GetClassesPayload {
  enabled?: boolean;
  excludeUserBookings?: boolean;
  timeFilter?: ClassDatesFilter;
  statusFilter?: ClassStatusType;
}

export interface CreateClassPayload {
  date: Date;
  end: string;
  start: string;
  maxAmount: number;
  recurrencyLimit?: Date;
}

export interface EditClassPayload {
  id: string;
  date?: Date;
  endTime?: string;
  cancel?: boolean;
  maxAmount?: number;
  startTime?: string;
}

export interface DeleteClassPayload {
  id: string;
  isRecurrent: boolean;
}

export interface IClass {
  id: number;
  date: Date;
  endTime: string;
  startTime: string;
  maxAmount: number;
  cancelled: boolean;
  currentCount: number;
  recurrentId: string | null;
}
