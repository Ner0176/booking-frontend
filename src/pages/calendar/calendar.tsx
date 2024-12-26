import { useTranslation } from "react-i18next";
import { NewEvent } from "../../components";
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  HeaderButton,
  HeaderTitle,
} from "./calendar.styled";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { useGetAllClasses } from "../../api";
import { ClassDetails, ClassItem } from "./calendar.content";
import Skeleton from "react-loading-skeleton";
import { useSearchParamsManager } from "../../hooks";

export const CalendarPage = () => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["event", "action"]);

  const { data, isLoading } = useGetAllClasses();

  return (
    <CalendarContainer>
      <CalendarHeader>
        <HeaderTitle>{t("Calendar.Title")}</HeaderTitle>
        <HeaderButton
          onClick={(e) => {
            e.stopPropagation();
            setParams([{ key: "action", value: "create-event" }]);
          }}
        >
          <Icon size="14px" className="mt-0.5" path={mdiPlus} />
          <span className="text-sm font-semibold">
            {t("Calendar.Event.NewEvent")}
          </span>
        </HeaderButton>
      </CalendarHeader>
      <CalendarBody>
        {!!params.get("event") ? (
          <ClassDetails />
        ) : isLoading ? (
          [...Array(6)].map((key) => (
            <Skeleton key={key} className="w-full h-[150px] rounded-2xl" />
          ))
        ) : (
          data && data.map((item, idx) => <ClassItem key={idx} data={item} />)
        )}
      </CalendarBody>
      {!!params.get("action") && <NewEvent />}
    </CalendarContainer>
  );
};
