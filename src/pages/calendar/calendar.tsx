import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NewEvent, Sidebar } from "../../components";
import { CalendarContainer, NewEventButton } from "./calendar.styled";

export const CalendarPage = () => {
  const { t } = useTranslation();

  const [showNewEvent, setShowNewEvent] = useState<boolean>(false);

  return (
    <Sidebar>
      <CalendarContainer>
        {!showNewEvent ? (
          <NewEventButton onClick={() => setShowNewEvent(true)}>
            {t("Calendar.Event.NewEvent")}
          </NewEventButton>
        ) : (
          <NewEvent />
        )}
      </CalendarContainer>
    </Sidebar>
  );
};
