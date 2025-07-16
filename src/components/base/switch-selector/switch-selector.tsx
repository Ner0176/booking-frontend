import {
  SwitchSelectorBox,
  SwitchSelectorOption,
} from "./switch-selector.styled";
import { ISwitchSelectorOption } from "./switch-selector.interface";
import { CSSProperties } from "react";

export const SwitchSelector = ({
  value,
  options,
  handleChange,
  customStyles,
}: Readonly<{
  value: string;
  customStyles?: CSSProperties;
  options: ISwitchSelectorOption[];
  handleChange: (value: string) => void;
}>) => {
  return (
    <SwitchSelectorBox
      style={{
        gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
      }}
    >
      {options.map(({ key: keyOption, text }) => (
        <SwitchSelectorOption
          key={keyOption}
          style={customStyles}
          isSelected={value === keyOption}
          onClick={() => handleChange(keyOption)}
        >
          {text}
        </SwitchSelectorOption>
      ))}
    </SwitchSelectorBox>
  );
};
