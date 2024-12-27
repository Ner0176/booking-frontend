import { ReactNode } from "react";
import { ModalBackground, ModalContainer } from "./modal.styled";

export const Modal = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <ModalContainer>{children}</ModalContainer>
      <ModalBackground />
    </>
  );
};
