import tw from "twin.macro";
import { styled } from "styled-components";
import { ColorType } from "./button.interface";

export const StyledButton = styled.div<{ color: ColorType }>`
  ${tw`px-4 py-2.5 w-min whitespace-nowrap border border-neutral-200 rounded-full cursor-pointer`}
  ${({ color }) =>
    color === "primary"
      ? tw`text-white bg-violet-600`
      : tw`text-violet-600 border-violet-600`}
`;
