import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomButton, NewEvent, Sidebar } from "../../components";
import { CalendarContainer } from "./calendar.styled";

export const CalendarPage = () => {
  const { t } = useTranslation();

  const [showNewEvent, setShowNewEvent] = useState<boolean>(false);

  return (
    <Sidebar>
      <CalendarContainer>
        {!showNewEvent ? (
          <CustomButton onClick={() => setShowNewEvent(true)}>
            {t("Calendar.Event.NewEvent")}
          </CustomButton>
        ) : (
          <NewEvent />
        )}
      </CalendarContainer>
    </Sidebar>
  );
};
