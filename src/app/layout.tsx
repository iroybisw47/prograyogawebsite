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
  title: "Progra for Studios: build accountability, increase retention",
  description:
    "Progra is an iOS app for yoga studios that helps members track their progress inside and outside of class. Start with a free 14-day pilot.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
