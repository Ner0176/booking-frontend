import { useTranslation } from "react-i18next";
import { IClass, IUser, useGetAllUsers, useGetBookings } from "../../../api";
import { useSearchParamsManager } from "../../../hooks";
import { useEffect, useState } from "react";
import { formatDate, getWeekday } from "../../../utils";
import { CustomButton } from "../../base";
import { DeleteClassModal, SwitchList } from "./class-details.content";

export const ClassDetails = ({
  refetchClasses,
  classData,
}: Readonly<{ classData: IClass; refetchClasses(): void }>) => {
  const { t } = useTranslation();
  const tPath = "Calendar.ClassDetails";

  const { params, setParams } = useSearchParamsManager(["action"]);
  const showEditView = params.get("action") === "edit-event";
  const showDeleteModal = params.get("action") === "delete-event";

  const { id, date, endTime, startTime, maxAmount, recurrentId } = classData;

  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [assistantsList, setAssistantsList] = useState<IUser[]>([]);

  const { data: users } = useGetAllUsers();
  const { data: bookings } = useGetBookings({ classId: id });

  useEffect(() => {
    if (users) setUsersList(users);
    if (bookings) {
      const bookingsUsers = bookings.map(({ user }) => ({
        phone: "",
        email: "",
        id: user.id,
        name: user.name,
      }));
      setAssistantsList(bookingsUsers);
    }
  }, [users, bookings]);

  return (
    <>
      <div className="flex flex-col gap-3 justify-between w-full">
        <div className="grid grid-cols-2 w-full h-full">
          <div className="flex flex-col gap-3">
            <span className="font-bold text-xl underline underline-offset-2">
              {t(`${tPath}.Details`)}
            </span>
            <span>{`${t(`${tPath}.Date`)}: ${formatDate(date)}`}</span>
            <span>{`${t(
              `${tPath}.Schedule`
            )}: ${startTime} - ${endTime}`}</span>
            <span>{`${t(`${tPath}.MaxAmount`)}: ${maxAmount}`}</span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-xl underline underline-offset-2">
              {showEditView ? (
                <div className="flex flex-row items-center justify-between gap-2">
                  <span>{"Lista usuarios"}</span>
                  <span>{t(`${tPath}.AssistantsList.Title`)}</span>
                </div>
              ) : (
                t(`${tPath}.AssistantsList.Title`)
              )}
            </span>
            {showEditView ? (
              <SwitchList
                usersList={usersList}
                setUsersList={setUsersList}
                assistantsList={assistantsList}
                setAssistantsList={setAssistantsList}
              />
            ) : assistantsList.length ? (
              assistantsList.map(({ name }) => <div>{name}</div>)
            ) : (
              <span> {t(`${tPath}.AssistantsList.Empty`)}</span>
            )}
          </div>
        </div>
        {showEditView && (
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <CustomButton
              color="secondary"
              onClick={() => setParams([{ key: "action" }])}
            >
              {t("Base.Buttons.Discard")}
            </CustomButton>
            <CustomButton>{t("Base.Buttons.Save")}</CustomButton>
          </div>
        )}
      </div>
      {showDeleteModal && (
        <DeleteClassModal
          id={id}
          recurrentId={recurrentId}
          refetchClasses={refetchClasses}
          handleClose={() => setParams([{ key: "action" }])}
          dateTime={`${getWeekday(date)}  ${startTime}h - ${endTime}h`}
        />
      )}
    </>
  );
};
