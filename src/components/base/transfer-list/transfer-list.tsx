import { mdiArrowLeftRight } from "@mdi/js";
import Icon from "@mdi/react";
import { TFIconContainer } from "./transfer-list.styled";
import { TransferListColumn } from "./transfer-list.content";
import { IUser } from "../../../api";
import { Dispatch, SetStateAction } from "react";

export const UsersTransferList = ({
  listMaxHeight,
  assignedUsers,
  availableUsers,
  setAssignedUsers,
  setAvailableUsers,
}: Readonly<{
  listMaxHeight?: number;
  assignedUsers: IUser[];
  availableUsers: IUser[];
  setAssignedUsers: Dispatch<SetStateAction<IUser[]>>;
  setAvailableUsers: Dispatch<SetStateAction<IUser[]>>;
}>) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <TransferListColumn
        list={availableUsers}
        setList={setAvailableUsers}
        listMaxHeight={listMaxHeight}
        setOppositeList={setAssignedUsers}
      />
      <TFIconContainer>
        <Icon
          path={mdiArrowLeftRight}
          className="size-3.5 sm:size-4 text-neutral-400"
        />
      </TFIconContainer>
      <TransferListColumn
        isSelected
        list={assignedUsers}
        setList={setAssignedUsers}
        listMaxHeight={listMaxHeight}
        setOppositeList={setAvailableUsers}
      />
    </div>
  );
};
