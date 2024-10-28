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

export interface IRecurrentFields {
  initDate: string;
  endDate: string;
  initTime: string;
  endTime: string;
  capacity: number;
  weekDay: number;
}

export const emptyRecurrentFields: IRecurrentFields = {
  initDate: "",
  endDate: "",
  initTime: "",
  endTime: "",
  capacity: 0,
  weekDay: 0,
};

export interface IOneTimeFields {
  date: string;
  capacity: number;
  initTime: string;
  endTime: string;
}

export const emptyOneTimeFields: IOneTimeFields = {
  date: "",
  initTime: "",
  endTime: "",
  capacity: 0,
};
