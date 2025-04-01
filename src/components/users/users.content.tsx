import { mdiArrowRight, mdiTrashCanOutline, mdiTuneVariant } from "@mdi/js";
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
import { useTranslation } from "react-i18next";

export const UserHeaderButtons = ({
  isUserDetail,
}: Readonly<{ isUserDetail: boolean }>) => {
  const { setParams } = useSearchParamsManager([]);

  return isUserDetail ? (
    <div className="flex flex-row items-center justify-end gap-4 w-full">
      {isMobile ? (
        <HeaderButton
          color="primary"
          icon={mdiTuneVariant}
          tPath="Base.Buttons.Filters"
          onClick={() => setParams([{ key: "modal", value: "filters" }])}
        />
      ) : (
        <HeaderButton
          color="secondary"
          icon={mdiTrashCanOutline}
          tPath={"Users.Details.Delete.Title"}
          size={isMobile ? "small" : "default"}
          onClick={() => setParams([{ key: "action", value: "delete-class" }])}
        />
      )}
    </div>
  ) : null;
};

export const UserCard = ({
  user,
  handleClick,
}: Readonly<{ user: IUser; handleClick(): void }>) => {
  const { t } = useTranslation();

  const { name, email, phone } = user;

  const [isHover, setIsHover] = useState<boolean>(false);

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
        <span className="text-[10px] sm:text-xs">{t("Users.View")}</span>
        <Icon className="size-3 sm:size-3.5" path={mdiArrowRight} />
      </UserCardButton>
    </UserCardContainer>
  );
};
