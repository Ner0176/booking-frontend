import { Trans, useTranslation } from "react-i18next";
import {
  ActionCard,
  CustomButton,
  CustomInputField,
  DeleteModal,
  ErrorStrongContainer,
  Modal,
  SwitchSelector,
} from "../../base";
import { IUser, useDeleteUser } from "../../../api";
import { useSearchParamsManager } from "../../../hooks";

export const UserInfoField = ({
  icon,
  value,
  textKey,
}: Readonly<{ icon: string; textKey: string; value: string }>) => {
  const { t } = useTranslation();

  return (
    <CustomInputField
      isDisabled
      value={value}
      icon={{ name: icon }}
      title={t(`Auth.Fields.${textKey}`)}
    />
  );
};

export const DeleteUserModal = ({
  user,
  refetch,
  handleClose,
}: Readonly<{ user: IUser; refetch(): void; handleClose: () => void }>) => {
  const { t } = useTranslation();
  const { setParams } = useSearchParamsManager([]);

  const { id, name, email } = user;

  const handleSuccess = () => {
    refetch();
    setParams([{ key: "classType" }, { key: "userId" }, { key: "action" }]);
  };

  const { mutate: deleteUser, isPending: isDeleting } =
    useDeleteUser(handleSuccess);

  return (
    <DeleteModal
      isDeleting={isDeleting}
      handleClose={handleClose}
      handleDelete={() => deleteUser(id)}
      title={t("Users.Details.Delete.Title")}
    >
      <span className="text-xs sm:text-base text-justify sm:text-start">
        <Trans
          values={{ name, email }}
          i18nKey={"Users.Details.Delete.Description"}
          components={{ strong: <ErrorStrongContainer /> }}
        />
      </span>
    </DeleteModal>
  );
};

export const UserSettingsMobile = ({
  handleClose,
  handleDeleteClass,
}: Readonly<{
  handleClose(): void;
  handleDeleteClass(): void;
}>) => {
  const { t } = useTranslation();
  const basePath = "Users.Details.Filters";

  return (
    <Modal title={t(`${basePath}.Title`)} handleClose={handleClose}>
      <div className="flex flex-col gap-3">
        <SwitchSelector
          keyParam="visual"
          customStyles={{ paddingTop: 12, paddingBottom: 12 }}
          options={[
            { key: "history", text: t(`${basePath}.Switch.History`) },
            { key: "details", text: t(`${basePath}.Switch.Details`) },
          ]}
        />
        <ActionCard
          title={t(`${basePath}.Delete.Title`)}
          description={t(`${basePath}.Delete.Description`)}
        >
          <CustomButton
            type={"error"}
            color="secondary"
            onClick={handleDeleteClass}
            styles={{ fontSize: 12, paddingBottom: 6, paddingTop: 6 }}
          >
            {t(`${basePath}.Delete.Button`)}
          </CustomButton>
        </ActionCard>
      </div>
    </Modal>
  );
};
