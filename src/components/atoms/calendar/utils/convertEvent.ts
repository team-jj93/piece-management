import { CalendarEvent, CalendarEventMap } from "../types";

export function convertToEventMap(events?: CalendarEvent[]): CalendarEventMap {
  if (!events) {
    return {};
  }

  return events.reduce((acc, cur) => {
    const targetDate = cur.date
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const date = targetDate.getDate();

    if (!Object.prototype.hasOwnProperty.call(acc, year)) {
      acc[year] = { [month]: { [date]: [cur] } };

      return acc;
    }

    if (!Object.prototype.hasOwnProperty.call(acc[year], month)) {
      acc[year][month] = { [date]: [cur] };

      return acc;
    }

    if (!Object.prototype.hasOwnProperty.call(acc[year][month], date)) {
      acc[year][month][date] = [cur];

      return acc;
    }

    const newDateList = acc[year][month][date].concat(cur);

    newDateList.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });

    acc[year][month][date] = newDateList;

    return acc;
  }, {} as CalendarEventMap);
}