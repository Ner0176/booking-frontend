import tw from "twin.macro";
import { styled } from "styled-components";
import { View } from "react-big-calendar";

export const TodayButton = styled.button(
  tw`border border-neutral-200 py-2 px-4 cursor-pointer text-center rounded-xl w-min`
);
export const ToolbarArrowButton = styled.div(
  tw`bg-white p-1 rounded-full border border-neutral-200 cursor-pointer`
);
export const ToolbarButtonsBox = styled.div(
  tw`border border-neutral-200 rounded-xl w-fit overflow-hidden`
);
export const ToolbarBoxButton = styled.button<{ isActive: boolean }>`
  ${tw`border-r border-neutral-200 py-2 px-4 cursor-pointer text-center`}
  ${({ isActive }) =>
    isActive ? tw`bg-violet-50 text-violet-600 font-semibold` : tw`bg-white`}
`;

export const EventContainer = styled.div<{ view: View; isBooking: boolean }>`
  ${tw`w-full h-full rounded-lg text-white flex items-center justify-center`}
  ${({ view }) => view !== "month" && tw`absolute top-0 left-0`}
  ${({ isBooking }) => (isBooking ? tw`bg-red-500` : tw`bg-violet-600`)}
`;
