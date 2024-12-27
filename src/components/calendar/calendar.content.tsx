import Icon from "@mdi/react";
import { IClass } from "../../api";
import {
  mdiAccountGroupOutline,
  mdiCalendarOutline,
  mdiClockOutline,
} from "@mdi/js";
import { PropsWithChildren } from "react";
import { formatDate } from "../../components";
import { useSearchParamsManager } from "../../hooks";
import { CalendarItemContainer } from "./calendar.styled";

const ItemInfoRow = ({
  icon,
  children,
}: Readonly<PropsWithChildren<{ icon: string }>>) => {
  return (
    <div className="flex flex-row items-center gap-1.5">
      <Icon size="20px" className="mt-1" path={icon} />
      {children}
    </div>
  );
};

export const ClassItem = ({ data }: Readonly<{ data: IClass }>) => {
  const { setParams } = useSearchParamsManager([]);

  const { id, endTime, startTime, date, maxAmount, currentCount } = data;

  return (
    <CalendarItemContainer
      className="hover:shadow-lg"
      onClick={() => setParams([{ key: "event", value: id }])}
    >
      <ItemInfoRow icon={mdiAccountGroupOutline}>
        {currentCount + " / " + maxAmount + " asistentes"}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiClockOutline}>
        {startTime.slice(0, 5) + "h - " + endTime.slice(0, 5) + "h"}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiCalendarOutline}>
        <span>{formatDate(date)}</span>
      </ItemInfoRow>
    </CalendarItemContainer>
  );
};

export const ClassDetails = () => {
  return <div></div>;
};
