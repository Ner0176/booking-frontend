import { useTranslation } from "react-i18next";
import {
  CalendarBody,
  CalendarFilterContainer,
  CalendarFiltersWrapper,
  CalendarFilterTitle,
} from "./calendar.styled";
import { useGetAllClasses } from "../../api";
import {
  ClassCard,
  ClassStatusButton,
  DateRangeInput,
  HeaderButton,
} from "./calendar.content";
import Skeleton from "react-loading-skeleton";
import { useSearchParamsManager } from "../../hooks";
import { useEffect, useMemo, useState } from "react";
import { format, isBefore } from "date-fns";
import {
  mdiArrowLeft,
  mdiPencilOutline,
  mdiPlus,
  mdiTrashCanOutline,
} from "@mdi/js";
import { CreateClassModal } from "./create-class";
import { ClassDetails } from "./class-details";
import { CustomSelect, DashboardSkeleton } from "../base";
import {
  CLASS_STATUS,
  CLASS_TIME_FILTERS,
  ClassDatesFilter,
  ClassStatusType,
  ClassTimeFilterType,
} from "./calendar.interface";
import { getDatesFromTimeFilter } from "./calendar.utils";

export const CalendarDashboard = () => {
  const { t } = useTranslation();
  const { params } = useSearchParamsManager(["event", "action"]);
  const eventId = params.get("event");

  const [datesFilter, setDatesFilter] = useState<ClassDatesFilter>({});
  const [statusFilter, setStatusFilter] = useState<ClassStatusType>("all");
  const [timeFilter, setTimeFilter] = useState<ClassTimeFilterType>("week");

  const { data, refetch, isLoading } = useGetAllClasses({
    statusFilter: statusFilter !== "all" ? statusFilter : undefined,
    timeFilter: timeFilter !== "all" ? datesFilter : undefined,
  });

  useEffect(() => {
    setDatesFilter(
      timeFilter !== "custom" ? getDatesFromTimeFilter(timeFilter) : {}
    );
  }, [timeFilter]);

  const selectedEvent = useMemo(() => {
    if (eventId && data) {
      return data.find(({ id }) => +eventId === id);
    }
  }, [data, eventId]);

  const getTitle = () => {
    let title = t("Calendar.Title");

    if (!!eventId && selectedEvent?.date) {
      const titleType = !selectedEvent.recurrentId ? "Title" : "RecurrentTitle";
      title = t(`Calendar.ClassDetails.${titleType}`, {
        date: format(new Date(selectedEvent?.date as Date), "dd/MM/yyyy"),
      });
    }

    return title;
  };

  const getSelectOptions = (type: "Status" | "Time") => {
    const optionsList = type === "Time" ? CLASS_TIME_FILTERS : CLASS_STATUS;
    return optionsList.map((option) => ({
      key: option,
      text: t(`Calendar.Filters.${type}.Options.${option}`),
    }));
  };

  const RightHeaderButtons = !selectedEvent ? (
    <HeaderButton
      props={{
        icon: mdiPlus,
        action: "create-event",
        tPath: "Calendar.Event.NewEvent",
      }}
    />
  ) : (
    <div className="flex flex-row items-center justify-end gap-4 w-full">
      <HeaderButton
        props={{
          icon: mdiArrowLeft,
          action: "close-event",
          tPath: "Base.Buttons.Back",
        }}
      />
      {isBefore(new Date(), selectedEvent.date) && (
        <>
          <HeaderButton
            props={{
              action: "edit-event",
              icon: mdiPencilOutline,
              tPath: "Calendar.ClassDetails.Edit",
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
              action: "delete-event",
              icon: mdiTrashCanOutline,
              tPath: "Calendar.ClassDetails.Delete.Title",
            }}
          />
        </>
      )}
    </div>
  );

  return (
    <DashboardSkeleton title={getTitle()} rightHeader={RightHeaderButtons}>
      {!eventId && (
        <CalendarFiltersWrapper>
          <CalendarFilterContainer>
            <CalendarFilterTitle>
              {t("Calendar.Filters.Status.Title")}
            </CalendarFilterTitle>
            <CustomSelect
              selectedValue={statusFilter}
              options={getSelectOptions("Status")}
              handleChange={(v) => setStatusFilter(v as ClassStatusType)}
            />
          </CalendarFilterContainer>
          <CalendarFilterContainer>
            <CalendarFilterTitle>
              {t("Calendar.Filters.Time.Title")}
            </CalendarFilterTitle>
            <CustomSelect
              selectedValue={timeFilter}
              options={getSelectOptions("Time")}
              handleChange={(v) => setTimeFilter(v as ClassTimeFilterType)}
            />
          </CalendarFilterContainer>
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
        </CalendarFiltersWrapper>
      )}
      <CalendarBody>
        {data &&
          (!!eventId && selectedEvent ? (
            <ClassDetails classData={selectedEvent} refetchClasses={refetch} />
          ) : isLoading ? (
            [...Array(6)].map((key) => (
              <Skeleton key={key} className="w-full h-[150px] rounded-2xl" />
            ))
          ) : (
            data.map((item, idx) => <ClassCard key={idx} data={item} />)
          ))}
      </CalendarBody>
      {params.get("action") === "create-event" && (
        <CreateClassModal refetchClasses={refetch} />
      )}
    </DashboardSkeleton>
  );
};
