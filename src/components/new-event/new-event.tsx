import { useTranslation } from "react-i18next";
import { EventTypeBox } from "./new-event.content";
import { mdiCalendarBlankOutline, mdiCalendarSyncOutline } from "@mdi/js";
import { EventContainer, EventTypesWrapper } from "./new-event.styled";

export const NewEvent = () => {
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
