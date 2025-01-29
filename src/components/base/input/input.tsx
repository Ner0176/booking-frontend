import { CSSProperties, HTMLInputTypeAttribute } from "react";
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
  isDisabled,
  handleBlur,
  placeholder,
  handleChange,
  customStyles,
}: Readonly<{
  title: string;
  value: string;
  placeholder?: string;
  isDisabled?: boolean;
  tooltip?: ITooltipContent;
  customStyles?: CSSProperties;
  type?: HTMLInputTypeAttribute;
  handleBlur?: (value: string) => void;
  handleChange?: (value: string) => void;
}>) => {
  return (
    <InputFieldContainer>
      <InputTitleContainer>
        <InputFieldTitle>{title}</InputFieldTitle>
        {!!tooltip && <InfoTooltip content={tooltip} />}
      </InputTitleContainer>
      <CustomInput
        type={type}
        value={value}
        style={customStyles}
        disabled={isDisabled}
        isBlocked={isDisabled}
        placeholder={placeholder}
        className="focus:outline-none"
        onBlur={(e) => {
          if (handleBlur) handleBlur(e.target.value);
        }}
        onChange={(e) => {
          if (handleChange) handleChange(e.target.value);
        }}
      />
    </InputFieldContainer>
  );
};
