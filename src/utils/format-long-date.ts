import { capitalize } from "./capitalize";
import { getLongLngName } from "./lng-formatter";

export function formatToLongDate(date: Date, lng?: string) {
  return capitalize(
    Intl.DateTimeFormat(getLongLngName(lng), {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date))
  );
}
