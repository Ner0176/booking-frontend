export const CLASS_STATUS = [
  "all",
  "completed",
  "pending",
  "cancelled",
] as const;
export type ClassStatusType = (typeof CLASS_STATUS)[number];

export const CLASS_TIME_FILTERS = [
  "today",
  "week",
  "month",
  "last3Months",
  "last6Months",
  "all",
  "custom",
] as const;
export type ClassTimeFilterType = (typeof CLASS_TIME_FILTERS)[number];
export interface ClassDatesFilter {
  endDate?: Date;
  startDate?: Date;
}
