import Icon from "@mdi/react";
import { capitalize } from "../../utils";
import { SidebarBox } from "./sidebar.styled";
import { ISidebarItem } from "./sidebar.interface";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const SidebarOptions = ({
  items,
  isExpanded,
}: Readonly<{ items: ISidebarItem[]; isExpanded: boolean }>) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {items.map(({ icon, text }, idx) => {
        const path = text === "home" ? "/" : `/${text}`;
        const isSelected = location.pathname === path;

        return (
          <SidebarBox
            key={idx}
            isSelected={isSelected}
            isExpanded={isExpanded}
            onClick={() => navigate(path)}
          >
            <Icon size="24px" path={icon} />
            {isExpanded && (
              <span>{t(`Sidebar.Options.${capitalize(text)}`)}</span>
            )}
          </SidebarBox>
        );
      })}
    </>
  );
};
