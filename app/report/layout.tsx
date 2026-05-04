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
