import Icon from "@mdi/react";
import { MainContainer } from "../styled-components";
import { MainWrapper, SidebarButton, SidebarContainer } from "./sidebar.styled";
import {
  mdiAccountGroupOutline,
  mdiCalendar,
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiExitToApp,
  mdiHomeOutline,
} from "@mdi/js";
import { PropsWithChildren, useState } from "react";
import { SidebarOptions } from "./sidebar.content";
import { useNavigate } from "react-router-dom";

export const Sidebar = ({ children }: Readonly<PropsWithChildren<{}>>) => {
  const navigate = useNavigate();

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
          <SidebarOptions
            isExpanded={isOpen}
            items={[
              {
                text: "signOut",
                icon: mdiExitToApp,
                onClick: () => {
                  navigate("/login");
                },
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
