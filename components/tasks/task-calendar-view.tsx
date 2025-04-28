"use client";

import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";

import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Priority, Task, TaskStatus } from "@prisma/client";
import { useCallback } from "react";
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: {
    status: TaskStatus;
    priority: Priority;
    description: string | null;
  };
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    "en-US": enUS,
  },
});

interface TaskCalendarViewProps {
  tasks: Task[];
}

export function TaskCalendarView({ tasks }: TaskCalendarViewProps) {
  const events = tasks.map((task) => ({
    id: task.id,
    title: task.subject,
    start: task.dueDate ? new Date(task.dueDate) : new Date(),
    end: task.dueDate
      ? new Date(new Date(task.dueDate).getTime() + 60 * 60 * 1000)
      : new Date(new Date().getTime() + 60 * 60 * 1000),
    allDay: false,
    resource: {
      status: task.status,
      priority: task.priority,
      description: task.description,
    },
  }));

  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    let backgroundColor = "#3174ad"; // default blue (for NORMAL)

    switch (event.resource.priority) {
      case "HIGHEST":
        backgroundColor = "#ff0000"; // bright red
        break;
      case "HIGH":
        backgroundColor = "#d92b2b"; // dark red
        break;
      case "LOW":
        backgroundColor = "#2bd957"; // green
        break;
      case "LOWEST":
        backgroundColor = "#2b8fd9"; // blue
        break;
      // NORMAL will use the default color
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  }, []);

  return (
    <div className="my-4 h-[500px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.WEEK}
        views={[Views.DAY, Views.WEEK, Views.MONTH]}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => {
          // You can implement what happens when an event is clicked
          console.log("Event clicked:", event);
        }}
      />
    </div>
  );
}
