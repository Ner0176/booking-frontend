import { capitalize } from "./capitalize";

export function formatToLongDate(date: Date, lng?: string) {
  return capitalize(
    Intl.DateTimeFormat(lng ?? "es", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date))
  );
}
