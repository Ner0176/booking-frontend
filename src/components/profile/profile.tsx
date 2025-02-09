import { useTranslation } from "react-i18next";
import { useFindMe } from "../../api";
import { DashboardSkeleton, HeaderButton, NoDataComponent } from "../base";
import { UserDetails } from "../users";
import { ProfileLoadingSkeleton } from "./profile.content";
import noDataVoid from "../../assets/images/noData/void.svg";
import { mdiPencilOutline } from "@mdi/js";
import { useSearchParamsManager } from "../../hooks";

export const ProfileDashboard = () => {
  const { t } = useTranslation();
  const { setParams } = useSearchParamsManager([]);

  const { data: user, refetch, isLoading } = useFindMe();

  return (
    <DashboardSkeleton
      title={t("Profile.Title")}
      rightHeader={
        <HeaderButton
          props={{
            icon: mdiPencilOutline,
            tPath: "Profile.Edit.Button",
            onClick: () => setParams([{ key: "action", value: "edit-user" }]),
          }}
        />
      }
    >
      {isLoading ? (
        <ProfileLoadingSkeleton isLoading={isLoading} />
      ) : user ? (
        <UserDetails isCurrentUser user={user} refetch={refetch} />
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
