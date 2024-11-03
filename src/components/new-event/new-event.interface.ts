import { HTMLInputTypeAttribute } from "react";

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

interface IField<T> {
  value: T;
  error?: string;
}

export interface IEventFields {
  startTime: IField<string>;
  endTime: IField<string>;
  capacity: IField<number>;
  date: IField<string | undefined>;
  startDate: IField<string | undefined>;
  endDate: IField<string | undefined>;
  weekDay: IField<number | undefined>;
}

export const emptyEventFields: IEventFields = {
  date: { value: "" },
  weekDay: { value: 0 },
  endDate: { value: "" },
  capacity: { value: 0 },
  endTime: { value: "" },
  startDate: { value: "" },
  startTime: { value: "" },
};

export interface IRowConfig {
  hasTooltip?: boolean;
  type: HTMLInputTypeAttribute;
  accessor: keyof IEventFields;
}
