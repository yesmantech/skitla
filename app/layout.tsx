/**
 * @file layout.tsx — Root layout for the Skitla13 landing page (Next.js App Router).
 *
 * Defines the global HTML structure, fonts, metadata (SEO/OG/Twitter), and
 * wraps all pages with shared UI layers:
 * - CustomCursor — Custom cursor effect (hidden on mobile via CSS)
 * - NoiseOverlay — Subtle film grain texture over the entire page
 * - Preloader — Full-screen loading animation on first visit
 * - SmoothScroll — Lenis-based smooth scrolling wrapper
 *
 * ## Typography:
 *   - Inter (--font-inter) — Body text, UI elements
 *   - Space Grotesk (--font-space) — Headlines, display text
 *   Both loaded via next/font/google with `display: "swap"` for performance.
 *
 * ## SEO:
 *   Comprehensive metadata including OpenGraph, Twitter cards, robots directives,
 *   and structured author/publisher info. Target language: Italian (it_IT).
 *
 * ## Note on suppressHydrationWarning:
 *   Added to <html> to prevent React hydration warnings caused by browser
 *   extensions that modify the DOM (e.g., dark mode extensions, Grammarly).
 */

import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skitla13.com"),
  title: {
    default: "Skitla13 | Elite Trading Community",
    template: "%s | Skitla13",
  },
  description: "Scopri Marco Garavelli e SKITLA Gold: sale Scalping e Sniper, metodo, casi studio e condizioni di accesso. Il trading comporta rischio di perdita.",
  keywords: ["SKITLA Gold", "Marco Garavelli", "trading oro", "Scalping XAU", "Sniper XAU", "Skitla13"],
  authors: [{ name: "Skitla13" }],
  creator: "Skitla13",
  publisher: "Skitla13",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://skitla13.com",
    title: "Skitla13 | Elite Trading Community",
    description: "Due sale Gold, un percorso da conoscere. Scopri metodo, casi studio e condizioni di accesso SKITLA.",
    siteName: "Skitla13",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Skitla13 Elite Trading Community Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skitla13 | Elite Trading Community",
    description: "Due sale Gold, un percorso da conoscere. Scopri metodo, casi studio e condizioni di accesso SKITLA.",
    images: ["/twitter-image.jpg"],
    creator: "@skitla13",
  },
};

import { CustomCursor } from "@/components/ui/CustomCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-black text-white lg:cursor-none selection:bg-brand-primary selection:text-black">
        <LanguageProvider>
        <CustomCursor />
        <NoiseOverlay />
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
