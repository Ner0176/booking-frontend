import { useTranslation } from "react-i18next";
import { useFindMe, useGetUserBookingsStats } from "../../api";
import {
  CardContainer,
  DashboardSkeleton,
  EmptyData,
  HeaderButton,
} from "../base";
import { UserInfoField } from "../users";
import { EditProfileInformation } from "./profile.content";
import noDataVoid from "../../assets/images/noData/void.svg";
import {
  mdiAccountOutline,
  mdiEarth,
  mdiEmailOutline,
  mdiPencilOutline,
  mdiPhoneOutline,
} from "@mdi/js";
import { useSearchParamsManager } from "../../hooks";
import Skeleton from "react-loading-skeleton";
import { useUser } from "../../stores";
import { format } from "date-fns";
import { ProfileFieldsWrapper } from "./profile.styled";

export const ProfileDashboard = () => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["action"]);
  const actionType = params.get("action");

  const userInfo = useUser();

  const { data: user, refetch, isLoading } = useFindMe();

  const { data: userStats, isLoading: isLoadingStats } =
    useGetUserBookingsStats({
      enabled: !!userInfo?.id,
      userId: !!userInfo?.id ? +userInfo?.id : -1,
    });

  const formatStat = (key: string, value: string) => {
    if (key === "firstday") {
      return !value ? "-" : format(new Date(value), "dd/MM/yyyy");
    }

    return value;
  };

  return (
    <DashboardSkeleton
      title={t("Profile.Title")}
      rightHeader={
        <HeaderButton
          icon={mdiPencilOutline}
          tPath={"Profile.Edit.Button"}
          onClick={() => setParams([{ key: "action", value: "edit-user" }])}
        />
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <ProfileFieldsWrapper isAdmin={!!userInfo?.isAdmin}>
          {isLoading ? (
            [...Array(4)].map((_, idx) => (
              <Skeleton key={idx} className="h-8 sm:h-10 rounded-2xl" />
            ))
          ) : !!user ? (
            <div className="flex flex-col gap-4 w-full sm:max-w-[80%]">
              {actionType === "edit-user" ? (
                <EditProfileInformation user={user} refetch={refetch} />
              ) : (
                <>
                  <UserInfoField
                    value={user.name}
                    textKey="Name.Title"
                    icon={mdiAccountOutline}
                  />
                  <UserInfoField
                    textKey="Email"
                    value={user.email}
                    icon={mdiEmailOutline}
                  />
                  <UserInfoField
                    textKey="Phone"
                    icon={mdiPhoneOutline}
                    value={user.phone ? user.phone : "-"}
                  />
                  <UserInfoField
                    icon={mdiEarth}
                    textKey="Language"
                    value={t(`Base.Languages.${user.language}`)}
                  />
                </>
              )}
            </div>
          ) : (
            <EmptyData
              image={noDataVoid}
              title={t("Profile.NoData")}
              customStyles={{ paddingTop: 80 }}
            />
          )}
        </ProfileFieldsWrapper>
        {!userInfo?.isAdmin && (
          <CardContainer className="h-min">
            <span className="text-sm font-semibold">
              {t(`Users.Details.Stats.Title`)}
            </span>
            <div className="flex flex-col gap-4">
              {isLoadingStats
                ? [...Array(4)].map((_, idx) => (
                    <Skeleton key={idx} className="w-full h-5" />
                  ))
                : userStats &&
                  Object.entries(userStats).map(([key, value]) => {
                    return (
                      <span className="text-xs sm:text-sm">
                        {t(`Users.Details.Stats.${key}`, {
                          amount: formatStat(key, value),
                        })}
                      </span>
                    );
                  })}
            </div>
          </CardContainer>
        )}
      </div>
    </DashboardSkeleton>
  );
};
