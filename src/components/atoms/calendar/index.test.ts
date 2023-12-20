import CalendarManager from "./utils/calendarManager";

test("calendarManager", () => {
  const calendarManager = new CalendarManager(new Date("2023-12-05"));
  const states = [];
  const TEST_CASES = [
    "2023-12-05T00:00:00.000Z 2023 12 1 5 2",
    "2023-11-27T15:00:00.000Z 2023 11 4 28 2",
    "2023-11-20T15:00:00.000Z 2023 11 3 21 2",
    "2023-11-27T15:00:00.000Z 2023 11 4 28 2",
    "2023-12-04T15:00:00.000Z 2023 12 1 5 2",
    "2023-12-31T15:00:00.000Z 2024 1 0 1 1"
  ];

  {
    const { viewMonth, viewDate, viewWeek, viewDay, viewYear } = calendarManager.getState();
    states.push(`${viewDate.toISOString()} ${viewYear} ${viewMonth + 1} ${viewWeek} ${viewDate.getDate()} ${viewDay}`);
  }

  calendarManager.subscribe(({ viewMonth, viewDate, viewWeek, viewDay, viewYear }) => {
    states.push(`${viewDate.toISOString()} ${viewYear} ${viewMonth + 1} ${viewWeek} ${viewDate.getDate()} ${viewDay}`);
  });
  calendarManager.moveToPreviousWeek();
  calendarManager.moveToPreviousWeek();
  calendarManager.moveToNextWeek();
  calendarManager.moveToNextWeek();
  calendarManager.moveToNextMonth();

  expect(states.join(",")).toEqual(TEST_CASES.join(","));
});