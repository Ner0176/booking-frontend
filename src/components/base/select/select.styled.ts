import { styled } from "styled-components";
import tw from "twin.macro";

export const SelectContainer = styled.div<{ fullWidth?: boolean }>`
  ${tw`flex flex-col gap-0.5 sm:gap-1.5 flex-shrink-0`}
  ${({ fullWidth }) => fullWidth && tw`w-full`}
`;
export const SelectWrapper = styled.div(
  tw`flex flex-row items-center justify-between w-fit sm:w-full rounded-xl border border-neutral-200`
);
export const StyledSelect = styled.select`
  ${tw`py-2 px-2.5 sm:px-4 text-xs sm:text-sm rounded-xl !outline-none appearance-none bg-white cursor-pointer w-full`}
`;
