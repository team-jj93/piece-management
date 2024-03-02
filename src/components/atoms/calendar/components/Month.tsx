import { MouseEventHandler, RefAttributes, forwardRef, useMemo } from "react";

import { cn } from "@/utils/cn";
import type { CalendarEvent, CalendarEventsMonth } from "../types";
import { useCalendarControls, useCalendarState } from "../hooks/useCalendar";
import { convertToEventMap } from "../utils/convertEvent";
import { getClassNames } from "../utils/getClassNames";
import Nav from "./Nav";

interface SelectDateIconClassProps {
  isSelected: boolean;
  isToday: boolean;
  isViewOutside: boolean;
}

interface DateProps {
  viewMonth: number;
  todayTime: number;
  selectedTime: number;
  currentDate: Date;
  eventsMonth: CalendarEventsMonth;
  setSelectedDate: (date: Date) => void;
  classNames?: {
    date?: string;
    selectDateButton?: string;
    selectDateIcon?: string | ((props: SelectDateIconClassProps) => string);
    eventsContainer?: string;
    event?: string;
  };
}

const Date = ({
  eventsMonth,
  todayTime,
  currentDate,
  selectedTime,
  viewMonth,
  setSelectedDate,
  classNames = {},
}: DateProps) => {
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const time = currentDate.getTime();
  const isViewOutside = month !== viewMonth;
  const events = eventsMonth[date];
  const isSelected = time === selectedTime;
  const isToday = time === todayTime;

  return (
    <div className={classNames.date}>
      <button
        className={classNames.selectDateButton}
        onClick={() => setSelectedDate(currentDate)}
      >
        <div
          className={cn(
            "text-sm font-medium w-[26px] h-[26px] leading-6 rounded-full text-center",
            {
              ["bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"]:
                isSelected,
              ["bg-red-500 bg-opacity-80 text-white"]: isToday,
              ["text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30"]:
                isViewOutside,
            },
            classNames.selectDateIcon
          )}
        >
          {date}
        </div>
      </button>

      <div className={classNames.eventsContainer}>
        {events &&
          !isViewOutside &&
          events.map(({ date, element }, idx) => (
            <div key={idx} className={classNames.event}>
              {typeof element === "function"
                ? element({ date, setSelectedDate })
                : element}
            </div>
          ))}
      </div>
    </div>
  );
};

interface DaysOfWeekProps {
  className?: string;
  dayClassName?: string;
}

const DaysOfWeek = ({ className, dayClassName }: DaysOfWeekProps) => {
  const day = cn(
    "w-full h-full basis-1/7 text-muted-foreground rounded-md font-medium text-sm",
    "leading-8",
    dayClassName
  );

  return (
    <div className={cn("flex w-full h-fit text-center px-3.5", className)}>
      <p className={day}>일</p>
      <p className={day}>월</p>
      <p className={day}>화</p>
      <p className={day}>수</p>
      <p className={day}>목</p>
      <p className={day}>금</p>
      <p className={day}>토</p>
    </div>
  );
};

interface MonthProps {
  onClickTitle?: MouseEventHandler<HTMLButtonElement>;
  events?: CalendarEvent[];
  className?: string;
  classNames?: {
    monthContainer?: string;
    header?: string;
    nav?: string;
    navButton?: string;
    navButtonPrevious?: string;
    navButtonNext?: string;
    navButtonToday?: string;
    daysOfWeek?: string;
    day?: string;
    week?: string;
    date?: string;
    selectDateButton?: string;
    selectDateIcon?: string | ((props: SelectDateIconClassProps) => string);
    eventsContainer?: string;
    event?: string;
  };
}

const Month = forwardRef<
  HTMLDivElement,
  MonthProps & RefAttributes<HTMLDivElement>
>(
  (
    {
      onClickTitle,
      events,
      className,
      classNames: {
        selectDateIcon,
        monthContainer,
        header,
        nav,
        navButton,
        navButtonPrevious,
        navButtonNext,
        navButtonToday,
        daysOfWeek,
        day,
        week,
        ...restClassNames
      } = {},
    },
    ref
  ) => {
    const { viewYear, viewMonth, viewMonthCalendar, todayTime, selectedTime } =
      useCalendarState();
    const {
      moveToPreviousMonth,
      moveToNextMonth,
      setSelectedDate,
      resetToToday,
    } = useCalendarControls();
    const eventMap = useMemo(() => convertToEventMap(events), [events]);
    const eventsMonth = eventMap[viewYear]
      ? eventMap[viewYear][viewMonth] ?? {}
      : {};

    const dateClassNames = useMemo(
      () => ({
        ...getClassNames(
          {
            date: "w-full h-fit min-h-[60px] basis-1/7",
            selectDateButton:
              "w-full h-[26px] flex justify-center items-center",
            eventsContainer:
              "w-full px-1 h-fit flex flex-col justify-start items-start mt-1",
            event:
              "w-full rounded h-5 bg-muted flex sm:justify-center justify-between items-center pr-2 items-center sm:gap-1 mb-1",
          },
          restClassNames
        ),
        selectDateIcon,
      }),
      // eslint-disable-next-line
      []
    );

    return (
      <div ref={ref} className={cn("w-full h-auto", className)}>
        <div
          className={cn(
            "w-full h-6 flex justify-between items-center px-4 mb-4",
            header
          )}
        >
          <h2
            aria-live="polite"
            role="presentation"
            className="text-lg font-bold"
          >
            <button
              type="button"
              className="w-full h-auto text-inherit hover:text-muted  border-b"
              onClick={onClickTitle}
            >
              {viewYear}년 {viewMonth + 1}월
            </button>
          </h2>
          <Nav
            onClickLeft={moveToPreviousMonth}
            onClickRight={moveToNextMonth}
            onClickCenter={resetToToday}
            className={nav}
            classNames={{
              navButton,
              navButtonNext,
              navButtonPrevious,
            }}
          />
        </div>

        <DaysOfWeek className={daysOfWeek} dayClassName={day} />

        <div
          className={cn("w-full min-w-[320px] h-fit px-3.5", monthContainer)}
        >
          {viewMonthCalendar.map((weekCalendar, idx) => (
            <div key={idx} className={cn("flex flex-row", week)}>
              {weekCalendar.map((day) => (
                <Date
                  key={day.getTime()}
                  eventsMonth={eventsMonth}
                  currentDate={day}
                  selectedTime={selectedTime}
                  viewMonth={viewMonth}
                  todayTime={todayTime}
                  setSelectedDate={setSelectedDate}
                  classNames={dateClassNames}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
Month.displayName = "Month";

export default Month;
