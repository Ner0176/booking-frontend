import { IClass, useGetAllClasses } from "../../../api";
import { ClassCardContent } from "../../class-management";
import { useSearchParamsManager } from "../../../hooks";
import { useMemo } from "react";
import { BookClassModal } from "./book-class.content";
import { showToast } from "../../base";
import { useTranslation } from "react-i18next";
import { UBClassCardContainer } from "../user-bookings.styled";

export const BookClassDashboard = () => {
  const { t } = useTranslation();
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

  const handleSelectClass = (classInstance: IClass) => {
    if (classInstance.currentCount >= classInstance.maxAmount) {
      showToast({
        type: "warning",
        text: t("UserBookings.BookClass.AlreadyFull"),
      });
    } else {
      setParams([{ key: "class", value: `${classInstance.id}` }]);
    }
  };

  return (
    <>
      {classesList &&
        classesList.length > 0 &&
        classesList.map((classInstance, idx) => {
          return (
            <UBClassCardContainer
              className="cursor-pointer shadow-sm"
              onClick={() => handleSelectClass(classInstance)}
            >
              <ClassCardContent key={idx} data={classInstance} />
            </UBClassCardContainer>
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
