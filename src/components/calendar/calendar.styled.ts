import { styled } from "styled-components";
import tw from "twin.macro";
import { ClassStatusType } from "./calendar.interface";

export const CalendarContainer = styled.div(
  tw`relative flex flex-col h-full py-8 px-14`
);
export const CalendarHeader = styled.div(
  tw`flex flex-row items-center justify-between pb-4 border-b`
);
export const HeaderTitle = styled.span(tw`font-bold text-3xl`);
export const HeaderButtonContainer = styled.div<{
  color: "primary" | "secondary";
}>`
  ${tw`flex flex-row items-center gap-0.5 cursor-pointer border rounded-full px-2 py-1`}
  ${({ color }) =>
    color === "primary"
      ? tw`text-violet-600 border-violet-600`
      : tw`text-red-600 border-red-600`}
`;
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
