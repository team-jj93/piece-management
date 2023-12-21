import AppHeader from "@/components/organisms/app-header";
import Header from "@/components/organisms/header";

// TO-DO
// PieceProvider 추가하기
const TeamLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      {children}
      <div className="w-full h-14" />
    </>
  );
};

export default TeamLayout;
