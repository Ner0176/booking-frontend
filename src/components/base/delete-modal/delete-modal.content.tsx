import { CustomInputField } from "../input";
import { Trans, useTranslation } from "react-i18next";
import { ErrorStrongContainer } from "../styled-components";

const BASE_PATH = "Base.DeleteConfirmation";
export const DeleteModalConfirmation = ({
  handleBlur,
  showInputError,
  confirmationText,
  setConfirmationText,
}: Readonly<{
  showInputError: boolean;
  confirmationText: string;
  handleBlur(v: string): void;
  setConfirmationText(v: string): void;
}>) => {
  const { t } = useTranslation();
  return (
    <>
      <span className="text-xs sm:text-base">
        <Trans
          i18nKey={t(`${BASE_PATH}.Description`)}
          components={{
            strong: <ErrorStrongContainer />,
          }}
        />
      </span>
      <CustomInputField
        handleBlur={handleBlur}
        value={confirmationText}
        handleChange={setConfirmationText}
        placeholder={t(`${BASE_PATH}.Key`)}
        customSelectStyles={{
          borderColor: showInputError ? "red" : undefined,
        }}
        error={showInputError ? t(`${BASE_PATH}.Error`) : undefined}
      />
    </>
  );
};
