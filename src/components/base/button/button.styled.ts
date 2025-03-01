import tw from "twin.macro";
import { styled } from "styled-components";
import { ButtonType, ColorType } from "./button.interface";

const getButtonStyles = (type: ButtonType, color: ColorType) => {
  if (type === "default") {
    return color === "primary"
      ? tw`text-white bg-violet-600`
      : tw`bg-white text-violet-600 border-violet-600`;
  } else {
    return color === "primary"
      ? tw`text-white bg-red-500`
      : tw`bg-white text-red-500 border-red-500`;
  }
};

export const StyledButton = styled.div<{
  color: ColorType;
  type: ButtonType;
  isDisabled?: boolean;
}>`
  ${tw`flex items-center justify-center text-sm sm:text-base px-4 py-2.5 w-min sm:min-w-[100px] sm:min-h-[45px] whitespace-nowrap border border-neutral-200 rounded-full cursor-pointer`}
  ${({ type, color }) => getButtonStyles(type, color)}
  ${({ isDisabled }) =>
    isDisabled && tw`cursor-not-allowed bg-neutral-50 text-neutral-300`}
`;
