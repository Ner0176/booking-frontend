import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NewEvent } from "../../components";
import { CalendarContainer } from "./calendar.styled";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { useGetAllClasses } from "../../api";
import { ClassItem } from "./calendar.content";
import Skeleton from "react-loading-skeleton";

export const CalendarPage = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useGetAllClasses();

  const [showNewEvent, setShowNewEvent] = useState<boolean>(false);

  return (
    <CalendarContainer>
      <div className="flex flex-row items-center justify-between pb-4 border-b">
        <span className="font-bold text-3xl">Calendario</span>
        <div
          className="flex flex-row items-center gap-0.5 cursor-pointer text-violet-600 border border-violet-600 rounded-full px-2 py-1"
          onClick={() => setShowNewEvent(true)}
        >
          <Icon size="14px" className="mt-0.5" path={mdiPlus} />
          <span className="text-sm font-semibold">
            {t("Calendar.Event.NewEvent")}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-4 px-8 py-10">
        {isLoading
          ? [...Array(6)].map((key) => (
              <Skeleton key={key} className="w-full h-[150px] rounded-2xl" />
            ))
          : data &&
            data.map((item, idx) => <ClassItem key={idx} data={item} />)}
      </div>
      {showNewEvent && <NewEvent />}
    </CalendarContainer>
  );
};
