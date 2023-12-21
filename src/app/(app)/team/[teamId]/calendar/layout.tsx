"use client";

import PieceList from "@/components/molecules/piece-list";
import PieceCalendar from "@/components/organisms/piece-calendar";
import { pieces } from "@/resources/pieces";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full h-auto min-h-screen relative">
      <div className=" w-full h-auto">
        <div className="w-full h-fit py-2 px-4 mb-2">
          <h1 className="h-10 indent-1 leading-10 border-b border-solid border-border text-lg font-semibold tracking-tight">
            일정
          </h1>
        </div>
        <div className="w-full h-auto">
          <PieceCalendar>{children}</PieceCalendar>
        </div>
        <div className="w-full h-auto">
          <PieceList pieces={pieces} />
        </div>
      </div>
    </main>
  );
};

export default Layout;
