import Icon from "@mdi/react";
import { IClass, useEditClass } from "../../api";
import {
  mdiAccountGroupOutline,
  mdiCalendarOutline,
  mdiCancel,
  mdiCheck,
  mdiClockOutline,
  mdiTimerSand,
} from "@mdi/js";
import { CSSProperties, PropsWithChildren } from "react";
import { useSearchParamsManager } from "../../hooks";
import { ClassInfoRowContainer } from "./class-management.styled";
import { formatTime, formatToLongDate, mergeDateTime } from "../../utils";
import { ClassStatusType } from "./class-management.interface";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import { isBefore } from "date-fns";
import { CustomButton, DashboardHeaderButton, HeaderButton } from "../base";
import { mdiPlus, mdiTrashCanOutline } from "@mdi/js";
import { isMobile } from "react-device-detect";
import { isClassCompleted } from "./class-management.utils";

export const ItemInfoRow = ({
  icon,
  status,
  children,
}: Readonly<PropsWithChildren<{ icon: string; status?: ClassStatusType }>>) => {
  return (
    <ClassInfoRowContainer status={status}>
      <Icon size={isMobile ? "14px" : "20px"} className="sm:mt-1" path={icon} />
      {children}
    </ClassInfoRowContainer>
  );
};

export const ClassCardContent = ({
  data,
  hasCancellations,
  handleCancelBooking,
}: Readonly<{
  data: IClass;
  hasCancellations?: boolean;
  handleCancelBooking?: () => void;
}>) => {
  const { t } = useTranslation();

  const { endTime, startTime, date, maxAmount, cancelled, currentCount } = data;

  const { status, statusIcon } = (() => {
    if (cancelled) return { status: "cancelled", statusIcon: mdiCancel };

    const now = new Date();
    const formattedDate = mergeDateTime(date, endTime);

    return isBefore(now, formattedDate)
      ? { status: "pending", statusIcon: mdiTimerSand }
      : { status: "completed", statusIcon: mdiCheck };
  })();

  const getButtonStyles = () => {
    return {
      minWidth: 0,
      minHeight: 0,
      padding: "4px 6px 4px 6px",
      fontSize: isMobile ? 10 : 12,
    } as CSSProperties;
  };

  return (
    <>
      <ItemInfoRow icon={statusIcon} status={status as ClassStatusType}>
        {t(`Classes.Filters.Status.Options.${status}`)}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiAccountGroupOutline}>
        {t(`Classes.CreateClass.Attendees`, {
          maxAmount,
          currentCount: currentCount ?? "-",
        })}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiClockOutline}>
        {formatTime(startTime, endTime)}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiCalendarOutline}>
        {formatToLongDate(date)}
      </ItemInfoRow>
      {!!handleCancelBooking && status === "pending" && (
        <div className="absolute top-4 right-4 z-10">
          <CustomButton
            type="error"
            color="secondary"
            styles={getButtonStyles()}
            onClick={handleCancelBooking}
            isDisabled={!hasCancellations}
          >
            {t("UserBookings.Cancel.Title")}
          </CustomButton>
        </div>
      )}
    </>
  );
};

export const CalendarHeaderButtons = ({
  classId,
  refetch,
  selectedClass,
}: Readonly<{ refetch(): void; classId: string; selectedClass?: IClass }>) => {
  const { setParams } = useSearchParamsManager([]);

  return !selectedClass ? (
    <HeaderButton
      icon={mdiPlus}
      tPath={"Base.Buttons.CreateClass"}
      onClick={() =>
        setParams([
          { key: "action", value: "create-class" },
          { key: "type", value: "recurrent" },
        ])
      }
    />
  ) : (
    <div className="flex flex-row items-center justify-end gap-4 w-full">
      {isClassCompleted(selectedClass) && (
        <ClassStatusButton
          classId={classId ?? ""}
          refetch={() => {
            if (refetch) refetch();
          }}
          isCancelled={selectedClass.cancelled}
        />
      )}
      <HeaderButton
        color="secondary"
        icon={mdiTrashCanOutline}
        tPath="Classes.ClassDetails.Delete.Title"
        onClick={() => setParams([{ key: "action", value: "delete-class" }])}
      />
    </div>
  );
};

const ClassStatusButton = ({
  classId,
  refetch,
  isCancelled,
}: Readonly<{ classId: string; refetch(): void; isCancelled: boolean }>) => {
  const { t } = useTranslation();

  const { mutate, isPending: isLoading } = useEditClass(refetch);

  const handleChangeStatus = () => {
    if (!!classId && !isLoading) {
      mutate({ id: classId, cancel: !isCancelled });
    }
  };

  return (
    <DashboardHeaderButton
      onClick={handleChangeStatus}
      className="flex justify-center min-w-[100px]"
      color={isCancelled ? "primary" : "secondary"}
    >
      {isLoading ? (
        <ClipLoader
          size={20}
          color="gray"
          loading={true}
          data-testid="loader"
          aria-label="Loading Spinner"
        />
      ) : (
        <>
          <Icon
            size="14px"
            className="mt-0.5"
            path={!isCancelled ? mdiCancel : mdiCheck}
          />
          <span className="text-sm font-semibold">
            {t(
              `Classes.ClassDetails.Status.${
                !isCancelled ? "Cancel" : "Enable"
              }`
            )}
          </span>
        </>
      )}
    </DashboardHeaderButton>
  );
};
