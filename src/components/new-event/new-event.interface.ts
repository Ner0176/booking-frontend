export type EventType = "recurrent" | "oneTime";

export enum DayOfWeek {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

export interface IEventFields {
  initDate: string;
  endDate: string;
  initTime: string;
  endTime: string;
  capacity: number;
  weekDay: number;
}

export const emptyEventFields: IEventFields = {
  initDate: "",
  endDate: "",
  initTime: "",
  endTime: "",
  capacity: 0,
  weekDay: 0,
};
