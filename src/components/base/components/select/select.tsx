import { ISelectOptions } from "./select.interface";
import { StyledSelect } from "./select.styled";

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
  );
};
