import { styled } from "styled-components";
import tw from "twin.macro";

export const ClassContainer = styled.div(
  tw`flex flex-col w-1/2 h-2/3 pt-10 px-16 border border-neutral-200 bg-white rounded-2xl`
);
export const InputFieldsContainer = styled.div(
  tw`flex flex-col gap-6 w-full h-full`
);
export const InputFieldsRow = styled.div(
  tw`flex flex-row items-start justify-center gap-10 w-full`
);
export const ButtonsContainer = styled.div(
  tw`flex flex-row justify-end items-center gap-4 w-full`
);
