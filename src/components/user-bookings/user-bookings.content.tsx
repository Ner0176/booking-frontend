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
  UBClassCardContainer,
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

const RecoverBookingCard = ({
  cancelledAt,
  handleClick,
}: Readonly<{ cancelledAt: Date; handleClick(): void }>) => {
  const { t } = useTranslation();

  const [canRecover, setCanRecover] = useState(true);
  const [maxRecoveryDay, setMaxRecoveryDay] = useState("");

  const { data: configs } = useGetClassConfigs();

  useEffect(() => {
    if (!!cancelledAt && !!configs) {
      const start = new Date(cancelledAt);
      const end = addDays(start, configs.maxRecoveryDays);

      setCanRecover(isBefore(new Date(), end));
      setMaxRecoveryDay(format(end, "dd/MM/yyyy"));
    }
  }, [configs, cancelledAt]);

  return (
    <>
      <UBClassCardContainer className="justify-center shadow-sm hover:border-violet-100 hover:bg-[#F5F3FF80]">
        <ItemInfoRow icon={mdiCalendarRemoveOutline}>
          {t(`UserBookings.CancelledAt`, {
            date: format(new Date(cancelledAt), "dd/MM/yyyy"),
          })}
        </ItemInfoRow>
        <ItemInfoRow icon={mdiCalendarAlertOutline}>
          {t(`UserBookings.RecoveryLimit`, { date: maxRecoveryDay })}
        </ItemInfoRow>
        <div className="flex justify-center w-full mt-2">
          {canRecover ? (
            <CustomButton
              color="secondary"
              onClick={handleClick}
              styles={{
                fontSize: 14,
                minHeight: 0,
                width: "100%",
                padding: "6px 12px 6px 12px",
              }}
            >
              {t("UserBookings.RecoverClass")}
            </CustomButton>
          ) : (
            <LostClassText>{t("UserBookings.LostClass")}</LostClassText>
          )}
        </div>
      </UBClassCardContainer>
    </>
  );
};

export const UserBookingCard = ({
  booking,
  handleCancel,
}: Readonly<{
  handleCancel(): void;
  booking: IUserBooking;
}>) => {
  const { setParams } = useSearchParamsManager([]);

  const { id, cancelledAt, originalClass, class: classInstance } = booking;
  const isCancelled = !!classInstance?.cancelled || !!cancelledAt;

  if (!originalClass && !classInstance) return <div />;

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center last:mb-6">
      <UBClassCardContainer isCancelled={isCancelled}>
        <ClassCardContent
          handleCancelBooking={handleCancel}
          data={{
            ...((classInstance ?? originalClass) as IClass),
            cancelled: isCancelled,
          }}
        />
      </UBClassCardContainer>
      {!!cancelledAt && (
        <>
          <Icon
            className="size-5 sm:size-8 text-neutral-400"
            path={isMobile ? mdiArrowDown : mdiArrowRight}
          />
          {!classInstance ? (
            <RecoverBookingCard
              cancelledAt={cancelledAt}
              handleClick={() =>
                setParams([{ key: "booking", value: `${id}` }])
              }
            />
          ) : (
            <UBClassCardContainer>
              <ClassCardContent data={classInstance} />
            </UBClassCardContainer>
          )}
        </>
      )}
    </div>
  );
};

export const CancelBookingModal = ({
  refetch,
  bookingId,
  classData,
  handleClose,
}: Readonly<{
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
      handleDelete={() => cancelBooking(bookingId)}
      mainButtonText={t("UserBookings.Cancel.Title")}
    >
      <span>
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
