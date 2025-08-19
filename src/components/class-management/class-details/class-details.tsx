import {
  ClassesWithOverflow,
  IClass,
  useGetClassBookingsUsers,
} from "../../../api";
import { useSearchParamsManager } from "../../../hooks";
import { useEffect, useState } from "react";
import { getWeekday } from "../../../utils";
import {
  ClassSettingsMobile,
  DeleteClassModal,
  OverflowClassesModal,
} from "./class-details.content";
import { ClassDetailsData, EditClassDetailsModal } from "./class-data";
import { ClassAttendeesList, EditListModal } from "./attendees-list";
import { isMobile } from "react-device-detect";
import { isClassCompleted } from "../class-management.utils";

export const ClassDetails = ({
  classData,
  refetchClasses,
}: Readonly<{ classData: IClass; refetchClasses(): void }>) => {
  const { params, setParams } = useSearchParamsManager([
    "type",
    "modal",
    "visual",
    "action",
  ]);

  const showEditClassView = params.get("action") === "edit-class";
  const showDeleteModal = params.get("action") === "delete-class";
  const showFiltersModal = params.get("modal") === "filters" && isMobile;
  const showEditAttendeesView = params.get("action") === "edit-attendees";

  const classVisual = params.get("visual");
  const showAttendeesList =
    classVisual === "all" || classVisual === "attendees";
  const showClassDetailsData =
    classVisual === "all" || classVisual === "details";

  const { id, date, endTime, startTime, recurrent } = classData;

  const {
    data: classBookingsUsers,
    refetch: refetchBookings,
    isLoading: isBookingsLoading,
  } = useGetClassBookingsUsers({ classId: id });

  const [classesWithOverflow, setClassesWithOverflow] = useState<
    ClassesWithOverflow[]
  >([]);

  useEffect(() => {
    if (!classVisual) {
      setParams([{ key: "visual", value: isMobile ? "attendees" : "all" }]);
    }
  }, [classVisual, setParams]);

  const handleCloseAction = () => {
    setParams([{ key: "type" }, { key: "action" }]);
  };

  const handleEditClass = () => {
    setParams([{ key: "modal" }, { key: "action", value: "edit-class" }]);
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col sm:grid sm:grid-cols-3 w-full h-full">
          {showAttendeesList && (
            <ClassAttendeesList
              isLoading={isBookingsLoading}
              attendeesList={classBookingsUsers}
              editAttendeesList={() =>
                setParams([{ key: "action", value: "edit-attendees" }])
              }
            />
          )}
          {showClassDetailsData && (
            <ClassDetailsData
              classData={classData}
              refetchClasses={refetchClasses}
              editClassData={handleEditClass}
              isClassCompleted={isClassCompleted(classData)}
            />
          )}
        </div>
      </div>
      {showEditAttendeesView && !!classBookingsUsers && (
        <EditListModal
          refetch={() => {
            refetchClasses();
            refetchBookings();
          }}
          classData={classData}
          handleClose={handleCloseAction}
          classAttendees={classBookingsUsers}
          setClassesWithOverflow={setClassesWithOverflow}
        />
      )}
      {showEditClassView && (
        <EditClassDetailsModal
          classData={classData}
          handleClose={handleCloseAction}
          handleSuccess={() => {
            refetchClasses();
            handleCloseAction();
          }}
        />
      )}
      {showDeleteModal && (
        <DeleteClassModal
          id={id}
          recurrentId={recurrent?.id}
          refetchClasses={refetchClasses}
          handleClose={() => setParams([{ key: "action" }])}
          dateTime={`${getWeekday(date)}  ${startTime}h - ${endTime}h`}
        />
      )}
      {showFiltersModal && (
        <ClassSettingsMobile
          refetch={refetchClasses}
          classId={`${classData.id}`}
          isCancelled={classData.cancelled}
          handleEditClass={handleEditClass}
          currentVisual={classVisual ?? ""}
          isClassCompleted={isClassCompleted(classData)}
          handleDeleteClass={() =>
            setParams([
              { key: "modal" },
              { key: "action", value: "delete-class" },
            ])
          }
          handleClose={() => setParams([{ key: "modal" }])}
          setCurrentVisual={(value) => setParams([{ key: "visual", value }])}
        />
      )}
      {classesWithOverflow.length > 0 && (
        <OverflowClassesModal
          data={classesWithOverflow}
          handleClose={() => setClassesWithOverflow([])}
        />
      )}
    </>
  );
};
