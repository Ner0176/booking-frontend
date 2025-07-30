import { useState } from "react";
import { CustomInputField } from "../../../base";
import {
  AttendeesListWrapper,
  EditAttendeesButton,
} from "../class-details.styled";
import { useTranslation } from "react-i18next";
import { mdiMagnify, mdiPencilOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { isMobile } from "react-device-detect";
import { IClassBookingsUsers } from "../../../../api";
import { AttendeesListSection } from "./attendees-list.content";

export const ClassAttendeesList = ({
  isLoading,
  attendeesList,
  editAttendeesList,
}: Readonly<{
  isLoading: boolean;
  editAttendeesList(): void;
  attendeesList: IClassBookingsUsers;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails";

  const [search, setSearch] = useState("");

  return (
    <AttendeesListWrapper>
      <div className="flex flex-row items-center justify-center gap-3 w-full">
        <CustomInputField
          value={search}
          icon={{ name: mdiMagnify }}
          handleChange={(value) => setSearch(value)}
          placeholder={t(`${basePath}.AttendeesList.Placeholder`)}
        />
        <EditAttendeesButton onClick={editAttendeesList}>
          <Icon className="size-3 sm:size-3.5 mt-0.5" path={mdiPencilOutline} />
          <span className="text-xs sm:text-sm font-semibold">
            {t(`${isMobile ? "Base.Buttons" : basePath}.Edit`)}
          </span>
        </EditAttendeesButton>
      </div>
      <AttendeesListSection
        title="Asistentes recurrentes"
        isLoading={isLoading}
        attList={attendeesList.recurrentBookings}
      />
      <AttendeesListSection
        isLoading={isLoading}
        title="Asistentes puntuales"
        attList={attendeesList.recoveryBookings}
      />
      <AttendeesListSection
        isLoading={isLoading}
        title="Usuarios que han cancelado"
        attList={attendeesList.cancelledBookings}
      />
    </AttendeesListWrapper>
  );
};
