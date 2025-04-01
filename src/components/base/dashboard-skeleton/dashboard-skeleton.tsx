import { CSSProperties, PropsWithChildren } from "react";
import {
  DashboardBody,
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
} from "./dashboard-skeleton.styled";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import { IGoBack } from "./dashboard-skeleton.interface";

export const DashboardSkeleton = ({
  title,
  goBack,
  children,
  rightHeader,
  customBodyStyles,
}: Readonly<
  PropsWithChildren<{
    title: string;
    goBack?: IGoBack;
    rightHeader?: JSX.Element;
    customBodyStyles?: CSSProperties;
  }>
>) => {
  const navigate = useNavigate();

  return (
    <DashboardContainer>
      <DashboardHeader>
        <div className="flex flex-row items-center gap-2 sm:gap-3">
          {!!goBack?.showButton && (
            <div
              className="cursor-pointer"
              onClick={() => navigate(goBack.path)}
            >
              <Icon
                path={mdiArrowLeft}
                className="size-5 sm:size-7 mt-0.5 sm:mt-1"
              />
            </div>
          )}
          <DashboardTitle>{title}</DashboardTitle>
        </div>
        {rightHeader}
      </DashboardHeader>
      <DashboardBody style={customBodyStyles}>{children}</DashboardBody>
    </DashboardContainer>
  );
};
