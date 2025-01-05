import tw from "twin.macro";
import { styled } from "styled-components";

export const InputFieldContainer = styled.div(
  tw`flex flex-col gap-1.5 w-full max-w-[250px]`
);
export const InputTitleContainer = styled.div(
  tw`flex flex-row items-center gap-1.5`
);
export const InputFieldTitle = styled.span(tw`text-xs font-semibold pl-1`);
export const CustomInput = styled.input(
  tw`w-full px-4 py-2 rounded-xl border border-neutral-200 cursor-pointer`
);
