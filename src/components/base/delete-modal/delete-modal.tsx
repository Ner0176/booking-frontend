import { PropsWithChildren, useState } from "react";
import { useClickOutside } from "../../../hooks";
import { Modal } from "../modal";
import { useTranslation } from "react-i18next";
import { CustomButton } from "../button";
import {
  DeleteModalFooter,
  DeleteModalTitle,
  DeleteModalWrapper,
} from "./delete-modal.styled";
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
  const ref = useClickOutside(handleClose);

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

  return (
    <Modal>
      <DeleteModalWrapper ref={ref} style={{ width }}>
        <div className="flex flex-col gap-3">
          <DeleteModalTitle>{title}</DeleteModalTitle>
        </div>
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
        <DeleteModalFooter>
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
        </DeleteModalFooter>
      </DeleteModalWrapper>
    </Modal>
  );
};
