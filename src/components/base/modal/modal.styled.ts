import tw from "twin.macro";
import { styled } from "styled-components";
import { ModalType } from "./modal.interface";
import { isMobile } from "react-device-detect";

export const ModalContainer = styled.div`
  ${isMobile
    ? tw`fixed z-[60] bottom-0 left-0 w-full max-h-[90%]`
    : tw`fixed inset-0 z-[60] flex flex-row items-center justify-center w-full h-screen`}
`;
export const ModalWrapper = styled.div<{ type: ModalType }>`
  ${isMobile
    ? tw`flex flex-col gap-4 py-5 px-4 h-full rounded-t-2xl`
    : tw`flex flex-col gap-6 shadow-lg rounded-2xl w-1/2`}
  ${({ type }) => (type === "default" ? tw`bg-white` : tw`bg-red-50`)}
`;
export const ModalHeader = styled.span<{ type: ModalType }>`
  ${tw`flex flex-row items-center justify-between sm:pt-6 sm:mx-8`}
  ${({ type }) =>
    type === "delete" ? tw`text-red-500` : tw`border-b border-neutral-200 pb-3`}
`;
export const ModalFooter = styled.div<{ type: ModalType }>`
  ${tw`flex flex-row justify-end items-center gap-4 w-full sm:px-8`}
  ${({ type }) =>
    type === "default" && !isMobile
      ? tw`py-5 border-t border-neutral-200`
      : tw`sm:pb-6`}
`;
export const ModalBackground = styled.div(
  tw`fixed inset-0 z-50 bg-black opacity-50`
);
