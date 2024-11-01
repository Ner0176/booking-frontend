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
import {
  Dispatch,
  Fragment,
  HTMLInputTypeAttribute,
  SetStateAction,
} from "react";
import { CustomSelect, InfoTooltip, ITooltipContent } from "../base";
import {
  DayOfWeek,
  IOneTimeFields,
  IRecurrentFields,
} from "./new-event.interface";

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

const EventInputField = <T extends string | number>({
  type,
  titleKey,
  handleChange,
  selectedValue,
  tooltipContent,
}: Readonly<{
  titleKey: string;
  selectedValue: T;
  handleChange: (v: T) => void;
  type: HTMLInputTypeAttribute;
  tooltipContent?: ITooltipContent;
}>) => {
  const { t } = useTranslation();
  return (
    <InputFieldContainer>
      <InputTitleContainer>
        <InputFieldTitle>
          {t(`Calendar.Event.Fields.${titleKey}`)}
        </InputFieldTitle>
        {tooltipContent && <InfoTooltip content={tooltipContent} />}
      </InputTitleContainer>
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

export const RecurrentFields = ({
  fields,
  setFields,
}: Readonly<{
  fields: IRecurrentFields;
  setFields: Dispatch<SetStateAction<IRecurrentFields>>;
}>) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <InputFieldsRow>
        <EventInputField<string>
          type="date"
          titleKey={"InitDate"}
          selectedValue={fields.startDate}
          handleChange={(v) => {
            console.log(v);
            setFields((prev) => {
              return { ...prev, startDate: v };
            });
          }}
          tooltipContent={{
            id: "tooltip-initDate",
            text: t("Calendar.Event.Fields.Tooltip.initDate"),
          }}
        />
        <EventInputField<string>
          type="date"
          titleKey={"EndDate"}
          selectedValue={fields.endDate}
          handleChange={(v) =>
            setFields((prev) => {
              return { ...prev, endDate: v };
            })
          }
          tooltipContent={{
            id: "tooltip-endDate",
            text: t("Calendar.Event.Fields.Tooltip.endDate"),
          }}
        />
      </InputFieldsRow>
      <InputFieldsRow>
        <EventInputField<string>
          type="time"
          titleKey={"InitTime"}
          selectedValue={fields.startTime}
          handleChange={(v) =>
            setFields((prev) => {
              return { ...prev, startTime: v };
            })
          }
        />
        <EventInputField<string>
          type="time"
          titleKey={"EndTime"}
          selectedValue={fields.endTime}
          handleChange={(v) =>
            setFields((prev) => {
              return { ...prev, endTime: v };
            })
          }
        />
      </InputFieldsRow>
      <InputFieldsRow>
        <EventInputField<number>
          type="number"
          titleKey={"Capacity"}
          selectedValue={fields.capacity}
          handleChange={(v) =>
            setFields((prev) => {
              return { ...prev, capacity: v };
            })
          }
        />
        <InputFieldContainer>
          <InputTitleContainer>
            <InputFieldTitle>
              {t("Calendar.Event.Fields.DayOfWeek")}
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
                return { ...prev, weekDay: +v };
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
      </InputFieldsRow>
    </Fragment>
  );
};

export const OneTimeFields = ({
  fields,
  setFields,
}: Readonly<{
  fields: IOneTimeFields;
  setFields: Dispatch<SetStateAction<IOneTimeFields>>;
}>) => {
  return (
    <Fragment>
      <InputFieldsRow>
        <EventInputField<string>
          type="date"
          titleKey={"Date"}
          selectedValue={fields.date}
          handleChange={(v) => {
            console.log(v);
            setFields((prev) => {
              return { ...prev, date: v };
            });
          }}
        />
        <EventInputField<number>
          type="number"
          titleKey={"Capacity"}
          selectedValue={fields.capacity}
          handleChange={(v) =>
            setFields((prev) => {
              return { ...prev, capacity: v };
            })
          }
        />
      </InputFieldsRow>
      <InputFieldsRow>
        <EventInputField<string>
          type="time"
          titleKey={"InitTime"}
          selectedValue={fields.startTime}
          handleChange={(v) =>
            setFields((prev) => {
              return { ...prev, startTime: v };
            })
          }
        />
        <EventInputField<string>
          type="time"
          titleKey={"EndTime"}
          selectedValue={fields.endTime}
          handleChange={(v) =>
            setFields((prev) => {
              return { ...prev, endTime: v };
            })
          }
        />
      </InputFieldsRow>
    </Fragment>
  );
};
