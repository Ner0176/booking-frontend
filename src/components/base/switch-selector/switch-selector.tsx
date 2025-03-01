import { useSearchParamsManager } from "../../../hooks";
import {
  SwitchSelectorBox,
  SwitchSelectorOption,
} from "./switch-selector.styled";
import { ISwitchSelectorOption } from "./switch-selector.interface";
import { CSSProperties } from "react";

export const SwitchSelector = ({
  options,
  keyParam,
  customStyles,
}: Readonly<{
  keyParam: string;
  customStyles?: CSSProperties;
  options: ISwitchSelectorOption[];
}>) => {
  const { params, setParams } = useSearchParamsManager([keyParam]);

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
          isSelected={params.get(keyParam) === keyOption}
          onClick={() => setParams([{ key: keyParam, value: keyOption }])}
        >
          {text}
        </SwitchSelectorOption>
      ))}
    </SwitchSelectorBox>
  );
};
