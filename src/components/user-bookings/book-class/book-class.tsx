import { useGetAllClasses } from "../../../api";
import { ClassCardContent } from "../../class-management";
import { useSearchParamsManager } from "../../../hooks";
import { useMemo } from "react";
import { BookClassModal } from "./book-class.content";

export const BookClassDashboard = () => {
  const { params, setParams } = useSearchParamsManager(["class", "booking"]);
  const classId = params.get("class");
  const bookingId = params.get("booking");

  const now = useMemo(() => {
    return new Date();
  }, []);

  const { data: classesList } = useGetAllClasses({
    statusFilter: "pending",
    timeFilter: { startDate: now },
  });

  const selectedClass = useMemo(() => {
    if (!!bookingId && !!classId && classesList) {
      return classesList.find((item) => item.id === +classId);
    }
  }, [classId, bookingId, classesList]);

  return (
    <>
      {classesList &&
        classesList.length > 0 &&
        classesList.map((classInstance, idx) => {
          return (
            <div
              className="flex flex-col gap-2 border rounded-xl px-6 py-4 min-w-[350px] h-min cursor-pointer last:mb-6 hover:shadow-lg"
              onClick={() =>
                setParams([{ key: "class", value: `${classInstance.id}` }])
              }
            >
              <ClassCardContent key={idx} data={classInstance} />
            </div>
          );
        })}
      {!!selectedClass && (
        <BookClassModal
          selectedClass={selectedClass}
          bookingId={+(bookingId as string)}
          handleClose={() => setParams([{ key: "class" }])}
        />
      )}
    </>
  );
};
