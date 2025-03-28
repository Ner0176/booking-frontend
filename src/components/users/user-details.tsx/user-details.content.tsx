import { Trans, useTranslation } from "react-i18next";
import {
  CustomInputField,
  DeleteModal,
  ErrorStrongContainer,
  SectionTitle,
} from "../../base";
import {
  IClass,
  IUser,
  useDeleteUser,
  useGetUserBookingsStats,
} from "../../../api";
import { useNavigate } from "react-router-dom";
import { formatTime, formatToLongDate } from "../../../utils";
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
      customSelectStyles={{ backgroundColor: "white" }}
    />
  );
};

export const UserClassItem = ({
  classInstance,
}: Readonly<{ classInstance: IClass }>) => {
  const navigate = useNavigate();

  const { id, date, endTime, startTime } = classInstance;

  return (
    <div
      onClick={() => navigate(`/management?class=${id}`)}
      className="flex flex-col gap-2 border-b bg-white hover:bg-neutral-50 py-4 px-6 cursor-pointer overflow-y-auto"
    >
      <div>{formatTime(startTime, endTime)}</div>
      <div>{formatToLongDate(date)}</div>
    </div>
  );
};

export const UserStats = ({ userId }: Readonly<{ userId: number }>) => {
  const { t } = useTranslation();
  const basePath = "Users.Details.Stats";

  const { data: userStats } = useGetUserBookingsStats(userId);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-3">
        <SectionTitle>{t(`${basePath}.Title`)}</SectionTitle>
        <div className="flex flex-col gap-4">
          {userStats &&
            Object.entries(userStats).map(([key, value]) => {
              return (
                <span>{t(`${basePath}.${key}`, { amount: value ?? "-" })}</span>
              );
            })}
        </div>
      </div>
    </div>
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
      <span>
        <Trans
          values={{ name, email }}
          i18nKey={"Users.Details.Delete.Description"}
          components={{ strong: <ErrorStrongContainer /> }}
        />
      </span>
    </DeleteModal>
  );
};
