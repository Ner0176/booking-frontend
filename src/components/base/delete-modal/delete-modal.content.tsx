import { CustomInputField } from "../input";
import { Trans, useTranslation } from "react-i18next";
import { ErrorStrongContainer } from "../styled-components";

const BASE_PATH = "Base.DeleteConfirmation";
export const DeleteModalConfirmation = ({
  showInputError,
  confirmationText,
  setConfirmationText,
}: Readonly<{
  showInputError: boolean;
  confirmationText: string;
  setConfirmationText(v: string): void;
}>) => {
  const { t } = useTranslation();
  return (
    <>
      <span className="text-sm sm:text-base">
        <Trans
          i18nKey={t(`${BASE_PATH}.Description`)}
          components={{
            strong: <ErrorStrongContainer />,
          }}
        />
      </span>
      <CustomInputField
        title=""
        value={confirmationText}
        handleChange={setConfirmationText}
        placeholder={t(`${BASE_PATH}.Key`)}
        customStyles={{ borderColor: showInputError ? "red" : undefined }}
      />
    </>
  );
};
