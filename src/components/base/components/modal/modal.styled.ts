import tw from "twin.macro";
import { styled } from "styled-components";

export const ModalContainer = styled.div(
  tw`absolute inset-0 z-50 flex flex-row items-center justify-center w-full h-screen`
);
export const ModalBackground = styled.div(
  tw`absolute inset-0 z-40 bg-black opacity-50`
);
