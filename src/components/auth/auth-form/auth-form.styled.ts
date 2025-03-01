import styled from "styled-components";
import tw from "twin.macro";

export const FormButton = styled.div(
  tw`w-full mt-1 px-4 py-2 text-sm sm:text-base text-center text-white bg-blue-700 rounded-xl cursor-pointer`
);
export const SeparatorContainer = styled.div(
  tw`absolute inset-0 flex items-center`
);
export const SeparatorLine = styled.div(tw`w-full border-t border-gray-300`);
export const SwitchFormButton = styled(FormButton)`
  ${tw`text-blue-700 bg-white shadow-md`}
`;
export const SignUpFieldsContainer = styled.div(
  tw`flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8`
);
export const ForgotPasswordText = styled.span(
  tw`w-full flex justify-end text-[10px] sm:text-xs cursor-pointer text-neutral-500`
);
