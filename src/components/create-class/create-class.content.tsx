import Icon from "@mdi/react";
import { useTranslation } from "react-i18next";
import {
  ClassTypeContainer,
  ClassTypeTitle,
  CustomInputField,
  InputFieldContainer,
  InputFieldsRow,
  InputFieldTitle,
  InputTitleContainer,
  WeekdayContainer,
} from "./create-class.styled";
import { Dispatch, Fragment, SetStateAction } from "react";
import { ErrorMessage, InfoTooltip } from "../base";
import { IEventFields, IRowConfig } from "./create-class.interface";
import { handleCheckField } from "./create-class.utils";
import { getWeekday } from "../../utils";

export const ClassTypeBox = ({
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
    <ClassTypeContainer className="hover:shadow-lg" onClick={handleSelectType}>
      <ClassTypeTitle>
        <Icon size="16px" style={{ marginTop: 4 }} path={icon} />
        <span className="text-center">{t(`${basePath}.Title`)}</span>
      </ClassTypeTitle>
      <span className="text-sm">{t(`${basePath}.Description`)}</span>
    </ClassTypeContainer>
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
                {t(`Calendar.Event.Fields.Errors.${fieldError}`)}
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
      accessor: "date",
    },
    {
      type: "date",
      hasTooltip: true,
      accessor: "recurrencyLimit",
    },
    {
      type: "number",
      accessor: "maxAmount",
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
        configs={configs.slice(0, 1)}
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
          <WeekdayContainer>
            {fields.date.value ? getWeekday(fields.date.value) : "-"}
          </WeekdayContainer>
        </InputFieldContainer>
      </FieldRows>
      <FieldRows
        fields={fields}
        setFields={setFields}
        configs={configs.slice(1, 3)}
      />
      <FieldRows
        fields={fields}
        setFields={setFields}
        configs={configs.slice(3, 5)}
      />
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
      accessor: "maxAmount",
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
