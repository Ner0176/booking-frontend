import { PropsWithChildren } from "react";
import { MainContainer } from "../base";
import { AuthWrapper, ContentBox } from "./auth.styled";

export const AuthDashboard = ({
  title,
  children,
}: Readonly<PropsWithChildren<{ title: string }>>) => {
  return (
    <MainContainer>
      <AuthWrapper>
        <span className="font-bold text-3xl text-center">{title}</span>
        <ContentBox>{children}</ContentBox>
      </AuthWrapper>
    </MainContainer>
  );
};
