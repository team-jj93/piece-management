"use client";

import Calendar from "@/components/atoms/calendar";
import DayPicker from "@/components/atoms/day-picker";
import PieceCalendar from "@/components/organisms/piece-calendar";

const Home = () => {
  return (
    <main className="w-full h-auto min-h-screen relative">
      <div className=" w-full h-auto">
        <div className="w-full h-auto">
          <PieceCalendar>
            <Calendar.Month className="p-3" />
          </PieceCalendar>
        </div>
      </div>
      <div className="w-fit h-fit">
        <DayPicker />
      </div>
      <div className="w-full h-[1000px]" />
    </main>
  );
};

export default Home;
