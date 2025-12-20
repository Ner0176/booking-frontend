import { Trans, useTranslation } from "react-i18next";
import { CustomButton, DeleteModal, ErrorStrongContainer } from "../base";
import {
  IClass,
  IUserBooking,
  useCancelBooking,
  useGetClassConfigs,
} from "../../api";
import { addDays, format, isBefore } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  LostClassText,
  StrongLinkTag,
  UBClassCardsContainer,
  UBClassCardWrapper,
} from "./user-bookings.styled";
import { ClassCardContent, ItemInfoRow } from "../class-management";
import Icon from "@mdi/react";
import {
  mdiArrowDown,
  mdiArrowRight,
  mdiCalendarAlertOutline,
  mdiCalendarRemoveOutline,
} from "@mdi/js";
import { useSearchParamsManager } from "../../hooks";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useUser } from "../../stores";

const RecoverBookingCard = ({
  classDate,
  cancelledAt,
  handleClick,
  hideRecoverButton,
}: Readonly<{
  classDate: Date;
  cancelledAt: Date;
  handleClick(): void;
  hideRecoverButton?: boolean;
}>) => {
  const { t } = useTranslation();

  const [canRecover, setCanRecover] = useState(true);
  const [maxRecoveryDay, setMaxRecoveryDay] = useState("");

  const { data: configs } = useGetClassConfigs();

  useEffect(() => {
    if (!!configs) {
      const start = new Date(classDate);
      const end = addDays(start, configs.maxRecoveryDays);

      setCanRecover(isBefore(new Date(), end));
      setMaxRecoveryDay(format(end, "dd/MM/yyyy"));
    }
  }, [configs, classDate]);

  return (
    <>
      <UBClassCardWrapper className="justify-center shadow-sm hover:border-violet-100 hover:bg-[#F5F3FF80]">
        <ItemInfoRow icon={mdiCalendarRemoveOutline}>
          {t(`UserBookings.CancelledAt`, {
            date: format(new Date(cancelledAt), "dd/MM/yyyy"),
          })}
        </ItemInfoRow>
        <ItemInfoRow icon={mdiCalendarAlertOutline}>
          {t(`UserBookings.RecoveryLimit`, { date: maxRecoveryDay })}
        </ItemInfoRow>
        {!hideRecoverButton && (
          <div className="flex justify-center w-full mt-2">
            {canRecover ? (
              <CustomButton
                color="secondary"
                onClick={handleClick}
                styles={{
                  minHeight: 0,
                  width: "100%",
                  fontSize: isMobile ? 12 : 14,
                  padding: isMobile ? "5px 10px 5px 10px" : "6px 12px 6px 12px",
                }}
              >
                {t("UserBookings.RecoverClass")}
              </CustomButton>
            ) : (
              <LostClassText>{t("UserBookings.LostClass")}</LostClassText>
            )}
          </div>
        )}
      </UBClassCardWrapper>
    </>
  );
};

export const UserBookingCard = ({
  userId,
  booking,
  handleCancel,
  hasCancellations,
  hideRecoverButton,
}: Readonly<{
  userId?: number;
  booking: IUserBooking;
  handleCancel?: () => void;
  hasCancellations?: boolean;
  hideRecoverButton?: boolean;
}>) => {
  const user = useUser();
  const navigate = useNavigate();
  const { setParams } = useSearchParamsManager([]);

  const { id, cancelledAt, originalClass, class: currentClass } = booking;

  if (!originalClass && !currentClass) return <div />;

  const cancelledByAdmin = !!currentClass?.cancelled;
  const cancelledByUser = !!cancelledAt && !currentClass?.cancelled;
  const isCancelled = cancelledByAdmin || cancelledByUser;

  const leftCardData = cancelledByUser ? originalClass : currentClass;
  const showRecoverCard =
    (cancelledByUser && !currentClass) || (cancelledByAdmin && !originalClass);

  return (
    <UBClassCardsContainer className="last:mb-6" isCancelled={isCancelled}>
      <UBClassCardWrapper isCancelled={isCancelled}>
        <ClassCardContent
          handleCancelBooking={handleCancel}
          hasCancellations={hasCancellations}
          data={{
            ...(leftCardData as IClass),
            cancelled: isCancelled,
          }}
        />
      </UBClassCardWrapper>
      {isCancelled && (
        <>
          <Icon
            path={isMobile ? mdiArrowDown : mdiArrowRight}
            className="size-5 sm:size-8 text-neutral-400 flex-shrink-0"
          />
          {showRecoverCard ? (
            <RecoverBookingCard
              hideRecoverButton={hideRecoverButton}
              cancelledAt={cancelledAt ?? new Date()}
              classDate={originalClass?.date ?? new Date()}
              handleClick={() =>
                !!user?.isAdmin && userId
                  ? navigate(`/bookings?booking=${id}&userId=${userId}`)
                  : setParams([{ key: "booking", value: `${id}` }])
              }
            />
          ) : (
            <UBClassCardWrapper>
              <ClassCardContent data={currentClass as IClass} />
            </UBClassCardWrapper>
          )}
        </>
      )}
    </UBClassCardsContainer>
  );
};

export const CancelBookingModal = ({
  userId,
  refetch,
  bookingId,
  classData,
  handleClose,
}: Readonly<{
  userId: number;
  refetch(): void;
  bookingId: number;
  classData: IClass;
  handleClose(): void;
}>) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { date, endTime, startTime } = classData;

  const handleSuccess = () => {
    refetch();
    handleClose();
  };

  const { mutate: cancelBooking, isPending: isLoading } =
    useCancelBooking(handleSuccess);

  const getBookingDate = () => {
    return `${format(date, "dd/MM/yyyy")} ${startTime}-${endTime}`;
  };

  return (
    <DeleteModal
      isDeleting={isLoading}
      handleClose={handleClose}
      title={t("UserBookings.Cancel.Title")}
      mainButtonText={t("UserBookings.Cancel.Title")}
      handleDelete={() => cancelBooking({ bookingId, userId })}
    >
      <span className="text-xs sm:text-base text-justify sm:text-start">
        <Trans
          values={{ date: getBookingDate() }}
          i18nKey={"UserBookings.Cancel.Description"}
          components={{
            newLine: <br />,
            strong: <ErrorStrongContainer />,
            strongLink: <StrongLinkTag onClick={() => navigate("/policies")} />,
          }}
        />
      </span>
    </DeleteModal>
  );
};
