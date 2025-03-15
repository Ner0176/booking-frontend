import tw from "twin.macro";
import { styled } from "styled-components";

export const MainContainer = styled.div(
  tw`w-full h-dvh sm:h-screen bg-white overflow-hidden`
);
export const ErrorMessage = styled.span(
  tw`ml-3 sm:-mt-1 text-[10px] sm:text-xs text-red-500 font-semibold`
);
export const ErrorStrongContainer = styled.span(tw`font-bold text-red-500`);
