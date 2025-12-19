import "react-datepicker/dist/react-datepicker.css";

import DatePicker, { registerLocale } from "react-datepicker";
import { useUser } from "../../../stores";
import { es } from "date-fns/locale/es";
import { ca } from "date-fns/locale/ca";
import { enGB } from "date-fns/locale/en-GB";
import { format, isValid, parse } from "date-fns";
import { useEffect } from "react";

export const CustomMobileInput = ({
  value,
  isTime,
  handleChange,
}: Readonly<{
  value: string;
  isTime: boolean;
  handleChange?: (value: string) => void;
}>) => {
  const user = useUser();

  const parsedDate = isTime
    ? parse(value, "HH:mm", new Date())
    : parse(value, "yyyy-MM-dd", new Date());

  useEffect(() => {
    registerLocale("es", es);
    registerLocale("ca", ca);
    registerLocale("en", enGB);
  }, []);

  return (
    <DatePicker
      timeIntervals={15}
      timeCaption="Hora"
      showTimeSelect={isTime}
      showTimeSelectOnly={isTime}
      locale={user?.language ?? "es"}
      dateFormat={isTime ? "HH:mm" : "dd/MM/yyyy"}
      selected={value && isValid(parsedDate) ? parsedDate : null}
      onChange={(date) => {
        if (!!date && !!handleChange) {
          handleChange(format(date, isTime ? "HH:mm" : "yyyy-MM-dd"));
        }
      }}
      className="w-full text-xs sm:text-sm px-3 py-2 border border-neutral-200 rounded-xl focus:outline-none"
    />
  );
};
