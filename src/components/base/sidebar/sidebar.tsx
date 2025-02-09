import Icon from "@mdi/react";
import { MainContainer } from "../styled-components";
import { MainWrapper, SidebarButton, SidebarContainer } from "./sidebar.styled";
import {
  mdiAccountCircleOutline,
  mdiAccountGroupOutline,
  mdiCalendar,
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiExitToApp,
  mdiHomeOutline,
} from "@mdi/js";
import { PropsWithChildren, useState } from "react";
import { SidebarOptions } from "./sidebar.content";
import { useLogout } from "../../../api";

export const Sidebar = ({ children }: Readonly<PropsWithChildren<{}>>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: logout } = useLogout();

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
                text: "users",
                icon: mdiAccountGroupOutline,
              },
            ]}
          />
          <SidebarOptions
            isExpanded={isOpen}
            items={[
              { text: "profile", icon: mdiAccountCircleOutline },
              {
                text: "signOut",
                onClick: logout,
                icon: mdiExitToApp,
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
