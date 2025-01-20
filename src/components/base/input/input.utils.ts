import { format } from "date-fns";

export function getInputDate(date?: Date) {
  return !!date ? format(date, "yyyy-MM-dd") : "";
}
