import tw from "twin.macro";
import { styled } from "styled-components";

export const MainContainer = styled.div(tw`w-full h-screen bg-neutral-50`);
export const ErrorMessage = styled.span(
  tw`ml-3 -mt-1 text-xs text-red-500 font-semibold`
);
