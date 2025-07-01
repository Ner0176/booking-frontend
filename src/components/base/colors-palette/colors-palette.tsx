import { Dispatch, Fragment, SetStateAction } from "react";
import { COLORS } from "./colors-palette.interface";
import { ColorItem } from "./colors-palette.styled";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";

export const ColorsPalette = ({
  setColor,
  selectedColor,
}: Readonly<{
  selectedColor: string;
  setColor: Dispatch<SetStateAction<string>>;
}>) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-6 justify-items-center gap-3">
      {Object.entries(COLORS).map(([key, value]) => (
        <Fragment>
          {!isMobile && (
            <Tooltip id={key} content={t(`Base.Colors.${value}`)} />
          )}
          <ColorItem
            key={key}
            data-tooltip-id={key}
            onClick={() => setColor(key)}
            style={{ backgroundColor: key }}
            isSelected={selectedColor === key}
          />
        </Fragment>
      ))}
    </div>
  );
};
