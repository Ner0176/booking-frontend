import { styled } from "styled-components";
import tw from "twin.macro";

export const CalendarContainer = styled.div(
  tw`flex flex-col h-full py-8 px-14`
);
export const CalendarHeader = styled.div(
  tw`flex flex-row items-center justify-between pb-4 border-b`
);
export const HeaderTitle = styled.span(tw`font-bold text-3xl`);
export const HeaderButtonContainer = styled.div(
  tw`flex flex-row items-center gap-0.5 cursor-pointer text-violet-600 border border-violet-600 rounded-full px-2 py-1`
);
export const CalendarBody = styled.div(
  tw`flex flex-wrap justify-around gap-4 px-8 py-10`
);
export const CalendarItemContainer = styled.div(
  tw`flex flex-col gap-2 border border-neutral-200 rounded-xl px-6 py-4 min-w-[300px] cursor-pointer`
);
