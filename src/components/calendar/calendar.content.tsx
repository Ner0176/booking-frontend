import Icon from "@mdi/react";
import { IClass } from "../../api";
import {
  mdiAccountGroupOutline,
  mdiCalendarOutline,
  mdiClockOutline,
} from "@mdi/js";
import { PropsWithChildren } from "react";
import { useSearchParamsManager } from "../../hooks";
import {
  CalendarItemContainer,
  HeaderButtonContainer,
} from "./calendar.styled";
import { formatDate } from "../../utils";
import { IButtonHeaderProps } from "./calendar.interface";
import { useTranslation } from "react-i18next";

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

export const HeaderButton = ({
  props,
}: Readonly<{ props: IButtonHeaderProps }>) => {
  const { t } = useTranslation();
  const { setParams } = useSearchParamsManager([]);
  const { icon, tPath, color, action } = props;

  return (
    <HeaderButtonContainer
      style={{ color, borderColor: color }}
      onClick={(e) => {
        e.stopPropagation();
        if (action === "close-event") {
          setParams([{ key: "event" }, { key: "action" }]);
        } else setParams([{ key: "action", value: action }]);
      }}
    >
      <Icon size="14px" className="mt-0.5" path={icon} />
      <span className="text-sm font-semibold">{t(tPath)}</span>
    </HeaderButtonContainer>
  );
};

export const ClassCard = ({ data }: Readonly<{ data: IClass }>) => {
  const { setParams } = useSearchParamsManager([]);

  const { id, endTime, startTime, date, maxAmount, currentCount } = data;

  return (
    <CalendarItemContainer
      className="hover:shadow-lg"
      onClick={() => setParams([{ key: "event", value: `${id}` }])}
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
