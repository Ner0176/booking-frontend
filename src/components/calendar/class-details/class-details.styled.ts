import tw from "twin.macro";
import { styled } from "styled-components";

export const FooterButtonsWrapper = styled.div(
  tw`flex flex-row items-center justify-end gap-3 w-full`
);

export const DeleteClassWrapper = styled.div<{ isRecurrent: boolean }>`
  ${tw`flex flex-col justify-between gap-6 px-8 py-6 bg-red-50 shadow-lg rounded-2xl`}
  ${({ isRecurrent }) => (isRecurrent ? tw`w-1/2` : tw`w-2/5`)}
`;
export const DeleteClassTitle = styled.span(
  tw`text-red-500 font-bold text-[28px]`
);
export const DeleteClassButtonsWrapper = styled.div(
  tw`flex flex-row items-center justify-end gap-2 w-full`
);
export const DeleteRecurrentWrapper = styled.div(
  tw`flex flex-row items-stretch justify-between gap-4 w-full`
);
export const DeleteRecurrentOption = styled.div<{ isSelected?: boolean }>`
  ${tw`flex items-center justify-center border bg-white rounded-2xl w-full cursor-pointer text-center py-4 px-6 shadow-sm`}
  ${({ isSelected }) =>
    !!isSelected ? tw`border-red-400` : tw`border-neutral-200`}
`;
