/**
 * @file ReportHero.tsx — Hero section for the Skitla13 trading performance report.
 *
 * Displays the three headline KPI cards with animated counters:
 *   1. Win Rate (green) — percentage of profitable trading days
 *   2. Total Profit (gold) — cumulative P&L percentage
 *   3. Signals (purple) — total number of trade signals sent
 *
 * Features:
 *   - "Track Record Verificato" badge with pulsing green dot
 *   - Animated count-up numbers (via useCountUp hook, 2.2s ease-out)
 *   - Gradient overlay background per card
 *   - Hover lift effect with colored box shadow
 *   - Animated accent line at the bottom of each card
 *   - Subtle gold ambient glow in the background
 *   - Responsive headline using clamp() typography
 *
 * ## Data Source:
 *   Imports `KPI_STATS` from `content/report-data.ts`.
 *
 * ## Sub-components:
 *   - KPICard — Individual stat card with icon, counter, label, and sublabel
 *
 * @module report/ReportHero
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, Zap } from "lucide-react";
import { KPI_STATS } from "@/content/report-data";
import { useCountUp } from "./useCountUp";
import { useInView } from "./useInView";

const kpiCards = [
  {
    icon: Target,
    value: KPI_STATS.winRate,
    suffix: "%",
    label: "Win Rate",
    sublabel: `${KPI_STATS.profitableDays}/${KPI_STATS.totalDays} giorni in profitto`,
    decimals: 1,
    gradient: "linear-gradient(135deg, rgba(74, 222, 128, 0.12), rgba(34, 197, 94, 0.04))",
    accentColor: "#4ade80",
  },
  {
    icon: TrendingUp,
    value: KPI_STATS.totalProfit,
    suffix: "%",
    prefix: "+",
    label: "Profitto Totale",
    sublabel: `In ${KPI_STATS.totalDays} giorni di operatività`,
    decimals: 1,
    gradient: "linear-gradient(135deg, rgba(217, 177, 98, 0.15), rgba(217, 177, 98, 0.03))",
    accentColor: "#D9B162",
  },
  {
    icon: Zap,
    value: KPI_STATS.totalTrades,
    suffix: "",
    label: "Segnali",
    sublabel: "Operazioni inviate in sala",
    decimals: 0,
    gradient: "linear-gradient(135deg, rgba(147, 130, 220, 0.12), rgba(147, 130, 220, 0.04))",
    accentColor: "#9382DC",
  },
];

function KPICard({
  icon: Icon,
  value,
  suffix,
  prefix,
  label,
  sublabel,
  decimals,
  gradient,
  accentColor,
  isInView,
  delay,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  decimals: number;
  gradient: string;
  accentColor: string;
  isInView: boolean;
  delay: number;
}) {
  const count = useCountUp(value, 2200, isInView, decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(5, 5, 5, 0.4)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: 20,
        padding: "20px 16px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.4s ease, transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.4s ease",
      }}
      whileHover={{
        borderColor: `${accentColor}33`,
        y: -4,
        boxShadow: `0 20px 60px -15px ${accentColor}1A`,
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: gradient,
          opacity: isInView ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Icon */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${accentColor}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14,
          }}
        >
          <Icon size={18} strokeWidth={1.5} />
        </div>

        {/* Value */}
        <div
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
            fontWeight: 200,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: 8,
            fontFamily: "var(--font-space), var(--font-inter), system-ui",
            whiteSpace: "nowrap" as const,
          }}
          className="text-liquid-silver"
        >
          {prefix}
          {count}{suffix}
        </div>

        {/* Label */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "rgba(255, 255, 255, 0.3)",
          }}
        >
          {sublabel}
        </div>
      </div>

      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.3, ease: [0.19, 1, 0.22, 1] }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
}

export function ReportHero() {
  const [ref, isInView] = useInView(0.15);

  return (
    <section
      ref={ref}
      style={{
        padding: "120px 20px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "60%",
          background: "radial-gradient(ellipse, rgba(217, 177, 98, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" as const, position: "relative" }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 9999,
            background: "rgba(217, 177, 98, 0.08)",
            border: "1px solid rgba(217, 177, 98, 0.15)",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 8px rgba(74, 222, 128, 0.5)",
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: "rgba(217, 177, 98, 0.9)",
            }}
          >
            Track Record Verificato
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(2rem, 5.5vw, 4rem)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: 16,
            fontFamily: "var(--font-space), var(--font-inter), system-ui",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.95)" }}>I Risultati </span>
          <span className="text-liquid-gold">Parlano</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
            color: "rgba(255, 255, 255, 0.4)",
            maxWidth: 560,
            margin: "0 auto 48px",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Trasparenza totale. Zero filtri. Ogni operazione tracciata e documentata dal primo giorno.
        </motion.p>

        {/* KPI Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 4px",
          }}
        >
          {kpiCards.map((card, i) => (
            <KPICard key={card.label} {...card} isInView={isInView} delay={0.3 + i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
