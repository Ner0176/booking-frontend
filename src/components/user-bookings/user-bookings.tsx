import {
  IAccount,
  IClass,
  IUserBooking,
  useGetBookingsFromUser,
} from "../../api";
import { useSearchParamsManager, useUser } from "../../hooks";
import { DashboardSkeleton, NoDataComponent } from "../base";
import {
  CalendarFilters,
  ClassDatesFilter,
  ClassStatusType,
} from "../class-management";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CancelBookingModal, UserBookingCard } from "./user-bookings.content";
import Skeleton from "react-loading-skeleton";
import noDataLoading from "../../assets/images/noData/woman-not-found.svg";

export const UserBookingsDashboard = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["action"]);
  const isCancelling = params.get("action") === "cancel";

  const [datesFilter, setDatesFilter] = useState<ClassDatesFilter>({});
  const [bookingToCancel, setBookingToCancel] = useState<IUserBooking>();
  const [statusFilter, setStatusFilter] = useState<ClassStatusType>("all");

  const { data, refetch, isLoading } = useGetBookingsFromUser(
    +(user as IAccount).id,
    {
      ...datesFilter,
      ...(statusFilter === "all" ? {} : { status: statusFilter }),
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
        {isLoading ? (
          [...Array(6)].map((key) => (
            <Skeleton
              key={key}
              style={{
                width: 350,
                height: 175,
                borderRadius: 16,
              }}
            />
          ))
        ) : data && data.length > 0 ? (
          data.map((booking, idx) => {
            return (
              <UserBookingCard
                key={idx}
                booking={booking}
                setBookingToCancel={setBookingToCancel}
              />
            );
          })
        ) : (
          <NoDataComponent
            imageSize={225}
            image={noDataLoading}
            title={t("UserBookings.NoData")}
          />
        )}
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
