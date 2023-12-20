"use client";

import { ReactNode, HTMLAttributes, useMemo } from "react";

import { CalendarContext } from "./utils/calendarContext";
import CalendarManager from "./utils/calendarManager";
import Month from "./components/Month";

type CalendarProps = {
  initialDate?: Date;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Calendar = ({ initialDate, children, ...restProps }: CalendarProps) => {
  // eslint-disable-next-line
  const calendarManager = useMemo(() => new CalendarManager(initialDate), []);

  return (
    <CalendarContext.Provider value={calendarManager}>
      <div {...restProps}>{children}</div>
    </CalendarContext.Provider>
  );
};

Calendar.Month = Month;

export default Calendar;
