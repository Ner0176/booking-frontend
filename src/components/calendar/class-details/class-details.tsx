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
import { FooterButtonsWrapper } from "./class-details.styled";
import { emptyEventFields, IEventFields, OneTimeFields } from "../create-class";
import { format } from "date-fns";

export const ClassDetails = ({
  classData,
  refetchClasses,
}: Readonly<{ classData: IClass; refetchClasses(): void }>) => {
  const { t } = useTranslation();
  const basePath = "Calendar.ClassDetails";

  const { params, setParams } = useSearchParamsManager(["action"]);
  const showEditView = params.get("action") === "edit-event";
  const showDeleteModal = params.get("action") === "delete-event";

  const { id, date, endTime, startTime, maxAmount, recurrentId } = classData;

  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [attendeesList, setAttendeesList] = useState<IUser[]>([]);
  const [fields, setFields] = useState<IEventFields>(emptyEventFields);

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
      bookingsUsers = bookings.map(({ user }) => ({
        phone: "",
        email: "",
        id: user.id,
        name: user.name,
      }));

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
      <div className="flex flex-col gap-3 justify-between w-full">
        <div className="grid grid-cols-2 gap-10 w-full h-full">
          <div className="flex flex-col gap-3">
            <span className="font-bold text-xl underline underline-offset-2">
              {t(`${basePath}.Details`)}
            </span>
            <div className="flex flex-col gap-4">
              <OneTimeFields
                fields={fields}
                setFields={setFields}
                disableFields={!showEditView}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-xl underline underline-offset-2">
              {!showEditView && t(`${basePath}.AttendeesList.Title`)}
            </span>
            {showEditView ? (
              <SwitchList
                maxAmount={maxAmount}
                usersList={usersList}
                setUsersList={setUsersList}
                attendeesList={attendeesList}
                setAttendeesList={setAttendeesList}
              />
            ) : attendeesList.length ? (
              <div className="flex flex-wrap gap-3">
                {attendeesList.map(({ name }, idx) => (
                  <div
                    key={idx}
                    className="border border-neutral-200 rounded-xl px-3 py-2 max-w-[150px] w-full whitespace-nowrap text-center"
                  >
                    {name}
                  </div>
                ))}
              </div>
            ) : (
              <span> {t(`${basePath}.AttendeesList.Empty`)}</span>
            )}
          </div>
        </div>
        {showEditView && (
          <FooterButtonsWrapper>
            <CustomButton
              color="secondary"
              onClick={() => {
                setParams([{ key: "action" }]);
                initializeState();
              }}
            >
              {t("Base.Buttons.Discard")}
            </CustomButton>
            <CustomButton isLoading={isLoading} onClick={handleEditBooking}>
              {t("Base.Buttons.Save")}
            </CustomButton>
          </FooterButtonsWrapper>
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
