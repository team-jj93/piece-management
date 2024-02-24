import CreatePieceLink from "@/components/atoms/create-piece-link";
import PieceCalendar from "@/components/organisms/piece-calendar";

const Page = () => {
  return (
    <main className="w-full h-auto min-h-screen relative">
      <div className=" w-full h-auto">
        <div className="w-full h-4" />
        <PieceCalendar />
      </div>
      <CreatePieceLink className="fixed right-4 bottom-20 z-20" />
    </main>
  );
};

export default Page;
