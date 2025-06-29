import Icon from "@mdi/react";
import { capitalize } from "../../../utils";
import { SidebarBox } from "./sidebar.styled";
import { ISidebarItem } from "./sidebar.interface";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../stores";

export const SidebarOptions = ({
  items,
  isExpanded,
}: Readonly<{ items: ISidebarItem[]; isExpanded: boolean }>) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useUser();

  return (
    <>
      {items.map(({ icon, text, view, onClick }, idx) => {
        const path = text === "calendar" ? "/" : `/${text}`;
        const isSelected = location.pathname === path;

        const hideOption =
          (view === "user" && !!user?.isAdmin) ||
          (view === "admin" && !user?.isAdmin);

        return (
          <SidebarBox
            key={idx}
            hide={hideOption}
            isSelected={isSelected}
            isExpanded={isExpanded}
            onClick={() => (!onClick ? navigate(path) : onClick())}
          >
            <Icon
              path={icon}
              className="size-5 sm:size-4 lg:size-5 xl:size-6"
            />
            {isExpanded && (
              <span className="text-xs xl:text-sm 2xl:text-base">
                {t(`Sidebar.Options.${capitalize(text)}`)}
              </span>
            )}
          </SidebarBox>
        );
      })}
    </>
  );
};
