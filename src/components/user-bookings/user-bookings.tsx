import {
  mdiAccountGroupOutline,
  mdiCalendarOutline,
  mdiCancel,
  mdiCheck,
  mdiClockOutline,
  mdiTimerSand,
} from "@mdi/js";
import { IAccount, useGetBookingsFromUser } from "../../api";
import { useUser } from "../../hooks";
import { DashboardSkeleton } from "../base";
import { formatTime, formatToLongDate, mergeDateTime } from "../../utils";
import { isBefore } from "date-fns";
import { ClassDatesFilter, ClassStatusType } from "../class-management";
import { useTranslation } from "react-i18next";
import {
  CalendarFilters,
  ItemInfoRow,
} from "../class-management/class-management.content";
import { useState } from "react";

export const UserBookingsDashboard = () => {
  const { user } = useUser();
  const { t } = useTranslation();

  const [datesFilter, setDatesFilter] = useState<ClassDatesFilter>({});
  const [statusFilter, setStatusFilter] = useState<ClassStatusType>("all");

  const { data } = useGetBookingsFromUser(+(user as IAccount).id, !!user);

  return (
    <DashboardSkeleton title="Mis reservas">
      <CalendarFilters
        datesFilter={datesFilter}
        statusFilter={statusFilter}
        setDatesFilter={setDatesFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="flex justify-center w-full h-full">
        {data?.map((booking) => {
          const {
            cancelled,
            currentCount,
            maxAmount,
            startTime,
            endTime,
            date,
          } = booking.class;

          const { status, statusIcon } = (() => {
            if (cancelled)
              return { status: "cancelled", statusIcon: mdiCancel };

            const now = new Date();
            const formattedDate = mergeDateTime(date, endTime);

            return isBefore(now, formattedDate)
              ? { status: "pending", statusIcon: mdiTimerSand }
              : { status: "done", statusIcon: mdiCheck };
          })();

          return (
            <div className="flex flex-row items-center border rounded-xl">
              <div className="relative flex flex-col gap-2 px-6 border-r py-4 min-w-[350px] h-min cursor-pointer last:mb-6 hover:shadow-lg">
                <ItemInfoRow
                  icon={statusIcon}
                  status={status as ClassStatusType}
                >
                  {t(`Classes.Filters.Status.Options.${status}`)}
                </ItemInfoRow>
                <ItemInfoRow icon={mdiAccountGroupOutline}>
                  {t(`Classes.Event.Attendees`, { currentCount, maxAmount })}
                </ItemInfoRow>
                <ItemInfoRow icon={mdiClockOutline}>
                  {formatTime(startTime, endTime)}
                </ItemInfoRow>
                <ItemInfoRow icon={mdiCalendarOutline}>
                  {formatToLongDate(date)}
                </ItemInfoRow>
                <div className="underline underline-offset-4 text-red-500 top-4 right-4 absolute z-50 text-xs font-semibold">
                  Cancelar reserva
                </div>
              </div>
              {/* <div className="flex flex-col items-start h-full gap-3">
              <span>Acciones</span>
              <CustomButton type="error">Cancelar reserva</CustomButton>
            </div> */}
            </div>
          );
        })}
      </div>
    </DashboardSkeleton>
  );
};
