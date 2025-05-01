import { IUser } from "../../../api";
import { TFColumnWrapper, TFItemContainer } from "./transfer-list.styled";

export const TransferListColumn = ({
  users,
  onClick,
  isSelected,
  listMaxHeight,
}: Readonly<{
  users: IUser[];
  isSelected?: boolean;
  listMaxHeight?: number;
  onClick: (user: IUser) => void;
}>) => {
  return (
    <TFColumnWrapper style={{ maxHeight: listMaxHeight }}>
      {users.map((user, idx) => (
        <TFItemContainer
          key={idx}
          isSelected={isSelected}
          onClick={() => onClick(user)}
          className="hover:bg-purple-50 last:mb-3"
        >
          {user.name}
        </TFItemContainer>
      ))}
    </TFColumnWrapper>
  );
};
