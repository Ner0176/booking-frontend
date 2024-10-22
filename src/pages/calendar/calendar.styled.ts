import { styled } from "styled-components";
import tw from "twin.macro";

export const CalendarContainer = styled.div(
  tw`flex flex-col h-full items-center justify-center`
);
export const NewEventButton = styled.div(
  tw`px-4 py-2.5 w-min whitespace-nowrap border border-neutral-200 text-white bg-violet-600 rounded-full cursor-pointer`
);
