import { mdiArrowRight, mdiTrashCanOutline } from "@mdi/js";
import { HeaderButton } from "../base";
import { useSearchParamsManager } from "../../hooks";
import { IUser } from "../../api";
import Icon from "@mdi/react";
import { useState } from "react";
import {
  UserCardButton,
  UserCardContainer,
  UserCardSubtitle,
  UserCardTitle,
} from "./users.styled";
import { isMobile } from "react-device-detect";

export const UserHeaderButtons = () => {
  const { setParams } = useSearchParamsManager([]);

  return (
    <div className="flex flex-row items-center justify-end gap-4 w-full">
      <HeaderButton
        color="secondary"
        icon={mdiTrashCanOutline}
        tPath={"Users.Details.Delete.Title"}
        size={isMobile ? "small" : "default"}
        onClick={() => setParams([{ key: "action", value: "delete-class" }])}
      />
    </div>
  );
};

export const UserCard = ({
  user,
  handleClick,
}: Readonly<{ user: IUser; handleClick(): void }>) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const { name, email, phone } = user;

  return (
    <UserCardContainer
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex flex-col gap-1">
        <UserCardTitle>{name}</UserCardTitle>
        <div className="flex flex-col">
          <UserCardSubtitle>{`${phone}`}</UserCardSubtitle>
          <UserCardSubtitle>{`${email}`}</UserCardSubtitle>
        </div>
      </div>
      <UserCardButton isHover={isHover}>
        Ver perfil
        <Icon size="14px" path={mdiArrowRight} />
      </UserCardButton>
    </UserCardContainer>
  );
};
