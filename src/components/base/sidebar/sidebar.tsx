import Icon from "@mdi/react";
import { MainContainer } from "../container";
import { MainWrapper, SidebarButton, SidebarContainer } from "./sidebar.styled";
import {
  mdiAccountGroupOutline,
  mdiCalendar,
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiHomeOutline,
} from "@mdi/js";
import { PropsWithChildren, useState } from "react";
import { SidebarOptions } from "./sidebar.content";
import { useTranslation } from "react-i18next";

export const Sidebar = ({ children }: Readonly<PropsWithChildren<{}>>) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <MainContainer>
      <MainWrapper>
        <SidebarContainer isExpanded={isOpen}>
          <SidebarOptions
            isExpanded={isOpen}
            items={[
              {
                icon: mdiHomeOutline,
                text: t("Sidebar.Options.Home"),
                isSelected: true,
              },
              { icon: mdiCalendar, text: t("Sidebar.Options.Calendar") },
              {
                icon: mdiAccountGroupOutline,
                text: t("Sidebar.Options.Customers"),
              },
            ]}
          />
          <SidebarButton onClick={() => setIsOpen((prev) => !prev)}>
            <Icon
              size="16px"
              path={isOpen ? mdiChevronDoubleLeft : mdiChevronDoubleRight}
            />
          </SidebarButton>
        </SidebarContainer>
        <div className="w-full">{children}</div>
      </MainWrapper>
    </MainContainer>
  );
};
