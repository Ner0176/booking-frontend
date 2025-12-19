import { useTranslation } from "react-i18next";
import { CustomInputField, DashboardSkeleton, EmptyData } from "../base";
import { IUser, useGetAllUsers } from "../../api";
import { useSearchParamsManager } from "../../hooks";
import { UserDetails } from "./user-details.tsx";
import { UserCard, UserHeaderButtons } from "./users.content";
import Skeleton from "react-loading-skeleton";
import { useEffect, useMemo, useState } from "react";
import noDataLoading from "../../assets/images/noData/ovni.svg";
import { mdiMagnify } from "@mdi/js";
import { stringIncludes } from "../../utils";
import { isMobile } from "react-device-detect";

export const UsersDashboard = () => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["userId"]);
  const userId = params.get("userId");

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const { data: usersList, refetch, isLoading } = useGetAllUsers();

  useEffect(() => {
    if (usersList) {
      if (!search) setFilteredUsers(usersList);
      else {
        setFilteredUsers(
          usersList.filter((user) => stringIncludes(user.name, search))
        );
      }
    }
  }, [search, usersList]);

  const selectedUser = useMemo(() => {
    if (userId && usersList) {
      return usersList.find((user) => `${user.id}` === userId);
    }
  }, [userId, usersList]);

  return (
    <DashboardSkeleton
      title={t(`Users.${!!userId ? "Details." : ""}Title`)}
      goBack={{ showButton: !!selectedUser, path: "/users" }}
      rightHeader={<UserHeaderButtons isUserDetail={!!userId} />}
      customBodyStyles={!!userId ? { margin: 0, padding: 0 } : {}}
    >
      {!!selectedUser ? (
        <UserDetails user={selectedUser} refetch={refetch} />
      ) : (
        <div className="flex flex-col w-full gap-4 sm:gap-8">
          <CustomInputField
            value={search}
            icon={{ name: mdiMagnify }}
            placeholder={t(`Base.SearchUser`)}
            handleChange={(value) => setSearch(value)}
          />

          {isLoading ? (
            [...Array(10)].map((key) => (
              <Skeleton
                key={key}
                style={{
                  borderRadius: 16,
                  height: isMobile ? 75 : 90,
                  width: isMobile ? "100%" : 325,
                }}
              />
            ))
          ) : (
            <div className="flex flex-wrap w-full gap-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((item, idx) => (
                  <UserCard
                    key={idx}
                    user={item}
                    handleClick={() =>
                      setParams([{ key: "userId", value: `${item.id}` }])
                    }
                  />
                ))
              ) : (
                <EmptyData
                  image={noDataLoading}
                  title={t("Users.NoData")}
                  customStyles={{ paddingTop: 80 }}
                />
              )}
            </div>
          )}
        </div>
      )}
    </DashboardSkeleton>
  );
};
