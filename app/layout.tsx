import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Github Profile Toolkit",
  description: "깃허브 프로필 꾸미기 편의기능 모음",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
