import { compareDate } from "..";
import CalendarMap from "./calendarMap";

const calendarMap = new CalendarMap();

export interface CalendarState {
  viewDate: Date;
  viewYear: number;
  viewMonth: number;
  viewWeek: number;
  viewDay: number;
  viewWeekCalendar: Date[];
  viewMonthCalendar: Date[][];
  viewMonthCalendars: Date[][][];
  currentViewMonthCalendarIndex: number;
  selectedDate: Date;
  selectedTime: number;
  todayDate: Date;
  todayTime: number;
  selectedDatePosition: -1 | 0 | 1;
}

export interface CalendarControls {
  moveToPreviousWeek: () => void;
  moveToNextWeek: () => void;
  moveToPreviousMonth: () => void;
  moveToNextMonth: () => void;
  resetToToday: () => void;
  setViewDate: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
}

// selectedDate가 변경되면 viewDate를 바로 selectedDate로 동기화 할 것.
export type CalendarManagerListener = (state: CalendarState) => void;

class CalendarManager {
  private todayDate = new Date();
  private viewDate = new Date();
  private viewYear = 1970;
  private viewMonth = 0;
  private viewWeek = 0;
  private viewDay = 0;
  private viewMonthCalendar: Date[][] = [];
  private viewMonthCalendars: Date[][][] = [];
  private currentViewMonthCalendarIndex = 0;
  private selectedDate = new Date();
  private todayTime = 0;
  private selectedDatePosition: -1 | 0 | 1 = 0;
  private calendarCount = 1;
  private listeners: Set<CalendarManagerListener> = new Set();
  private calendarState!: CalendarState;
  private calendarControls!: CalendarControls;

  constructor(initialDate: Date = new Date()) {
    this.viewDate = initialDate;
    this.selectedDate = initialDate;
    this.viewDate.setHours(0, 0, 0, 0);
    this.selectedDate.setHours(0, 0, 0, 0);

    this.bind();
    this.refreshTodayDate();
    this.setViewDateInfo();
    this.setCalendarState();
    this.setCalendarControls();
  }

  private bind() {
    this.moveToPreviousWeek = this.moveToPreviousWeek.bind(this);
    this.moveToNextWeek = this.moveToNextWeek.bind(this);
    this.moveToPreviousMonth = this.moveToPreviousMonth.bind(this);
    this.moveToNextMonth = this.moveToNextMonth.bind(this);
    this.resetToToday = this.resetToToday.bind(this);
    this.setViewDate = this.setViewDate.bind(this);
    this.setSelectedDate = this.setSelectedDate.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.getState = this.getState.bind(this);
  }

  private refreshTodayDate() {
    const date = new Date();

    // calendar element에서 서로 getTime으로 현재 날짜를 파악하기 위해 0시간으로 초기화.
    date.setHours(0, 0, 0, 0);

    const time = date.getTime();

    if (time === this.todayTime) {
      return;
    }

    this.todayDate = date;
    this.todayTime = time;
    this.selectedDatePosition = compareDate(this.todayDate, this.selectedDate);
  }

  private setCalendarState() {
    this.calendarState = {
      viewDate: this.viewDate,
      viewYear: this.viewYear,
      viewMonth: this.viewMonth,
      viewWeek: this.viewWeek,
      viewDay: this.viewDay,
      viewWeekCalendar: this.viewMonthCalendar[this.viewWeek],
      viewMonthCalendar: this.viewMonthCalendar,
      viewMonthCalendars: this.viewMonthCalendars,
      currentViewMonthCalendarIndex: this.currentViewMonthCalendarIndex,
      selectedDate: this.selectedDate,
      selectedTime: this.selectedDate.getTime(),
      todayDate: this.todayDate,
      todayTime: this.todayTime,
      selectedDatePosition: this.selectedDatePosition,
    }
  }

  private setCalendarControls() {
    this.calendarControls = {
      moveToPreviousWeek: this.moveToPreviousWeek,
      moveToNextWeek: this.moveToNextWeek,
      moveToPreviousMonth: this.moveToPreviousMonth,
      moveToNextMonth: this.moveToNextMonth,
      resetToToday: this.resetToToday,
      setViewDate: this.setViewDate,
      setSelectedDate: this.setSelectedDate
    }
  }

  private notify() {
    this.refreshTodayDate();
    this.setCalendarState();

    this.listeners.forEach(listener => listener(this.calendarState));
  }

  private getPreviousMonthDate(previousMonth: number = 0) {
    return new Date(this.viewYear, this.viewMonth - previousMonth, 0);
  }

  private getNextMonthDate(nextMonth: number = 0) {
    return new Date(this.viewYear, this.viewMonth + nextMonth + 1, 1);
  }

  private setViewMonthCalendars() {
    const middleIndex = Math.floor(this.calendarCount / 2);
    const newViewMonthCalendar = [];

    for (let i = 0; i < this.calendarCount; i++) {
      const monthOffset = i - middleIndex;

      if (monthOffset < 0) {
        newViewMonthCalendar[i] = calendarMap.getMonthCalendar(this.getPreviousMonthDate(-monthOffset - 1));
        continue;
      }

      if (monthOffset === 0) {
        newViewMonthCalendar[i] = calendarMap.getMonthCalendar(this.viewDate);
        continue;
      }

      newViewMonthCalendar[i] = calendarMap.getMonthCalendar(this.getNextMonthDate(monthOffset - 1));
    }

    this.currentViewMonthCalendarIndex = middleIndex;
    this.viewMonthCalendars = newViewMonthCalendar;
    this.viewMonthCalendar = newViewMonthCalendar[middleIndex];
  }

  private setViewDateInfo() {
    const newViewYear = this.viewDate.getFullYear();
    const newViewMonth = this.viewDate.getMonth();
    const newViewDate = this.viewDate.getDate();
    const newViewDay = this.viewDate.getDay();
    const newViewFirstDay = new Date(newViewYear, newViewMonth, 1).getDay();

    if (newViewYear !== this.viewYear || newViewMonth !== this.viewMonth) {
      this.setViewMonthCalendars();
    }

    this.viewYear = newViewYear;
    this.viewMonth = newViewMonth;
    this.viewDay = newViewDay;
    this.viewWeek = Math.floor((newViewDate + newViewFirstDay - 1) / 7);
  }

  /**
   * calendarCount는 홀수만 입력해주세요.
   * (짝수로 입력하면 내부에서 +1 추가한 홀수로 변경됩니다.)
  **/
  setCalendarCount(calendarCount: number) {
    this.calendarCount = calendarCount % 2 === 0 ? calendarCount + 1 : calendarCount;
  }

  getState(): CalendarState {
    return this.calendarState;
  }

  getControls() {
    return this.calendarControls;
  }

  subscribe(listener: CalendarManagerListener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    }
  }

  unSubscribe(listener: CalendarManagerListener) {
    this.listeners.delete(listener);
  }

  setViewDate(date: Date) {
    if (date === this.viewDate) {
      return;
    }

    this.viewDate = date;
    this.setViewDateInfo();
    this.notify();
  }

  setSelectedDate(date: Date) {
    if (date === this.selectedDate) {
      return;
    }

    this.selectedDate = date;
    this.selectedDatePosition = compareDate(this.todayDate, this.selectedDate);

    this.setViewDate(date);
  }

  moveToPreviousMonth() {
    const previousMonthDate = new Date(this.viewYear, this.viewMonth, 0);

    this.setViewDate(previousMonthDate);
  }

  moveToNextMonth() {
    const nextMonthDate = new Date(this.viewYear, this.viewMonth + 1, 1);

    this.setViewDate(nextMonthDate);
  }

  moveToPreviousWeek() {
    const previousWeekDate = new Date(this.viewYear, this.viewMonth, this.viewDate.getDate() - 7);

    this.setViewDate(previousWeekDate);
  }

  moveToNextWeek() {
    const nextWeekDate = new Date(this.viewYear, this.viewMonth, this.viewDate.getDate() + 7);

    this.setViewDate(nextWeekDate);
  }

  /**
 * 오늘 날짜로 변경
 */
  resetToToday() {
    if (this.selectedDate === this.todayDate) {
      this.setViewDate(this.todayDate);

      return;
    }

    this.setSelectedDate(this.todayDate);
  }

}

export default CalendarManager;