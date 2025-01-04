import { styled } from "styled-components";
import tw from "twin.macro";

export const CalendarContainer = styled.div(
  tw`relative flex flex-col h-full py-8 px-14`
);
export const CalendarHeader = styled.div(
  tw`flex flex-row items-center justify-between pb-4 border-b`
);
export const HeaderTitle = styled.span(tw`font-bold text-3xl`);
export const HeaderButtonContainer = styled.div(
  tw`flex flex-row items-center gap-0.5 cursor-pointer text-violet-600 border border-violet-600 rounded-full px-2 py-1`
);
export const CalendarBody = styled.div(
  tw`flex flex-wrap justify-around gap-4 px-8 py-10 h-full`
);
export const CalendarItemContainer = styled.div(
  tw`flex flex-col gap-2 border border-neutral-200 rounded-xl px-6 py-4 min-w-[300px] h-min cursor-pointer`
);
export const DeleteClassWrapper = styled.div<{ isRecurrent: boolean }>`
  ${tw`flex flex-col justify-between gap-6 px-8 py-6 bg-red-50 shadow-lg rounded-2xl`}
  ${({ isRecurrent }) => (isRecurrent ? tw`w-1/2` : tw`w-2/5`)}
`;
export const DeleteClassTitle = styled.span(
  tw`text-red-500 font-bold text-[28px]`
);
export const DeleteClassButtonsWrapper = styled.div(
  tw`flex flex-row items-center justify-end gap-2 w-full`
);
export const DeleteRecurrentWrapper = styled.div(
  tw`flex flex-row items-stretch justify-between gap-4 w-full`
);
export const DeleteRecurrentOption = styled.div<{ isSelected?: boolean }>`
  ${tw`flex items-center justify-center border bg-white rounded-2xl w-full cursor-pointer text-center py-4 px-6 shadow-sm`}
  ${({ isSelected }) =>
    !!isSelected ? tw`border-red-400` : tw`border-neutral-200`}
`;
