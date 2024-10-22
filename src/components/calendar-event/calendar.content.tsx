import Icon from "@mdi/react";
import { useTranslation } from "react-i18next";
import { EventTypeContainer, EventTypeTitle } from "./calendar-event.styled";

export const EventTypeBox = ({
  type,
  icon,
}: Readonly<{ type: string; icon: string }>) => {
  const { t } = useTranslation();
  return (
    <EventTypeContainer className="hover:shadow-lg">
      <EventTypeTitle>
        <Icon size="16px" style={{ marginTop: 4 }} path={icon} />
        <span className="text-center">{t(`Calendar.Event.${type}.Title`)}</span>
      </EventTypeTitle>
      <span className="text-sm">{t(`Calendar.Event.${type}.Description`)}</span>
    </EventTypeContainer>
  );
};
