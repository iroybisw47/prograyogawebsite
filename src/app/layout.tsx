import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Progra: accountability between sessions, better retention",
  description:
    "Progra is an iOS app for studios, instructors and personal trainers that helps the people you coach track their progress and stay connected. Start with a free 14-day pilot.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior lets Next jump (not smooth-scroll) to the top on route changes.
    <html lang="en" data-scroll-behavior="smooth" className={`${hanken.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
