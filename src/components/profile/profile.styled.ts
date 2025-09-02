import { styled } from "styled-components";
import tw from "twin.macro";

export const ProfileFieldsWrapper = styled.div<{ isAdmin: boolean }>`
  ${({ isAdmin }) => (isAdmin ? tw`col-span-3 xl:col-span-2` : tw`col-span-2`)}
`;
