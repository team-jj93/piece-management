function createMonthCalendar(currentDate: Date): Date[][] {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentStartDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const [currentEndDate, currentEndDay] = (() => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    return [date.getDate(), date.getDay()];
  })();
  const previousEndDate = new Date(currentYear, currentMonth, 0).getDate();
  const lastLength = currentEndDate + (7 - currentEndDay);

  const calendar: Date[][] = [[]];
  let day = -1;
  let week = 0;

  for (let i = -currentStartDay + 1; i < lastLength; i++) {
    if (day > 5) {
      day = 0;
      week++;
      calendar.push([]);
    } else {
      day++;
    }

    if (i < 1) {
      calendar[week][day] = new Date(
        currentYear,
        currentMonth - 1,
        previousEndDate + i
      );
    } else if (i > currentEndDate) {
      calendar[week][day] = new Date(
        currentYear,
        currentMonth + 1,
        i - currentEndDate
      );
    } else {
      calendar[week][day] = new Date(currentYear, currentMonth, i);
    }
  }

  return calendar;
}

type Calendar = Map<number, Map<number, Date[][]>>;

class CalendarMap {
  private calendar: Calendar = new Map();

  constructor() {
    const date = new Date();

    this.setCalendar(date);
  }

  getMonthCalendar(targetDate: Date) {
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();

    if (!this.calendar.has(targetYear)) {
      this.setCalendar(targetDate);
    }

    const yearCalendar = this.calendar.get(targetYear);

    if (!yearCalendar) {
      throw new Error("calendarManager.ts line:78 not found yearCalendar");
    }

    if (!yearCalendar.has(targetMonth)) {
      this.setCalendar(targetDate);
    }

    const monthCalendar = yearCalendar.get(targetMonth);

    if (!monthCalendar) {
      throw new Error("calendarManager.ts line:88 not found monthCalendar");
    }

    return monthCalendar;
  }

  setCalendar(targetDate: Date) {
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();

    if (!this.calendar.has(targetYear)) {
      const yearCalendar = new Map();
      const monthCalendar = createMonthCalendar(targetDate);

      yearCalendar.set(targetMonth, monthCalendar);
      this.calendar.set(targetYear, yearCalendar);

      return this;
    }

    const yearCalendar = this.calendar.get(targetYear);

    if (!yearCalendar) {
      throw new Error("calendarManager.ts line:111 not found yearCalendar");
    }

    if (yearCalendar.has(targetMonth)) {
      return this;
    }

    const monthCalendar = createMonthCalendar(targetDate);

    yearCalendar.set(targetMonth, monthCalendar);

    return this;
  }
}

export default CalendarMap;