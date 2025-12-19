import { capitalize } from "./capitalize";
import { getLongLngName } from "./lng-formatter";

export function getWeekday(date: string | Date, lng?: string) {
  const formattedDate = typeof date === "string" ? new Date(date) : date;

  const weekday = Intl.DateTimeFormat(getLongLngName(lng), {
    weekday: "long",
  }).format(formattedDate);

  return capitalize(weekday);
}
