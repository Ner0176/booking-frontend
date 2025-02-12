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
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSearchParamsManager } from "../../hooks";
import { CalendarItemContainer, ClassInfoRowContainer } from "./classes.styled";
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
} from "./classes.interface";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import { isBefore } from "date-fns";
import {
  CustomInputField,
  CustomSelect,
  DashboardHeaderButton,
  getInputDate,
  HeaderButton,
} from "../base";
import { getDatesFromTimeFilter } from "./classes.utils";
import {
  mdiArrowLeft,
  mdiPencilOutline,
  mdiPlus,
  mdiTrashCanOutline,
} from "@mdi/js";

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
    <DashboardHeaderButton
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

export const ClassCard = ({ data }: Readonly<{ data: IClass }>) => {
  const { t } = useTranslation();

  const { setParams } = useSearchParamsManager([]);

  const { id, endTime, startTime, date, maxAmount, cancelled, currentCount } =
    data;

  const { status, statusIcon } = (() => {
    if (cancelled) return { status: "cancelled", statusIcon: mdiCancel };

    const now = new Date();
    const formattedDate = mergeDateTime(date, endTime);

    return isBefore(now, formattedDate)
      ? { status: "pending", statusIcon: mdiTimerSand }
      : { status: "done", statusIcon: mdiCheck };
  })();

  return (
    <CalendarItemContainer
      className="last:mb-6 hover:shadow-lg"
      onClick={() => setParams([{ key: "event", value: `${id}` }])}
    >
      <ItemInfoRow icon={statusIcon} status={status as ClassStatusType}>
        {t(`Classes.Filters.Status.Options.${status}`)}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiAccountGroupOutline}>
        {t(`Classes.Event.Attendees`, { currentCount, maxAmount })}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiClockOutline}>
        {formatTime(startTime, endTime)}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiCalendarOutline}>
        {formatToLongDate(date)}
      </ItemInfoRow>
    </CalendarItemContainer>
  );
};

export const CalendarHeaderButtons = ({
  eventId,
  refetch,
  selectedEvent,
}: Readonly<{ refetch(): void; eventId: string; selectedEvent?: IClass }>) => {
  const { setParams } = useSearchParamsManager([]);

  const showButtons = () => {
    if (selectedEvent) {
      const now = new Date();
      const formattedDate = mergeDateTime(
        selectedEvent.date,
        selectedEvent.endTime
      );
      return isBefore(now, formattedDate);
    }
    return false;
  };

  return !selectedEvent ? (
    <HeaderButton
      props={{
        icon: mdiPlus,
        tPath: "Classes.Event.NewEvent",
        onClick: () => setParams([{ key: "action", value: "create-event" }]),
      }}
    />
  ) : (
    <div className="flex flex-row items-center justify-end gap-4 w-full">
      <HeaderButton
        props={{
          icon: mdiArrowLeft,
          tPath: "Base.Buttons.Back",
          onClick: () => setParams([{ key: "event" }, { key: "action" }]),
        }}
      />
      {showButtons() && (
        <>
          <HeaderButton
            props={{
              icon: mdiPencilOutline,
              tPath: "Classes.ClassDetails.Edit",
              onClick: () =>
                setParams([{ key: "action", value: "edit-event" }]),
            }}
          />
          <ClassStatusButton
            refetch={refetch}
            classId={eventId ?? ""}
            isCancelled={selectedEvent.cancelled}
          />
          <HeaderButton
            props={{
              color: "secondary",
              icon: mdiTrashCanOutline,
              tPath: "Classes.ClassDetails.Delete.Title",
              onClick: () =>
                setParams([{ key: "action", value: "delete-event" }]),
            }}
          />
        </>
      )}
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
