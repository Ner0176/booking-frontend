import Icon from "@mdi/react";
import { SidebarBox } from "./sidebar.styled";
import { ISidebarItem } from "./sidebar.interface";

export const SidebarOptions = ({
  items,
  isExpanded,
}: Readonly<{ items: ISidebarItem[]; isExpanded: boolean }>) => {
  return (
    <>
      {items.map(({ icon, text, isSelected }, idx) => (
        <SidebarBox key={idx} isSelected={isSelected} isExpanded={isExpanded}>
          <Icon size="24px" path={icon} />
          {isExpanded && <span>{text}</span>}
        </SidebarBox>
      ))}
    </>
  );
};
