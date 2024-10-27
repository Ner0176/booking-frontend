import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EventInputField, EventTypeBox } from "./new-event.content";
import {
  ButtonsContainer,
  EventContainer,
  EventTypesWrapper,
  InputFieldContainer,
  InputFieldsContainer,
  InputFieldsRow,
  InputFieldTitle,
} from "./new-event.styled";
import { mdiCalendarBlankOutline, mdiCalendarSyncOutline } from "@mdi/js";
import {
  DayOfWeek,
  emptyEventFields,
  EventType,
  IEventFields,
} from "./new-event.interface";
import "react-calendar/dist/Calendar.css";
import { CustomButton, CustomSelect } from "../base";

export const NewEvent = () => {
  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState<EventType>();
  const [fields, setFields] = useState<IEventFields>(emptyEventFields);

  return (
    <EventContainer>
      <span className="text-center text-2xl font-bold">
        {t("Calendar.Event.NewEvent")}
      </span>
      {!selectedType ? (
        <EventTypesWrapper>
          <EventTypeBox
            type="Recurrent"
            icon={mdiCalendarSyncOutline}
            handleSelectType={() => setSelectedType("recurrent")}
          />
          <EventTypeBox
            type="OneTime"
            icon={mdiCalendarBlankOutline}
            handleSelectType={() => setSelectedType("oneTime")}
          />
        </EventTypesWrapper>
      ) : (
        <InputFieldsContainer>
          <InputFieldsRow>
            <EventInputField<string>
              type="date"
              titleKey={"InitDate"}
              selectedValue={fields.initDate}
              handleChange={(v) => {
                console.log(v);
                setFields((prev) => {
                  return { ...prev, initDate: v };
                });
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
            />
          </InputFieldsRow>
          <InputFieldsRow>
            <EventInputField<string>
              type="time"
              titleKey={"InitTime"}
              selectedValue={fields.initTime}
              handleChange={(v) =>
                setFields((prev) => {
                  return { ...prev, initTime: v };
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
              <InputFieldTitle>
                {t("Calendar.Event.Fields.DayOfWeek")}
              </InputFieldTitle>
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
          <ButtonsContainer>
            <CustomButton color="secondary">
              {t("Base.Buttons.Cancel")}
            </CustomButton>
            <CustomButton>{t("Base.Buttons.CreateEvent")}</CustomButton>
          </ButtonsContainer>
        </InputFieldsContainer>
      )}
    </EventContainer>
  );
};
