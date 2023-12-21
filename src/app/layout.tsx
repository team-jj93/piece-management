import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import { cn } from "@/utils";
import ThemeProvider from "@/components/atoms/theme-provider";

import "./globals.css";

export const fontSans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: ["system-ui"],
});

export const metadata: Metadata = {
  title: "입출고 관리 서비스",
  description: "입고와 출고를 관리해주는 서비스입니다.",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
