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
import Skeleton from "react-loading-skeleton";
import { UserCard } from "../../../users";
import { useNavigate } from "react-router-dom";
import noUsers from "../../../../assets/images/noData/folders.svg";
import { IUser } from "../../../../api";

export const ClassAttendeesList = ({
  isLoading,
  attendeesList,
  editAttendeesList,
}: Readonly<{
  isLoading: boolean;
  attendeesList: IUser[];
  editAttendeesList(): void;
}>) => {
  const navigate = useNavigate();
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
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[...Array(6)].map((key) => (
            <Skeleton
              key={key}
              className="w-full h-16"
              style={{ borderRadius: 16 }}
            />
          ))}
        </div>
      ) : attendeesList.length ? (
        <div className="flex flex-wrap gap-3">
          {attendeesList.map((attendee, idx) => (
            <UserCard
              key={idx}
              user={attendee}
              handleClick={() => navigate(`/users?userId=${attendee.id}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyData
          textSize={16}
          image={noUsers}
          title={t(`${basePath}.AttendeesList.Empty`)}
        />
      )}
    </AttendeesListWrapper>
  );
};
