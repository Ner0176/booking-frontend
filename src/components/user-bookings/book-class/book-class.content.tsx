import { useTranslation } from "react-i18next";
import { CustomButton, CustomInputField, Modal } from "../../base";
import { IClass, useRecoverBooking } from "../../../api";
import { format } from "date-fns";
import { BookModalInputWrapper } from "./book-class.styled";

const BASE_PATH = "UserBookings.BookClass";
export const BookClassModal = ({
  bookingId,
  handleClose,
  handleRefetch,
  selectedClass,
}: Readonly<{
  bookingId: number;
  handleClose(): void;
  selectedClass: IClass;
  handleRefetch(): void;
}>) => {
  const { t } = useTranslation();

  const { id, date, startTime, endTime, currentCount, maxAmount } =
    selectedClass;

  const { mutate: recoverBooking, isPending: isLoading } =
    useRecoverBooking(handleRefetch);

  const footer = (
    <>
      <CustomButton color="secondary" onClick={handleClose}>
        {t("Base.Buttons.Cancel")}
      </CustomButton>
      <CustomButton
        isLoading={isLoading}
        onClick={() => {
          recoverBooking({ bookingId, classId: id });
        }}
      >
        {t(`${BASE_PATH}.Book`)}
      </CustomButton>
    </>
  );

  return (
    <Modal
      footer={footer}
      handleClose={handleClose}
      title={t(`${BASE_PATH}.Title`)}
    >
      <div className="flex flex-col gap-3">
        <BookModalInputWrapper>
          <CustomInputField
            isDisabled
            title={t(`${BASE_PATH}.Fields.Date`)}
            value={format(new Date(date), "dd/MM/yyyy")}
          />
          <CustomInputField
            isDisabled
            value={`${maxAmount - currentCount}`}
            title={t(`${BASE_PATH}.Fields.FreeSpots`)}
          />
        </BookModalInputWrapper>
        <BookModalInputWrapper>
          <CustomInputField
            isDisabled
            value={startTime}
            title={t(`${BASE_PATH}.Fields.Start`)}
          />
          <CustomInputField
            isDisabled
            value={endTime}
            title={t(`${BASE_PATH}.Fields.End`)}
          />
        </BookModalInputWrapper>
      </div>
    </Modal>
  );
};
