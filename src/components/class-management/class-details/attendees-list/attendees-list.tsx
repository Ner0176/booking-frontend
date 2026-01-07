import { useState } from "react";
import { CustomInputField, EmptyData } from "../../../base";
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
import NoAttendees from "../../../../assets/images/noData/ovni.svg";

export const ClassAttendeesList = ({
  isLoading,
  attendeesList,
  showEditButton,
  editAttendeesList,
}: Readonly<{
  isLoading: boolean;
  showEditButton: boolean;
  editAttendeesList(): void;
  attendeesList: IClassBookingsUsers | undefined;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails";
  const hasAttendees =
    !!attendeesList &&
    (!!attendeesList.recurrentBookings.length ||
      !!attendeesList.cancelledBookings.length ||
      !!attendeesList.recoveryBookings.length);

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
        {showEditButton && (
          <EditAttendeesButton onClick={editAttendeesList}>
            <Icon
              path={mdiPencilOutline}
              className="size-3 sm:size-3.5 mt-0.5"
            />
            <span className="text-xs sm:text-sm font-semibold">
              {t(`${isMobile ? "Base.Buttons" : basePath}.Edit`)}
            </span>
          </EditAttendeesButton>
        )}
      </div>
      {hasAttendees || isLoading ? (
        <div className="flex flex-col gap-5 mb-4">
          <AttendeesListSection
            titleKey="Normal"
            isLoading={isLoading}
            attList={attendeesList?.recurrentBookings ?? []}
          />
          <AttendeesListSection
            titleKey="Recovery"
            isLoading={isLoading}
            attList={attendeesList?.recoveryBookings ?? []}
          />
          <AttendeesListSection
            isLoading={isLoading}
            titleKey="Cancellation"
            attList={attendeesList?.cancelledBookings ?? []}
          />
        </div>
      ) : (
        <div className="mt-6">
          <EmptyData
            image={NoAttendees}
            title={t(`${basePath}.AttendeesList.Empty`)}
          />
        </div>
      )}
    </AttendeesListWrapper>
  );
};
