import type { Metadata, Viewport } from "next";
import { Poppins, Yellowtail } from "next/font/google";

import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { SupportProvider } from "@/components/providers/SupportProvider";
import { site } from "@/lib/site-data";

import "./globals.css";

/**
 * Type pairing: Poppins carries the geometric, friendly weight the brand uses
 * for headings and text, with Yellowtail for the handwritten accent line above
 * each section. Both self-hosted through `next/font` — no render-blocking
 * request to a font CDN, which matters on the networks most visitors are on.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-yellowtail",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Empowering Voices. Shaping Leaders.`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "debate Ghana",
    "youth empowerment Africa",
    "public speaking training",
    "schools debate championship",
    "non-profit 501(c)(3)",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Empowering Voices. Shaping Leaders.`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Empowering Voices. Shaping Leaders.`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#22a9cc",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${yellowtail.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <SupportProvider>
          <TopBar />
          <Header />
          {/* `top` is the target for the footer's back-to-top link on every route. */}
          <main id="main">
            <span id="top" aria-hidden="true" />
            {children}
          </main>
          <Footer />
          <BackToTop />
        </SupportProvider>
      </body>
    </html>
  );
}
