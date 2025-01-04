import { useTranslation } from "react-i18next";
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  HeaderTitle,
} from "./calendar.styled";
import { useGetAllClasses } from "../../api";
import { ClassCard, HeaderButton } from "./calendar.content";
import Skeleton from "react-loading-skeleton";
import { useSearchParamsManager } from "../../hooks";
import { useMemo } from "react";
import { format } from "date-fns";
import {
  mdiArrowLeft,
  mdiPencilOutline,
  mdiPlus,
  mdiTrashCanOutline,
} from "@mdi/js";
import { CreateClassModal } from "./create-class";
import { ClassDetails } from "./class-details";

export const CalendarDashboard = () => {
  const { t } = useTranslation();
  const { params } = useSearchParamsManager(["event", "action"]);
  const eventId = params.get("event");

  const { data, refetch, isLoading } = useGetAllClasses();

  const selectedEvent = useMemo(() => {
    if (eventId && data) {
      return data.find(({ id }) => +eventId === id);
    }
  }, [data, eventId]);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <HeaderTitle>
          {!!eventId && selectedEvent?.date
            ? t("Calendar.ClassDetails.Title", {
                date: format(
                  new Date(selectedEvent?.date as Date),
                  "dd/MM/yyyy"
                ),
              })
            : t("Calendar.Title")}
        </HeaderTitle>
        {!eventId ? (
          <HeaderButton
            props={{
              icon: mdiPlus,
              action: "create-event",
              tPath: "Calendar.Event.NewEvent",
            }}
          />
        ) : (
          <div className="flex flex-row items-center gap-4">
            <HeaderButton
              props={{
                icon: mdiArrowLeft,
                action: "close-event",
                tPath: "Base.Buttons.Back",
              }}
            />
            <HeaderButton
              props={{
                action: "edit-event",
                icon: mdiPencilOutline,
                tPath: "Calendar.ClassDetails.Edit",
              }}
            />
            <HeaderButton
              props={{
                color: "#DC2626FF",
                action: "delete-event",
                icon: mdiTrashCanOutline,
                tPath: "Calendar.ClassDetails.Delete.Title",
              }}
            />
          </div>
        )}
      </CalendarHeader>
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
    </CalendarContainer>
  );
};
