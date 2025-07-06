import { useTranslation } from "react-i18next";
import {
  BookingStatus,
  IClass,
  IUser,
  IUserBooking,
  useGetBookingsFromUser,
  useGetUserBookingsStats,
  useHasAvailableCancellations,
} from "../../../api";
import {
  CardContainer,
  EmptyData,
  showToast,
  SwitchSelector,
} from "../../base";
import {
  DeleteUserModal,
  UserInfoField,
  UserSettingsMobile,
} from "./user-details.content";
import { useSearchParamsManager } from "../../../hooks";
import { useEffect, useState } from "react";
import emptyHistory from "../../../assets/images/noData/void.svg";
import { mdiAccountOutline, mdiEmailOutline, mdiPhoneOutline } from "@mdi/js";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";
import { isMobile } from "react-device-detect";
import { CancelBookingModal, UserBookingCard } from "../../user-bookings";

const CLASS_KEY_PARAM = "classType";
const CLASS_OPTIONS = ["pending", "completed", "cancelled"];

export const UserDetails = ({
  user,
  refetch,
}: Readonly<{ user: IUser; refetch(): void }>) => {
  const { t } = useTranslation();
  const basePath = "Users.Details";

  const { params, setParams } = useSearchParamsManager([
    CLASS_KEY_PARAM,
    "action",
    "modal",
    "visual",
  ]);
  const actionType = params.get("action");
  const selectedOption = params.get(CLASS_KEY_PARAM);
  const isCancelling = params.get("action") === "cancel";
  const showFiltersModal = params.get("modal") === "filters" && isMobile;

  const userVisual = params.get("visual");
  const showUserHistory = userVisual === "all" || userVisual === "history";
  const showUserDetails = userVisual === "all" || userVisual === "details";

  const { id, name, phone, email } = user;

  const [bookingToCancel, setBookingToCancel] = useState<IUserBooking>();

  const { data: hasCancellations, refetch: refetchAvailableCancellations } =
    useHasAvailableCancellations();
  const { data: userStats, isLoading: isLoadingStats } =
    useGetUserBookingsStats(id);
  const {
    data: userBookings,
    refetch: refetchBookings,
    isLoading: isLoadingBookings,
  } = useGetBookingsFromUser({
    userId: user.id,
    payload: {
      status: selectedOption ? (selectedOption as BookingStatus) : undefined,
    },
  });

  useEffect(() => {
    if (!userVisual) {
      setParams([{ key: "visual", value: isMobile ? "history" : "all" }]);
    }
  }, [setParams, userVisual]);

  useEffect(() => {
    if (!selectedOption) {
      setParams([{ key: CLASS_KEY_PARAM, value: "pending" }]);
    }
  }, [setParams, selectedOption]);

  const getSelectorOptions = () => {
    return CLASS_OPTIONS.map((option) => ({
      key: option,
      text: t(`${basePath}.SwitchOptions.${option}`),
    }));
  };

  const formatStat = (key: string, value: string) => {
    if (key === "firstday") {
      return !value ? "-" : format(new Date(value), "dd/MM/yyyy");
    }

    return value;
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
    <>
      <div className="flex flex-col gap-6 sm:gap-0 sm:grid sm:grid-cols-3 sm:justify-items-center size-full">
        {showUserHistory && (
          <div className="col-span-2 flex flex-col w-full px-4 sm:px-10 mt-4">
            <SwitchSelector
              keyParam={CLASS_KEY_PARAM}
              options={getSelectorOptions()}
            />
            {!!selectedOption && (
              <div className="flex flex-col gap-3 overflow-y-auto sm:h-[500px] mt-3">
                {isLoadingBookings ? (
                  [...Array(5)].map((_, idx) => (
                    <Skeleton key={idx} className="w-full h-[80px]" />
                  ))
                ) : !!userBookings && userBookings.length > 0 ? (
                  userBookings.map((booking, idx) => {
                    return (
                      <UserBookingCard
                        key={idx}
                        userId={user.id}
                        booking={booking}
                        hasCancellations={!!hasCancellations}
                        handleCancel={() => handleCancel(booking)}
                      />
                    );
                  })
                ) : (
                  <div className="mt-10">
                    <EmptyData
                      image={emptyHistory}
                      title={t(`${basePath}.Empty.${selectedOption}`)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {showUserDetails && (
          <div className="flex justify-center size-full px-4 sm:px-10 border-l border-neutral-200 pt-4">
            <CardContainer mainCard>
              <span className="font-semibold">
                {t(`${basePath}.Information`)}
              </span>
              <CardContainer>
                <span className="text-sm font-semibold">
                  {t(`${basePath}.Data`)}
                </span>
                <UserInfoField
                  value={name}
                  textKey="Name.Title"
                  icon={mdiAccountOutline}
                />
                <UserInfoField
                  value={email}
                  textKey="Email"
                  icon={mdiEmailOutline}
                />
                <UserInfoField
                  textKey="Phone"
                  icon={mdiPhoneOutline}
                  value={phone ? phone : "-"}
                />
              </CardContainer>
              <CardContainer>
                <span className="text-sm font-semibold">
                  {t(`${basePath}.Stats.Title`)}
                </span>
                <div className="flex flex-col gap-4">
                  {isLoadingStats
                    ? [...Array(4)].map((_, idx) => (
                        <Skeleton key={idx} className="w-full h-5" />
                      ))
                    : userStats &&
                      Object.entries(userStats).map(([key, value]) => {
                        return (
                          <span className="text-xs sm:text-sm">
                            {t(`${basePath}.Stats.${key}`, {
                              amount: formatStat(key, value),
                            })}
                          </span>
                        );
                      })}
                </div>
              </CardContainer>
            </CardContainer>
          </div>
        )}
      </div>
      {actionType === "delete-class" && (
        <DeleteUserModal
          user={user}
          refetch={refetch}
          handleClose={() => setParams([{ key: "action" }])}
        />
      )}
      {showFiltersModal && (
        <UserSettingsMobile
          handleClose={() => setParams([{ key: "modal" }])}
          handleDeleteClass={() => {
            setParams([
              { key: "modal" },
              { key: "action", value: "delete-class" },
            ]);
          }}
        />
      )}
      {isCancelling && bookingToCancel && (
        <CancelBookingModal
          bookingId={bookingToCancel.id}
          handleClose={() => {
            setBookingToCancel(undefined);
            setParams([{ key: "action" }]);
          }}
          refetch={() => {
            refetchBookings();
            refetchAvailableCancellations();
          }}
          classData={
            !!bookingToCancel.class
              ? bookingToCancel.class
              : (bookingToCancel.originalClass as IClass)
          }
        />
      )}
    </>
  );
};
