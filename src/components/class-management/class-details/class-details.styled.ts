import tw from "twin.macro";
import styled from "styled-components";

export const DeleteRecurrentWrapper = styled.div(
  tw`flex flex-row items-stretch justify-between gap-4 w-full`
);
export const DeleteRecurrentOption = styled.div<{ isSelected?: boolean }>`
  ${tw`flex items-center justify-center border bg-white rounded-2xl w-full cursor-pointer text-center py-4 px-6 shadow-sm`}
  ${({ isSelected }) =>
    !!isSelected ? tw`border-red-400` : tw`border-neutral-200`}
`;
export const AttendeesListWrapper = styled.div(
  tw`col-span-2 flex flex-col gap-3 pt-4`
);
export const EditAttendeesButton = styled.button(
  tw`flex flex-row items-center gap-0.5 px-3 py-2 text-violet-600 rounded-xl border border-violet-600 cursor-pointer`
);
export const ClassDetailsWrapper = styled.div(
  tw`flex flex-col gap-3 h-full border-l border-neutral-200 pt-4`
);
export const ClassCardContainer = styled.div(
  tw`flex flex-col gap-3 rounded-2xl border border-neutral-200 p-4`
);
