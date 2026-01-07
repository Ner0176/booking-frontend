import { styled } from "styled-components";
import tw from "twin.macro";

export const UserCardContainer = styled.div(
  tw`flex flex-row items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border border-neutral-200 rounded-2xl bg-white w-full sm:w-[325px] cursor-pointer`
);
export const UserCardTitle = styled.span(
  tw`text-xs sm:text-sm text-neutral-800 font-semibold`
);
export const UserCardSubtitle = styled.span(tw`text-[10px] sm:text-xs italic`);
