"use client";

import Calendar from "@/components/atoms/calendar";
import { pieces } from "@/resources/pieces";
import { AlertCircle, CalendarClock, CheckCircle2, Disc2 } from "lucide-react";

const Page = () => {
  const events = Object.entries(
    pieces.reduce(
      (
        acc,
        { status, receivedDate, scheduledDepartureDate, departureDate }
      ) => {
        if (departureDate) {
          const departure = new Date(departureDate);
          const departureTime = departure.getTime();

          if (
            !Object.prototype.hasOwnProperty.call(acc.departured, departureTime)
          ) {
            acc.departured[departureTime] = {
              date: departure,
              count: 0,
            };
          }

          acc.departured[departureTime].count += 1;

          return acc;
        }

        const received = new Date(receivedDate);
        const receivedTime = received.getTime();
        const scheduleDeparture = new Date(scheduledDepartureDate);
        const scheduleDepartureTime = scheduleDeparture.getTime();

        if (!Object.prototype.hasOwnProperty.call(acc.received, receivedTime)) {
          acc.received[receivedTime] = {
            date: received,
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
              date: scheduleDeparture,
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
              date: scheduleDeparture,
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

  return <Calendar.Month className="p-3" events={events} />;
};

export default Page;
