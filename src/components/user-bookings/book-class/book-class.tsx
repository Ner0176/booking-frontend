import { IClass, useGetAllClasses, useGetClassConfigs } from "../../../api";
import { ClassCardContent, ClassDatesFilter } from "../../class-management";
import { useSearchParamsManager } from "../../../hooks";
import { useEffect, useMemo, useState } from "react";
import { BookClassModal } from "./book-class.content";
import { showToast } from "../../base";
import { useTranslation } from "react-i18next";
import { UBClassCardWrapper } from "../user-bookings.styled";
import { addDays } from "date-fns";
import { FullClassText } from "./book-class.styled";

const BASE_PATH = "UserBookings.BookClass.AlreadyFull";

export const BookClassDashboard = ({
  handleRefetch,
}: Readonly<{ handleRefetch(): void }>) => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["class", "booking"]);
  const classId = params.get("class");
  const bookingId = params.get("booking");

  const [timeFilter, setTimeFilter] = useState<ClassDatesFilter>();

  const { data: classConfigs } = useGetClassConfigs();
  const { data: classesList } = useGetAllClasses({
    timeFilter,
    statusFilter: "pending",
    enabled: !!timeFilter,
  });

  useEffect(() => {
    if (classConfigs) {
      const today = new Date();
      setTimeFilter({
        startDate: today,
        endDate: addDays(today, classConfigs.maxAdvanceTime),
      });
    }
  }, [classConfigs]);

  const selectedClass = useMemo(() => {
    if (!!bookingId && !!classId && classesList) {
      return classesList.find((item) => item.id === +classId);
    }
  }, [classId, bookingId, classesList]);

  const handleSelectClass = (classInstance: IClass) => {
    if (classInstance.currentCount >= classInstance.maxAmount) {
      showToast({
        type: "warning",
        text: t(`${BASE_PATH}.Message`),
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
          const { currentCount, maxAmount } = classInstance;
          const isFull = currentCount === maxAmount;

          return (
            <UBClassCardWrapper
              isFull={isFull}
              className="cursor-pointer shadow-sm last:mb-4"
              onClick={() => handleSelectClass(classInstance)}
            >
              <ClassCardContent key={idx} data={classInstance} />
              {isFull && (
                <FullClassText>{t(`${BASE_PATH}.Button`)}</FullClassText>
              )}
            </UBClassCardWrapper>
          );
        })}
      {!!selectedClass && (
        <BookClassModal
          handleRefetch={handleRefetch}
          selectedClass={selectedClass}
          bookingId={+(bookingId as string)}
          handleClose={() => setParams([{ key: "class" }])}
        />
      )}
    </>
  );
};
