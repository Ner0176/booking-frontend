import Icon from "@mdi/react";
import { useTranslation } from "react-i18next";
import {
  ClassTypeContainer,
  ClassTypeTitle,
  InputFieldsRow,
} from "./create-class.styled";
import { Dispatch, SetStateAction } from "react";
import { CustomInputField, ErrorMessage } from "../../base";
import { IClassFields, IRowConfig } from "./create-class.interface";
import { handleCheckField } from "./create-class.utils";
import { getWeekday } from "../../../utils";

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
  const basePath = `Classes.CreateClass.${type}`;
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
  disableFields,
}: Readonly<{
  fields: IClassFields;
  configs: IRowConfig[];
  children?: JSX.Element;
  disableFields?: boolean;
  setFields: Dispatch<SetStateAction<IClassFields>>;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.CreateClass.Fields";

  return (
    <InputFieldsRow>
      {configs.map(({ type, accessor, hasTooltip }, idx) => {
        const fieldError = fields[accessor].error;
        const tooltipInfo = {
          id: `tooltip-${accessor}`,
          text: t(`${basePath}.Tooltip.${accessor}`),
        };
        return (
          <div key={idx} className="flex flex-col gap-2 w-full">
            <CustomInputField
              type={type}
              isDisabled={disableFields}
              value={fields[accessor].value as string}
              title={t(`${basePath}.${accessor}`)}
              tooltip={hasTooltip ? tooltipInfo : undefined}
              handleChange={(value) => {
                setFields((prev) => {
                  return {
                    ...prev,
                    [accessor]: { ...prev[accessor], value },
                  };
                });
              }}
              handleBlur={(value) => {
                const errorKey = handleCheckField(value, fields, accessor);
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
                {t(`${basePath}.Errors.${fieldError}`)}
              </ErrorMessage>
            )}
          </div>
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
  fields: IClassFields;
  setFields: Dispatch<SetStateAction<IClassFields>>;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.CreateClass.Fields";

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
    <>
      <FieldRows
        fields={fields}
        setFields={setFields}
        configs={configs.slice(0, 1)}
      >
        <CustomInputField
          isDisabled
          title={t(`${basePath}.dayOfWeek`)}
          tooltip={{
            id: "tooltip-dayOfWeek",
            text: t(`${basePath}.Tooltip.dayOfWeek`),
          }}
          value={fields.date.value ? getWeekday(fields.date.value) : "-"}
        />
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
    </>
  );
};

export const OneTimeFields = ({
  fields,
  setFields,
  disableFields,
}: Readonly<{
  fields: IClassFields;
  disableFields?: boolean;
  setFields: Dispatch<SetStateAction<IClassFields>>;
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
    <>
      <FieldRows
        fields={fields}
        setFields={setFields}
        disableFields={disableFields}
        configs={configs.slice(0, 2)}
      />
      <FieldRows
        fields={fields}
        setFields={setFields}
        disableFields={disableFields}
        configs={configs.slice(2, 4)}
      />
    </>
  );
};
