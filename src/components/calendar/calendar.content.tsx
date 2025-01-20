import Icon from "@mdi/react";
import { IClass, useEditClassStatus } from "../../api";
import {
  mdiAccountGroupOutline,
  mdiCalendarOutline,
  mdiCancel,
  mdiCheck,
  mdiClockOutline,
  mdiTimerSand,
} from "@mdi/js";
import { Dispatch, Fragment, PropsWithChildren, SetStateAction } from "react";
import { useSearchParamsManager } from "../../hooks";
import {
  CalendarItemContainer,
  ClassInfoRowContainer,
  HeaderButtonContainer,
} from "./calendar.styled";
import { capitalize, formatToLongDate } from "../../utils";
import {
  ClassDatesFilter,
  ClassStatusType,
  IButtonHeaderProps,
} from "./calendar.interface";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import { isBefore } from "date-fns";
import { CustomInputField, getInputDate } from "../base";

const ItemInfoRow = ({
  icon,
  status,
  children,
}: Readonly<PropsWithChildren<{ icon: string; status?: ClassStatusType }>>) => {
  return (
    <ClassInfoRowContainer status={status}>
      <Icon size="20px" className="mt-1" path={icon} />
      {children}
    </ClassInfoRowContainer>
  );
};

export const ClassStatusButton = ({
  classId,
  refetch,
  isCancelled,
}: Readonly<{ classId: string; refetch(): void; isCancelled: boolean }>) => {
  const { t } = useTranslation();

  const { mutate, isPending: isLoading } = useEditClassStatus(refetch);

  return (
    <HeaderButtonContainer
      className="flex justify-center min-w-[100px]"
      color={isCancelled ? "primary" : "secondary"}
      onClick={() => {
        if (!!classId && !isLoading)
          mutate({ id: classId, cancel: !isCancelled });
      }}
    >
      {isLoading ? (
        <ClipLoader
          size={20}
          color="gray"
          loading={true}
          data-testid="loader"
          aria-label="Loading Spinner"
        />
      ) : (
        <Fragment>
          <Icon
            size="14px"
            className="mt-0.5"
            path={!isCancelled ? mdiCancel : mdiCheck}
          />
          <span className="text-sm font-semibold">
            {t(
              `Calendar.ClassDetails.Status.${
                !isCancelled ? "Cancel" : "Enable"
              }`
            )}
          </span>
        </Fragment>
      )}
    </HeaderButtonContainer>
  );
};

export const HeaderButton = ({
  props,
}: Readonly<{
  props: IButtonHeaderProps;
}>) => {
  const { t } = useTranslation();
  const { setParams } = useSearchParamsManager([]);
  const { icon, tPath, color, action } = props;

  const getAction = () => {
    switch (action) {
      case "close-event":
        setParams([{ key: "event" }, { key: "action" }]);
        break;
      default:
        setParams([{ key: "action", value: action }]);
        break;
    }
  };

  return (
    <HeaderButtonContainer
      onClick={(e) => {
        e.stopPropagation();
        getAction();
      }}
      color={color ?? "primary"}
    >
      <Icon size="14px" className="mt-0.5" path={icon} />
      <span className="text-sm font-semibold whitespace-nowrap">
        {t(tPath)}
      </span>
    </HeaderButtonContainer>
  );
};

export const ClassCard = ({ data }: Readonly<{ data: IClass }>) => {
  const { t } = useTranslation();
  const basePath = "Calendar.Event";

  const { setParams } = useSearchParamsManager([]);

  const { id, endTime, startTime, date, maxAmount, cancelled, currentCount } =
    data;

  const { status, statusIcon } = (() => {
    if (cancelled) return { status: "cancelled", statusIcon: mdiCancel };

    const today = new Date();
    return isBefore(today, date)
      ? { status: "pending", statusIcon: mdiTimerSand }
      : { status: "done", statusIcon: mdiCheck };
  })();

  return (
    <CalendarItemContainer
      className="hover:shadow-lg"
      onClick={() => setParams([{ key: "event", value: `${id}` }])}
    >
      <ItemInfoRow icon={statusIcon} status={status as ClassStatusType}>
        {t(`${basePath}.Status.${status}`)}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiAccountGroupOutline}>
        {t(`${basePath}.Attendees`, { currentCount, maxAmount })}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiClockOutline}>
        {startTime.slice(0, 5) + "h - " + endTime.slice(0, 5) + "h"}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiCalendarOutline}>
        {formatToLongDate(date)}
      </ItemInfoRow>
    </CalendarItemContainer>
  );
};

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
