import tw from "twin.macro";
import { styled } from "styled-components";

export const DeleteModalWrapper = styled.div(
  tw`flex flex-col justify-between gap-6 px-8 py-6 bg-red-50 shadow-lg rounded-2xl w-1/2`
);
export const DeleteModalTitle = styled.span(
  tw`text-red-500 font-bold text-[28px]`
);
export const DeleteModalFooter = styled.div(
  tw`flex flex-row items-center justify-end gap-2 w-full`
);
