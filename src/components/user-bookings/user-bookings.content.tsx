import { Trans, useTranslation } from "react-i18next";
import { CustomButton, DeleteModal, ErrorStrongContainer } from "../base";
import {
  IClass,
  IUserBooking,
  useCancelBooking,
  useGetClassConfigs,
} from "../../api";
import { addDays, format, isAfter, isBefore } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  LostClassText,
  StrongLinkTag,
  UBClassCardContainer,
} from "./user-bookings.styled";
import { ClassCardContent, ItemInfoRow } from "../class-management";
import Icon from "@mdi/react";
import {
  mdiArrowRight,
  mdiCalendarAlertOutline,
  mdiCalendarRemoveOutline,
} from "@mdi/js";
import { useSearchParamsManager } from "../../hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const BUTTON_STYLES = {
  minWidth: 0,
  fontSize: 12,
  minHeight: 0,
  padding: "4px 6px 4px 6px",
};

const RecoverBookingCard = ({
  cancelledAt,
}: Readonly<{ cancelledAt: Date }>) => {
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
      <Icon className="size-8 text-neutral-400" path={mdiArrowRight} />
      <UBClassCardContainer className="justify-center shadow-sm  hover:border-violet-100 hover:bg-[#F5F3FF80]">
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
  setBookingToCancel,
}: Readonly<{
  booking: IUserBooking;
  setBookingToCancel: Dispatch<SetStateAction<IUserBooking | undefined>>;
}>) => {
  const { t } = useTranslation();
  const { setParams } = useSearchParamsManager([]);

  const { cancelledAt, originalClass, class: classInstance } = booking;

  const now = new Date();
  const originalClassData = (originalClass ?? classInstance) as IClass;
  const isCancelled = !!originalClassData.cancelled || !!cancelledAt;
  const isPending = isAfter(new Date(originalClassData.date), now);

  return (
    <div className="flex flex-row gap-6 items-center last:mb-6">
      <UBClassCardContainer isCancelled={isCancelled}>
        <ClassCardContent
          data={{ ...originalClassData, cancelled: isCancelled }}
        />
        {!cancelledAt && isPending && (
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
      {!!cancelledAt && <RecoverBookingCard cancelledAt={cancelledAt} />}
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
