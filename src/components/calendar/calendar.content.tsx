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
import { useGetBookings } from "../../api/booking";
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
        setParams([{ key: "action", value: action }]);
      }}
    >
      <Icon size="14px" className="mt-0.5" path={icon} />
      <span className="text-sm font-semibold">{t(`Calendar.${tPath}`)}</span>
    </HeaderButtonContainer>
  );
};

export const ClassItem = ({ data }: Readonly<{ data: IClass }>) => {
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

export const ClassDetails = ({
  classData,
}: Readonly<{ classData: IClass }>) => {
  const { t } = useTranslation();
  const tPath = "Calendar.ClassDetails";
  const { id, date, endTime, startTime, maxAmount } = classData;

  const { data } = useGetBookings({ classId: id });

  return (
    <div className="grid grid-cols-3 w-full">
      <div className="flex flex-col gap-3">
        <span className="font-bold text-xl underline underline-offset-2">
          {t(`${tPath}.Details`)}
        </span>
        <span>{`${t(`${tPath}.Date`)}: ${formatDate(date)}`}</span>
        <span>{`${t(`${tPath}.Schedule`)}: ${startTime} - ${endTime}`}</span>
        <span>{`${t(`${tPath}.MaxAmount`)}: ${maxAmount}`}</span>
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-bold text-xl underline underline-offset-2">
          {t(`${tPath}.AssistantsList.Title`)}
        </span>
        {data && data.length ? (
          data.map((item) => <div>{item.user.name}</div>)
        ) : (
          <span> {t(`${tPath}.AssistantsList.Empty`)}</span>
        )}
      </div>
    </div>
  );
};
