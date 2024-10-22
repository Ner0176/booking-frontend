import { useTranslation } from "react-i18next";
import { EventTypeBox } from "./calendar.content";
import { mdiCalendarBlankOutline, mdiCalendarSyncOutline } from "@mdi/js";
import { EventContainer, EventTypesWrapper } from "./calendar-event.styled";

export const CalendarEvent = () => {
  const { t } = useTranslation();
  return (
    <EventContainer>
      <span className="text-center text-2xl font-bold">
        {t("Calendar.Event.NewEvent")}
      </span>
      <EventTypesWrapper>
        <EventTypeBox icon={mdiCalendarSyncOutline} type="Recurrent" />
        <EventTypeBox icon={mdiCalendarBlankOutline} type="OneTime" />
      </EventTypesWrapper>
    </EventContainer>
  );
};
