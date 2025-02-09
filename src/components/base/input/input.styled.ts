import tw from "twin.macro";
import { styled } from "styled-components";

export const InputFieldContainer = styled.div(tw`flex flex-col gap-1.5 w-full`);
export const InputTitleContainer = styled.div(
  tw`flex flex-row items-center gap-1.5`
);
export const InputFieldTitle = styled.span(tw`text-xs font-semibold pl-1`);
export const CustomInputContainer = styled.div<{
  hasIcon: boolean;
  isBlocked?: boolean;
}>`
  ${tw`flex flex-row items-center gap-2 border border-neutral-200 rounded-xl overflow-hidden`}
  ${({ hasIcon }) => hasIcon && tw`px-3`}
  ${({ isBlocked }) =>
    isBlocked && tw`cursor-default bg-neutral-50 select-none`}
`;
export const CustomInput = styled.input<{
  hasIcon: boolean;
  isBlocked?: boolean;
}>`
  ${tw`text-sm w-full py-2 !outline-none`}
  ${({ hasIcon }) => !hasIcon && tw`px-3`}
  ${({ isBlocked }) => isBlocked && tw`!bg-neutral-50`}
`;
