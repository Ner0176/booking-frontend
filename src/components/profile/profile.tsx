import { useTranslation } from "react-i18next";
import { useFindMe } from "../../api";
import { DashboardSkeleton, NoDataComponent } from "../base";
import { UserDetails } from "../users";
import { ProfileLoadingSkeleton } from "./profile.content";
import noDataVoid from "../../assets/images/noData/void.svg";

export const ProfileDashboard = () => {
  const { t } = useTranslation();

  const { data: user, isLoading } = useFindMe();

  return (
    <DashboardSkeleton title={t("Profile.Title")}>
      {isLoading ? (
        <ProfileLoadingSkeleton isLoading={isLoading} />
      ) : user ? (
        <UserDetails isCurrentUser user={user} refetch={() => {}} />
      ) : (
        <NoDataComponent
          image={noDataVoid}
          title={t("Profile.NoData")}
          customStyles={{ paddingTop: 80 }}
        />
      )}
    </DashboardSkeleton>
  );
};
