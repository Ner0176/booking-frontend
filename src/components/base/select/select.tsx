import Icon from "@mdi/react";
import { ISelectOptions } from "./select.interface";
import { SelectContainer, SelectWrapper, StyledSelect } from "./select.styled";
import { mdiChevronDown } from "@mdi/js";
import { CSSProperties } from "react";

export const CustomSelect = ({
  title,
  options,
  fullWidth,
  customStyles,
  handleChange,
  selectedValue,
}: Readonly<{
  title?: string;
  fullWidth?: boolean;
  selectedValue: string;
  options: ISelectOptions[];
  customStyles?: CSSProperties;
  handleChange: (v: string) => void;
}>) => {
  return (
    <SelectContainer fullWidth={fullWidth}>
      {!!title && (
        <span className="text-[10px] sm:text-xs font-semibold pl-1">
          {title}
        </span>
      )}
      <SelectWrapper style={customStyles}>
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
      </SelectWrapper>
    </SelectContainer>
  );
};
