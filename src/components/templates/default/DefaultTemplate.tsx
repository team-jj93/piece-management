import { ReactNode } from "react";

import Header from "@/components/organisms/header";

interface DefaultTemplateProps {
  children: ReactNode;
}

const DefaultTemplate = ({ children }: DefaultTemplateProps) => (
  <div className="w-full h-auto min-h-screen relative">
    <Header />
    {children}
  </div>
);

export default DefaultTemplate;
