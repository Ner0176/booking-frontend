import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import { DashboardHeaderButton } from "./dashboard-skeleton.styled";

export const HeaderButton = ({
  icon,
  tPath,
  onClick,
  size = "default",
  color = "primary",
}: Readonly<{
  icon: string;
  tPath: string;
  onClick(): void;
  size?: "small" | "default";
  color?: "primary" | "secondary";
}>) => {
  const { t } = useTranslation();

  return size === "small" ? (
    <div onClick={onClick} className="cursor-pointer">
      <Icon
        path={icon}
        className="size-5"
        style={{ color: color === "primary" ? "#7C3AEDFF" : "#DC2626FF" }}
      />
    </div>
  ) : (
    <DashboardHeaderButton
      color={color}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Icon className="sm:mt-0.5 size-2.5 sm:size-3.5" path={icon} />
      <span className="text-[10px] sm:text-sm font-semibold whitespace-nowrap">
        {t(tPath)}
      </span>
    </DashboardHeaderButton>
  );
};
