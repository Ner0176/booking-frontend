import { styled } from "styled-components";
import tw from "twin.macro";
import { ClassStatusType } from "./calendar.interface";

export const CalendarBody = styled.div(
  tw`flex flex-wrap justify-around gap-4 px-8 py-10 h-full`
);
export const CalendarItemContainer = styled.div`
  ${tw`flex flex-col gap-2 border rounded-xl px-6 py-4 min-w-[300px] h-min cursor-pointer`}
`;
export const ClassInfoRowContainer = styled.div<{
  status?: ClassStatusType;
}>`
  ${tw`flex flex-row items-center gap-1.5`}
  ${({ status }) => {
    switch (status) {
      case "done":
        return tw`text-green-500 font-semibold`;
      case "pending":
        return tw`text-yellow-500 font-semibold`;
      case "cancelled":
        return tw`text-red-500 font-semibold`;
    }
  }}
`;
export const CalendarFilterContainer = styled.div(
  tw`flex flex-col gap-1 w-fit`
);
export const CalendarFilterTitle = styled.span(tw`font-semibold text-xs`);
export const CalendarFiltersWrapper = styled.div(
  tw`flex flex-row items-center gap-3 justify-end w-full`
);
