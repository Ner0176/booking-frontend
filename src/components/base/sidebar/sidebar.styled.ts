import { styled } from "styled-components";
import tw from "twin.macro";

export const MainWrapper = styled.div(tw`flex h-full w-full`);
export const SidebarContainer = styled.div<{ isExpanded: boolean }>`
  ${tw`relative flex flex-col gap-6 items-center pt-8 border-r border-neutral-200 bg-white`};
  ${({ isExpanded }) => (isExpanded ? tw`w-[15%] px-4` : tw`w-[5%]`)};
  transition: width 0.3s ease-in-out;
`;
export const SidebarButton = styled.div(
  tw`absolute z-10 top-1/2 -right-4 p-2 rounded-full border border-neutral-200 bg-white cursor-pointer`
);
export const SidebarBox = styled.div<{
  isSelected?: boolean;
  isExpanded?: boolean;
}>`
  ${tw`flex flex-row items-center gap-3 p-2.5 rounded-xl cursor-pointer`}
  ${({ isExpanded }) => isExpanded && tw`w-full`}
  ${({ isSelected }) => isSelected && tw`text-violet-600 bg-violet-50`}
`;
