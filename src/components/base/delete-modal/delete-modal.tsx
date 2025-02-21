import { PropsWithChildren, useState } from "react";
import { Modal } from "../modal";
import { useTranslation } from "react-i18next";
import { CustomButton } from "../button";
import { DeleteModalConfirmation } from "./delete-modal.content";

export const DeleteModal = ({
  title,
  width,
  children,
  isDeleting,
  handleClose,
  handleDelete,
  mainButtonText,
  checkValidations,
}: Readonly<
  PropsWithChildren<{
    title: string;
    width?: string;
    isDeleting: boolean;
    handleClose(): void;
    handleDelete(): void;
    mainButtonText?: string;
    checkValidations?(): boolean;
  }>
>) => {
  const { t } = useTranslation();

  const VALID_CONFIRMATION = t("Base.DeleteConfirmation.Key");

  const [confirmationText, setConfirmationText] = useState<string>("");
  const [showInputError, setShowInputError] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleOnDelete = () => {
    if (showConfirmation) {
      confirmationText === VALID_CONFIRMATION
        ? handleDelete()
        : setShowInputError(true);
    } else if (!checkValidations || checkValidations()) {
      setShowConfirmation(true);
    }
  };

  const footer = (
    <>
      <CustomButton type="error" color="secondary" onClick={handleClose}>
        {t("Base.Buttons.Cancel")}
      </CustomButton>
      <CustomButton
        type="error"
        color="primary"
        isLoading={isDeleting}
        onClick={handleOnDelete}
      >
        {mainButtonText ?? t("Base.Buttons.Delete")}
      </CustomButton>
    </>
  );

  return (
    <Modal
      type="delete"
      title={title}
      width={width}
      footer={footer}
      handleClose={handleClose}
    >
      <div className="flex flex-col gap-3.5">
        {showConfirmation ? (
          <DeleteModalConfirmation
            showInputError={showInputError}
            confirmationText={confirmationText}
            setConfirmationText={(v) => {
              setConfirmationText(v);
              if (showInputError && v === VALID_CONFIRMATION)
                setShowInputError(false);
            }}
          />
        ) : (
          children
        )}
      </div>
    </Modal>
  );
};
