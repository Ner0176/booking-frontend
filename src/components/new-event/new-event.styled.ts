import { styled } from "styled-components";
import tw from "twin.macro";

export const EventContainer = styled.div(
  tw`flex flex-col w-1/2 h-2/3 py-10 px-16 border border-neutral-200 bg-white rounded-2xl`
);
export const EventTypesWrapper = styled.div(
  tw`flex flex-row gap-4 items-center justify-between h-full`
);
export const EventTypeContainer = styled.div`
  ${tw`flex flex-col gap-2 w-full border border-neutral-200 rounded-2xl py-3 px-6 cursor-pointer`}
`;
export const EventTypeTitle = styled.div(
  tw`flex flex-row items-center gap-1.5`
);
export const InputFieldsContainer = styled.div(
  tw`flex flex-col gap-4 w-full pt-5`
);
export const InputFieldsRow = styled.div(
  tw`flex flex-row items-center justify-center gap-10 w-full`
);
export const InputFieldContainer = styled.div(
  tw`flex flex-col gap-1.5 w-full max-w-[250px]`
);
export const InputFieldTitle = styled.span(tw`text-xs font-semibold pl-1`);
export const CustomInputField = styled.input(
  tw`w-full px-4 py-2 rounded-xl border border-neutral-200 cursor-pointer`
);
export const ButtonsContainer = styled.div(
  tw`flex justify-end items-center gap-4 w-full`
);
