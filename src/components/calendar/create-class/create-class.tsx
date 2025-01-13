import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ClassTypeBox,
  OneTimeFields,
  RecurrentFields,
} from "./create-class.content";
import {
  ButtonsContainer,
  ClassContainer,
  ClassFormWrapper,
  ClassTypesWrapper,
  InputFieldsContainer,
} from "./create-class.styled";
import { mdiCalendarBlankOutline, mdiCalendarSyncOutline } from "@mdi/js";
import {
  emptyEventFields,
  EventType,
  IClassIds,
  IEventFields,
} from "./create-class.interface";
import {
  IUser,
  useCreateBookings,
  useCreateClass,
  useGetAllUsers,
} from "../../../api";
import { useClickOutside, useSearchParamsManager } from "../../../hooks";
import { CustomButton, Modal, showToast } from "../../base";
import { SwitchList } from "../class-details";

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
  const [fields, setFields] = useState<IEventFields>(emptyEventFields);

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

  const ref = useClickOutside(handleCloseModal);

  useEffect(() => {
    if (users) setUsersList(users);
  }, [users]);

  const handleSelectType = (newType?: EventType) => {
    setParams([{ key: "type", value: newType }]);
  };

  const handleSubmit = () => {
    for (const item of Object.values(fields)) {
      if (!!item["error"]) return;
    }

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
        text: t(`Calendar.ClassDetails.AttendeesList.MaxAmountError`),
      });
      return;
    }

    createBookings({
      classId,
      isRecurrent,
      userIds: attendeesList.map(({ id }) => id),
    });
  };

  return (
    <Modal>
      <ClassContainer ref={ref}>
        <span className="text-center text-2xl font-bold">
          {t(`Calendar.Event.${showAddUsers ? "AddAttendees" : "NewEvent"}`)}
        </span>
        {!params.get("type") ? (
          <ClassTypesWrapper>
            <ClassTypeBox
              type="Recurrent"
              icon={mdiCalendarSyncOutline}
              handleSelectType={() => handleSelectType("recurrent")}
            />
            <ClassTypeBox
              type="OneTime"
              icon={mdiCalendarBlankOutline}
              handleSelectType={() => handleSelectType("oneTime")}
            />
          </ClassTypesWrapper>
        ) : (
          <ClassFormWrapper>
            <InputFieldsContainer>
              {!!showAddUsers ? (
                <SwitchList
                  listMaxHeight={225}
                  usersList={usersList}
                  setUsersList={setUsersList}
                  attendeesList={attendeesList}
                  maxAmount={fields.maxAmount.value}
                  setAttendeesList={setAttendeesList}
                />
              ) : isRecurrent ? (
                <RecurrentFields fields={fields} setFields={setFields} />
              ) : (
                <OneTimeFields fields={fields} setFields={setFields} />
              )}
            </InputFieldsContainer>
            <ButtonsContainer>
              {!!showAddUsers ? (
                <>
                  <CustomButton color="secondary" onClick={handleCloseModal}>
                    <div>{t("Base.Buttons.Skip")}</div>
                  </CustomButton>
                  <CustomButton
                    onClick={handleAddAttendees}
                    isLoading={isCreatingBookings}
                  >
                    {t("Base.Buttons.Save")}
                  </CustomButton>
                </>
              ) : (
                <>
                  <CustomButton
                    color="secondary"
                    onClick={() => handleSelectType()}
                  >
                    {t("Base.Buttons.Cancel")}
                  </CustomButton>
                  <CustomButton
                    onClick={handleSubmit}
                    isLoading={isCreatingClass}
                  >
                    {t("Base.Buttons.CreateEvent")}
                  </CustomButton>
                </>
              )}
            </ButtonsContainer>
          </ClassFormWrapper>
        )}
      </ClassContainer>
    </Modal>
  );
};
