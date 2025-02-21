import { DashboardSkeleton } from "../base";
import { Calendar, dateFnsLocalizer, Event, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import { ca } from "date-fns/locale/ca";
import { useTranslation } from "react-i18next";
import { CustomEvent, CustomToolbar } from "./calendar.content";
import { useUser } from "../../hooks";
import { IAccount, useGetAllClasses, useGetBookingsFromUser } from "../../api";
import { CSSProperties, useCallback, useMemo, useState } from "react";
import { mergeDateTime } from "../../utils";
import { calendarMessageKeys } from "./calendar.interface";

const LOCALIZER = dateFnsLocalizer({
  format,
  parse,
  getDay,
  locales: { "es-ES": es, "ca-ES": ca },
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
});

export const CalendarDashboard = () => {
  const { user, isAdmin } = useUser();
  const { t, i18n } = useTranslation();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>("week");

  const { data: allClasses } = useGetAllClasses({});
  const { data: userBookings } = useGetBookingsFromUser(
    +(user as IAccount).id,
    {},
    !isAdmin && !!user
  );

  const events = useMemo(() => {
    if (allClasses && allClasses.length) {
      const bookings = !isAdmin && userBookings ? userBookings : [];

      const bookingsSet = new Set(
        bookings
          .map(({ class: classInstance }) => classInstance?.id)
          .filter(Boolean)
      );

      const classesToEvent = allClasses.map((booking) => {
        const { id, date, startTime, endTime } = booking;
        return {
          allDay: false,
          resource: {
            id,
            booking,
            isBooking: bookingsSet.has(id),
          },
          end: mergeDateTime(date, endTime),
          start: mergeDateTime(date, startTime),
        };
      });
      return classesToEvent as Event[];
    }
  }, [isAdmin, allClasses, userBookings]);

  const getCalendarTranslations = () => {
    return calendarMessageKeys.reduce((prev, key) => {
      const text =
        key === "showMore"
          ? (total: number) => t(`Calendar.Messages.${key}`, { total })
          : t(`Calendar.Messages.${key}`);
      return { ...prev, [key]: text };
    }, {});
  };

  const dayPropGetter = useCallback(
    (date: Date) => {
      const isCurrentMonth = currentDate.getMonth() === date.getMonth();
      const styles: CSSProperties = {
        backgroundColor: isCurrentMonth ? "white" : "#F5F5F5FF",
      };
      return { style: styles };
    },
    [currentDate]
  );

  const eventPropGetter = useCallback(() => {
    return {
      style: {
        padding: 0,
        border: "black",
        backgroundColor: "transparent",
      } as CSSProperties,
    };
  }, []);

  return (
    <DashboardSkeleton title={t("Calendar.Title")}>
      <div className="h-full overflow-y-auto">
        <Calendar
          step={5}
          timeslots={6}
          events={events}
          endAccessor="end"
          defaultView="week"
          startAccessor="start"
          localizer={LOCALIZER}
          style={{ height: "100%" }}
          dayPropGetter={dayPropGetter}
          culture={`${i18n.language}-ES`}
          min={new Date(2025, 1, 1, 8, 0)}
          max={new Date(2025, 1, 1, 22, 0)}
          eventPropGetter={eventPropGetter}
          messages={getCalendarTranslations()}
          onView={(view) => setCurrentView(view)}
          onNavigate={(date) => setCurrentDate(date)}
          components={{
            toolbar: CustomToolbar,
            event: (props) => <CustomEvent props={props} view={currentView} />,
          }}
        />
      </div>
    </DashboardSkeleton>
  );
};
