import tw from "twin.macro";
import { styled } from "styled-components";

export const FooterButtonsWrapper = styled.div(
  tw`flex flex-row items-center justify-end gap-3 w-full`
);
export const DeleteRecurrentWrapper = styled.div(
  tw`flex flex-row items-stretch justify-between gap-4 w-full`
);
export const DeleteRecurrentOption = styled.div<{ isSelected?: boolean }>`
  ${tw`flex items-center justify-center border bg-white rounded-2xl w-full cursor-pointer text-center py-4 px-6 shadow-sm`}
  ${({ isSelected }) =>
    !!isSelected ? tw`border-red-400` : tw`border-neutral-200`}
`;

export const SwListTitle = styled.span(tw`font-bold text-xl text-center`);
export const SwListContainer = styled.div(
  tw`flex flex-1 flex-col justify-start gap-4 text-center w-full h-full`
);
export const SwListWrapper = styled.div(
  tw`flex flex-col gap-3 px-2 max-h-[350px] overflow-y-auto`
);
export const ListItemContainer = styled.div(
  tw`cursor-pointer rounded-lg border border-neutral-200 px-4 py-2 text-center`
);
export const SwIconContainer = styled.div(
  tw`border border-neutral-200 bg-neutral-50 rounded-full p-2.5 h-min`
);
