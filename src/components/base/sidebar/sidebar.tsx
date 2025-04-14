import Icon from "@mdi/react";
import { MainContainer } from "../styled-components";
import {
  MainWrapper,
  SidebarButton,
  SidebarContainer,
  SidebarItemBox,
} from "./sidebar.styled";
import {
  mdiAccountCircleOutline,
  mdiAccountGroupOutline,
  mdiBookmarkOutline,
  mdiCalendar,
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiCogOutline,
  mdiExitToApp,
  mdiInformationOutline,
  mdiTableCog,
} from "@mdi/js";
import { PropsWithChildren, useState } from "react";
import { SidebarOptions } from "./sidebar.content";
import { ISidebarItem } from "./sidebar.interface";
import { useNavigate } from "react-router-dom";

const TOP_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    text: "calendar",
    icon: mdiCalendar,
  },
  {
    view: "admin",
    icon: mdiTableCog,
    text: "management",
  },
  {
    view: "user",
    text: "bookings",
    icon: mdiBookmarkOutline,
  },
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
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainContainer>
      <MainWrapper>
        <SidebarContainer isExpanded={isOpen}>
          <SidebarItemBox isExpanded={isOpen}>
            <SidebarOptions isExpanded={isOpen} items={TOP_SIDEBAR_ITEMS} />
          </SidebarItemBox>
          <SidebarItemBox isExpanded={isOpen}>
            <SidebarOptions
              isExpanded={isOpen}
              items={[
                ...BOTTOM_SIDEBAR_ITEMS,
                {
                  text: "signOut",
                  icon: mdiExitToApp,
                  onClick: () => {
                    localStorage.clear();
                    navigate("/");
                  },
                },
              ]}
            />
          </SidebarItemBox>
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

export const MobileSidebar = ({
  children,
}: Readonly<PropsWithChildren<{}>>) => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <div className="relative flex flex-col h-full w-full">
        <div className="w-full h-[90%]">{children}</div>
        <div className="fixed bottom-0 z-40 w-full h-[50px] flex flex-row items-center justify-evenly gap-3 bg-white border-t border-neutral-200 cursor-pointer">
          <SidebarOptions
            isExpanded={false}
            items={[
              ...TOP_SIDEBAR_ITEMS.slice(1),
              ...BOTTOM_SIDEBAR_ITEMS,
              ...[
                {
                  text: "signOut",
                  icon: mdiExitToApp,
                  onClick: () => {
                    localStorage.clear();
                    navigate("/");
                  },
                },
              ],
            ]}
          />
        </div>
      </div>
    </MainContainer>
  );
};
