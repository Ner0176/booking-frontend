import { PropsWithChildren } from "react";
import {
  ModalBackground,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "./modal.styled";
import { useClickOutside } from "../../../hooks";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { ModalType } from "./modal.interface";

export const Modal = ({
  title,
  width,
  footer,
  children,
  handleClose,
  type = "default",
}: Readonly<
  PropsWithChildren<{
    width?: string;
    type?: ModalType;
    footer?: JSX.Element;
    handleClose(): void;
    title: string | JSX.Element;
  }>
>) => {
  const ref = useClickOutside(handleClose);

  return (
    <>
      <ModalContainer>
        <ModalWrapper ref={ref} type={type} style={{ width }}>
          <ModalHeader type={type}>
            {typeof title === "string" ? (
              <span className="text-xl sm:text-2xl font-bold">{title}</span>
            ) : (
              title
            )}
            <div onClick={handleClose} className="cursor-pointer">
              <Icon
                path={mdiClose}
                className="size-5 sm:size-6 text-neutral-400"
              />
            </div>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          {footer && <ModalFooter type={type}>{footer}</ModalFooter>}
        </ModalWrapper>
      </ModalContainer>
      <ModalBackground />
    </>
  );
};
