import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IClass, IUser, useEditBookings } from "../../../../api";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { stringIncludes } from "../../../../utils";
import {
  CustomButton,
  CustomInputField,
  CustomSelect,
  Modal,
  showToast,
  SwitchSelector,
  UsersTransferList,
} from "../../../base";
import { mdiMagnify } from "@mdi/js";
import { RecurrentOptionType } from "../class-details.interface";

export const EditListModal = ({
  refetch,
  classData,
  usersList,
  handleClose,
  setUsersList,
  attendeesList,
  setAttendeesList,
}: Readonly<{
  refetch(): void;
  classData: IClass;
  usersList: IUser[];
  handleClose(): void;
  attendeesList: IUser[];
  setUsersList: Dispatch<SetStateAction<IUser[]>>;
  setAttendeesList: Dispatch<SetStateAction<IUser[]>>;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.AttendeesList.Edit";

  const { id, maxAmount, recurrentId } = classData;

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
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [recurrenceType, setRecurrenceType] = useState<RecurrentOptionType>();

  const { mutate: editBookings, isPending: isLoading } =
    useEditBookings(refetch);

  useEffect(() => {
    if (!search) setFilteredUsers(usersList);
    else {
      setFilteredUsers(
        usersList.filter((user) => stringIncludes(user.name, search))
      );
    }
  }, [search, usersList]);

  useEffect(() => {
    if (!!recurrentId && !recurrenceType) setRecurrenceType("recurrent");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recurrentId]);

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
      isRecurrent: editRecurrently,
      userIds: attendeesList.map(({ id }) => id),
      classId: `${editRecurrently ? recurrentId : id}`,
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
          {recurrentId &&
            (isMobile ? (
              <CustomSelect
                options={SELECT_OPTIONS}
                selectedValue={recurrenceType ?? ""}
                handleChange={(v) =>
                  setRecurrenceType(v as RecurrentOptionType)
                }
              />
            ) : (
              <div style={{ width: "100%" }}>
                <SwitchSelector
                  options={SELECT_OPTIONS}
                  value={recurrenceType ?? "recurrence"}
                  handleChange={(value) =>
                    setRecurrenceType(value as RecurrentOptionType)
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
