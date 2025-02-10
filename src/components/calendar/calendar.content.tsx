import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import { ToolbarProps, View } from "react-big-calendar";
import { useTranslation } from "react-i18next";
import {
  TodayButton,
  ToolbarArrowButton,
  ToolbarBoxButton,
  ToolbarButtonsBox,
} from "./calendar.styled";

export const CustomToolbar = (props: ToolbarProps) => {
  const { t } = useTranslation();

  const { view, label, onView, onNavigate } = props;

  const availableViews: View[] = ["day", "week", "month"];
  return (
    <div className="grid grid-cols-3 items-center w-full mb-5">
      <TodayButton onClick={() => onNavigate("TODAY")}>
        {t(`Calendar.Messages.today`)}
      </TodayButton>
      <div className="flex flex-row items-center justify-center gap-4">
        <ToolbarArrowButton onClick={() => onNavigate("PREV")}>
          <Icon path={mdiChevronLeft} className="size-5" />
        </ToolbarArrowButton>
        <span className="text-lg font-bold first-letter:capitalize">
          {label}
        </span>
        <ToolbarArrowButton onClick={() => onNavigate("NEXT")}>
          <Icon path={mdiChevronRight} className="size-5" />
        </ToolbarArrowButton>
      </div>
      <div className="flex justify-end">
        <ToolbarButtonsBox>
          {availableViews.map((v) => {
            const isActive = view === v;
            return (
              <ToolbarBoxButton
                key={v}
                isActive={isActive}
                onClick={() => onView(v)}
                className="hover:bg-violet-50 last:border-none"
              >
                {t(`Calendar.Messages.${v}`)}
              </ToolbarBoxButton>
            );
          })}
        </ToolbarButtonsBox>
      </div>
    </div>
  );
};
