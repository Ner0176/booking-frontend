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
      <Icon size="14px" className="mt-0.5" path={icon} />
      <span className="text-sm font-semibold whitespace-nowrap">
        {t(tPath)}
      </span>
    </DashboardHeaderButton>
  );
};
