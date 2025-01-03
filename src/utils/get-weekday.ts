import { capitalize } from "./capitalize";

export function getWeekday(date: string | Date) {
  const formattedDate = typeof date === "string" ? new Date(date) : date;

  const weekday = Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(
    formattedDate
  );

  return capitalize(weekday);
}
