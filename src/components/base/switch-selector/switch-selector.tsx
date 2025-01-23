import { useTranslation } from "react-i18next";
import { useSearchParamsManager } from "../../../hooks";
import {
  SwitchSelectorBox,
  SwitchSelectorOption,
} from "./switch-selector.styled";
import { ISwitchSelectorOption } from "./switch-selector.interface";

export const SwitchSelector = ({
  options,
  keyParam,
}: Readonly<{ keyParam: string; options: ISwitchSelectorOption[] }>) => {
  const { t } = useTranslation();
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
          isSelected={params.get(keyParam) === keyOption}
          onClick={() => setParams([{ key: keyParam, value: keyOption }])}
        >
          {t(`${text}`)}
        </SwitchSelectorOption>
      ))}
    </SwitchSelectorBox>
  );
};
