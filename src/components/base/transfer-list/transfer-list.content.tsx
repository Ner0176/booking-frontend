import { Dispatch, SetStateAction } from "react";
import { IUser } from "../../../api";
import { TFColumnWrapper, TFItemContainer } from "./transfer-list.styled";

export const TransferListColumn = ({
  list,
  setList,
  isSelected,
  listMaxHeight,
  setOppositeList,
}: Readonly<{
  list: IUser[];
  isSelected?: boolean;
  listMaxHeight?: number;
  setList: Dispatch<SetStateAction<IUser[]>>;
  setOppositeList: Dispatch<SetStateAction<IUser[]>>;
}>) => {
  const handleSelect = (user: IUser) => {
    setList((prev) => {
      return prev.filter(({ id }) => user.id !== id);
    });
    setOppositeList((prev) => [...prev, user]);
  };

  return (
    <TFColumnWrapper style={{ maxHeight: listMaxHeight }}>
      {list.map((user, idx) => (
        <TFItemContainer
          key={idx}
          isSelected={isSelected}
          onClick={() => handleSelect(user)}
          className="hover:bg-purple-50 last:mb-3"
        >
          {user.name}
        </TFItemContainer>
      ))}
    </TFColumnWrapper>
  );
};
