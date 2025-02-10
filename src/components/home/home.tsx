import { DashboardSkeleton } from "../base";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import { useState } from "react";

interface MyEvent extends Event {
  id: number;
}

export const HomeDashboard = () => {
  const localizer = dateFnsLocalizer({
    format,
    parse,
    getDay,
    locales: { "es-ES": es },
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [events, setEvents] = useState<MyEvent[]>([
    {
      id: 1,
      title: "Meeting",
      start: new Date(),
      end: new Date(),
      allDay: false,
    },
  ]);

  return (
    <DashboardSkeleton title="Mi calendario">
      <div className="h-screen">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
        />
      </div>
    </DashboardSkeleton>
  );
};
