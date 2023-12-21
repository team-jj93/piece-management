"use client";

import { ReactNode, useMemo } from "react";

import { CalendarContext } from "./utils/calendarContext";
import CalendarManager from "./utils/calendarManager";
import Month from "./components/Month";

type CalendarProps = {
  initialDate?: Date;
  children: ReactNode;
};
const Calendar = ({ initialDate, children }: CalendarProps) => {
  // eslint-disable-next-line
  const calendarManager = useMemo(() => new CalendarManager(initialDate), []);

  return (
    <CalendarContext.Provider value={calendarManager}>
      {children}
    </CalendarContext.Provider>
  );
};

Calendar.Month = Month;

export default Calendar;
