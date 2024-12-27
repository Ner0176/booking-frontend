import { capitalize } from "./capitalize";

export function getWeekday(date: string) {
  const weekday = Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(
    new Date(date)
  );
  return capitalize(weekday);
}
