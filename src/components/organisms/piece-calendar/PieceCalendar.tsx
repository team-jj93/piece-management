"use client";

import Calendar from "@/components/atoms/calendar";
import SelectedDatePieceTable from "./components/SelectedDatePieceTable";
import PieceEventCalendar from "./components/PieceEventCalendar";

const PieceCalendar = () => (
  <Calendar>
    <div className="w-full h-auto">
      <PieceEventCalendar />
      <div className="w-full px-3 mt-2">
        <div className="w-full h-full border-t" />
      </div>
      <SelectedDatePieceTable />
    </div>
  </Calendar>
);

export default PieceCalendar;
