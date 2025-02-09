import styled from "styled-components";
import tw from "twin.macro";

export const AuthWrapper = styled.div(
  tw`flex flex-col gap-5 items-center justify-center w-full h-full`
);
export const ContentBox = styled.div(
  tw`flex flex-col gap-4 w-[80%] md:w-2/3 lg:w-1/2 xl:w-[40%] 2xl:w-1/3 p-6 bg-white border border-neutral-200 rounded-2xl shadow-lg`
);
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
  tw`flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8`
);
