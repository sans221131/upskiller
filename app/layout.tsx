import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { dunbarText } from "@/public/fonts/font";
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
  title: "Upskillers - Your Professional Growth Platform",
  description:
    "Transform your career with AI-powered course matching, expert guidance, and flexible learning paths. Join 35,000+ professionals advancing their careers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${dunbarText.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
