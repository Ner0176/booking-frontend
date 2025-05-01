import { mdiArrowLeftRight } from "@mdi/js";
import Icon from "@mdi/react";
import { TFIconContainer } from "./transfer-list.styled";
import { TransferListColumn } from "./transfer-list.content";
import { IUser } from "../../../api";
import { Dispatch, SetStateAction } from "react";
import { showToast } from "../toast";
import { useTranslation } from "react-i18next";

export const UsersTransferList = ({
  listMaxSpots,
  listMaxHeight,
  assignedUsers,
  availableUsers,
  setAssignedUsers,
  setAvailableUsers,
}: Readonly<{
  listMaxSpots: number;
  listMaxHeight?: number;
  assignedUsers: IUser[];
  availableUsers: IUser[];
  setAssignedUsers: Dispatch<SetStateAction<IUser[]>>;
  setAvailableUsers: Dispatch<SetStateAction<IUser[]>>;
}>) => {
  const { t } = useTranslation();

  const moveUser = (
    user: IUser,
    from: IUser[],
    to: IUser[],
    setFrom: Dispatch<SetStateAction<IUser[]>>,
    setTo: Dispatch<SetStateAction<IUser[]>>,
    checkLimit = false
  ) => {
    if (checkLimit && to.length >= listMaxSpots) {
      showToast({
        type: "error",
        text: t("Classes.ClassMaxSpots", { amount: listMaxSpots }),
      });
      return;
    }

    setFrom(from.filter(({ id }) => id !== user.id));
    setTo([...to, user]);
  };

  return (
    <div className="flex flex-row items-center gap-3">
      <TransferListColumn
        users={availableUsers}
        listMaxHeight={listMaxHeight}
        onClick={(user) =>
          moveUser(
            user,
            availableUsers,
            assignedUsers,
            setAvailableUsers,
            setAssignedUsers,
            true
          )
        }
      />
      <TFIconContainer>
        <Icon
          path={mdiArrowLeftRight}
          className="size-3.5 sm:size-4 text-neutral-400"
        />
      </TFIconContainer>
      <TransferListColumn
        isSelected
        users={assignedUsers}
        listMaxHeight={listMaxHeight}
        onClick={(user) =>
          moveUser(
            user,
            assignedUsers,
            availableUsers,
            setAssignedUsers,
            setAvailableUsers
          )
        }
      />
    </div>
  );
};
