import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";
import { LabelContainer, StyledCalendar } from "./calendar.styled";

const CalendarLabel = ({ icon }: Readonly<{ icon: string }>) => {
  return (
    <LabelContainer className="hover:bg-[#FAFAFBFF]">
      <Icon size="20px" path={icon} />
    </LabelContainer>
  );
};

export const CustomCalendar = ({
  value,
  onClickDay,
}: Readonly<{ value?: LooseValue; onClickDay?: (value: Date) => void }>) => {
  return (
    <StyledCalendar
      locale="es"
      value={value}
      minDetail="year"
      maxDetail="month"
      prev2Label={null}
      next2Label={null}
      defaultView="month"
      onClickDay={onClickDay}
      navigationLabel={({ label }) => (
        <LabelContainer className="hover:bg-[#FAFAFBFF]">
          {label}
        </LabelContainer>
      )}
      prevLabel={<CalendarLabel icon={mdiChevronLeft} />}
      nextLabel={<CalendarLabel icon={mdiChevronRight} />}
    />
  );
};
