import { useTranslation } from "react-i18next";
import { IClass, IUser, useGetAllUsers, useGetBookings } from "../../../api";
import { useSearchParamsManager } from "../../../hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getWeekday } from "../../../utils";
import {
  ClassDetailsCard,
  DeleteClassModal,
  EditClassDetailsModal,
  EditListModal,
} from "./class-details.content";
import { useNavigate } from "react-router-dom";
import { UserCard } from "../../users";
import { CardContainer, CustomInputField, EmptyData } from "../../base";
import noUsers from "../../../assets/images/noData/folders.svg";
import Skeleton from "react-loading-skeleton";
import { mdiMagnify, mdiPencilOutline } from "@mdi/js";
import Icon from "@mdi/react";
import {
  AttendeesListWrapper,
  ClassDetailsWrapper,
  EditAttendeesButton,
} from "./class-details.styled";

export const ClassDetails = ({
  classData,
  refetchClasses,
}: Readonly<{ classData: IClass; refetchClasses(): void }>) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails";

  const { params, setParams } = useSearchParamsManager(["action"]);
  const showEditClassView = params.get("action") === "edit-class";
  const showDeleteModal = params.get("action") === "delete-class";
  const showEditAttendeesView = params.get("action") === "edit-attendees";

  const { id, date, endTime, startTime, recurrentId } = classData;

  const [search, setSearch] = useState("");
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

  const handleCloseAction = () => {
    setParams([{ key: "type" }, { key: "action" }]);
    initializeState();
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col sm:grid sm:grid-cols-3 w-full h-full">
          <AttendeesListWrapper>
            <div className="flex flex-row items-center justify-center gap-3 w-full">
              <CustomInputField
                value={search}
                icon={{ name: mdiMagnify }}
                handleChange={(value) => setSearch(value)}
                placeholder={t(`${basePath}.AttendeesList.Placeholder`)}
              />
              <EditAttendeesButton
                onClick={() =>
                  setParams([{ key: "action", value: "edit-attendees" }])
                }
              >
                <Icon className="size-3.5 mt-0.5" path={mdiPencilOutline} />
                <span className="text-sm font-semibold">
                  {t(`${basePath}.Edit`)}
                </span>
              </EditAttendeesButton>
            </div>
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
          </AttendeesListWrapper>
          <ClassDetailsWrapper>
            <div className="flex justify-center w-full px-10">
              <CardContainer mainCard>
                <div className="flex flex-row items-center gap-1.5">
                  <span className="font-semibold">
                    {t(`${basePath}.Details`)}
                  </span>
                  <div
                    onClick={() =>
                      setParams([{ key: "action", value: "edit-class" }])
                    }
                  >
                    <Icon
                      path={mdiPencilOutline}
                      className="mt-0.5 size-5 cursor-pointer text-neutral-500"
                    />
                  </div>
                </div>
                <ClassDetailsCard type="schedule" classData={classData} />
                <ClassDetailsCard type="amount" classData={classData} />
              </CardContainer>
            </div>
          </ClassDetailsWrapper>
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
    </>
  );
};
