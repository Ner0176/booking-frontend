import { IClass, useGetAllClasses, useGetClassConfigs } from "../../../api";
import { ClassCardContent, ClassDatesFilter } from "../../class-management";
import { useSearchParamsManager } from "../../../hooks";
import { useEffect, useMemo, useState } from "react";
import { BookClassModal } from "./book-class.content";
import { EmptyData, showToast } from "../../base";
import { useTranslation } from "react-i18next";
import { UBClassCardWrapper } from "../user-bookings.styled";
import { addDays } from "date-fns";
import { FullClassText } from "./book-class.styled";
import emptyList from "../../../assets/images/noData/lost.svg";
import { isMobile } from "react-device-detect";
import { useUser } from "../../../stores";

const BASE_PATH = "UserBookings.BookClass";

export const BookClassDashboard = ({
  handleRefetch,
}: Readonly<{ handleRefetch(): void }>) => {
  const { t } = useTranslation();
  const user = useUser();
  const { params, setParams } = useSearchParamsManager([
    "class",
    "userId",
    "booking",
  ]);
  const classId = params.get("class");
  const bookingId = params.get("booking");
  const userId = params.get("userId");

  const [timeFilter, setTimeFilter] = useState<ClassDatesFilter>();

  const { data: classConfigs } = useGetClassConfigs();
  const { data: classesList } = useGetAllClasses({
    timeFilter,
    enabled: !!timeFilter,
    statusFilter: "pending",
    excludeUserBookings: true,
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
        text: t(`${BASE_PATH}.AlreadyFull.Message`),
      });
    } else {
      setParams([{ key: "class", value: `${classInstance.id}` }]);
    }
  };

  return (
    <>
      {classesList && classesList?.length > 0 ? (
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
                <FullClassText>
                  {t(`${BASE_PATH}.AlreadyFull.Button`)}
                </FullClassText>
              )}
            </UBClassCardWrapper>
          );
        })
      ) : (
        <div className="mt-8 sm:mt-12">
          <EmptyData
            image={emptyList}
            textSize={isMobile ? 14 : 20}
            imageSize={isMobile ? 250 : 300}
            title={t(`${BASE_PATH}.EmptyList`, {
              days: classConfigs?.maxAdvanceTime,
            })}
          />
        </div>
      )}
      {!!selectedClass && (
        <BookClassModal
          handleRefetch={handleRefetch}
          selectedClass={selectedClass}
          bookingId={+(bookingId as string)}
          userId={+(userId ?? (user?.id as string))}
          handleClose={() => setParams([{ key: "class" }])}
        />
      )}
    </>
  );
};
