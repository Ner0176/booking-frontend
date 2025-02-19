import { Trans, useTranslation } from "react-i18next";
import { CustomButton, DeleteModal, ErrorStrongContainer } from "../base";
import { IClass, IUserBooking, useCancelBooking } from "../../api";
import { format, isAfter } from "date-fns";
import { useNavigate } from "react-router-dom";
import { StrongLinkTag, UBClassCardContainer } from "./user-bookings.styled";
import { ClassCardContent } from "../class-management";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import { useSearchParamsManager } from "../../hooks";
import { Dispatch, SetStateAction } from "react";

const BUTTON_STYLES = {
  minWidth: 0,
  fontSize: 12,
  minHeight: 0,
  padding: "4px 6px 4px 6px",
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

  const originalClassData = (originalClass ?? classInstance) as IClass;

  const isCancelled = !!originalClassData.cancelled || !!cancelledAt;

  const now = new Date();
  const isPending = isAfter(new Date(originalClassData.date), now);

  return (
    <div className="flex flex-row gap-6 items-center last:mb-6">
      <UBClassCardContainer>
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
      {isCancelled && (
        <>
          <Icon className="size-8 text-neutral-400" path={mdiArrowRight} />
          <UBClassCardContainer>A</UBClassCardContainer>
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
