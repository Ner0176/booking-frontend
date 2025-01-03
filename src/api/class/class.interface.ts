export interface CreateClassPayload {
  date: Date;
  end: string;
  start: string;
  maxAmount: number;
  recurrencyLimit?: Date;
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
  currentCount: number;
  recurrentId: string | null;
}
