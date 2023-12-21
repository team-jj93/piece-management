import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

// TO-DO
// AuthProvider 추가하기
const AppLayout = ({ children }: AppLayoutProps) => {
  return children;
};

export default AppLayout;
