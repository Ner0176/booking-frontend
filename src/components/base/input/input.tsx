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
import { isMobile } from "react-device-detect";
import { CustomMobileInput } from "./input.content";

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
  customSelectStyles,
  customContainerStyles,
}: Readonly<{
  title?: string;
  value: string;
  error?: string;
  icon?: IIconProps;
  placeholder?: string;
  isDisabled?: boolean;
  tooltip?: ITooltipContent;
  type?: HTMLInputTypeAttribute;
  customSelectStyles?: CSSProperties;
  handleBlur?: (value: string) => void;
  customContainerStyles?: CSSProperties;
  handleChange?: (value: string) => void;
}>) => {
  const isTimeInput = type === "time";
  const showMobileInput = isMobile && (isTimeInput || type === "date");

  return (
    <InputFieldContainer style={customContainerStyles}>
      {!!title && (
        <InputTitleContainer>
          <InputFieldTitle>{title}</InputFieldTitle>
          {!!tooltip && <InfoTooltip content={tooltip} />}
        </InputTitleContainer>
      )}
      {showMobileInput ? (
        <CustomMobileInput
          value={value}
          isTime={isTimeInput}
          handleChange={handleChange}
        />
      ) : (
        <CustomInputContainer
          hasIcon={!!icon}
          isBlocked={!!isDisabled}
          style={customSelectStyles}
        >
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
            autoComplete="email"
            value={value}
            hasIcon={!!icon}
            disabled={isDisabled}
            isBlocked={!!isDisabled}
            placeholder={placeholder}
            style={customSelectStyles}
            onBlur={(e) => {
              if (handleBlur) handleBlur(e.target.value);
            }}
            onChange={(e) => {
              if (handleChange) handleChange(e.target.value);
            }}
          />
        </CustomInputContainer>
      )}
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </InputFieldContainer>
  );
};
