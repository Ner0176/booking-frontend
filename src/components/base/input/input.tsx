import { HTMLInputTypeAttribute, PropsWithChildren } from "react";
import { InfoTooltip, ITooltipContent } from "../info-tooltip";
import {
  CustomInput,
  InputFieldContainer,
  InputFieldTitle,
  InputTitleContainer,
} from "./input.styled";

export const CustomInputField = ({
  type,
  value,
  title,
  tooltip,
  children,
  handleBlur,
  handleChange,
}: Readonly<
  PropsWithChildren<{
    title: string;
    value?: string;
    tooltip?: ITooltipContent;
    type?: HTMLInputTypeAttribute;
    handleBlur?: (value: string) => void;
    handleChange?: (value: string) => void;
  }>
>) => {
  return (
    <InputFieldContainer>
      <InputTitleContainer>
        <InputFieldTitle>{title}</InputFieldTitle>
        {!!tooltip && (
          <InfoTooltip
            content={{
              id: tooltip.id,
              text: tooltip.text,
            }}
          />
        )}
      </InputTitleContainer>
      {!!handleChange ? (
        <CustomInput
          type={type}
          value={value}
          className="focus:outline-none"
          onBlur={(e) => {
            if (handleBlur) handleBlur(e.target.value);
          }}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : (
        children
      )}
    </InputFieldContainer>
  );
};
