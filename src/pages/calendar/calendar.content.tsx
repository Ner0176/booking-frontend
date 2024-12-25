import Icon from "@mdi/react";
import { IClass } from "../../api";
import {
  mdiAccountGroupOutline,
  mdiCalendarOutline,
  mdiClockOutline,
  mdiPencilOutline,
  mdiTrashCanOutline,
} from "@mdi/js";
import { formatDate } from "../../components";
import { useState } from "react";

export const ClassItem = ({ data }: Readonly<{ data: IClass }>) => {
  const { endTime, startTime, date, maxAmount, currentCount } = data;

  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div
      className="flex flex-col gap-2 border border-neutral-200 rounded-xl px-6 py-4 min-w-[300px]"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1.5">
          <Icon size="20px" className="mt-1" path={mdiAccountGroupOutline} />
          {currentCount + " / " + maxAmount + " asistentes"}
        </div>
        {isHover && (
          <div className="flex flex-row gap-3">
            <Icon
              size="18px"
              path={mdiPencilOutline}
              className="cursor-pointer"
            />
            <Icon
              size="18px"
              path={mdiTrashCanOutline}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="flex flex-row items-center gap-1.5">
        <Icon size="20px" className="mt-1" path={mdiClockOutline} />
        {startTime.slice(0, 5) + "h - " + endTime.slice(0, 5) + "h"}
      </div>
      <div className="flex flex-row items-center gap-1.5">
        <Icon size="20px" className="mt-1" path={mdiCalendarOutline} />
        <span>{formatDate(date)}</span>
      </div>
    </div>
  );
};
