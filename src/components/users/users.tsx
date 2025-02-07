import { useTranslation } from "react-i18next";
import { DashboardSkeleton, NoDataComponent } from "../base";
import { useGetAllUsers } from "../../api";
import { useSearchParamsManager } from "../../hooks";
import { UserDetails } from "./user-details.tsx";
import { UserCard, UserHeaderButtons } from "./users.content";
import Skeleton from "react-loading-skeleton";
import { useMemo } from "react";
import noDataLoading from "../../assets/images/noData/ovni.svg";

export const UsersDashboard = () => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["userId"]);
  const userId = params.get("userId");

  const { data: usersList, isLoading, refetch } = useGetAllUsers();

  const selectedUser = useMemo(() => {
    if (userId && usersList) {
      return usersList.find((user) => `${user.id}` === userId);
    }
  }, [userId, usersList]);

  return (
    <DashboardSkeleton
      title={t(`Users.${!!userId ? "Details." : ""}Title`)}
      rightHeader={!!userId ? <UserHeaderButtons /> : undefined}
    >
      {!!selectedUser ? (
        <UserDetails user={selectedUser} refetch={refetch} />
      ) : (
        <div className="flex flex-wrap w-full gap-4">
          {isLoading ? (
            [...Array(10)].map((key) => (
              <Skeleton key={key} className="w-[300px] h-[150px] rounded-2xl" />
            ))
          ) : usersList && usersList.length > 0 ? (
            usersList?.map((item, idx) => (
              <UserCard
                key={idx}
                user={item}
                handleClick={() =>
                  setParams([{ key: "userId", value: `${item.id}` }])
                }
              />
            ))
          ) : (
            <NoDataComponent
              image={noDataLoading}
              title={t("Users.NoData")}
              customStyles={{ paddingTop: 80 }}
            />
          )}
        </div>
      )}
    </DashboardSkeleton>
  );
};
