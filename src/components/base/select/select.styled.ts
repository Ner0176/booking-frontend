import { styled } from "styled-components";
import tw from "twin.macro";

export const SelectContainer = styled.div(
  tw`flex flex-row items-center justify-between w-full rounded-xl border border-neutral-200`
);
export const StyledSelect = styled.select(
  tw`py-2 px-4 text-sm w-full rounded-xl !outline-none appearance-none bg-white cursor-pointer`
);
