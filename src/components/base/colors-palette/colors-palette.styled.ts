import tw from "twin.macro";
import { styled } from "styled-components";

export const ColorItem = styled.div<{ isSelected: boolean }>`
  ${tw`border-[1.5px] border-neutral-200 size-6 sm:size-4 xl:size-5 cursor-pointer`}
  ${({ isSelected }) => isSelected && tw`border-2 border-neutral-500`}
`;
