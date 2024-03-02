import { useState } from "react";
import { AlertCircle, CalendarClock, CheckCircle2, Disc2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Piece } from "@/entities/piece";
import { pieceService } from "@/services/piece";
import Calendar, { useCalendarState } from "@/components/atoms/calendar";

interface DateCount {
  date: Date;
  count: number;
}

interface DateCountMap {
  [time: number]: DateCount;
}

interface StatusBasedPieceCounts {
  received: DateCountMap;
  delayed: DateCountMap;
  expected: DateCountMap;
  departured: DateCountMap;
}

function incrementCount(dateCountMap: DateCountMap, date: Date) {
  const time = date.getTime();

  if (!dateCountMap[time]) {
    dateCountMap[time] = { date, count: 0 };
  }

  dateCountMap[time].count += 1;
}

function groupByStatus(
  pieces: Piece[]
): [keyof StatusBasedPieceCounts, DateCount[]][] {
  const statusBasedPieceCounts: StatusBasedPieceCounts = {
    received: {},
    delayed: {},
    expected: {},
    departured: {},
  };

  for (const piece of pieces) {
    const { status, receivedDate, scheduledDepartureDate, departureDate } =
      piece;

    incrementCount(statusBasedPieceCounts.received, receivedDate);

    if (departureDate) {
      incrementCount(statusBasedPieceCounts.departured, departureDate);
    } else if (status === "delayed") {
      incrementCount(statusBasedPieceCounts.delayed, scheduledDepartureDate);
    } else {
      incrementCount(statusBasedPieceCounts.expected, scheduledDepartureDate);
    }
  }

  return Object.entries(statusBasedPieceCounts).map(([key, value]) => {
    return [key as keyof StatusBasedPieceCounts, Object.values(value)];
  });
}

/**
 * PieceEventCalendar에서 중점은 오늘 기준으로 그 이전에 출고 예정일이 있는 경우 "delayed"로 표현할 것.
 * 출고가 되었으면 출고 예정일은 표현하지 않을 것.
 * @returns
 */
const PieceEventCalendar = () => {
  const [isMonth, setIsMonth] = useState(false);
  const { viewDate, selectedDatePosition } = useCalendarState();

  const { isPending, error, data } = useQuery({
    queryKey: ["getPiece", viewDate],
    queryFn: () => {
      return pieceService.getMonthlyPieces(viewDate);
    },
    initialData: [] as Piece[],
  });

  const events = groupByStatus(data)
    .map(([key, value]) => {
      if (key === "received") {
        return value.map(({ date, count }) => ({
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
        return value.map(({ date, count }) => ({
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

      if (key === "expected") {
        return value.map(({ date, count }) => ({
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

      return value.map(({ date, count }) => ({
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

  const navButtonToday =
    selectedDatePosition !== 0 ? "bg-red-500 text-white opacity-80" : undefined;

  if (isMonth) {
    return (
      <Calendar.Month
        classNames={{ navButtonToday }}
        events={events}
        onClickTitle={() => setIsMonth(false)}
      />
    );
  }

  return (
    <Calendar.Week
      classNames={{ navButtonToday }}
      events={events}
      onClickTitle={() => setIsMonth(true)}
    />
  );
};

export default PieceEventCalendar;
