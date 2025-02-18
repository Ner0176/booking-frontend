import Icon from "@mdi/react";
import { MainContainer } from "../styled-components";
import { MainWrapper, SidebarButton, SidebarContainer } from "./sidebar.styled";
import {
  mdiAccountCircleOutline,
  mdiAccountGroupOutline,
  mdiCalendar,
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiCogOutline,
  mdiExitToApp,
  mdiHomeOutline,
  mdiInformationOutline,
} from "@mdi/js";
import { PropsWithChildren, useState } from "react";
import { SidebarOptions } from "./sidebar.content";
import { useLogout } from "../../../api";
import { ISidebarItem } from "./sidebar.interface";

const TOP_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    text: "home",
    icon: mdiHomeOutline,
  },
  {
    view: "admin",
    text: "classes",
    icon: mdiCalendar,
  },
  { text: "myClasses", view: "user", icon: mdiCalendar },
  {
    text: "users",
    view: "admin",
    icon: mdiAccountGroupOutline,
  },
];

const BOTTOM_SIDEBAR_ITEMS: ISidebarItem[] = [
  { text: "policies", icon: mdiInformationOutline },
  { text: "settings", view: "admin", icon: mdiCogOutline },
  { text: "profile", icon: mdiAccountCircleOutline },
];

export const Sidebar = ({ children }: Readonly<PropsWithChildren<{}>>) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: logout } = useLogout();

  return (
    <MainContainer>
      <MainWrapper>
        <SidebarContainer isExpanded={isOpen}>
          <SidebarOptions isExpanded={isOpen} items={TOP_SIDEBAR_ITEMS} />
          <SidebarOptions
            isExpanded={isOpen}
            items={[
              ...BOTTOM_SIDEBAR_ITEMS,
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
        <div className="w-full h-full">{children}</div>
      </MainWrapper>
    </MainContainer>
  );
};
