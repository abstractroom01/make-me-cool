import type { Metadata, Viewport } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const josefin = Josefin_Sans({ variable: "--font-josefin", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "make me cool",
  description: "a daily workout for your personality. from the home of the abstract room.",
  icons: { icon: "/brand/icon-main.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#04363a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={josefin.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
