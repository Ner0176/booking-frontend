import { styled } from "styled-components";
import tw from "twin.macro";

export const MainWrapper = styled.div(tw`flex h-full w-full`);
export const SidebarContainer = styled.div<{ isExpanded: boolean }>`
  ${tw`relative flex flex-col justify-between h-full py-5 lg:py-6 xl:py-8 border-r border-neutral-200 bg-neutral-50`};
  ${({ isExpanded }) => (isExpanded ? tw`w-[15%]` : tw`w-[5%]`)};
  transition: width 0.3s ease-in-out;
`;
export const SidebarItemBox = styled.div<{ isExpanded?: boolean }>`
  ${tw`flex flex-col items-center gap-2.5 lg:gap-3 xl:gap-4 w-full`}
  ${({ isExpanded }) => isExpanded && tw`px-4`}
`;
export const SidebarButton = styled.div(
  tw`absolute z-50 top-1/2 -right-4 p-2 rounded-full border border-neutral-200 bg-neutral-50 cursor-pointer`
);
export const SidebarBox = styled.div<{
  hide?: boolean;
  isSelected?: boolean;
  isExpanded?: boolean;
}>`
  ${tw`flex flex-row items-center gap-2 xl:gap-2.5 p-2 sm:p-1.5 lg:p-2 xl:p-2.5 rounded-xl cursor-pointer`}
  ${({ hide }) => hide && tw`hidden`}
  ${({ isExpanded }) => isExpanded && tw`w-full`}
  ${({ isSelected }) => isSelected && tw`text-violet-600 bg-violet-50`}
`;

export const MobileSidebarMenu = styled.div(
  tw`fixed bottom-0 z-40 w-full h-[50px] flex flex-row items-center justify-evenly gap-3 bg-white border-t border-neutral-200 cursor-pointer`
);
