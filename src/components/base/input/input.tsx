import { CSSProperties, HTMLInputTypeAttribute } from "react";
import { InfoTooltip, ITooltipContent } from "../info-tooltip";
import {
  CustomInput,
  CustomInputContainer,
  InputFieldContainer,
  InputFieldTitle,
  InputTitleContainer,
} from "./input.styled";
import { IIconProps } from "./input.interface";
import { ErrorMessage } from "../styled-components";

export const CustomInputField = ({
  type,
  icon,
  error,
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
  error?: string;
  icon?: IIconProps;
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
      <CustomInputContainer hasIcon={!!icon} isBlocked={!!isDisabled}>
        {!!icon && (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            onClick={icon.handleClick}
            className="size-4 sm:size-5 mt-0.5 text-neutral-500"
            style={{ cursor: !!icon.handleClick ? "pointer" : "auto" }}
          >
            <path d={icon.name} />
          </svg>
        )}
        <CustomInput
          type={type}
          value={value}
          hasIcon={!!icon}
          style={customStyles}
          disabled={isDisabled}
          isBlocked={!!isDisabled}
          placeholder={placeholder}
          onBlur={(e) => {
            if (handleBlur) handleBlur(e.target.value);
          }}
          onChange={(e) => {
            if (handleChange) handleChange(e.target.value);
          }}
        />
      </CustomInputContainer>
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </InputFieldContainer>
  );
};
