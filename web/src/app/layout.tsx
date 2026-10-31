import type { Metadata, Viewport } from "next";
import { Josefin_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const josefin = Josefin_Sans({ variable: "--font-josefin", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://makemecool.me"),
  title: "make me cool",
  description: "a daily workout for your personality. from the home of the abstract room.",
  icons: { icon: "/brand/icon-main.png" },
  manifest: "/manifest.webmanifest",
  openGraph: { title: "make me cool", description: "one story a day. something to say out loud.", siteName: "make me cool", type: "website" },
  twitter: { card: "summary_large_image" },
  verification: { google: "iz4EgdnDp-8_wGrWlWWfN5-4oy6qb6NGYbxJ5PldMhQ" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#04363a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={josefin.variable}>
      <body className="min-h-dvh">
        {children}
        {/* Microsoft Clarity: anonymous usage and session replays, with text and inputs masked by default.
            The id must not be "clarity": browsers expose elements by id on window, which would shadow window.clarity and stop it starting. */}
        <Script id="ms-clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","z55qgti7ty");`}
        </Script>
      </body>
    </html>
  );
}
