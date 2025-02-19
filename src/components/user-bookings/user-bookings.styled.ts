import { styled } from "styled-components";
import tw from "twin.macro";

export const UBClassCardContainer = styled.div`
  ${tw`relative flex flex-col gap-2 px-6 py-4 min-w-[350px] min-h-[150px] border rounded-xl`}
`;
export const StrongLinkTag = styled.span(
  tw`font-bold text-red-500 cursor-pointer underline underline-offset-2`
);
