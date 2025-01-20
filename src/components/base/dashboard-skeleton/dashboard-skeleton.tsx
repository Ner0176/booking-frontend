import { PropsWithChildren } from "react";
import {
  DashboardBody,
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
} from "./dashboard-skeleton.styled";

export const DashboardSkeleton = ({
  title,
  children,
  rightHeader,
}: Readonly<
  PropsWithChildren<{ title: string; rightHeader?: JSX.Element }>
>) => {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>{title}</DashboardTitle>
        {rightHeader}
      </DashboardHeader>
      <DashboardBody>{children}</DashboardBody>
    </DashboardContainer>
  );
};
