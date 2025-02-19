import {
  BookingType,
  IAccount,
  IClass,
  IUserBooking,
  useGetBookingsFromUser,
} from "../../api";
import { useSearchParamsManager, useUser } from "../../hooks";
import { CustomButton, DashboardSkeleton } from "../base";
import {
  CalendarFilters,
  ClassCardContent,
  ClassDatesFilter,
  ClassStatusType,
} from "../class-management";
import { useTranslation } from "react-i18next";
import { Fragment, useState } from "react";
import { UBClassCardContainer } from "./user-bookings.styled";
import { CancelBookingModal } from "./user-bookings.content";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

const BUTTON_STYLES = {
  minWidth: 0,
  fontSize: 12,
  minHeight: 0,
  padding: "4px 6px 4px 6px",
};

export const UserBookingsDashboard = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["action"]);
  const isCancelling = params.get("action") === "cancel";

  const [datesFilter, setDatesFilter] = useState<ClassDatesFilter>({});
  const [bookingToCancel, setBookingToCancel] = useState<IUserBooking>();
  const [statusFilter, setStatusFilter] = useState<ClassStatusType>("all");

  const { data, refetch } = useGetBookingsFromUser(
    +(user as IAccount).id,
    {
      status:
        statusFilter === "all" ? undefined : (statusFilter as BookingType),
    },
    !!user
  );

  return (
    <DashboardSkeleton title={t("UserBookings.Title")}>
      <CalendarFilters
        datesFilter={datesFilter}
        statusFilter={statusFilter}
        setDatesFilter={setDatesFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="flex flex-col gap-4 items-center w-full h-full overflow-y-auto">
        {data?.map((booking, idx) => {
          const { status, originalClass, class: classInstance } = booking;

          const originalClassData = (originalClass ?? classInstance) as IClass;
          const isCancelled =
            originalClassData.cancelled || status === "cancelled";

          return (
            <div
              key={idx}
              className="flex flex-row gap-6 items-center last:mb-6"
            >
              <UBClassCardContainer>
                <ClassCardContent
                  data={{ ...originalClassData, cancelled: isCancelled }}
                />
                {status !== "cancelled" && (
                  <div className="absolute top-4 right-4 z-10">
                    <CustomButton
                      type="error"
                      color="secondary"
                      styles={BUTTON_STYLES}
                      onClick={() => {
                        setBookingToCancel(booking);
                        setParams([{ key: "action", value: "cancel" }]);
                      }}
                    >
                      {t("UserBookings.Cancel.Title")}
                    </CustomButton>
                  </div>
                )}
              </UBClassCardContainer>
              {isCancelled && (
                <Fragment>
                  <Icon
                    className="size-8 text-neutral-400"
                    path={mdiArrowRight}
                  />
                  <UBClassCardContainer>A</UBClassCardContainer>
                </Fragment>
              )}
            </div>
          );
        })}
      </div>
      {isCancelling && bookingToCancel && (
        <CancelBookingModal
          refetch={refetch}
          bookingId={bookingToCancel.id}
          classData={
            !!bookingToCancel.class
              ? bookingToCancel.class
              : (bookingToCancel.originalClass as IClass)
          }
          handleClose={() => {
            setBookingToCancel(undefined);
            setParams([{ key: "action" }]);
          }}
        />
      )}
    </DashboardSkeleton>
  );
};
