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
    "Riepilogo delle operazioni registrate di SKITLA13: statistiche e storico. I risultati passati non garantiscono risultati futuri.",
  openGraph: {
    title: "Performance Report | Skitla13 Elite Trading",
    description:
      "Esplora statistiche e storico delle operazioni registrate di SKITLA13. Il trading comporta rischio di perdita.",
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
