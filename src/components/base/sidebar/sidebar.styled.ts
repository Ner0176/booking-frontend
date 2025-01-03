import { styled } from "styled-components";
import tw from "twin.macro";

export const MainWrapper = styled.div(tw`flex h-full w-full`);
export const SidebarContainer = styled.div<{ isExpanded: boolean }>`
  ${tw`relative flex flex-col justify-between h-full py-8 border-r border-neutral-200 bg-neutral-50`};
  ${({ isExpanded }) => (isExpanded ? tw`w-[15%]` : tw`w-[5%]`)};
  transition: width 0.3s ease-in-out;
`;
export const SidebarItemBox = styled.div<{ isExpanded?: boolean }>`
  ${tw`flex flex-col items-center gap-6 w-full`}
  ${({ isExpanded }) => isExpanded && tw`px-4`}
`;
export const SidebarButton = styled.div(
  tw`absolute z-50 top-1/2 -right-4 p-2 rounded-full border border-neutral-200 bg-neutral-50 cursor-pointer`
);
export const SidebarBox = styled.div<{
  isSelected?: boolean;
  isExpanded?: boolean;
}>`
  ${tw`flex flex-row items-center gap-3 p-2.5 rounded-xl cursor-pointer`}
  ${({ isExpanded }) => isExpanded && tw`w-full`}
  ${({ isSelected }) => isSelected && tw`text-violet-600 bg-violet-50`}
`;
