import { ClassDatesFilter, ClassStatusType } from "../../components";
import { IMetadata } from "../user";

export interface GetClassesPayload {
  page?: number;
  limit?: number;
  enabled?: boolean;
  excludeUserBookings?: boolean;
  timeFilter?: ClassDatesFilter;
  statusFilter?: ClassStatusType;
}

export interface CreateClassPayload {
  date: Date;
  end: string;
  start: string;
  color?: string;
  maxAmount: number;
  recurrencyLimit?: Date;
}

export interface EditClassPayload {
  id: string;
  date?: Date;
  color?: string;
  endTime?: string;
  cancel?: boolean;
  maxAmount?: number;
  startTime?: string;
}

export interface DeleteClassPayload {
  id: number;
  isRecurrent: boolean;
}

interface IRecurrent {
  id: number;
  recurrency: string;
  color: string | null;
}

export interface IClass {
  id: number;
  date: Date;
  endTime: string;
  startTime: string;
  maxAmount: number;
  cancelled: boolean;
  currentCount: number;
  recurrent: IRecurrent | null;
}

export interface IPaginatedClasses {
  data: IClass[];
  metadata: IMetadata;
}
