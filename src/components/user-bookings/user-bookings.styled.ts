import { styled } from "styled-components";
import tw from "twin.macro";

export const LostClassText = styled.span(
  tw`underline underline-offset-4 text-red-500 font-bold`
);
export const UBClassCardsContainer = styled.div<{ isCancelled?: boolean }>`
  ${tw`flex flex-col sm:flex-row gap-3 sm:gap-6 items-center w-full`}
  ${({ isCancelled }) =>
    isCancelled && tw`border border-[#DEE1E580] rounded-2xl p-4 shadow-sm`}
`;
export const UBClassCardWrapper = styled.div<{
  isFull?: boolean;
  isCancelled?: boolean;
}>`
  ${tw`relative flex flex-col gap-2 px-6 py-4 min-w-[275px] w-full sm:min-w-[350px] h-full sm:min-h-[150px] border rounded-xl`}
  ${({ isFull }) => isFull && tw`bg-yellow-50 border-yellow-100 shadow-md`}
  ${({ isCancelled }) => isCancelled && tw`bg-red-50 border-red-100`}
`;
export const StrongLinkTag = styled.span(
  tw`font-bold text-red-500 cursor-pointer underline underline-offset-2`
);
