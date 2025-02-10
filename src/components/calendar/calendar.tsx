import { DashboardSkeleton } from "../base";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import { ca } from "date-fns/locale/ca";
import { useTranslation } from "react-i18next";
import { CustomToolbar } from "./calendar.content";

export const CalendarDashboard = () => {
  const { t, i18n } = useTranslation();

  const localizer = dateFnsLocalizer({
    format,
    parse,
    getDay,
    locales: { "es-ES": es, "ca-ES": ca },
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const events: Event[] = [
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(),
      allDay: false,
    },
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(),
      allDay: false,
    },
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(),
      allDay: false,
    },
  ];

  const getCalendarTranslations = () => {
    const calendarMessageKeys = [
      "allDay",
      "previous",
      "next",
      "today",
      "month",
      "week",
      "work_week",
      "day",
      "agenda",
      "date",
      "time",
      "event",
      "noEventsInRange",
      "showMore",
      "tomorrow",
      "yesterday",
      "now",
      "back",
      "moveBack",
      "moveForward",
    ] as const;

    return calendarMessageKeys.reduce((prev, key) => {
      const text =
        key === "showMore"
          ? (total: number) => t(`Calendar.Messages.${key}`, { total })
          : t(`Calendar.Messages.${key}`);
      return { ...prev, [key]: text };
    }, {});
  };

  const maxTime = new Date();
  maxTime.setHours(22);
  maxTime.setMinutes(0);
  const minTime = new Date();
  minTime.setHours(8);
  minTime.setMinutes(0);

  return (
    <DashboardSkeleton title={t("Calendar.Title")}>
      <div className="h-[600px] overflow-y-auto">
        <Calendar
          max={maxTime}
          min={minTime}
          events={events}
          endAccessor="end"
          defaultView="week"
          startAccessor="start"
          localizer={localizer}
          components={{
            toolbar: CustomToolbar,
          }}
          style={{ height: "100%" }}
          culture={`${i18n.language}-ES`}
          messages={getCalendarTranslations()}
        />
      </div>
    </DashboardSkeleton>
  );
};
