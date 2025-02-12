import { styled } from "styled-components";
import tw from "twin.macro";
import { ClassStatusType } from "./classes.interface";

export const CalendarBody = styled.div(
  tw`flex flex-wrap justify-between gap-4 px-8 h-full overflow-y-auto`
);
export const CalendarItemContainer = styled.div`
  ${tw`flex flex-col gap-2 border rounded-xl px-6 py-4 min-w-[350px] h-min cursor-pointer`}
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
