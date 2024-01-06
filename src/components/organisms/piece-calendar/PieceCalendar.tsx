import { useMemo, useState } from "react";
import { AlertCircle, CalendarClock, CheckCircle2, Disc2 } from "lucide-react";

import { pieces } from "@/resources/pieces";
import Calendar from "@/components/atoms/calendar";
import PieceTable from "@/components/molecules/piece-table";
import { Piece } from "@/entities/piece";
import { useCalendarState } from "@/components/atoms/calendar/hooks/useCalendar";

interface PieceCalendarDateProps {
  pieces: Piece[];
}

const PieceCalendarDate = ({ pieces }: PieceCalendarDateProps) => {
  const { selectedDate } = useCalendarState();

  const selectedPieces = useMemo(() => {
    const selectedDateToString = selectedDate.toLocaleDateString();

    return pieces.filter(
      ({ scheduledDepartureDate, departureDate, receivedDate }) => {
        if (
          scheduledDepartureDate.toLocaleDateString() === selectedDateToString
        ) {
          return true;
        }

        if (departureDate?.toLocaleDateString() === selectedDateToString) {
          return true;
        }

        if (receivedDate.toLocaleDateString() === selectedDateToString) {
          return true;
        }

        return false;
      }
    );
  }, [pieces, selectedDate]);

  return <PieceTable pieces={selectedPieces} />;
};

const PieceCalendar = () => {
  const [isMonth, setIsMonth] = useState(false);

  const events = Object.entries(
    pieces.reduce(
      (
        acc,
        { status, receivedDate, scheduledDepartureDate, departureDate }
      ) => {
        if (departureDate) {
          const departureTime = departureDate.getTime();

          if (
            !Object.prototype.hasOwnProperty.call(acc.departured, departureTime)
          ) {
            acc.departured[departureTime] = {
              date: departureDate,
              count: 0,
            };
          }

          acc.departured[departureTime].count += 1;

          return acc;
        }

        const receivedTime = receivedDate.getTime();
        const scheduleDepartureTime = scheduledDepartureDate.getTime();

        if (!Object.prototype.hasOwnProperty.call(acc.received, receivedTime)) {
          acc.received[receivedTime] = {
            date: receivedDate,
            count: 0,
          };
        }

        acc.received[receivedTime].count += 1;

        if (status === "delayed") {
          if (
            !Object.prototype.hasOwnProperty.call(
              acc.delayed,
              scheduleDepartureTime
            )
          ) {
            acc.delayed[scheduleDepartureTime] = {
              date: scheduledDepartureDate,
              count: 0,
            };
          }

          acc.delayed[scheduleDepartureTime].count += 1;
        } else {
          if (
            !Object.prototype.hasOwnProperty.call(
              acc.scheduleDeparture,
              scheduleDepartureTime
            )
          ) {
            acc.scheduleDeparture[scheduleDepartureTime] = {
              date: scheduledDepartureDate,
              count: 0,
            };
          }

          acc.scheduleDeparture[scheduleDepartureTime].count += 1;
        }

        return acc;
      },
      {
        received: {} as { [time: number]: { date: Date; count: number } },
        delayed: {} as { [time: number]: { date: Date; count: number } },
        scheduleDeparture: {} as {
          [time: number]: { date: Date; count: number };
        },
        departured: {} as { [time: number]: { date: Date; count: number } },
      }
    )
  )
    .map(([key, value]) => {
      if (key === "received") {
        return Object.values(value).map(({ date, count }) => ({
          date,
          element: (
            <>
              <div className="w-5 h-5 flex justify-center items-center">
                <Disc2 size={12} />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {count}
              </p>
            </>
          ),
        }));
      }

      if (key === "departured") {
        return Object.values(value).map(({ date, count }) => ({
          date,
          element: (
            <>
              <div className="text-green-500 w-5 h-5 flex justify-center items-center">
                <CheckCircle2 size={12} />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {count}
              </p>
            </>
          ),
        }));
      }

      if (key === "scheduleDeparture") {
        return Object.values(value).map(({ date, count }) => ({
          date,
          element: (
            <>
              <div className="w-5 h-5 flex justify-center items-center">
                <CalendarClock size={12} />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {count}
              </p>
            </>
          ),
        }));
      }

      return Object.values(value).map(({ date, count }) => ({
        date,
        element: (
          <>
            <div className="text-red-500 w-5 h-5 flex justify-center items-center">
              <AlertCircle size={12} />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{count}</p>
          </>
        ),
      }));
    })
    .flat();

  return (
    <Calendar>
      <div className="w-full h-auto">
        {!isMonth && (
          <Calendar.Week
            events={events}
            onClickTitle={() => setIsMonth(true)}
          />
        )}
        {isMonth && (
          <Calendar.Month
            events={events}
            onClickTitle={() => setIsMonth(false)}
          />
        )}
        <div className="w-full px-3 mt-2">
          <div className="w-full h-full border-t" />
        </div>
        <PieceCalendarDate pieces={pieces} />
      </div>
    </Calendar>
  );
};

export default PieceCalendar;
