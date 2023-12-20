import { ReactNode, useMemo } from "react";

import { pieces } from "@/resources/pieces";
import Calendar from "@/components/atoms/calendar";

interface PieceCalendarProps {
  children: ReactNode;
}

const PieceCalendar = ({ children }: PieceCalendarProps) => {
  const events = useMemo(
    () =>
      Object.entries(
        pieces.reduce(
          (acc, { scheduledDepartureDate }) => {
            if (
              Object.prototype.hasOwnProperty.call(acc, scheduledDepartureDate)
            ) {
              acc[scheduledDepartureDate] += 1;
            } else {
              acc[scheduledDepartureDate] = 1;
            }

            return acc;
            // TO-DO: 입고, 출고 예정일 포함할 것.
          },
          {} as { [key: string]: number }
        )
      ).map(([key, count]) => ({
        id: key,
        title: <div className="w-full bg-pink-300">{count}</div>,
        start: new Date(key),
        end: new Date(key),
        allDay: true,
      })),
    []
  );

  return (
    <div className="h-auto">
      <Calendar>{children}</Calendar>
    </div>
  );
};

export default PieceCalendar;
