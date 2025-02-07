export function mergeDateTime(date: Date | string, time: string) {
  const formattedDate = new Date(date);
  const [hours, minutes] = time.split(":");

  formattedDate.setHours(+hours);
  formattedDate.setMinutes(+minutes);

  return formattedDate;
}
