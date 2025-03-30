import tw from "twin.macro";
import { styled } from "styled-components";

export const MainContainer = styled.div(
  tw`w-full h-dvh sm:h-screen bg-white overflow-hidden`
);
export const CardContainer = styled.div<{ mainCard?: boolean }>`
  ${tw`flex flex-col gap-2 sm:gap-3 p-3.5 sm:p-4 w-full border border-neutral-200 rounded-2xl`}
  ${({ mainCard }) => mainCard && tw`h-fit gap-3 sm:gap-5 shadow-sm`}
`;
export const ErrorMessage = styled.span(
  tw`ml-3 sm:-mt-1 text-[10px] sm:text-xs text-red-500 font-semibold`
);
export const ErrorStrongContainer = styled.span(tw`font-bold text-red-500`);
