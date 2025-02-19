import { Trans, useTranslation } from "react-i18next";
import { DeleteModal, ErrorStrongContainer } from "../base";
import { IClass, useCancelBooking } from "../../api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { StrongLinkTag } from "./user-bookings.styled";

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
