export function formatTime(start: string, end: string) {
  return start.slice(0, 5) + "h - " + end.slice(0, 5) + "h";
}
