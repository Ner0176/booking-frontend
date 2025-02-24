import { useTranslation } from "react-i18next";
import { IButtonHeaderProps } from "./dashboard-skeleton.interface";
import Icon from "@mdi/react";
import { DashboardHeaderButton } from "./dashboard-skeleton.styled";

export const HeaderButton = ({
  props,
}: Readonly<{
  props: IButtonHeaderProps;
}>) => {
  const { t } = useTranslation();
  const { icon, tPath, color, onClick } = props;

  return (
    <DashboardHeaderButton
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      color={color ?? "primary"}
    >
      <Icon className="sm:mt-0.5 size-3 sm:size-3.5" path={icon} />
      <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
        {t(tPath)}
      </span>
    </DashboardHeaderButton>
  );
};
