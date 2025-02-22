import { HTMLInputTypeAttribute } from "react";

export type ClassType = "recurrent" | "oneTime";

interface IField<T> {
  value: T;
  error?: string;
}

export interface IClassFields {
  date: IField<string>;
  endTime: IField<string>;
  startTime: IField<string>;
  maxAmount: IField<number>;
  recurrencyLimit: IField<string | undefined>;
}

export const emptyClassFields: IClassFields = {
  date: { value: "" },
  endTime: { value: "" },
  maxAmount: { value: 0 },
  startTime: { value: "" },
  recurrencyLimit: { value: "" },
};

export interface IRowConfig {
  hasTooltip?: boolean;
  type: HTMLInputTypeAttribute;
  accessor: keyof IClassFields;
}

export interface IClassIds {
  id: string;
  recurrentId: string;
}
