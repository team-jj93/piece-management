"use client";

import React, { ReactNode } from "react";
import { useCalendarControls, useCalendarState } from "../hooks/useCalendar";
import { cn } from "@/utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { AlertCircle, CheckCircle2, Disc2, Dot } from "lucide-react";

const DaysOfWeek = () => (
  <div className="flex w-full h-10 text-center">
    <div className="w-full h-full leading-10 basis-1/7 text-muted-foreground rounded-md font-medium text-sm">
      일
    </div>
    <div className="w-full h-full leading-10 basis-1/7 text-muted-foreground rounded-md font-medium text-sm">
      월
    </div>
    <div className="w-full h-full leading-10 basis-1/7 text-muted-foreground rounded-md font-medium text-sm">
      화
    </div>
    <div className="w-full h-full leading-10 basis-1/7 text-muted-foreground rounded-md font-medium text-sm">
      수
    </div>
    <div className="w-full h-full leading-10 basis-1/7 text-muted-foreground rounded-md font-medium text-sm">
      목
    </div>
    <div className="w-full h-full leading-10 basis-1/7 text-muted-foreground rounded-md font-medium text-sm">
      금
    </div>
    <div className="w-full h-full leading-10 basis-1/7 text-muted-foreground rounded-md font-medium text-sm">
      토
    </div>
  </div>
);

/**
 * 내부에서 Event를 year와 month로 분류해서 date component에 집어 넣기
 */
interface Event {
  date: Date;
  element: React.ReactNode;
}

interface EventsMonth {
  [day: string | number]: Event[];
}

interface EventMap {
  [year: string | number]: {
    [month: string | number]: {
      [day: string | number]: Event[];
    };
  };
}

interface DateProps {
  viewMonth: number;
  todayTime: number;
  selectedTime: number;
  currentDate: Date;
  eventsMonth: EventsMonth;
  setSelectedDate: (date: Date) => void;
}

const Date = ({
  eventsMonth,
  todayTime,
  currentDate,
  selectedTime,
  viewMonth,
  setSelectedDate,
}: DateProps) => {
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const time = currentDate.getTime();
  const events = eventsMonth[date];
  const isSelected = time === selectedTime;
  const isToday = time === todayTime;
  const isViewOutside = month !== viewMonth;

  return (
    <div className="w-full h-fit min-h-[60px] basis-1/7">
      <button
        className="w-full h-[26px] flex justify-center items-center"
        onClick={() => setSelectedDate(currentDate)}
      >
        <div
          className={cn(
            "text-sm font-medium w-[26px] h-[26px] rounded-full flex justify-center items-center",
            {
              ["bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"]:
                isSelected,
              ["bg-red-500 bg-opacity-80 text-white"]: isToday,
              ["text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30"]:
                isViewOutside,
            }
          )}
        >
          <span>{date}</span>
        </div>
      </button>

      <div className="w-full h-1" />

      <div className="w-full px-0.5 h-fit flex flex-col justify-start items-start">
        {date % 3 === 0 && (
          <div className="w-full rounded h-5 bg-muted flex justify-start items-center mb-1">
            <div className="w-5 h-5 flex justify-center items-center">
              <Disc2 size={12} />
            </div>
            <p className="text-sm font-medium text-muted-foreground">12</p>
          </div>
        )}

        {date % 2 === 0 && (
          <div className="w-full rounded h-5 bg-muted flex justify-start items-center mb-1">
            <div className="text-red-500 w-5 h-5 flex justify-center items-center">
              <AlertCircle size={12} />
            </div>
            <p className="text-sm font-medium text-muted-foreground">2</p>
          </div>
        )}

        {date % 4 === 0 && (
          <div className="w-full rounded h-5 bg-muted flex justify-start items-center mb-1">
            <div className="text-green-500 w-5 h-5 flex justify-center items-center">
              <CheckCircle2 size={12} />
            </div>
            <p className="text-sm font-medium text-muted-foreground">2</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface NavProps {
  onClickLeft: React.MouseEventHandler<HTMLButtonElement>;
  onClickRight: React.MouseEventHandler<HTMLButtonElement>;
  onClickCenter: React.MouseEventHandler<HTMLButtonElement>;
}

const Nav = ({ onClickLeft, onClickRight, onClickCenter }: NavProps) => (
  <div className="space-x-1 flex items-center h-4 w-fit justify-center box-content pt-1">
    <button
      type="button"
      onClick={onClickLeft}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </button>
    <button
      type="button"
      onClick={onClickCenter}
      className="px-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-fit bg-transparent p-0 opacity-50 hover:opacity-1001"
    >
      오늘
    </button>
    <button
      type="button"
      onClick={onClickRight}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-1001"
    >
      <ChevronRightIcon className="h-4 w-4" />
    </button>
  </div>
);

interface MonthProps {
  events: Event[];
  className?: string;
  classNames?: {
    month?: string;
    nav?: string;
    navButton?: string;
    navButtonPrevious?: string;
    navButtonNext?: string;
  };
}

const Month = ({ className }: React.ComponentPropsWithoutRef<"div">) => {
  const { viewYear, viewMonth, viewMonthCalendar, todayTime, selectedTime } =
    useCalendarState();
  const {
    moveToPreviousMonth,
    moveToNextMonth,
    setSelectedDate,
    resetToToday,
  } = useCalendarControls();

  return (
    <div className={cn("w-full h-auto", className)}>
      <div className="w-full h-6 flex justify-between items-center px-3">
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
        />
      </div>

      <div className="w-full h-4" />
      <DaysOfWeek />
      <div className="w-full h-2" />

      <div
        className={`w-full min-w-[320px] h-fit grid ${
          viewMonthCalendar.length === 6 ? "grid-rows-6" : "grid-rows-5"
        }`}
      >
        {viewMonthCalendar.map((weekCalendar, idx) => (
          <div key={idx} className="flex flex-row">
            {weekCalendar.map((day) => (
              <Date
                key={day.getTime()}
                eventsMonth={{}}
                currentDate={day}
                selectedTime={selectedTime}
                viewMonth={viewMonth}
                todayTime={todayTime}
                setSelectedDate={setSelectedDate}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Month;
