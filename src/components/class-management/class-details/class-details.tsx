import { useTranslation } from "react-i18next";
import { IClass, IUser, useGetAllUsers, useGetBookings } from "../../../api";
import { useSearchParamsManager } from "../../../hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getWeekday } from "../../../utils";
import { DeleteClassModal, EditListModal } from "./class-details.content";
import { emptyClassFields, IClassFields, OneTimeFields } from "../create-class";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { UserCard } from "../../users";
import { EmptyData } from "../../base";
import noUsers from "../../../assets/images/noData/folders.svg";
import Skeleton from "react-loading-skeleton";

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

  const {
    data: bookings,
    refetch: refetchBookings,
    isLoading: isBookingsLoading,
  } = useGetBookings({ classId: id });
  const { data: users, isLoading: isUsersLoading } = useGetAllUsers();

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
              {t(`${basePath}.AttendeesList.Title`)}
            </span>
            {isUsersLoading || isBookingsLoading ? (
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
          </div>
        </div>
      </div>
      {showEditView && (
        <EditListModal
          refetch={() => {
            refetchClasses();
            refetchBookings();
          }}
          classData={classData}
          usersList={usersList}
          setUsersList={setUsersList}
          attendeesList={attendeesList}
          setAttendeesList={setAttendeesList}
          handleClose={() => {
            setParams([{ key: "type" }, { key: "action" }]);
            initializeState();
          }}
        />
      )}
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
