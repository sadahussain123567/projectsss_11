import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Pinyon_Script } from "next/font/google";
import { Providers } from "@/components/Providers";
import { birthdayData } from "@/data/birthday";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata: Metadata = {
  title: `Happy Birthday, ${birthdayData.name}`,
  description: "A little birthday surprise, made just for you.",
  // It's a private surprise, so keep it out of search engines.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbf4ec",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${pinyon.variable}`}>
      <body>
        <noscript>
          <style>{`.intro-screen{display:none!important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
