import { MouseEventHandler, RefAttributes, forwardRef, useMemo } from "react";

import type { CalendarEventMap, CalendarEvent } from "../types";
import { cn } from "@/utils";
import { useCalendarControls, useCalendarState } from "../hooks/useCalendar";
import { convertToEventMap } from "../utils/convertEvent";
import { getClassNames } from "../utils/getClassNames";
import Nav from "./Nav";

function getDateProps(currentDate: Date, eventMap: CalendarEventMap) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const date = currentDate.getDate();
  const time = currentDate.getTime();
  const day = currentDate.getDay();
  const events = (() => {
    if (!eventMap[year]) {
      return [];
    }

    if (!eventMap[year][month]) {
      return [];
    }

    return eventMap[year][month][date] ?? [];
  })();

  return {
    date,
    time,
    day,
    events,
  };
}

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];

interface SelectDateIconClassProps {
  isSelected: boolean;
  isToday: boolean;
}

interface DateProps {
  viewMonth: number;
  todayTime: number;
  selectedTime: number;
  currentDate: Date;
  eventMap: CalendarEventMap;
  setSelectedDate: (date: Date) => void;
  classNames?: {
    day?: string;
    date?: string;
    dateContainer?: string;
    selectDateButton?: string | ((props: SelectDateIconClassProps) => string);
    selectDateIcon?: string | ((props: SelectDateIconClassProps) => string);
    eventsContainer?: string;
    event?: string;
  };
}

const Date = ({
  eventMap,
  todayTime,
  currentDate,
  selectedTime,
  setSelectedDate,
  classNames = {},
}: DateProps) => {
  const { date, time, day, events } = getDateProps(currentDate, eventMap);
  const isSelected = time === selectedTime;
  const isToday = time === todayTime;

  return (
    <div className={classNames.dateContainer}>
      <div className={classNames.date}>
        <button
          className={cn(
            "w-full h-fit rounded-xl flex flex-col justify-center items-center",
            {
              ["bg-border"]: isSelected,
            },
            typeof classNames.selectDateButton === "function"
              ? classNames.selectDateButton({
                  isSelected,
                  isToday,
                })
              : classNames.selectDateButton
          )}
          onClick={() => setSelectedDate(currentDate)}
        >
          <p className={classNames.day}>{DAYS_OF_WEEK[day]}</p>
          <div
            className={cn(
              "text-sm font-medium w-[26px] h-[26px] leading-6 rounded-full text-center mb-2",
              {
                ["bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"]:
                  isSelected,
                ["bg-red-500 bg-opacity-80 text-white"]: isToday,
              },
              typeof classNames.selectDateIcon === "function"
                ? classNames.selectDateIcon({
                    isSelected,
                    isToday,
                  })
                : classNames.selectDateIcon
            )}
          >
            {date}
          </div>
        </button>
      </div>

      <div className={classNames.eventsContainer}>
        {events.map(({ date, element }, idx) => (
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

interface TitleProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  viewWeekCalendar: Date[];
}

const Title = ({ onClick, viewWeekCalendar }: TitleProps) => {
  const firstDate = viewWeekCalendar[0];
  const lastDate = viewWeekCalendar[viewWeekCalendar.length - 1];

  return (
    <h2 aria-live="polite" role="presentation" className="text-lg font-bold">
      <button
        type="button"
        className="w-full h-auto text-inherit hover:text-muted border-b"
        onClick={onClick}
      >
        {firstDate.getMonth() === lastDate.getMonth()
          ? `${firstDate.getFullYear()}년 ${firstDate.getMonth() + 1}월`
          : firstDate.getFullYear() === lastDate.getFullYear()
            ? `${firstDate.getFullYear()}년 ${firstDate.getMonth() + 1}월 ~ ${
                lastDate.getMonth() + 1
              }월`
            : `${firstDate.getFullYear()}년 ${
                firstDate.getMonth() + 1
              }월 ~ ${lastDate.getFullYear()}년 ${lastDate.getMonth() + 1}월`}
      </button>
    </h2>
  );
};

interface WeekProps {
  onClickTitle?: MouseEventHandler<HTMLButtonElement>;
  events?: CalendarEvent[];
  className?: string;
  classNames?: {
    weekContainer?: string;
    header?: string;
    nav?: string;
    navButton?: string;
    navButtonPrevious?: string;
    navButtonNext?: string;
    navButtonToday?: string;
    dates?: string;
    date?: string;
    selectDateButton?: string | ((props: SelectDateIconClassProps) => string);
    selectDateIcon?: string | ((props: SelectDateIconClassProps) => string);
    eventsContainer?: string;
    event?: string;
  };
}

const Week = forwardRef<
  HTMLDivElement,
  WeekProps & RefAttributes<HTMLDivElement>
>(
  (
    {
      onClickTitle,
      events,
      className,
      classNames: {
        selectDateButton,
        selectDateIcon,
        weekContainer,
        header,
        nav,
        navButton,
        navButtonPrevious,
        navButtonNext,
        navButtonToday,
        ...restClassNames
      } = {},
    },
    ref
  ) => {
    const { viewYear, viewMonth, viewWeekCalendar, todayTime, selectedTime } =
      useCalendarState();

    const {
      moveToPreviousWeek,
      moveToNextWeek,
      setSelectedDate,
      resetToToday,
    } = useCalendarControls();
    const eventMap = useMemo(() => convertToEventMap(events), [events]);

    const dateClassNames = useMemo(
      () => ({
        ...getClassNames(
          {
            day: "w-full h-full leading-8 basis-1/7 text-muted-foreground rounded-md font-medium text-sm",
            date: "w-full h-fit py-0 px-1",
            eventsContainer:
              "w-full px-1 h-fit flex flex-col justify-start items-start",
            event:
              "w-full rounded h-5 bg-muted flex sm:justify-center justify-between items-center pr-2 items-center sm:gap-1 mb-1 first:mt-1",
          },
          restClassNames
        ),
        selectDateButton,
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
          <Title onClick={onClickTitle} viewWeekCalendar={viewWeekCalendar} />
          <Nav
            onClickLeft={moveToPreviousWeek}
            onClickRight={moveToNextWeek}
            onClickCenter={resetToToday}
            className={nav}
            classNames={{
              navButton,
              navButtonNext,
              navButtonPrevious,
            }}
          />
        </div>

        <div
          className={cn(
            "w-full min-w-[320px] h-fit grid grid-cols-7",
            weekContainer
          )}
        >
          {viewWeekCalendar.map((day) => (
            <Date
              key={day.getTime()}
              eventMap={eventMap}
              currentDate={day}
              selectedTime={selectedTime}
              viewMonth={viewMonth}
              todayTime={todayTime}
              setSelectedDate={setSelectedDate}
              classNames={dateClassNames}
            />
          ))}
        </div>
      </div>
    );
  }
);
Week.displayName = "Week";

export default Week;
