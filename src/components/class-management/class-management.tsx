import { useTranslation } from "react-i18next";
import {
  ClassManagementBody,
  CMCardContainer,
} from "./class-management.styled";
import { useGetAllClasses } from "../../api";
import {
  CalendarFilters,
  CalendarHeaderButtons,
  ClassCardContent,
} from "./class-management.content";
import Skeleton from "react-loading-skeleton";
import { useSearchParamsManager } from "../../hooks";
import { useMemo, useState } from "react";
import { format } from "date-fns";

import { CreateClassModal } from "./create-class";
import { ClassDetails } from "./class-details";
import { DashboardSkeleton, NoDataComponent } from "../base";
import {
  ClassDatesFilter,
  ClassStatusType,
} from "./class-management.interface";
import noDataLoading from "../../assets/images/noData/reload.svg";

export const ClassesManagementDashboard = () => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["event", "action"]);
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
    let title = t("Classes.Title");

    if (!!eventId && selectedEvent?.date) {
      const titleType = !selectedEvent.recurrentId ? "Title" : "RecurrentTitle";
      title = t(`Classes.ClassDetails.${titleType}`, {
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
      <ClassManagementBody>
        {!!eventId && selectedEvent ? (
          <ClassDetails classData={selectedEvent} refetchClasses={refetch} />
        ) : isLoading ? (
          [...Array(6)].map((key) => (
            <Skeleton key={key} className="w-full h-[150px] rounded-2xl" />
          ))
        ) : !!data && data.length > 0 ? (
          data.map((item, idx) => (
            <CMCardContainer
              className="last:mb-6 hover:shadow-lg"
              onClick={() => setParams([{ key: "event", value: `${item.id}` }])}
            >
              <ClassCardContent key={idx} data={item} />
            </CMCardContainer>
          ))
        ) : (
          <NoDataComponent image={noDataLoading} title={t("Classes.NoData")} />
        )}
      </ClassManagementBody>
      {params.get("action") === "create-event" && (
        <CreateClassModal refetchClasses={refetch} />
      )}
    </DashboardSkeleton>
  );
};
