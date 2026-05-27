/**
 * @file layout.tsx — Layout for the /report page (Next.js nested layout).
 *
 * Provides page-specific SEO metadata for the performance report page.
 * This is a transparent layout (renders children only) — all visual
 * chrome is in the page component itself.
 *
 * The layout inherits the root layout's fonts, smooth scrolling, and noise overlay.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance Report | Skitla13",
  description:
    "Track record completo della sala segnali Skitla13. Equity curve, rendimenti mensili, statistiche avanzate e storico operazioni. Trasparenza totale.",
  openGraph: {
    title: "Performance Report | Skitla13 Elite Trading",
    description:
      "Il track record verificato della sala segnali più performante. Win rate 95%, +847% di profitto totale.",
    type: "website",
  },
};

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
