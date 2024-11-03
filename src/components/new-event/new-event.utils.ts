import { isAfter, isEqual, parse } from "date-fns";
import { IEventFields } from "./new-event.interface";

function detectOrderError(
  isTime: boolean,
  startValue: string | undefined,
  endValue: string | undefined
) {
  if (!startValue || !endValue) return false;

  const start = !isTime
    ? new Date(startValue)
    : parse(startValue, "HH:mm", new Date());
  const end = !isTime
    ? new Date(endValue)
    : parse(endValue, "HH:mm", new Date());

  return isAfter(start, end) || (isTime && isEqual(start, end));
}

export function handleCheckField(
  value: string,
  fields: IEventFields,
  accessor: keyof IEventFields
) {
  if (!value) return "emptyField";

  const { startTime, endTime, startDate, endDate } = fields;
  switch (accessor) {
    case "startDate":
      if (detectOrderError(false, value, endDate.value)) return accessor;
      break;
    case "endDate":
      if (detectOrderError(false, startDate.value, value)) return accessor;
      break;
    case "startTime":
      if (detectOrderError(true, value, endTime.value)) return accessor;
      break;
    case "endTime":
      if (detectOrderError(true, startTime.value, value)) return accessor;
      break;
    case "capacity":
      if (+value < 1) return accessor;
      break;
  }

  return "";
}
