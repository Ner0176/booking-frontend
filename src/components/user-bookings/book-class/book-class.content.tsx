import { useTranslation } from "react-i18next";
import { CustomButton, CustomInputField, Modal } from "../../base";
import { IClass, useRecoverBooking } from "../../../api";
import { format } from "date-fns";

export const BookClassModal = ({
  bookingId,
  handleClose,
  selectedClass,
}: Readonly<{
  bookingId: number;
  handleClose(): void;
  selectedClass: IClass;
}>) => {
  const { t } = useTranslation();

  const { id, date, startTime, endTime, currentCount, maxAmount } =
    selectedClass;

  const { mutate: recoverBooking, isPending: isLoading } = useRecoverBooking();

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
        {t("UserBookings.BookClass.Book")}
      </CustomButton>
    </>
  );

  return (
    <Modal
      footer={footer}
      handleClose={handleClose}
      title={t("UserBookings.BookClass.Title")}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between gap-5">
          <CustomInputField
            isDisabled
            title="Fecha"
            value={format(new Date(date), "dd/MM/yyyy")}
          />
          <CustomInputField
            isDisabled
            title="Plazas disponibles"
            value={`${maxAmount - currentCount}`}
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-5">
          <CustomInputField
            isDisabled
            value={startTime}
            title="Horario de inicio"
          />
          <CustomInputField isDisabled value={endTime} title="Horario fin" />
        </div>
      </div>
    </Modal>
  );
};
