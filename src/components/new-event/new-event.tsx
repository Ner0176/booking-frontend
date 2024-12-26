import { useState } from "react";
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
import { useCreateClass } from "../../api";
import { useClickOutside, useSearchParamsManager } from "../../hooks";
import { CustomButton, Modal } from "../base";

export const NewEvent = () => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["type"]);

  const [fields, setFields] = useState<IEventFields>(emptyEventFields);

  const handleCloseModal = () => {
    setParams([{ key: "type" }, { key: "action" }]);
  };

  const { mutate, isPending: isLoading } = useCreateClass(handleCloseModal);

  const ref = useClickOutside(handleCloseModal);

  const handleSelectType = (newType?: EventType) => {
    setParams([{ key: "type", value: newType }]);
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
        {!params.get("type") ? (
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
              {params.get("type") === "recurrent" ? (
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
