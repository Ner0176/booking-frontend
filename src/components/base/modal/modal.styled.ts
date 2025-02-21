import tw from "twin.macro";
import { styled } from "styled-components";
import { ModalType } from "./modal.interface";

export const ModalContainer = styled.div(
  tw`absolute inset-0 z-50 flex flex-row items-center justify-center w-full h-screen`
);
export const ModalWrapper = styled.div<{ type: ModalType }>`
  ${tw`flex flex-col gap-6 shadow-lg rounded-2xl w-1/2`}
  ${({ type }) => (type === "default" ? tw`bg-white` : tw`bg-red-50`)}
`;
export const ModalHeader = styled.span<{ type: ModalType }>`
  ${tw`flex flex-row items-center justify-between pt-6 mx-8`}
  ${({ type }) =>
    type === "delete" ? tw`text-red-500` : tw`border-b border-neutral-200 pb-3`}
`;
export const ModalFooter = styled.div<{ type: ModalType }>`
  ${tw`flex flex-row justify-end items-center gap-4 w-full px-8`}
  ${({ type }) =>
    type === "default" ? tw`py-5 border-t border-neutral-200` : tw`pb-6`}
`;
export const ModalBackground = styled.div(
  tw`absolute inset-0 z-40 bg-black opacity-50`
);
