import { useCallback, useContext, useEffect, useRef, useSyncExternalStore } from "react";
import { CalendarContext } from "../utils/calendarContext";
import { CalendarManagerListener } from "../utils/calendarManager";

export function useCalendarManager() {
  const calendarManager = useContext(CalendarContext);

  if (!calendarManager) {
    throw new Error("useCalendarManager must be used within a CalendarProvider");
  }

  return calendarManager;
}

export function useCalendarState() {
  const calendarManager = useCalendarManager();

  return useSyncExternalStore(calendarManager.subscribe, calendarManager.getState, calendarManager.getState);
}

export function useCalendarControls() {
  return useCalendarManager().getControls();
}

export function useCalendarSubscribe(listener: CalendarManagerListener, dependencies: any[]) {
  const listenerRef = useRef<CalendarManagerListener>();
  const calendarManager = useCalendarManager();
  // eslint-disable-next-line
  const memoizedListener = useCallback(listener, dependencies);

  useEffect(() => {
    if (listenerRef.current) {
      calendarManager.unSubscribe(listenerRef.current);
    }

    listenerRef.current = memoizedListener;

    return calendarManager.subscribe(memoizedListener);
    // eslint-disable-next-line
  }, [memoizedListener]);
}