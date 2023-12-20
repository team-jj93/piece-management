"use client";

import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker as ReactDayPicker } from "react-day-picker";

import { cn } from "@/utils";

export type DayPickerProps = React.ComponentProps<typeof ReactDayPicker>;

type Day = {
  ariaLabel: string;
  label: string;
};

const DAYS: Day[] = [
  { ariaLabel: "Sunday", label: "일" },
  { ariaLabel: "Monday", label: "월" },
  { ariaLabel: "Tuesday", label: "화" },
  { ariaLabel: "Wednesday", label: "수" },
  { ariaLabel: "Thursday", label: "목" },
  { ariaLabel: "Friday", label: "금" },
  { ariaLabel: "Saturday", label: "토" },
];

const DayPicker = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: DayPickerProps) => (
  <ReactDayPicker
    showOutsideDays={showOutsideDays}
    className={cn("p-3", className)}
    classNames={{
      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
      month: "space-y-4",
      caption: "flex justify-center pt-1 relative items-center",
      caption_label: "text-sm font-medium",
      nav: "space-x-1 flex items-center",
      nav_button:
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
      nav_button_previous: "absolute left-1",
      nav_button_next: "absolute right-1",
      table: "w-full border-collapse space-y-1",
      head_row: "flex",
      head_cell:
        "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
      row: "flex w-full mt-2",
      cell: cn(
        "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50",
        props.mode === "range"
          ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
          : "[&:has([aria-selected])]:rounded-md"
      ),
      day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground",
      day_range_start: "day-range-start",
      day_range_end: "day-range-end",
      day_selected:
        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
      day_today: "bg-accent text-accent-foreground",
      day_outside:
        "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
      day_disabled: "text-muted-foreground opacity-50",
      day_range_middle:
        "aria-selected:bg-accent aria-selected:text-accent-foreground",
      day_hidden: "invisible",
      ...classNames,
    }}
    components={{
      CaptionLabel: ({ id, displayMonth }) => (
        <div
          className="text-sm font-medium"
          aria-live="polite"
          role="presentation"
          id={id}
        >
          {displayMonth.getFullYear()}년 {displayMonth.getMonth() + 1}월
        </div>
      ),
      HeadRow: () => (
        <tr className="flex">
          {DAYS.map(({ ariaLabel, label }) => (
            <th
              className="text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]"
              key={ariaLabel}
            >
              {label}
            </th>
          ))}
        </tr>
      ),
      IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
      IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
    }}
    {...props}
  />
);

export default DayPicker;
