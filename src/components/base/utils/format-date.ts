import { format, isToday, isTomorrow, isYesterday } from "date-fns";

export function formatDate(date: Date) {
  const formattedDate = new Date(date);
  if (isYesterday(formattedDate)) return "Ayer";
  else if (isToday(formattedDate)) return "Hoy";
  else if (isTomorrow(formattedDate)) return "Mañana";
  else return format(formattedDate, "dd/MM/yyyy");
}
