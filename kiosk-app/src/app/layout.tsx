import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FishCart - Daily Fresh Partner",
  description: "FishCart Retail Kiosk Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-screen w-screen overflow-hidden antialiased font-sans`}
    >
      <body className="h-screen w-screen overflow-hidden flex flex-col m-0 p-0">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
