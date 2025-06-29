import tw from "twin.macro";
import { styled } from "styled-components";
import { isMobile } from "react-device-detect";
import { ClassStatusType } from "./class-management.interface";

export const ClassManagementBody = styled.div`
  ${tw`flex justify-start sm:justify-between gap-4 h-full overflow-y-auto`}
  ${isMobile ? tw`flex-col` : tw`flex-wrap`}
`;
export const CMCardContainer = styled.div`
  ${tw`flex flex-col gap-2 border rounded-xl px-4 xl:px-6 py-3 xl:py-4 w-full sm:w-fit sm:min-w-[350px] lg:min-w-[280px] xl:min-w-[350px] h-min cursor-pointer`}
`;
export const ClassInfoRowContainer = styled.div<{
  status?: ClassStatusType;
}>`
  ${tw`flex flex-row items-center gap-1.5 text-xs sm:text-sm xl:text-base`}
  ${({ status }) => {
    switch (status) {
      case "completed":
        return tw`text-green-500 font-semibold`;
      case "pending":
        return tw`text-yellow-500 font-semibold`;
      case "cancelled":
        return tw`text-red-500 font-semibold`;
      default:
        break;
    }
  }}
`;
