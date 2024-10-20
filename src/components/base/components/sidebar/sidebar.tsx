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

export const Sidebar = ({ children }: Readonly<PropsWithChildren<{}>>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <MainContainer>
      <MainWrapper>
        <SidebarContainer isExpanded={isOpen}>
          <SidebarOptions
            isExpanded={isOpen}
            items={[
              {
                text: "home",
                icon: mdiHomeOutline,
              },
              {
                text: "calendar",
                icon: mdiCalendar,
              },
              {
                text: "customers",
                icon: mdiAccountGroupOutline,
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
