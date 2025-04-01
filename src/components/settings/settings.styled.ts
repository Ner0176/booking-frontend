import { styled } from "styled-components";
import tw from "twin.macro";

export const SettingsContainer = styled.div(
  tw`flex flex-col gap-4 border border-neutral-200 rounded-2xl w-full sm:max-w-[75%] p-4 sm:p-6 pt-4 shadow-sm`
);
export const SettingsEditContainer = styled.div(
  tw`flex flex-row items-center gap-1 text-neutral-500 cursor-pointer hover:text-violet-600 font-semibold`
);
