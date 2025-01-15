import { capitalize } from "./capitalize";

export function formatDate(date: Date) {
  return capitalize(
    Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date))
  );
}
