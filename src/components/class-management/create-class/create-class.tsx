import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AddUserToClass,
  OneTimeFields,
  RecurrentFields,
} from "./create-class.content";
import {
  emptyClassFields,
  IClassIds,
  IClassFields,
  classOptions,
} from "./create-class.interface";
import {
  IUser,
  useCreateBookings,
  useCreateClass,
  useGetAllUsers,
} from "../../../api";
import { useSearchParamsManager } from "../../../hooks";
import { CustomButton, Modal, showToast, SwitchSelector } from "../../base";
import { capitalize } from "../../../utils";
import { isMobile } from "react-device-detect";

export const CreateClassModal = ({
  refetchClasses,
}: Readonly<{ refetchClasses(): void }>) => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["type"]);
  const isRecurrent = params.get("type") === "recurrent";

  const [classId, setClassId] = useState<string>("");
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [attendeesList, setAttendeesList] = useState<IUser[]>([]);
  const [showAddUsers, setShowAddUsers] = useState<boolean>(false);
  const [fields, setFields] = useState<IClassFields>(emptyClassFields);

  const handleCloseModal = () => {
    refetchClasses();
    setParams([{ key: "type" }, { key: "action" }]);
  };

  const handleClassSuccess = ({ id, recurrentId }: IClassIds) => {
    setShowAddUsers(true);
    setClassId(isRecurrent ? recurrentId : id);
  };

  const { data: users } = useGetAllUsers();
  const { mutate: createClass, isPending: isCreatingClass } =
    useCreateClass(handleClassSuccess);
  const { mutate: createBookings, isPending: isCreatingBookings } =
    useCreateBookings(handleCloseModal);

  useEffect(() => {
    if (users) setUsersList(users);
  }, [users]);

  const isSubmitButtonDisabled = useMemo(() => {
    return Object.values(fields).some((field) => {
      if (!isRecurrent && field === fields.recurrencyLimit) return false;
      return !!field.error || !field.value;
    });
  }, [fields, isRecurrent]);

  const handleSubmit = () => {
    const recurrencyDate = fields.recurrencyLimit.value;
    createClass({
      end: fields.endTime.value,
      start: fields.startTime.value,
      date: new Date(fields.date.value),
      maxAmount: +fields.maxAmount.value,
      recurrencyLimit: recurrencyDate ? new Date(recurrencyDate) : undefined,
    });
  };

  const handleAddAttendees = () => {
    if (attendeesList.length > fields.maxAmount.value) {
      showToast({
        type: "error",
        text: t(`Classes.ClassDetails.AttendeesList.MaxAmountError`),
      });
      return;
    }

    createBookings({
      classId,
      isRecurrent,
      userIds: attendeesList.map(({ id }) => id),
    });
  };

  const getSwitchOptions = () => {
    return classOptions.map((option) => ({
      key: option,
      text: t(`Classes.CreateClass.${capitalize(option)}.Title`),
    }));
  };

  const getTitle = () => {
    return showAddUsers
      ? `Classes.CreateClass.AddAttendees`
      : "Base.Buttons.CreateClass";
  };

  const footer = (
    <>
      {!!showAddUsers ? (
        <>
          <CustomButton color="secondary" onClick={handleCloseModal}>
            <div>{t("Base.Buttons.Skip")}</div>
          </CustomButton>
          <CustomButton
            onClick={handleAddAttendees}
            isLoading={isCreatingBookings}
            isDisabled={!attendeesList.length}
          >
            {t("Base.Buttons.Save")}
          </CustomButton>
        </>
      ) : (
        <CustomButton
          onClick={handleSubmit}
          isLoading={isCreatingClass}
          isDisabled={isSubmitButtonDisabled}
        >
          {t("Base.Buttons.CreateClass")}
        </CustomButton>
      )}
    </>
  );

  return (
    <Modal footer={footer} handleClose={handleCloseModal} title={t(getTitle())}>
      {!showAddUsers ? (
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex justify-end w-full">
            <div style={{ width: isMobile ? "100%" : undefined }}>
              <SwitchSelector
                keyParam="type"
                options={getSwitchOptions()}
                handleClick={() => setFields(emptyClassFields)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:gap-4 sm:pb-3 overflow-y-auto max-h-[375px] sm:max-h-none">
            {isRecurrent ? (
              <RecurrentFields fields={fields} setFields={setFields} />
            ) : (
              <OneTimeFields fields={fields} setFields={setFields} />
            )}
          </div>
        </div>
      ) : (
        <AddUserToClass
          usersList={usersList}
          setUsersList={setUsersList}
          attendeesList={attendeesList}
          classSpots={fields.maxAmount.value}
          setAttendeesList={setAttendeesList}
        />
      )}
    </Modal>
  );
};
