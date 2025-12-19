import { useTranslation } from "react-i18next";
import { InputFieldsRow } from "./create-class.styled";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CustomInputField, ErrorMessage, UsersTransferList } from "../../base";
import { IClassFields, IRowConfig } from "./create-class.interface";
import { handleCheckField } from "./create-class.utils";
import { getWeekday, stringIncludes } from "../../../utils";
import { mdiMagnify } from "@mdi/js";
import { IUser } from "../../../api";
import i18n from "../../../i18n";

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
          value={
            fields.date.value
              ? getWeekday(fields.date.value, i18n.language)
              : "-"
          }
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

export const AddUserToClass = ({
  usersList,
  classSpots,
  setUsersList,
  attendeesList,
  setAttendeesList,
}: Readonly<{
  usersList: IUser[];
  classSpots: number;
  attendeesList: IUser[];
  setUsersList: Dispatch<SetStateAction<IUser[]>>;
  setAttendeesList: Dispatch<SetStateAction<IUser[]>>;
}>) => {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (!search) setFilteredUsers(usersList);
    else {
      setFilteredUsers(
        usersList.filter((user) => stringIncludes(user.name, search))
      );
    }
  }, [search, usersList]);

  return (
    <div className="flex flex-col gap-8 h-[350px]">
      <CustomInputField
        value={search}
        icon={{ name: mdiMagnify }}
        placeholder={t(`Base.SearchUser`)}
        handleChange={(value) => setSearch(value)}
      />
      <UsersTransferList
        listMaxSpots={classSpots}
        assignedUsers={attendeesList}
        availableUsers={filteredUsers}
        setAvailableUsers={setUsersList}
        setAssignedUsers={setAttendeesList}
      />
    </div>
  );
};
