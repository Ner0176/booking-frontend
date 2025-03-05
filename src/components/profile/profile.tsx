import { useTranslation } from "react-i18next";
import { useFindMe } from "../../api";
import { DashboardSkeleton, HeaderButton, EmptyData } from "../base";
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

export const ProfileDashboard = () => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["action"]);
  const actionType = params.get("action");

  const { data: user, refetch, isLoading } = useFindMe();

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
      {isLoading ? (
        [...Array(4)].map((_, idx) => (
          <Skeleton key={idx} className="h-8 sm:h-10 rounded-2xl" />
        ))
      ) : !!user ? (
        <div className="flex flex-col gap-4 w-full sm:max-w-[70%] xl:max-w-[50%]">
          {actionType === "edit-user" ? (
            <EditProfileInformation user={user} refetch={refetch} />
          ) : (
            <>
              <UserInfoField
                textKey="Name"
                value={user.name}
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
        <NoDataComponent
          image={noDataVoid}
          title={t("Profile.NoData")}
          customStyles={{ paddingTop: 80 }}
        />
      )}
    </DashboardSkeleton>
  );
};
