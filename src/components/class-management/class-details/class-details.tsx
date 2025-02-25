import { useTranslation } from "react-i18next";
import {
  IClass,
  IUser,
  useEditBookings,
  useGetAllUsers,
  useGetBookings,
} from "../../../api";
import { useSearchParamsManager } from "../../../hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getWeekday } from "../../../utils";
import { CustomButton, showToast } from "../../base";
import { DeleteClassModal, SwitchList } from "./class-details.content";
import { emptyClassFields, IClassFields, OneTimeFields } from "../create-class";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { UserCard } from "../../users";

export const ClassDetails = ({
  classData,
  refetchClasses,
}: Readonly<{ classData: IClass; refetchClasses(): void }>) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails";

  const { params, setParams } = useSearchParamsManager(["action"]);
  const showEditView = params.get("action") === "edit-class";
  const showDeleteModal = params.get("action") === "delete-class";

  const { id, date, endTime, startTime, maxAmount, recurrentId } = classData;

  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [attendeesList, setAttendeesList] = useState<IUser[]>([]);
  const [fields, setFields] = useState<IClassFields>(emptyClassFields);

  const { data: users } = useGetAllUsers();
  const { data: bookings, refetch: refetchBookings } = useGetBookings({
    classId: id,
  });

  const { mutate: editBookings, isPending: isLoading } = useEditBookings(() => {
    refetchClasses();
    refetchBookings();
  });

  const { initUsersList, initAttendeesList } = useMemo(() => {
    let filteredUsers: IUser[] = [];
    let bookingsUsers: IUser[] = [];

    if (users && bookings) {
      bookingsUsers = bookings.map(({ user }) => user);
      const bookingsUserIds = new Set(bookings.map(({ user }) => user.id));
      filteredUsers = users.filter(({ id }) => !bookingsUserIds.has(id));
    }

    return {
      initUsersList: filteredUsers,
      initAttendeesList: bookingsUsers,
    };
  }, [users, bookings]);

  const handleEditBooking = () => {
    if (attendeesList.length > maxAmount) {
      showToast({
        type: "error",
        text: t(`${basePath}.AttendeesList.MaxAmountError`),
      });
      return;
    }
    editBookings({
      isRecurrent: false,
      classId: id.toString(),
      userIds: attendeesList.map(({ id }) => id),
    });
  };

  const initializeState = useCallback(() => {
    setUsersList(initUsersList);
    setAttendeesList(initAttendeesList);
    setFields({
      endTime: { value: endTime },
      recurrencyLimit: { value: "" },
      startTime: { value: startTime },
      maxAmount: { value: maxAmount },
      date: { value: format(new Date(date), "yyyy-MM-dd") },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initUsersList, initAttendeesList, classData]);

  useEffect(() => {
    initializeState();
  }, [initializeState]);

  return (
    <>
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-10 w-full h-full">
          <div className="flex flex-col gap-3">
            <span className="font-bold text-xl underline underline-offset-2">
              {t(`${basePath}.Details`)}
            </span>
            <div className="flex flex-col gap-4">
              <OneTimeFields
                disableFields
                fields={fields}
                setFields={setFields}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-xl underline underline-offset-2">
              {!showEditView && t(`${basePath}.AttendeesList.Title`)}
            </span>
            {showEditView ? (
              <div className="flex flex-col gap-8">
                <SwitchList
                  maxAmount={maxAmount}
                  usersList={usersList}
                  setUsersList={setUsersList}
                  attendeesList={attendeesList}
                  setAttendeesList={setAttendeesList}
                />
                <div className="flex flex-row items-center justify-end gap-4 w-full">
                  <CustomButton
                    color="secondary"
                    onClick={() => {
                      setParams([{ key: "action" }]);
                      initializeState();
                    }}
                  >
                    {t("Base.Buttons.Discard")}
                  </CustomButton>
                  <CustomButton
                    isLoading={isLoading}
                    onClick={handleEditBooking}
                  >
                    {t("Base.Buttons.Save")}
                  </CustomButton>
                </div>
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
              <span> {t(`${basePath}.AttendeesList.Empty`)}</span>
            )}
          </div>
        </div>
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
