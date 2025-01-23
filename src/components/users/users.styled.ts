import { styled } from "styled-components";
import tw from "twin.macro";

export const UserCardContainer = styled.div(
  tw`flex flex-row items-center justify-between px-4 py-3 border border-neutral-200 rounded-2xl bg-white w-[300px] cursor-pointer`
);
export const UserCardTitle = styled.span(
  tw`text-sm text-neutral-800 font-semibold`
);
export const UserCardSubtitle = styled.span(
  tw`text-xs text-neutral-500 italic`
);
export const UserCardButton = styled.button<{ isHover: boolean }>`
  ${tw`flex flex-row gap-1 border border-neutral-200 rounded-full text-xs px-2 py-1`}
  ${({ isHover }) => isHover && tw`bg-purple-100 text-violet-600`}
`;
