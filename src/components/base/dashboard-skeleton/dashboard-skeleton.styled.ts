import { styled } from "styled-components";
import tw from "twin.macro";

export const DashboardContainer = styled.div(
  tw`relative flex flex-col h-full py-8 px-14`
);
export const DashboardHeader = styled.div(
  tw`flex flex-row items-center justify-between pb-4 border-b`
);
export const DashboardTitle = styled.span(
  tw`font-bold text-3xl whitespace-nowrap`
);
export const DashboardBody = styled.div(tw`flex flex-col gap-5 mt-4`);
export const DashboardHeaderButton = styled.div<{
  color: "primary" | "secondary";
}>`
  ${tw`flex flex-row items-center gap-0.5 cursor-pointer border rounded-full px-2 py-1`}
  ${({ color }) =>
    color === "primary"
      ? tw`text-violet-600 border-violet-600`
      : tw`text-red-600 border-red-600`}
`;
