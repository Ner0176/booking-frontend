import {
  IAccount,
  IClass,
  IUserBooking,
  useGetBookingsFromUser,
  useHasAvailableCancellations,
} from "../../api";
import { useSearchParamsManager } from "../../hooks";
import { DashboardSkeleton, EmptyData, HeaderButton, showToast } from "../base";
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
import { BookClassDashboard } from "./book-class";
import { useUser } from "../../stores";
import { mdiTuneVariant } from "@mdi/js";
import { isMobile } from "react-device-detect";

export const UserBookingsDashboard = () => {
  const user = useUser();
  const { t } = useTranslation();

  const { params, setParams } = useSearchParamsManager(["action", "booking"]);

  const selectedBooking = params.get("booking");
  const isCancelling = params.get("action") === "cancel";

  const [datesFilter, setDatesFilter] = useState<ClassDatesFilter>({});
  const [bookingToCancel, setBookingToCancel] = useState<IUserBooking>();
  const [statusFilter, setStatusFilter] = useState<ClassStatusType>("all");

  const { data: hasCancellations, refetch: refetchAvailableCancellations } =
    useHasAvailableCancellations();
  const {
    isLoading,
    data: userBookings,
    refetch: refetchBookings,
  } = useGetBookingsFromUser({
    enabled: !!user,
    userId: +(user as IAccount).id,
    payload: {
      ...datesFilter,
      ...(statusFilter === "all" ? {} : { status: statusFilter }),
    },
  });

  console.log("userBookings", userBookings);

  const getTitle = () => {
    return t(
      selectedBooking ? "UserBookings.BookClass.Title" : "UserBookings.Title"
    );
  };

  const handleRefetch = () => {
    refetchBookings();
    refetchAvailableCancellations();
  };

  const handleCancel = (booking: IUserBooking) => {
    if (!hasCancellations) {
      showToast({
        type: "error",
        text: t("UserBookings.Cancel.Exhausted"),
      });
    } else {
      setBookingToCancel(booking);
      setParams([{ key: "action", value: "cancel" }]);
    }
  };

  return (
    <DashboardSkeleton
      title={getTitle()}
      rightHeader={
        isMobile ? (
          <HeaderButton
            color="primary"
            icon={mdiTuneVariant}
            tPath="Base.Buttons.Options"
            onClick={() => setParams([{ key: "modal", value: "filters" }])}
          />
        ) : undefined
      }
      goBack={{ showButton: !!selectedBooking, path: "/bookings" }}
    >
      {selectedBooking ? (
        <BookClassDashboard handleRefetch={handleRefetch} />
      ) : (
        <>
          <CalendarFilters
            datesFilter={datesFilter}
            statusFilter={statusFilter}
            setDatesFilter={setDatesFilter}
            setStatusFilter={setStatusFilter}
          />
          <div className="flex flex-col gap-4 items-center w-full h-full overflow-y-auto">
            {isLoading ? (
              <div className="flex flex-col gap-3 w-full">
                {[...Array(6)].map((key) => (
                  <Skeleton
                    key={key}
                    className="w-full h-[175px]"
                    style={{ borderRadius: 16 }}
                  />
                ))}
              </div>
            ) : userBookings && userBookings.length > 0 ? (
              userBookings.map((booking, idx) => {
                return (
                  <UserBookingCard
                    key={idx}
                    booking={booking}
                    hasCancellations={!!hasCancellations}
                    handleCancel={() => handleCancel(booking)}
                  />
                );
              })
            ) : (
              <EmptyData
                imageSize={225}
                image={noDataLoading}
                title={t("UserBookings.NoData")}
              />
            )}
          </div>
          {isCancelling && bookingToCancel && (
            <CancelBookingModal
              refetch={handleRefetch}
              bookingId={bookingToCancel.id}
              handleClose={() => {
                setBookingToCancel(undefined);
                setParams([{ key: "action" }]);
              }}
              classData={
                !!bookingToCancel.class
                  ? bookingToCancel.class
                  : (bookingToCancel.originalClass as IClass)
              }
            />
          )}
        </>
      )}
    </DashboardSkeleton>
  );
};
