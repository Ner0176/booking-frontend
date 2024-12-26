import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  EventTypeBox,
  OneTimeFields,
  RecurrentFields,
} from "./new-event.content";
import {
  ButtonsContainer,
  EventContainer,
  EventFormWrapper,
  EventTypesWrapper,
  InputFieldsContainer,
} from "./new-event.styled";
import { mdiCalendarBlankOutline, mdiCalendarSyncOutline } from "@mdi/js";
import {
  emptyEventFields,
  EventType,
  IEventFields,
} from "./new-event.interface";
import { CustomButton, Modal } from "../base";
import { useSearchParams } from "react-router-dom";
import { useCreateClass } from "../../api";
import { useClickOutside } from "../../hooks";

export const NewEvent = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [fields, setFields] = useState<IEventFields>(emptyEventFields);

  const { mutate, isPending: isLoading } = useCreateClass();

  const handleCloseModal = () => {
    setSearchParams((sParams) => {
      sParams.delete("type");
      sParams.delete("action");
      return sParams;
    });
  };

  const ref = useClickOutside(handleCloseModal);

  const selectedType: EventType | null = useMemo(() => {
    const type = searchParams.get("type");
    return type ? (type as EventType) : null;
  }, [searchParams]);

  const handleSelectType = (newType?: EventType) => {
    setSearchParams((sParams) => {
      newType ? sParams.set("type", newType) : sParams.delete("type");
      return sParams;
    });
  };

  const handleSubmit = () => {
    for (const item of Object.values(fields)) {
      if (!!item["error"]) return;
    }

    const recurrencyDate = fields.recurrencyLimit.value;
    mutate({
      end: fields.endTime.value,
      start: fields.startTime.value,
      date: new Date(fields.date.value),
      maxAmount: fields.maxAmount.value,
      recurrencyLimit: recurrencyDate ? new Date(recurrencyDate) : undefined,
    });
  };

  return (
    <Modal>
      <EventContainer ref={ref}>
        <span className="text-center text-2xl font-bold">
          {t("Calendar.Event.NewEvent")}
        </span>
        {!selectedType ? (
          <EventTypesWrapper>
            <EventTypeBox
              type="Recurrent"
              icon={mdiCalendarSyncOutline}
              handleSelectType={() => handleSelectType("recurrent")}
            />
            <EventTypeBox
              type="OneTime"
              icon={mdiCalendarBlankOutline}
              handleSelectType={() => handleSelectType("oneTime")}
            />
          </EventTypesWrapper>
        ) : (
          <EventFormWrapper>
            <InputFieldsContainer>
              {selectedType === "recurrent" ? (
                <RecurrentFields fields={fields} setFields={setFields} />
              ) : (
                <OneTimeFields fields={fields} setFields={setFields} />
              )}
            </InputFieldsContainer>
            <ButtonsContainer>
              <CustomButton
                color="secondary"
                onClick={() => handleSelectType()}
              >
                {t("Base.Buttons.Cancel")}
              </CustomButton>
              <CustomButton
                isLoading={isLoading}
                onClick={() => {
                  if (!isLoading) handleSubmit();
                }}
              >
                {t("Base.Buttons.CreateEvent")}
              </CustomButton>
            </ButtonsContainer>
          </EventFormWrapper>
        )}
      </EventContainer>
    </Modal>
  );
};
