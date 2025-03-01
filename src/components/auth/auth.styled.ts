import { styled } from "styled-components";
import tw from "twin.macro";

export const AuthWrapper = styled.div(
  tw`flex flex-col gap-5 items-center justify-center w-full h-full px-4 sm:px-0`
);
export const ContentBox = styled.div(
  tw`flex flex-col gap-3 w-full sm:w-[80%] md:w-2/3 lg:w-1/2 xl:w-[40%] 2xl:w-1/3 p-6 bg-white border border-neutral-200 rounded-2xl shadow-lg`
);
