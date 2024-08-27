import styled from "styled-components";
import tw from "twin.macro";

export const AuthContainer = styled.div(tw`w-screen h-screen bg-neutral-50`);
export const AuthWrapper = styled.div(
  tw`flex flex-col gap-5 items-center justify-center w-full h-full`
);
export const ContentBox = styled.div(
  tw`flex flex-col gap-4 w-1/3 p-6 bg-white border border-neutral-200 rounded-2xl shadow-lg`
);
export const FieldContainer = styled.div(
  tw`flex flex-row items-center gap-2 px-3 border border-neutral-200 rounded-2xl`
);
export const StyledInput = styled.input(
  tw`w-full py-2 text-sm focus:outline-none focus:ring-0`
);
export const FieldIcon = styled.svg<{ showCursor: boolean }>`
  ${tw`w-5 h-5 text-neutral-500`}
  ${({ showCursor }) => showCursor && tw`cursor-pointer`}
`;
export const FormButton = styled.div(
  tw`w-full mt-1 px-4 py-2 text-center text-white bg-blue-700 rounded-xl cursor-pointer`
);
export const SeparatorContainer = styled.div(
  tw`absolute inset-0 flex items-center`
);
export const SeparatorLine = styled.div(tw`w-full border-t border-gray-300`);
export const SwitchFormButton = styled(FormButton)`
  ${tw`text-blue-700 bg-white shadow-md`}
`;
export const SignUpFieldsContainer = styled.div(
  tw`flex flex-row justify-between items-center gap-2`
);
