import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SupportProvider } from "@/components/providers/SupportProvider";
import { site } from "@/lib/site-data";

import "./globals.css";

/**
 * Type pairing: a warm optical-sized serif for display against a geometric
 * humanist sans for text. `display: "swap"` and a self-hosted subset keep first
 * paint fast on the mobile networks most of our visitors are on.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "debate Ghana",
    "youth empowerment",
    "public speaking training",
    "schools debate championship",
    "non-profit Accra",
  ],
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Skip to content
        </a>

        <SupportProvider>
          <Header />
          {/* `top` is the target for the footer's back-to-top link on every route. */}
          <main id="main" tabIndex={-1}>
            <span id="top" aria-hidden="true" />
            {children}
          </main>
          <Footer />
        </SupportProvider>
      </body>
    </html>
  );
}
