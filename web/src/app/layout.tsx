import type { Metadata, Viewport } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["500", "600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "make me cool",
  description: "a daily workout for your personality. from the home of the abstract room.",
  icons: { icon: "/brand/icon-main.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#04363a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jost.variable} ${inter.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
