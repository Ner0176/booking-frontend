import { mdiHelpCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { PlacesType, Tooltip } from "react-tooltip";
import { ITooltipContent } from "./info-tooltip.interface";

export const InfoTooltip = ({
  content,
  size = 14,
  place = "top",
}: Readonly<{
  content: ITooltipContent;
  size?: number;
  place?: PlacesType;
}>) => {
  const { id, text } = content;
  return (
    <>
      <Icon
        size={`${size}px`}
        data-tooltip-id={id}
        path={mdiHelpCircleOutline}
        className="cursor-pointer outline-none"
      />
      <Tooltip id={id} content={text} place={place} />
    </>
  );
};
