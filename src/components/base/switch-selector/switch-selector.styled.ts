import { styled } from "styled-components";
import tw from "twin.macro";

export const SwitchSelectorBox = styled.div(
  tw`grid justify-items-center bg-neutral-50 border border-neutral-200 rounded-xl w-full`
);
export const SwitchSelectorOption = styled.div<{ isSelected: boolean }>`
  ${tw`text-sm sm:text-base px-4 py-2 rounded-xl cursor-pointer w-full text-center whitespace-nowrap`}
  ${({ isSelected }) =>
    isSelected && tw`bg-white text-violet-600 font-semibold`}
`;
