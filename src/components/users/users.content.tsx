import {
  mdiEmailOutline,
  mdiPhoneOutline,
  mdiTrashCanOutline,
  mdiTuneVariant,
} from "@mdi/js";
import { HeaderButton } from "../base";
import { useSearchParamsManager } from "../../hooks";
import { IUser } from "../../api";
import Icon from "@mdi/react";
import {
  UserCardContainer,
  UserCardSubtitle,
  UserCardTitle,
} from "./users.styled";
import { isMobile } from "react-device-detect";

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
          tPath="Base.Buttons.Options"
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

const SubtitleField = ({
  text,
  icon,
}: Readonly<{ text: string | null; icon: string }>) => {
  return (
    <div className="flex flex-row items-center gap-1 text-neutral-500">
      <Icon path={icon} className="size-3.5 mt-0.5" />
      <UserCardSubtitle>{!text ? "-" : text}</UserCardSubtitle>
    </div>
  );
};

export const UserCard = ({
  user,
  handleClick,
}: Readonly<{ user: IUser; handleClick(): void }>) => {
  const { name, email, phone } = user;

  return (
    <UserCardContainer
      onClick={handleClick}
      className="shadow-sm hover:shadow-md"
    >
      <div className="flex flex-col gap-1.5">
        <UserCardTitle>{name}</UserCardTitle>
        <div className="flex flex-col gap-0.5">
          <SubtitleField icon={mdiPhoneOutline} text={phone} />
          <SubtitleField icon={mdiEmailOutline} text={email} />
        </div>
      </div>
    </UserCardContainer>
  );
};
