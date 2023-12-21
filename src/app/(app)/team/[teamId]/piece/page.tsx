"use client";

import PieceList from "@/components/molecules/piece-list";
import { pieces } from "@/resources/pieces";

const Page = () => {
  return (
    <main className="w-full h-auto min-h-screen relative">
      <div className=" w-full h-auto">
        <div className="w-full h-auto">
          <div className="indent-1 w-full h-fit py-2 px-4 mb-2">
            <h1 className="h-10 leading-10 border-b border-solid border-border text-lg font-semibold tracking-tight">
              목록
            </h1>
          </div>
          <PieceList pieces={pieces} />
        </div>
      </div>
    </main>
  );
};

export default Page;
