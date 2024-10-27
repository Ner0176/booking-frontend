import Icon from "@mdi/react";
import { useTranslation } from "react-i18next";
import {
  CustomInputField,
  EventTypeContainer,
  EventTypeTitle,
  InputFieldContainer,
  InputFieldTitle,
} from "./new-event.styled";
import { HTMLInputTypeAttribute } from "react";

export const EventTypeBox = ({
  type,
  icon,
  handleSelectType,
}: Readonly<{
  type: string;
  icon: string;
  handleSelectType: () => void;
}>) => {
  const { t } = useTranslation();
  return (
    <EventTypeContainer className="hover:shadow-lg" onClick={handleSelectType}>
      <EventTypeTitle>
        <Icon size="16px" style={{ marginTop: 4 }} path={icon} />
        <span className="text-center">{t(`Calendar.Event.${type}.Title`)}</span>
      </EventTypeTitle>
      <span className="text-sm">{t(`Calendar.Event.${type}.Description`)}</span>
    </EventTypeContainer>
  );
};

export const EventInputField = <T extends string | number>({
  type,
  titleKey,
  handleChange,
  selectedValue,
}: Readonly<{
  titleKey: string;
  selectedValue: T;
  handleChange: (v: T) => void;
  type: HTMLInputTypeAttribute;
}>) => {
  const { t } = useTranslation();
  return (
    <InputFieldContainer>
      <InputFieldTitle>
        {t(`Calendar.Event.Fields.${titleKey}`)}
      </InputFieldTitle>
      <CustomInputField
        type={type}
        value={selectedValue}
        onChange={(e) => {
          handleChange(e.target.value as T);
        }}
        className="focus:outline-none"
      />
    </InputFieldContainer>
  );
};
