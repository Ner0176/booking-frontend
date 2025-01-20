import Icon from "@mdi/react";
import { ISelectOptions } from "./select.interface";
import { SelectContainer, StyledSelect } from "./select.styled";
import { mdiChevronDown } from "@mdi/js";

export const CustomSelect = ({
  options,
  handleChange,
  selectedValue,
}: Readonly<{
  selectedValue: string;
  options: ISelectOptions[];
  handleChange: (v: string) => void;
}>) => {
  return (
    <SelectContainer>
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
  );
};
