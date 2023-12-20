import { createContext } from "react";
import CalendarManager from "./calendarManager";

export const CalendarContext = createContext<CalendarManager | null>(null);