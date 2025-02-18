import Icon from "@mdi/react";
import { capitalize } from "../../../utils";
import { SidebarBox, SidebarItemBox } from "./sidebar.styled";
import { ISidebarItem } from "./sidebar.interface";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks";

export const SidebarOptions = ({
  items,
  isExpanded,
}: Readonly<{ items: ISidebarItem[]; isExpanded: boolean }>) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const { isAdmin } = useUser();

  return (
    <SidebarItemBox isExpanded={isExpanded}>
      {items.map(({ icon, text, view, onClick }, idx) => {
        const path = text === "calendar" ? "/" : `/${text}`;
        const isSelected = location.pathname === path;

        const hideOption =
          (view === "user" && isAdmin) || (view === "admin" && !isAdmin);

        return (
          <SidebarBox
            key={idx}
            hide={hideOption}
            isSelected={isSelected}
            isExpanded={isExpanded}
            onClick={() => (!onClick ? navigate(path) : onClick())}
          >
            <Icon size="24px" path={icon} />
            {isExpanded && (
              <span>{t(`Sidebar.Options.${capitalize(text)}`)}</span>
            )}
          </SidebarBox>
        );
      })}
    </SidebarItemBox>
  );
};
