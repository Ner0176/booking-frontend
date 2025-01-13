import { HTMLInputTypeAttribute } from "react";

export type EventType = "recurrent" | "oneTime";

interface IField<T> {
  value: T;
  error?: string;
}

export interface IEventFields {
  date: IField<string>;
  endTime: IField<string>;
  startTime: IField<string>;
  maxAmount: IField<number>;
  recurrencyLimit: IField<string | undefined>;
}

export const emptyEventFields: IEventFields = {
  date: { value: "" },
  endTime: { value: "" },
  maxAmount: { value: 0 },
  startTime: { value: "" },
  recurrencyLimit: { value: "" },
};

export interface IRowConfig {
  hasTooltip?: boolean;
  type: HTMLInputTypeAttribute;
  accessor: keyof IEventFields;
}

export interface IClassIds {
  id: string;
  recurrentId: string;
}
