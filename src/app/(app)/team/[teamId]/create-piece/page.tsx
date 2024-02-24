import PieceCreateEditor from "@/components/organisms/piece-create-editor";

const Page = () => {
  return (
    <main className="w-full h-auto min-h-screen relative">
      <div className=" w-full h-full overflow-auto">
        <div className="w-full h-auto">
          <div className="indent-1 w-full h-fit py-2 px-4 mb-2">
            <h1 className="h-10 leading-10 border-b border-solid border-border text-lg font-semibold tracking-tight">
              그림 등록
            </h1>
          </div>
          <div className="p-3 h-auto">
            <PieceCreateEditor />
            <div className="w-full h-4" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
