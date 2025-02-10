import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ClassDatesFilter, ClassTimeFilterType } from "./classes.interface";

function getLastXMonths(date: Date, total: number) {
  return {
    startDate: startOfMonth(subMonths(date, total - 1)),
    endDate: endOfMonth(date),
  };
}

export function getDatesFromTimeFilter(
  filter: ClassTimeFilterType
): ClassDatesFilter {
  const today = new Date();
  let dateRange: ClassDatesFilter = {};

  switch (filter) {
    case "today":
      dateRange = { startDate: startOfDay(today), endDate: endOfDay(today) };
      break;
    case "week":
      dateRange = {
        startDate: startOfWeek(today, { weekStartsOn: 1 }),
        endDate: endOfWeek(today, { weekStartsOn: 1 }),
      };
      break;
    case "month":
      dateRange = {
        startDate: startOfMonth(today),
        endDate: endOfMonth(today),
      };
      break;
    case "last3Months":
      dateRange = getLastXMonths(today, 3);
      break;
    case "last6Months":
      dateRange = getLastXMonths(today, 6);
      break;
  }

  return dateRange;
}
