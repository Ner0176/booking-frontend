import { IClass, IUser, useGetAllUsers, useGetBookings } from "../../../api";
import { useSearchParamsManager } from "../../../hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getWeekday } from "../../../utils";
import { ClassSettingsMobile, DeleteClassModal } from "./class-details.content";
import { ClassDetailsData, EditClassDetailsModal } from "./class-data";
import { ClassAttendeesList, EditListModal } from "./attendees-list";
import { isMobile } from "react-device-detect";
import { isClassCompleted } from "../class-management.utils";

export const ClassDetails = ({
  classData,
  refetchClasses,
}: Readonly<{ classData: IClass; refetchClasses(): void }>) => {
  const { params, setParams } = useSearchParamsManager([
    "modal",
    "visual",
    "action",
  ]);

  const showEditClassView = params.get("action") === "edit-class";
  const showDeleteModal = params.get("action") === "delete-class";
  const showFiltersModal = params.get("modal") === "filters" && isMobile;
  const showEditAttendeesView = params.get("action") === "edit-attendees";

  const classVisual = params.get("visual");
  const showAttendeesList =
    classVisual === "all" || classVisual === "attendees";
  const showClassDetailsData =
    classVisual === "all" || classVisual === "details";

  const { id, date, endTime, startTime, recurrentId } = classData;

  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [attendeesList, setAttendeesList] = useState<IUser[]>([]);

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
  }, [initUsersList, initAttendeesList]);

  useEffect(() => {
    initializeState();
  }, [initializeState]);

  useEffect(() => {
    if (!classVisual) {
      setParams([{ key: "visual", value: isMobile ? "attendees" : "all" }]);
    }
  }, [classVisual, setParams]);

  const handleCloseAction = () => {
    setParams([{ key: "type" }, { key: "action" }]);
    initializeState();
  };

  const handleEditClass = () => {
    setParams([{ key: "modal" }, { key: "action", value: "edit-class" }]);
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col sm:grid sm:grid-cols-3 w-full h-full">
          {showAttendeesList && (
            <ClassAttendeesList
              attendeesList={attendeesList}
              isLoading={isBookingsLoading || isUsersLoading}
              editAttendeesList={() =>
                setParams([{ key: "action", value: "edit-attendees" }])
              }
            />
          )}
          {showClassDetailsData && (
            <ClassDetailsData
              classData={classData}
              refetchClasses={refetchClasses}
              editClassData={handleEditClass}
              isClassCompleted={isClassCompleted(classData)}
            />
          )}
        </div>
      </div>
      {showEditAttendeesView && (
        <EditListModal
          refetch={() => {
            refetchClasses();
            refetchBookings();
          }}
          classData={classData}
          usersList={usersList}
          setUsersList={setUsersList}
          attendeesList={attendeesList}
          handleClose={handleCloseAction}
          setAttendeesList={setAttendeesList}
        />
      )}
      {showEditClassView && (
        <EditClassDetailsModal
          classData={classData}
          handleClose={handleCloseAction}
          handleSuccess={() => {
            refetchClasses();
            handleCloseAction();
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
      {showFiltersModal && (
        <ClassSettingsMobile
          refetch={refetchClasses}
          classId={`${classData.id}`}
          isCancelled={classData.cancelled}
          handleEditClass={handleEditClass}
          isClassCompleted={isClassCompleted(classData)}
          handleDeleteClass={() =>
            setParams([
              { key: "modal" },
              { key: "action", value: "delete-class" },
            ])
          }
          handleClose={() => setParams([{ key: "modal" }])}
        />
      )}
    </>
  );
};
