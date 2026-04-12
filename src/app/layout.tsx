import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthListener } from "@/components/auth/auth-listener";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskflow — Trello Clone",
  description: "Manage your projects and tasks with boards, lists, and cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthListener />
        {children}
      </body>
    </html>
  );
}
