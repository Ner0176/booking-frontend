import { useEffect, useMemo, useState } from "react";
import {
  IClass,
  IClassBookingsUsers,
  IUser,
  useEditBookings,
  useGetAllUsers,
  useGetRecurrentUsers,
} from "../../../../api";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { stringIncludes } from "../../../../utils";
import {
  CustomButton,
  CustomInputField,
  CustomSelect,
  EmptyData,
  Modal,
  showToast,
  SwitchSelector,
  UsersTransferList,
} from "../../../base";
import { mdiMagnify } from "@mdi/js";
import { RecurrentOptionType } from "../class-details.interface";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { UserCard } from "../../../users";
import noUsers from "../../../../assets/images/noData/folders.svg";
import { useSearchParamsManager } from "../../../../hooks";

export const AttendeesListSection = ({
  attList,
  titleKey,
  isLoading,
}: Readonly<{ titleKey: string; attList: IUser[]; isLoading: boolean }>) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.AssistantsType";

  if (!attList.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-base sm:text-lg">
        {t(`${basePath}.${titleKey}`)}
      </span>
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
      ) : attList.length ? (
        <div className="flex flex-wrap gap-3">
          {attList.map((attendee, idx) => (
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
          title={t(`Classes.ClassDetails.AttendeesList.Empty`)}
        />
      )}
    </div>
  );
};

export const EditListModal = ({
  refetch,
  classData,
  handleClose,
  classAttendees,
}: Readonly<{
  refetch(): void;
  classData: IClass;
  handleClose(): void;
  classAttendees: IClassBookingsUsers;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.AttendeesList.Edit";

  const { params, setParams } = useSearchParamsManager(["type"]);

  const recurrenceType = (params.get("type") ??
    "recurrent") as RecurrentOptionType;

  const { id, maxAmount, recurrent } = classData;

  const SELECT_OPTIONS = [
    {
      key: "recurrent",
      text: t(`${basePath}.Options.${isMobile ? "Short." : ""}Recurrent`),
    },
    {
      key: "specific",
      text: t(`${basePath}.Options.${isMobile ? "Short." : ""}Specific`),
    },
  ];

  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [attendeesList, setAttendeesList] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const { data: users } = useGetAllUsers();
  const { mutate: editBookings, isPending: isLoading } =
    useEditBookings(refetch);
  const { data: recurrentUsers } = useGetRecurrentUsers({
    recurrentId: recurrent?.id ?? -1,
    enabled: recurrenceType === "recurrent" && !!recurrent?.id,
  });

  const { initUsersList, initAttendeesList } = useMemo(() => {
    let filteredUsers: IUser[] = [];
    let bookingsUsers: IUser[] = [];

    if (!!users && !!recurrentUsers && !!classAttendees) {
      const { recurrentBookings, recoveryBookings } = classAttendees;

      bookingsUsers =
        recurrenceType === "recurrent"
          ? recurrentUsers
          : [...recurrentBookings, ...recoveryBookings];
      const bookingsUserIds = new Set(bookingsUsers.map((user) => user.id));
      filteredUsers = users.filter(({ id }) => !bookingsUserIds.has(id));
    }

    return {
      initUsersList: filteredUsers,
      initAttendeesList: bookingsUsers,
    };
  }, [users, recurrentUsers, classAttendees, recurrenceType]);

  useEffect(() => {
    setUsersList(initUsersList);
    setAttendeesList(initAttendeesList);
  }, [initAttendeesList, initUsersList]);

  useEffect(() => {
    if (!search) setFilteredUsers(usersList);
    else {
      setFilteredUsers(
        usersList.filter((user) => stringIncludes(user.name, search))
      );
    }
  }, [search, usersList]);

  useEffect(() => {
    if (!!recurrent && !recurrenceType) handleChangeRecurrence("recurrent");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recurrent]);

  const handleChangeRecurrence = (value: RecurrentOptionType | undefined) => {
    setParams([{ key: "type", value }]);
  };

  const handleEditBooking = () => {
    if (attendeesList.length > maxAmount) {
      showToast({
        type: "error",
        text: t(`${basePath}.MaxAmountError`),
      });
      return;
    }

    const editRecurrently = recurrenceType === "recurrent";
    editBookings({
      userIds: attendeesList.map(({ id }) => id),
      classId: !editRecurrently ? id : undefined,
      recurrentId: editRecurrently ? recurrent?.id : undefined,
    });
  };

  return (
    <Modal
      handleClose={handleClose}
      title={t(`Classes.ClassDetails.Edit`)}
      footer={
        <div className="flex flex-row items-center justify-end gap-4 w-full">
          <CustomButton color="secondary" onClick={handleClose}>
            {t("Base.Buttons.Discard")}
          </CustomButton>
          <CustomButton isLoading={isLoading} onClick={handleEditBooking}>
            {t("Base.Buttons.Save")}
          </CustomButton>
        </div>
      }
    >
      <div className="flex flex-col gap-5 sm:gap-8 h-[350px]">
        <div className="flex flex-row items-center gap-2.5 sm:gap-5 w-full">
          <CustomInputField
            value={search}
            icon={{ name: mdiMagnify }}
            placeholder={t(`Base.SearchUser`)}
            handleChange={(value) => setSearch(value)}
          />
          {!!recurrent &&
            (isMobile ? (
              <CustomSelect
                options={SELECT_OPTIONS}
                selectedValue={recurrenceType ?? ""}
                handleChange={(v) =>
                  handleChangeRecurrence(v as RecurrentOptionType)
                }
              />
            ) : (
              <div style={{ width: "100%" }}>
                <SwitchSelector
                  options={SELECT_OPTIONS}
                  value={recurrenceType ?? "recurrence"}
                  handleChange={(value) =>
                    handleChangeRecurrence(value as RecurrentOptionType)
                  }
                />
              </div>
            ))}
        </div>
        <UsersTransferList
          assignedUsers={attendeesList}
          availableUsers={filteredUsers}
          setAvailableUsers={setUsersList}
          listMaxSpots={classData.maxAmount}
          setAssignedUsers={setAttendeesList}
        />
      </div>
    </Modal>
  );
};
