import Icon from "@mdi/react";
import { IClass } from "../../api";
import {
  mdiCalendarOutline,
  mdiPencilOutline,
  mdiTrashCanOutline,
} from "@mdi/js";
import { formatDate } from "../../components";
import { useState } from "react";

export const ClassItem = ({ data }: Readonly<{ data: IClass }>) => {
  const { end, start, date, capacity, currentCount } = data;

  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div
      className="flex flex-col gap-2 border border-neutral-200 rounded-xl px-6 py-4"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <Icon size="18px" path={mdiCalendarOutline} />
          <span>{formatDate(date)}</span>
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
      <div>{currentCount + " / " + capacity + " asistentes"}</div>
      <div>{"De " + start.slice(0, 5) + " a " + end.slice(0, 5)}</div>
    </div>
  );
};
