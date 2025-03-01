import { Trans, useTranslation } from "react-i18next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RecurrentOptionType } from "./class-details.interface";
import { IClass, IUser, useDeleteClass, useEditBookings } from "../../../api";
import {
  CustomButton,
  CustomInputField,
  DeleteModal,
  ErrorStrongContainer,
  Modal,
  showToast,
  SwitchSelector,
  UsersTransferList,
} from "../../base";
import {
  DeleteRecurrentOption,
  DeleteRecurrentWrapper,
} from "./class-details.styled";
import { mdiMagnify } from "@mdi/js";
import { stringIncludes } from "../../../utils";
import { useSearchParamsManager } from "../../../hooks";

export const DeleteClassModal = ({
  id,
  dateTime,
  recurrentId,
  handleClose,
  refetchClasses,
}: Readonly<{
  id: number;
  dateTime: string;
  handleClose(): void;
  refetchClasses(): void;
  recurrentId: string | null;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.Delete";

  const [selectedOption, setSelectedOption] = useState<RecurrentOptionType>();

  const { mutate: deleteClass, isPending: isLoading } = useDeleteClass(
    refetchClasses,
    selectedOption === "recurrent"
  );

  const handleDelete = () => {
    const isRecurrent = !!recurrentId && selectedOption === "recurrent";
    deleteClass({
      isRecurrent,
      id: isRecurrent ? recurrentId : id.toString(),
    });
  };

  const handleCheckValidations = () => {
    if (!recurrentId) return true;

    if (!selectedOption) {
      showToast({
        type: "error",
        text: t("Classes.ClassDetails.Delete.Validation"),
      });
    }
    return !!selectedOption;
  };

  return (
    <DeleteModal
      isDeleting={isLoading}
      handleClose={handleClose}
      handleDelete={handleDelete}
      width={!!recurrentId ? "50%" : "40%"}
      checkValidations={handleCheckValidations}
      title={t(`${basePath}.${!recurrentId ? "Title" : "Recurrent.Title"}`)}
    >
      {!!recurrentId && (
        <>
          <span>
            <Trans
              values={{ dateTime }}
              i18nKey={`${basePath}.Recurrent.Description`}
              components={{
                strong: <ErrorStrongContainer />,
              }}
            />
          </span>
          <DeleteRecurrentWrapper>
            <DeleteRecurrentOption
              className="hover:bg-neutral-50"
              isSelected={selectedOption === "specific"}
              onClick={() => setSelectedOption("specific")}
            >
              {t(`${basePath}.Recurrent.Options.Specific`)}
            </DeleteRecurrentOption>
            <DeleteRecurrentOption
              className="hover:bg-neutral-50"
              isSelected={selectedOption === "recurrent"}
              onClick={() => setSelectedOption("recurrent")}
            >
              <Trans
                values={{ dateTime }}
                components={{ NewLine: <br /> }}
                i18nKey={`${basePath}.Recurrent.Options.Recurrent`}
              />
            </DeleteRecurrentOption>
          </DeleteRecurrentWrapper>
        </>
      )}
      <span>
        <Trans
          i18nKey={`${basePath}.Description`}
          components={{
            strong: <ErrorStrongContainer />,
          }}
        />
      </span>
    </DeleteModal>
  );
};

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

  const { params } = useSearchParamsManager(["type"]);

  const { id, maxAmount, recurrentId } = classData;

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

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

  const handleEditBooking = () => {
    if (attendeesList.length > maxAmount) {
      showToast({
        type: "error",
        text: t(`${basePath}.MaxAmountError`),
      });
      return;
    }

    const editRecurrently = params.get("type") === "recurrent";

    editBookings({
      isRecurrent: editRecurrently,
      userIds: attendeesList.map(({ id }) => id),
      classId: `${editRecurrently ? recurrentId : id}`,
    });
  };

  return (
    <Modal
      handleClose={handleClose}
      title={t(`${basePath}.Title`)}
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
      <div className="flex flex-col gap-8 h-[350px]">
        <div className="flex flex-row items-center gap-5 w-full">
          <CustomInputField
            value={search}
            icon={{ name: mdiMagnify }}
            placeholder={t(`${basePath}.SearchUser`)}
            handleChange={(value) => setSearch(value)}
          />
          {recurrentId && (
            <div style={{ width: "100%" }}>
              <SwitchSelector
                keyParam="type"
                customStyles={{ fontSize: 14 }}
                options={[
                  {
                    key: "recurrent",
                    text: t(`${basePath}.Options.Recurrent`),
                  },
                  { key: "oneTime", text: t(`${basePath}.Options.OneTime`) },
                ]}
              />
            </div>
          )}
        </div>
        <UsersTransferList
          assignedUsers={attendeesList}
          availableUsers={filteredUsers}
          setAvailableUsers={setUsersList}
          setAssignedUsers={setAttendeesList}
        />
      </div>
    </Modal>
  );
};
