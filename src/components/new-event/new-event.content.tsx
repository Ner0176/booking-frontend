import Icon from "@mdi/react";
import { useTranslation } from "react-i18next";
import {
  CustomInputField,
  EventTypeContainer,
  EventTypeTitle,
  InputFieldContainer,
  InputFieldsRow,
  InputFieldTitle,
  InputTitleContainer,
} from "./new-event.styled";
import { Dispatch, Fragment, SetStateAction } from "react";
import { CustomSelect, ErrorMessage, InfoTooltip } from "../base";
import { DayOfWeek, IEventFields, IRowConfig } from "./new-event.interface";
import { handleCheckField } from "./new-event.utils";

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
  const basePath = `Calendar.Event.${type}`;
  return (
    <EventTypeContainer className="hover:shadow-lg" onClick={handleSelectType}>
      <EventTypeTitle>
        <Icon size="16px" style={{ marginTop: 4 }} path={icon} />
        <span className="text-center">{t(`${basePath}.Title`)}</span>
      </EventTypeTitle>
      <span className="text-sm">{t(`${basePath}.Description`)}</span>
    </EventTypeContainer>
  );
};

const FieldRows = ({
  fields,
  configs,
  children,
  setFields,
}: Readonly<{
  fields: IEventFields;
  configs: IRowConfig[];
  children?: JSX.Element;
  setFields: Dispatch<SetStateAction<IEventFields>>;
}>) => {
  const { t } = useTranslation();

  return (
    <InputFieldsRow>
      {configs.map(({ type, accessor, hasTooltip }, idx) => {
        const fieldError = fields[accessor].error;
        return (
          <InputFieldContainer key={idx}>
            <InputTitleContainer>
              <InputFieldTitle>
                {t(`Calendar.Event.Fields.${accessor}`)}
              </InputFieldTitle>
              {hasTooltip && (
                <InfoTooltip
                  content={{
                    id: `tooltip-${accessor}`,
                    text: t(`Calendar.Event.Fields.Tooltip.${accessor}`),
                  }}
                />
              )}
            </InputTitleContainer>
            <CustomInputField
              type={type}
              className="focus:outline-none"
              value={fields[accessor].value as string}
              onChange={(e) => {
                setFields((prev) => {
                  return {
                    ...prev,
                    [accessor]: { ...prev[accessor], value: e.target.value },
                  };
                });
              }}
              onBlur={(e) => {
                const errorKey = handleCheckField(
                  e.target.value,
                  fields,
                  accessor
                );
                setFields((prev) => {
                  return {
                    ...prev,
                    [accessor]: { ...prev[accessor], error: errorKey },
                  };
                });
              }}
            />
            {!!fieldError && (
              <ErrorMessage>
                {t(`Calendar.Event.Errors.${fieldError}`)}
              </ErrorMessage>
            )}
          </InputFieldContainer>
        );
      })}
      {!!children && children}
    </InputFieldsRow>
  );
};

export const RecurrentFields = ({
  fields,
  setFields,
}: Readonly<{
  fields: IEventFields;
  setFields: Dispatch<SetStateAction<IEventFields>>;
}>) => {
  const { t } = useTranslation();

  const configs: IRowConfig[] = [
    {
      type: "date",
      hasTooltip: true,
      accessor: "startDate",
    },
    {
      type: "date",
      hasTooltip: true,
      accessor: "endDate",
    },
    {
      type: "time",
      accessor: "startTime",
    },
    {
      type: "time",
      accessor: "endTime",
    },
    {
      type: "number",
      accessor: "capacity",
    },
  ];

  return (
    <Fragment>
      <FieldRows
        fields={fields}
        setFields={setFields}
        configs={configs.slice(0, 2)}
      />
      <FieldRows
        fields={fields}
        setFields={setFields}
        configs={configs.slice(2, 4)}
      />
      <FieldRows
        fields={fields}
        setFields={setFields}
        configs={configs.slice(4)}
      >
        <InputFieldContainer>
          <InputTitleContainer>
            <InputFieldTitle>
              {t("Calendar.Event.Fields.dayOfWeek")}
            </InputFieldTitle>
            <InfoTooltip
              content={{
                id: "tooltip-dayOfWeek",
                text: t("Calendar.Event.Fields.Tooltip.dayOfWeek"),
              }}
            />
          </InputTitleContainer>
          <CustomSelect
            selectedValue={`${fields?.weekDay}`}
            handleChange={(v) =>
              setFields((prev) => {
                return { ...prev, weekDay: { ...prev.weekDay, value: +v } };
              })
            }
            options={Object.values(DayOfWeek)
              .filter((value) => typeof value === "number")
              .map((value) => ({
                key: `${value}`,
                text: t(`Base.DayOfWeek.${DayOfWeek[value as DayOfWeek]}`),
              }))}
          />
        </InputFieldContainer>
      </FieldRows>
    </Fragment>
  );
};

export const OneTimeFields = ({
  fields,
  setFields,
}: Readonly<{
  fields: IEventFields;
  setFields: Dispatch<SetStateAction<IEventFields>>;
}>) => {
  const configs: IRowConfig[] = [
    {
      type: "date",
      hasTooltip: true,
      accessor: "date",
    },
    {
      type: "number",
      accessor: "capacity",
    },
    {
      type: "time",
      accessor: "startTime",
    },
    {
      type: "time",
      accessor: "endTime",
    },
  ];

  return (
    <Fragment>
      <FieldRows
        fields={fields}
        setFields={setFields}
        configs={configs.slice(0, 2)}
      />
      <FieldRows
        fields={fields}
        setFields={setFields}
        configs={configs.slice(2, 4)}
      />
    </Fragment>
  );
};
