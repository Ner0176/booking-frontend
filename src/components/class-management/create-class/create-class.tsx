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
} from "./create-class.interface";
import {
  IUser,
  useCreateBookings,
  useCreateClass,
  useGetAllUsers,
} from "../../../api";
import { useSearchParamsManager } from "../../../hooks";
import { CustomButton, Modal, showToast, SwitchSelector } from "../../base";
import { isMobile } from "react-device-detect";
import { RecurrentOptionType } from "../class-details/class-details.interface";
import { capitalize } from "../../../utils";

export const CreateClassModal = ({
  refetchClasses,
}: Readonly<{ refetchClasses(): void }>) => {
  const { t } = useTranslation();
  const { setParams } = useSearchParamsManager([]);

  const [recurrency, setRecurrency] =
    useState<RecurrentOptionType>("recurrent");
  const [classId, setClassId] = useState<string>("");
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [recurrentId, setRecurrentId] = useState<string>("");
  const [attendeesList, setAttendeesList] = useState<IUser[]>([]);
  const [showAddUsers, setShowAddUsers] = useState<boolean>(false);
  const [fields, setFields] = useState<IClassFields>(emptyClassFields);

  const handleCloseModal = () => {
    refetchClasses();
    setParams([{ key: "action" }]);
  };

  const handleClassSuccess = ({ id, recurrentId }: IClassIds) => {
    setShowAddUsers(true);
    setClassId(id);
    setRecurrentId(recurrentId);
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
      if (recurrency === "specific" && field === fields.recurrencyLimit) {
        return false;
      }
      return !!field.error || !field.value;
    });
  }, [fields, recurrency]);

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

    const isRecurrent = recurrency === "recurrent";
    createBookings({
      userIds: attendeesList.map(({ id }) => id),
      classId: !isRecurrent ? classId : undefined,
      recurrentId: isRecurrent ? recurrentId : undefined,
    });
  };

  const getSwitchOptions = () => {
    return ["recurrent", "specific"].map((option) => ({
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
                value={recurrency}
                options={getSwitchOptions()}
                handleChange={(value) => {
                  setRecurrency(value as RecurrentOptionType);
                  setFields(emptyClassFields);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:gap-4 sm:pb-3 overflow-y-auto max-h-[375px] sm:max-h-none">
            {recurrency === "recurrent" ? (
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
