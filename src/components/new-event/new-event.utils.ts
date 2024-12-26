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

  const { endTime, date, startTime, recurrencyLimit } = fields;
  switch (accessor) {
    case "date":
      if (detectOrderError(false, value, recurrencyLimit.value))
        return accessor;
      break;
    case "recurrencyLimit":
      if (detectOrderError(false, date.value, value)) return accessor;
      break;
    case "startTime":
      if (detectOrderError(true, value, endTime.value)) return accessor;
      break;
    case "endTime":
      if (detectOrderError(true, startTime.value, value)) return accessor;
      break;
    case "maxAmount":
      if (+value < 1) return accessor;
      break;
  }

  return "";
}
