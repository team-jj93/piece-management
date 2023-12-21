import { ReactNode } from "react";

export interface CalendarEventElementProps {
  date: Date;
  setSelectedDate: (date: Date) => void;
}

export interface CalendarEvent {
  date: Date;
  element: ReactNode | ((props: CalendarEventElementProps) => ReactNode);
}

export interface CalendarEventsMonth {
  [date: number]: CalendarEvent[];
}

export interface CalendarEventMap {
  [year: number]: {
    [month: number]: CalendarEventsMonth;
  };
}