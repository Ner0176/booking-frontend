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
import {
  CSSProperties,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSearchParamsManager } from "../../hooks";
import { ClassInfoRowContainer } from "./class-management.styled";
import {
  capitalize,
  formatTime,
  formatToLongDate,
  mergeDateTime,
} from "../../utils";
import {
  CLASS_STATUS,
  CLASS_TIME_FILTERS,
  ClassDatesFilter,
  ClassStatusType,
  ClassTimeFilterType,
} from "./class-management.interface";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import { isBefore } from "date-fns";
import {
  CustomButton,
  CustomInputField,
  CustomSelect,
  DashboardHeaderButton,
  getInputDate,
  HeaderButton,
} from "../base";
import { getDatesFromTimeFilter } from "./class-management.utils";
import { mdiPlus, mdiTrashCanOutline } from "@mdi/js";
import { isMobile } from "react-device-detect";

export const ItemInfoRow = ({
  icon,
  status,
  children,
}: Readonly<PropsWithChildren<{ icon: string; status?: ClassStatusType }>>) => {
  return (
    <ClassInfoRowContainer status={status}>
      <Icon size={isMobile ? "16px" : "20px"} className="mt-1" path={icon} />
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

  const handleChangeStatus = () => {
    if (!!classId && !isLoading) {
      mutate({ id: classId, cancel: !isCancelled });
    }
  };

  return isMobile ? (
    <div onClick={handleChangeStatus} className="text-red-600 cursor-pointer">
      <Icon
        className="mt-0.5 size-5"
        path={!isCancelled ? mdiCancel : mdiCheck}
      />
    </div>
  ) : (
    <DashboardHeaderButton
      onClick={handleChangeStatus}
      className="flex justify-center min-w-[100px]"
      color={isCancelled ? "primary" : "secondary"}
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
        <>
          <Icon
            size="14px"
            className="mt-0.5"
            path={!isCancelled ? mdiCancel : mdiCheck}
          />
          <span className="text-sm font-semibold">
            {t(
              `Classes.ClassDetails.Status.${
                !isCancelled ? "Cancel" : "Enable"
              }`
            )}
          </span>
        </>
      )}
    </DashboardHeaderButton>
  );
};

export const ClassCardContent = ({
  data,
  hasCancellations,
  handleCancelBooking,
}: Readonly<{
  data: IClass;
  hasCancellations?: boolean;
  handleCancelBooking?: () => void;
}>) => {
  const { t } = useTranslation();

  const { endTime, startTime, date, maxAmount, cancelled, currentCount } = data;

  const { status, statusIcon } = (() => {
    if (cancelled) return { status: "cancelled", statusIcon: mdiCancel };

    const now = new Date();
    const formattedDate = mergeDateTime(date, endTime);

    return isBefore(now, formattedDate)
      ? { status: "pending", statusIcon: mdiTimerSand }
      : { status: "completed", statusIcon: mdiCheck };
  })();

  const getButtonStyles = () => {
    return {
      minWidth: 0,
      minHeight: 0,
      padding: "4px 6px 4px 6px",
      fontSize: isMobile ? 10 : 12,
    } as CSSProperties;
  };

  return (
    <>
      <ItemInfoRow icon={statusIcon} status={status as ClassStatusType}>
        {t(`Classes.Filters.Status.Options.${status}`)}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiAccountGroupOutline}>
        {t(`Classes.CreateClass.Attendees`, {
          maxAmount,
          currentCount: currentCount ?? "-",
        })}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiClockOutline}>
        {formatTime(startTime, endTime)}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiCalendarOutline}>
        {formatToLongDate(date)}
      </ItemInfoRow>
      {!!handleCancelBooking && status === "pending" && (
        <div className="absolute top-4 right-4 z-10">
          <CustomButton
            type="error"
            color="secondary"
            styles={getButtonStyles()}
            onClick={handleCancelBooking}
            isDisabled={!hasCancellations}
          >
            {t("UserBookings.Cancel.Title")}
          </CustomButton>
        </div>
      )}
    </>
  );
};

export const CalendarHeaderButtons = ({
  classId,
  refetch,
  selectedClass,
}: Readonly<{ refetch(): void; classId: string; selectedClass?: IClass }>) => {
  const { setParams } = useSearchParamsManager([]);

  const showButtons = () => {
    if (selectedClass) {
      const now = new Date();
      const formattedDate = mergeDateTime(
        selectedClass.date,
        selectedClass.endTime
      );
      return isBefore(now, formattedDate);
    }
    return false;
  };

  return !selectedClass ? (
    <HeaderButton
      icon={mdiPlus}
      tPath={"Base.Buttons.CreateClass"}
      onClick={() =>
        setParams([
          { key: "action", value: "create-class" },
          { key: "type", value: "recurrent" },
        ])
      }
    />
  ) : (
    <div className="flex flex-row items-center justify-end gap-4 w-full">
      {showButtons() && (
        <ClassStatusButton
          refetch={refetch}
          classId={classId ?? ""}
          isCancelled={selectedClass.cancelled}
        />
      )}
      <HeaderButton
        color="secondary"
        icon={mdiTrashCanOutline}
        size={isMobile ? "small" : "default"}
        tPath="Classes.ClassDetails.Delete.Title"
        onClick={() => setParams([{ key: "action", value: "delete-class" }])}
      />
    </div>
  );
};

const DateRangeInput = ({
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

export const CalendarFilters = ({
  datesFilter,
  statusFilter,
  setDatesFilter,
  setStatusFilter,
}: Readonly<{
  datesFilter: ClassDatesFilter;
  statusFilter: ClassStatusType;
  setDatesFilter: Dispatch<SetStateAction<ClassDatesFilter>>;
  setStatusFilter: Dispatch<SetStateAction<ClassStatusType>>;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.Filters";

  const [timeFilter, setTimeFilter] = useState<ClassTimeFilterType>("all");

  useEffect(() => {
    const addFilter = timeFilter !== "custom" && timeFilter !== "all";
    setDatesFilter(addFilter ? getDatesFromTimeFilter(timeFilter) : {});
  }, [timeFilter, setDatesFilter]);

  const getSelectOptions = (type: "Status" | "Time") => {
    const optionsList = type === "Time" ? CLASS_TIME_FILTERS : CLASS_STATUS;
    return optionsList.map((option) => ({
      key: option,
      text: t(`Classes.Filters.${type}.Options.${option}`),
    }));
  };

  return (
    <div className="flex justify-end w-full">
      <div className="flex flex-row items-center gap-3">
        <CustomSelect
          selectedValue={statusFilter}
          options={getSelectOptions("Status")}
          title={t(`${basePath}.Status.Title`)}
          handleChange={(v) => setStatusFilter(v as ClassStatusType)}
        />
        <CustomSelect
          selectedValue={timeFilter}
          options={getSelectOptions("Time")}
          title={t(`${basePath}.Time.Title`)}
          handleChange={(v) => setTimeFilter(v as ClassTimeFilterType)}
        />
        {timeFilter === "custom" && (
          <div className="flex flex-row items-center gap-3">
            <DateRangeInput
              type="startDate"
              setDateValue={setDatesFilter}
              dateValue={datesFilter.startDate}
            />
            <DateRangeInput
              type="endDate"
              setDateValue={setDatesFilter}
              dateValue={datesFilter.endDate}
            />
          </div>
        )}
      </div>
    </div>
  );
};
