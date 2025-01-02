import { useTranslation } from "react-i18next";
import { CreateClassModal } from "../../components";
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  HeaderTitle,
} from "./calendar.styled";
import { useGetAllClasses } from "../../api";
import { ClassDetails, ClassItem, HeaderButton } from "./calendar.content";
import Skeleton from "react-loading-skeleton";
import { useSearchParamsManager } from "../../hooks";
import { useMemo } from "react";
import { format } from "date-fns";
import { mdiPencilOutline, mdiPlus, mdiTrashCanOutline } from "@mdi/js";

export const CalendarDashboard = () => {
  const { t } = useTranslation();
  const { params } = useSearchParamsManager(["event", "action"]);
  const eventId = params.get("event");

  const { data, isLoading } = useGetAllClasses();

  const selectedEvent = useMemo(() => {
    if (eventId && data) {
      return data.find(({ id }) => +eventId === id);
    }
  }, [data, eventId]);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <HeaderTitle>
          {!eventId
            ? t("Calendar.Title")
            : t("Calendar.ClassDetails.Title", {
                date: format(
                  new Date(selectedEvent?.date as Date),
                  "dd/MM/yyyy"
                ),
              })}
        </HeaderTitle>
        {!eventId ? (
          <HeaderButton
            props={{
              icon: mdiPlus,
              action: "create-event",
              tPath: "Event.NewEvent",
            }}
          />
        ) : (
          <div className="flex flex-row items-center gap-4">
            <HeaderButton
              props={{
                action: "edit-event",
                icon: mdiPencilOutline,
                tPath: "ClassDetails.Edit",
              }}
            />
            <HeaderButton
              props={{
                color: "#DC2626FF",
                action: "delete-event",
                icon: mdiTrashCanOutline,
                tPath: "ClassDetails.Delete",
              }}
            />
          </div>
        )}
      </CalendarHeader>
      <CalendarBody>
        {data &&
          (!!eventId && selectedEvent ? (
            <ClassDetails classData={selectedEvent} />
          ) : isLoading ? (
            [...Array(6)].map((key) => (
              <Skeleton key={key} className="w-full h-[150px] rounded-2xl" />
            ))
          ) : (
            data.map((item, idx) => <ClassItem key={idx} data={item} />)
          ))}
      </CalendarBody>
      {params.get("action") === "create-event" && <CreateClassModal />}
    </CalendarContainer>
  );
};
