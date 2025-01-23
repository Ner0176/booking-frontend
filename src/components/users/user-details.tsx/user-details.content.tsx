import { useTranslation } from "react-i18next";
import { CustomInputField } from "../../base";
import { IClass } from "../../../api";
import { useNavigate } from "react-router-dom";
import { formatTime, formatToLongDate } from "../../../utils";

export const UserInfoField = ({
  value,
  textKey,
}: Readonly<{ textKey: string; value: string }>) => {
  const { t } = useTranslation();

  return (
    <CustomInputField
      isDisabled
      value={value}
      title={t(`Auth.Fields.${textKey}`)}
      customStyles={{ backgroundColor: "white" }}
    />
  );
};

export const UserClassItem = ({
  classInstance,
}: Readonly<{ classInstance: IClass }>) => {
  const navigate = useNavigate();

  const { id, date, endTime, startTime } = classInstance;

  return (
    <div
      onClick={() => navigate(`/calendar?event=${id}`)}
      className="flex flex-col gap-2 border-b bg-white rounded-2xl hover:bg-neutral-50 py-4 px-6 cursor-pointer overflow-y-auto"
    >
      <div>{formatTime(startTime, endTime)}</div>
      <div>{formatToLongDate(date)}</div>
    </div>
  );
};
