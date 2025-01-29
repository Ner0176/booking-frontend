import tw from "twin.macro";
import { styled } from "styled-components";

export const MainContainer = styled.div(tw`w-full h-screen bg-white`);
export const ErrorMessage = styled.span(
  tw`ml-3 -mt-1 text-xs text-red-500 font-semibold`
);
export const ErrorStrongContainer = styled.span(tw`font-bold text-red-500`);
