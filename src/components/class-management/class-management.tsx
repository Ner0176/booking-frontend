import { useTranslation } from "react-i18next";
import {
  ClassManagementBody,
  CMCardContainer,
} from "./class-management.styled";
import { IClass, useGetAllClasses } from "../../api";
import {
  CalendarHeaderButtons,
  ClassCardContent,
} from "./class-management.content";
import Skeleton from "react-loading-skeleton";
import { useSearchParamsManager } from "../../hooks";
import { useEffect, useMemo, useRef, useState } from "react";

import { CreateClassModal } from "./create-class";
import { ClassDetails } from "./class-details";
import { DashboardSkeleton, EmptyData, HeaderButton } from "../base";
import {
  ClassDatesFilter,
  ClassStatusType,
} from "./class-management.interface";
import noDataLoading from "../../assets/images/noData/reload.svg";
import { ClassesListFilters } from "./filters";
import { isMobile } from "react-device-detect";
import { mdiTuneVariant } from "@mdi/js";

export const ClassesManagementDashboard = () => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["class", "action"]);
  const classId = params.get("class");

  const observerRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [loadedClasses, setLoadedClasses] = useState<IClass[]>([]);
  const [datesFilter, setDatesFilter] = useState<ClassDatesFilter>({});
  const [statusFilter, setStatusFilter] = useState<ClassStatusType>("pending");

  const isDatesFilterActive = !!datesFilter.startDate && !!datesFilter.endDate;

  const {
    refetch,
    isLoading,
    data: allClasses,
  } = useGetAllClasses({
    page,
    limit: 15,
    timeFilter: isDatesFilterActive ? datesFilter : undefined,
    statusFilter: statusFilter !== "all" ? statusFilter : undefined,
  });

  useEffect(() => {
    if (!!allClasses?.data)
      setLoadedClasses((prev) => {
        if (page === 1) return allClasses.data;
        return [...prev, ...allClasses.data];
      });
  }, [page, allClasses]);

  useEffect(() => {
    if (!observerRef.current || isLoading) return;

    const hasMorePages =
      !!allClasses?.metadata?.totalPages &&
      page < allClasses.metadata.totalPages;

    if (!hasMorePages) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [allClasses, isLoading, page]);

  const selectedClass = useMemo(() => {
    if (classId) {
      return loadedClasses.find(({ id }) => +classId === id);
    }
  }, [loadedClasses, classId]);

  const getTitle = () => {
    let title = t("Classes.Title");

    if (!!classId && selectedClass?.date) {
      const titleType = !selectedClass.recurrent?.id
        ? "Title"
        : "RecurrentTitle";
      title = t(`Classes.ClassDetails.${titleType}`);
    }

    return title;
  };

  const RightHeaderButtons = () => {
    return isMobile ? (
      <HeaderButton
        color="primary"
        icon={mdiTuneVariant}
        tPath="Base.Buttons.Options"
        onClick={() => setParams([{ key: "modal", value: "filters" }])}
      />
    ) : (
      <CalendarHeaderButtons
        refetch={refetch}
        classId={classId ?? ""}
        selectedClass={selectedClass}
      />
    );
  };

  return (
    <DashboardSkeleton
      title={getTitle()}
      rightHeader={<RightHeaderButtons />}
      goBack={{ showButton: !!classId, path: "/management" }}
      customBodyStyles={classId ? { margin: 0, padding: 0 } : {}}
    >
      {!classId && (
        <ClassesListFilters
          datesFilter={datesFilter}
          statusFilter={statusFilter}
          setDatesFilter={(v) => {
            setPage(1);
            setDatesFilter(v);
          }}
          setStatusFilter={(v) => {
            setPage(1);
            setStatusFilter(v);
          }}
        />
      )}
      {!!classId && selectedClass ? (
        <ClassDetails classData={selectedClass} refetchClasses={refetch} />
      ) : (
        <ClassManagementBody>
          {!loadedClasses.length && !isLoading ? (
            <div className="flex flex-row justify-center items-start w-full">
              <EmptyData image={noDataLoading} title={t("Classes.NoData")} />
            </div>
          ) : (
            loadedClasses.map((item, idx) => (
              <CMCardContainer
                key={idx}
                className="last:mb-6 hover:shadow-md shadow-sm"
                onClick={() =>
                  setParams([{ key: "class", value: `${item.id}` }])
                }
              >
                <ClassCardContent data={item} />
              </CMCardContainer>
            ))
          )}
          {isLoading &&
            [...Array(15)].map((_, idx) => (
              <Skeleton
                key={idx}
                style={{
                  borderRadius: 16,
                  height: isMobile ? 125 : 150,
                  width: isMobile ? "100%" : 350,
                }}
              />
            ))}
          <div ref={observerRef} />
        </ClassManagementBody>
      )}

      {params.get("action") === "create-class" && (
        <CreateClassModal refetchClasses={refetch} />
      )}
    </DashboardSkeleton>
  );
};
