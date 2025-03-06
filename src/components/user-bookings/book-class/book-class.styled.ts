import { styled } from "styled-components";
import tw from "twin.macro";

export const BookModalInputWrapper = styled.div(
  tw`flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5`
);
export const FullClassText = styled.span(
  tw`absolute z-40 top-3 right-3 text-yellow-600 text-xs font-bold`
);
