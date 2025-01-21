import { useTranslation } from "react-i18next";
import { DashboardSkeleton } from "../base";
import { useGetAllUsers } from "../../api";
import { useSearchParamsManager } from "../../hooks";
import { UserDetails } from "./user-details.tsx";
import { UserHeaderButtons } from "./users.content";
import Skeleton from "react-loading-skeleton";

export const UsersDashboard = () => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["userId"]);
  const showUserDetails = params.get("userId");

  const { data: usersList, isLoading } = useGetAllUsers();

  return (
    <DashboardSkeleton
      title={t(`Users.${showUserDetails ? "UserDetails." : ""}Title`)}
      rightHeader={showUserDetails ? <UserHeaderButtons /> : undefined}
    >
      {showUserDetails ? (
        <UserDetails />
      ) : (
        <div className="flex flex-wrap w-full gap-4">
          {isLoading
            ? [...Array(10)].map((key) => (
                <Skeleton
                  key={key}
                  className="w-[300px] h-[150px] rounded-2xl"
                />
              ))
            : usersList?.map((item) => (
                <div
                  onClick={() =>
                    setParams([{ key: "userId", value: `${item.id}` }])
                  }
                  className="flex flex-col gap-1 px-4 py-3 border border-neutral-200 rounded-2xl bg-white w-[300px] cursor-pointer"
                >
                  <span className="text-sm">{item.name}</span>
                  <div className="flex flex-row items-center gap-3">
                    <span className="text-xs">{`${item.email} | ${item.phone}`}</span>
                  </div>
                </div>
              ))}
        </div>
      )}
    </DashboardSkeleton>
  );
};
