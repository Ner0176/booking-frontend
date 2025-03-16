import { useTranslation } from "react-i18next";
import {
  ClassManagementBody,
  CMCardContainer,
} from "./class-management.styled";
import { useGetAllClasses } from "../../api";
import {
  CalendarFilters,
  CalendarHeaderButtons,
  ClassCardContent,
} from "./class-management.content";
import Skeleton from "react-loading-skeleton";
import { useSearchParamsManager } from "../../hooks";
import { useMemo, useState } from "react";

import { CreateClassModal } from "./create-class";
import { ClassDetails } from "./class-details";
import { DashboardSkeleton, EmptyData } from "../base";
import {
  ClassDatesFilter,
  ClassStatusType,
} from "./class-management.interface";
import noDataLoading from "../../assets/images/noData/reload.svg";

export const ClassesManagementDashboard = () => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["class", "action"]);
  const classId = params.get("class");

  const [datesFilter, setDatesFilter] = useState<ClassDatesFilter>({});
  const [statusFilter, setStatusFilter] = useState<ClassStatusType>("all");

  const isDatesFilterActive = !!datesFilter.startDate && !!datesFilter.endDate;

  const { data, refetch, isLoading } = useGetAllClasses({
    timeFilter: isDatesFilterActive ? datesFilter : undefined,
    statusFilter: statusFilter !== "all" ? statusFilter : undefined,
  });

  const selectedClass = useMemo(() => {
    if (classId && data) {
      return data.find(({ id }) => +classId === id);
    }
  }, [data, classId]);

  const getTitle = () => {
    let title = t("Classes.Title");

    if (!!classId && selectedClass?.date) {
      const titleType = !selectedClass.recurrentId ? "Title" : "RecurrentTitle";
      title = t(`Classes.ClassDetails.${titleType}`);
    }

    return title;
  };

  return (
    <DashboardSkeleton
      title={getTitle()}
      rightHeader={
        <CalendarHeaderButtons
          refetch={refetch}
          classId={classId ?? ""}
          selectedClass={selectedClass}
        />
      }
      goBack={{ showButton: !!classId, path: "/management" }}
    >
      {!classId && (
        <CalendarFilters
          datesFilter={datesFilter}
          statusFilter={statusFilter}
          setDatesFilter={setDatesFilter}
          setStatusFilter={setStatusFilter}
        />
      )}
      <ClassManagementBody>
        {!!classId && selectedClass ? (
          <ClassDetails classData={selectedClass} refetchClasses={refetch} />
        ) : isLoading ? (
          [...Array(6)].map((key) => (
            <Skeleton key={key} className="w-full h-[150px] rounded-2xl" />
          ))
        ) : !!data && data.length > 0 ? (
          data.map((item, idx) => (
            <CMCardContainer
              key={idx}
              className="last:mb-6 hover:shadow-lg"
              onClick={() => setParams([{ key: "class", value: `${item.id}` }])}
            >
              <ClassCardContent data={item} />
            </CMCardContainer>
          ))
        ) : (
          <div className="flex flex-row justify-center items-start w-full">
            <EmptyData image={noDataLoading} title={t("Classes.NoData")} />
          </div>
        )}
      </ClassManagementBody>
      {params.get("action") === "create-class" && (
        <CreateClassModal refetchClasses={refetch} />
      )}
    </DashboardSkeleton>
  );
};
