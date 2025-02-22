import { styled } from "styled-components";
import tw from "twin.macro";

export const SelectContainer = styled.div(
  tw`flex flex-row items-center justify-between w-full rounded-xl border border-neutral-200`
);
export const StyledSelect = styled.select<{ fullWidth?: boolean }>`
  ${tw`py-2 px-4 text-sm  rounded-xl !outline-none appearance-none bg-white cursor-pointer`}
  ${({ fullWidth }) => fullWidth && tw`w-full`}
`;
