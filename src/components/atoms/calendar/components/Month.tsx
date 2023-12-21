"use client";

import { RefAttributes, forwardRef, useMemo } from "react";

import { cn } from "@/utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useCalendarControls, useCalendarState } from "../hooks/useCalendar";
import { CalendarEvent, CalendarEventsMonth } from "../types";
import { convertToEventMap } from "../utils/convertEvent";
import { getClassNames } from "../utils/getClassNames";

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
  const events = eventsMonth[date];
  const isSelected = time === selectedTime;
  const isToday = time === todayTime;
  const isViewOutside = month !== viewMonth;

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
    "w-full h-full leading-10 basis-1/7 text-muted-foreground rounded-md font-medium text-sm mb-2",
    dayClassName
  );

  return (
    <div className={cn("flex w-full h-10 text-center", className)}>
      <div className={day}>일</div>
      <div className={day}>월</div>
      <div className={day}>화</div>
      <div className={day}>수</div>
      <div className={day}>목</div>
      <div className={day}>금</div>
      <div className={day}>토</div>
    </div>
  );
};

interface NavProps {
  onClickLeft: React.MouseEventHandler<HTMLButtonElement>;
  onClickRight: React.MouseEventHandler<HTMLButtonElement>;
  onClickCenter: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  classNames?: {
    navButton?: string;
    navButtonPrevious?: string;
    navButtonNext?: string;
    navButtonToday?: string;
  };
}

const Nav = ({
  onClickLeft,
  onClickRight,
  onClickCenter,
  className,
  classNames = {},
}: NavProps) => (
  <div
    className={cn(
      "space-x-1 flex items-center h-4 w-fit justify-center box-content pt-1",
      className
    )}
  >
    <button
      type="button"
      onClick={onClickLeft}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        classNames.navButton,
        classNames.navButtonPrevious
      )}
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </button>
    <button
      type="button"
      onClick={onClickCenter}
      className={cn(
        "px-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-fit bg-transparent opacity-50 hover:opacity-1001",
        classNames.navButton,
        classNames.navButtonToday
      )}
    >
      오늘
    </button>
    <button
      type="button"
      onClick={onClickRight}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-1001",
        classNames.navButton,
        classNames.navButtonNext
      )}
    >
      <ChevronRightIcon className="h-4 w-4" />
    </button>
  </div>
);

interface SelectDateIconClassProps {
  isSelected: boolean;
  isToday: boolean;
  isViewOutside: boolean;
}

interface MonthProps {
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
    weeks?: string;
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
        weeks,
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
              "w-full px-0.5 h-fit flex flex-col justify-start items-start mt-1",
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
            "w-full h-6 flex justify-between items-center px-3 mb-4",
            header
          )}
        >
          <h2
            aria-live="polite"
            role="presentation"
            className="text-lg font-bold"
          >
            {viewYear}년 {viewMonth + 1}월
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
          className={cn(
            "w-full min-w-[320px] h-fit grid grid-rows-5",
            {
              ["grid-rows-6"]: viewMonthCalendar.length === 6,
            },
            weeks
          )}
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
