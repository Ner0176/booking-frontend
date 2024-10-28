import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  EventTypeBox,
  OneTimeFields,
  RecurrentFields,
} from "./new-event.content";
import {
  ButtonsContainer,
  EventContainer,
  EventTypesWrapper,
  InputFieldsContainer,
} from "./new-event.styled";
import { mdiCalendarBlankOutline, mdiCalendarSyncOutline } from "@mdi/js";
import { EventType } from "./new-event.interface";
import { CustomButton } from "../base";
import { useSearchParams } from "react-router-dom";

export const NewEvent = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

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
            handleSelectType={() => handleSelectType("recurrent")}
          />
          <EventTypeBox
            type="OneTime"
            icon={mdiCalendarBlankOutline}
            handleSelectType={() => handleSelectType("oneTime")}
          />
        </EventTypesWrapper>
      ) : (
        <InputFieldsContainer>
          {selectedType === "recurrent" ? (
            <RecurrentFields />
          ) : (
            <OneTimeFields />
          )}
          <ButtonsContainer>
            <CustomButton color="secondary" onClick={() => handleSelectType()}>
              {t("Base.Buttons.Cancel")}
            </CustomButton>
            <CustomButton>{t("Base.Buttons.CreateEvent")}</CustomButton>
          </ButtonsContainer>
        </InputFieldsContainer>
      )}
    </EventContainer>
  );
};
