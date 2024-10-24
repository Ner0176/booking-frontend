import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EventTypeBox } from "./new-event.content";
import { EventContainer, EventTypesWrapper } from "./new-event.styled";
import { mdiCalendarBlankOutline, mdiCalendarSyncOutline } from "@mdi/js";
import { EventType } from "./new-event.interface";
import "react-calendar/dist/Calendar.css";
import { CustomCalendar } from "../base";

export const NewEvent = () => {
  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState<EventType>();
  const [initDate, setInitDate] = useState<Date>();

  return (
    <EventContainer>
      <span className="text-center text-2xl font-bold">
        {t("Calendar.Event.NewEvent")}
      </span>
      {!selectedType ? (
        <EventTypesWrapper>
          <EventTypeBox
            type="Recurrent"
            icon={mdiCalendarSyncOutline}
            handleSelectType={() => setSelectedType("recurrent")}
          />
          <EventTypeBox
            type="OneTime"
            icon={mdiCalendarBlankOutline}
            handleSelectType={() => setSelectedType("oneTime")}
          />
        </EventTypesWrapper>
      ) : (
        <div className="flex flex-row justify-between gap-4 w-full">
          <div>AAA</div>
          <CustomCalendar
            value={initDate}
            onClickDay={(date) => setInitDate(date)}
          />
        </div>
      )}
    </EventContainer>
  );
};
