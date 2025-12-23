import { useTranslation } from "react-i18next";
import { CustomInputField, DashboardSkeleton, EmptyData } from "../base";
import { IUser, useGetAllUsers } from "../../api";
import { useSearchParamsManager } from "../../hooks";
import { UserDetails } from "./user-details.tsx";
import { UserCard, UserHeaderButtons } from "./users.content";
import Skeleton from "react-loading-skeleton";
import { useEffect, useMemo, useRef, useState } from "react";
import noDataLoading from "../../assets/images/noData/ovni.svg";
import { mdiMagnify } from "@mdi/js";
import { isMobile } from "react-device-detect";

export const UsersDashboard = () => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["userId"]);
  const userId = params.get("userId");

  const observerRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loadedUsers, setLoadedUsers] = useState<IUser[]>([]);

  const {
    refetch,
    isLoading,
    data: paginatedUsers,
  } = useGetAllUsers({ page, search, limit: 20 });

  useEffect(() => {
    if (!observerRef.current || isLoading) return;

    const hasMoreItems =
      paginatedUsers?.totalPages && page < paginatedUsers.totalPages;

    if (!hasMoreItems) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [page, isLoading, paginatedUsers]);

  useEffect(() => {
    if (!!paginatedUsers?.data) {
      setLoadedUsers((prev) => {
        if (page === 1) return paginatedUsers.data;

        return [...prev, ...paginatedUsers.data];
      });
    }
  }, [page, paginatedUsers]);

  const selectedUser = useMemo(() => {
    if (userId) {
      return loadedUsers.find((user) => `${user.id}` === userId);
    }
  }, [userId, loadedUsers]);

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
            handleChange={(value) => {
              setPage(1);
              setSearch(value);
            }}
          />
          <div className="flex flex-wrap w-full gap-4">
            {!isLoading && !loadedUsers.length ? (
              <EmptyData
                image={noDataLoading}
                title={t("Users.NoData")}
                customStyles={{ paddingTop: 80 }}
              />
            ) : (
              loadedUsers.map((item) => (
                <UserCard
                  user={item}
                  key={item.id}
                  handleClick={() =>
                    setParams([{ key: "userId", value: `${item.id}` }])
                  }
                />
              ))
            )}
            {isLoading &&
              [...Array(10)].map((_, idx) => (
                <Skeleton
                  key={idx}
                  style={{
                    borderRadius: 16,
                    height: isMobile ? 75 : 90,
                    width: isMobile ? "100%" : 325,
                  }}
                />
              ))}
            <div ref={observerRef} />
          </div>
        </div>
      )}
    </DashboardSkeleton>
  );
};
