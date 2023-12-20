import type { Metadata } from "next";
import { Inter as FontSans, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils";
import ThemeProvider from "@/components/atoms/theme-provider";
import Header from "@/components/organisms/header";

export const fontSans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: ["system-ui"],
});

export const metadata: Metadata = {
  title: "그림 입출고 관리 서비스",
  description: "그림의 입고와 출고를 관리해주는 서비스입니다.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="kr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <div className="w-full h-14" />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
