import { useTranslation } from "react-i18next";
import { CalendarBody } from "./calendar.styled";
import { useGetAllClasses } from "../../api";
import {
  CalendarFilters,
  CalendarHeaderButtons,
  ClassCard,
} from "./calendar.content";
import Skeleton from "react-loading-skeleton";
import { useSearchParamsManager } from "../../hooks";
import { useMemo, useState } from "react";
import { format } from "date-fns";

import { CreateClassModal } from "./create-class";
import { ClassDetails } from "./class-details";
import { DashboardSkeleton, NoDataComponent } from "../base";
import { ClassDatesFilter, ClassStatusType } from "./calendar.interface";
import noDataLoading from "../../assets/images/noData/reload.svg";

export const CalendarDashboard = () => {
  const { t } = useTranslation();
  const { params } = useSearchParamsManager(["event", "action"]);
  const eventId = params.get("event");

  const [datesFilter, setDatesFilter] = useState<ClassDatesFilter>({});
  const [statusFilter, setStatusFilter] = useState<ClassStatusType>("all");

  const { data, refetch, isLoading } = useGetAllClasses({
    timeFilter: datesFilter,
    statusFilter: statusFilter !== "all" ? statusFilter : undefined,
  });

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

  return (
    <DashboardSkeleton
      title={getTitle()}
      rightHeader={
        <CalendarHeaderButtons
          refetch={refetch}
          eventId={eventId ?? ""}
          selectedEvent={selectedEvent}
        />
      }
    >
      {!eventId && (
        <CalendarFilters
          datesFilter={datesFilter}
          statusFilter={statusFilter}
          setDatesFilter={setDatesFilter}
          setStatusFilter={setStatusFilter}
        />
      )}
      <CalendarBody>
        {!!eventId && selectedEvent ? (
          <ClassDetails classData={selectedEvent} refetchClasses={refetch} />
        ) : isLoading ? (
          [...Array(6)].map((key) => (
            <Skeleton key={key} className="w-full h-[150px] rounded-2xl" />
          ))
        ) : !!data && data.length > 0 ? (
          data.map((item, idx) => <ClassCard key={idx} data={item} />)
        ) : (
          <NoDataComponent image={noDataLoading} title={t("Calendar.NoData")} />
        )}
      </CalendarBody>
      {params.get("action") === "create-event" && (
        <CreateClassModal refetchClasses={refetch} />
      )}
    </DashboardSkeleton>
  );
};
