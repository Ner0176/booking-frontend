import Icon from "@mdi/react";
import { ISelectOptions } from "./select.interface";
import { SelectContainer, StyledSelect } from "./select.styled";
import { mdiChevronDown } from "@mdi/js";
import {
  InputFieldContainer,
  InputFieldTitle,
  InputTitleContainer,
} from "../input/input.styled";
import { CSSProperties } from "react";

export const CustomSelect = ({
  title,
  options,
  customStyles,
  handleChange,
  selectedValue,
}: Readonly<{
  title: string;
  selectedValue: string;
  options: ISelectOptions[];
  customStyles?: CSSProperties;
  handleChange: (v: string) => void;
}>) => {
  return (
    <InputFieldContainer>
      <InputTitleContainer>
        <InputFieldTitle>{title}</InputFieldTitle>
      </InputTitleContainer>
      <SelectContainer style={customStyles}>
        <StyledSelect
          value={selectedValue}
          onChange={(e) => handleChange(e.target.value)}
        >
          {options.map(({ key, text }, idx) => (
            <option key={idx} value={key}>
              {text}
            </option>
          ))}
        </StyledSelect>
        <Icon size="20px" className="mr-2" path={mdiChevronDown} />
      </SelectContainer>
    </InputFieldContainer>
  );
};
