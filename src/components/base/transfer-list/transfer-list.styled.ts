import { styled } from "styled-components";
import tw from "twin.macro";

export const TFIconContainer = styled.div(
  tw`border border-neutral-200 bg-neutral-50 rounded-full p-2 sm:p-2.5 h-min`
);
export const TFColumnWrapper = styled.div(
  tw`flex flex-col gap-3 sm:px-2 w-full max-h-[275px] overflow-y-auto`
);
export const TFItemContainer = styled.div<{ isSelected?: boolean }>`
  ${tw`text-xs sm:text-sm lg:text-base cursor-pointer rounded-lg px-1.5 sm:px-4 py-2 border text-center shadow-sm`}
  ${({ isSelected }) =>
    isSelected
      ? tw`border-purple-200 bg-purple-50 text-violet-600 font-semibold`
      : tw`border-neutral-200`}
`;
