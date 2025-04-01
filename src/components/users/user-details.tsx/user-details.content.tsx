import { Trans, useTranslation } from "react-i18next";
import {
  CustomInputField,
  DeleteModal,
  ErrorStrongContainer,
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
