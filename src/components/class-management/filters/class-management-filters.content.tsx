import { Dispatch, SetStateAction } from "react";
import { ClassDatesFilter } from "../class-management.interface";
import { useTranslation } from "react-i18next";
import { CustomInputField, getInputDate } from "../../base";
import { capitalize } from "../../../utils";

export const DateRangeInput = ({
  type,
  dateValue,
  setDateValue,
}: Readonly<{
  dateValue?: Date;
  type: "endDate" | "startDate";
  setDateValue: Dispatch<SetStateAction<ClassDatesFilter>>;
}>) => {
  const { t } = useTranslation();
  return (
    <CustomInputField
      type="date"
      value={getInputDate(dateValue)}
      title={t(`Base.${capitalize(type)}`)}
      customContainerStyles={{ width: "100%" }}
      handleChange={(date) =>
        setDateValue((prev) => {
          return {
            ...prev,
            [type]: !!date ? new Date(date) : undefined,
          };
        })
      }
    />
  );
};
