"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, BarChart3, TrendingDown, Flame, Percent, Calendar } from "lucide-react";
import { ADVANCED_STATS } from "@/content/report-data";
import { useInView } from "./useInView";

function MicroSparkline({ data, color, width = 90, height = 32 }: { data: readonly number[]; color: string; width?: number; height?: number }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#sg-${color.replace("#", "")})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface BentoCardProps {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  value: string;
  label: string;
  sublabel?: string;
  sparkline?: readonly number[];
  accentColor: string;
  isInView: boolean;
  delay: number;
  large?: boolean;
}

function BentoCard({ icon: Icon, value, label, sublabel, sparkline, accentColor, isInView, delay, large }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(5, 5, 5, 0.5)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: 20,
        padding: "16px 14px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.4s ease, transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.4s ease",
      }}
      whileHover={{
        borderColor: `${accentColor}40`,
        y: -3,
        boxShadow: `0 16px 48px -12px ${accentColor}18`,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-20%",
          width: "60%",
          height: "80%",
          background: `radial-gradient(ellipse, ${accentColor}08, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top: icon */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${accentColor}12`,
            border: `1px solid ${accentColor}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accentColor,
          }}
        >
          <Icon size={17} strokeWidth={1.5} />
        </div>
      </div>

      {/* Bottom: value + label */}
      <div style={{ position: "relative", zIndex: 1, marginTop: 12 }}>
        <div
          style={{
            fontSize: large ? "clamp(1.4rem, 3.5vw, 2.4rem)" : "clamp(1.2rem, 2.5vw, 1.85rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 6,
            fontFamily: "var(--font-space), system-ui",
            color: "rgba(255, 255, 255, 0.95)",
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "rgba(255, 255, 255, 0.35)",
          }}
        >
          {label}
        </div>
        {sublabel && (
          <div
            style={{
              fontSize: 11,
              color: "rgba(255, 255, 255, 0.2)",
              marginTop: 3,
            }}
          >
            {sublabel}
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "15%",
          right: "15%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
          transformOrigin: "center",
        }}
      />
    </motion.div>
  );
}

const cards: Array<{
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  value: string;
  label: string;
  sublabel?: string;
  sparkline?: readonly number[];
  accentColor: string;
  large?: boolean;
}> = [
  {
    icon: Target,
    value: ADVANCED_STATS.winRate.value,
    label: ADVANCED_STATS.winRate.label,
    sparkline: ADVANCED_STATS.winRate.sparkline,
    accentColor: "#4ade80",
    large: true,
  },
  {
    icon: BarChart3,
    value: ADVANCED_STATS.avgRR.value,
    label: ADVANCED_STATS.avgRR.label,
    accentColor: "#D9B162",
  },
  {
    icon: TrendingDown,
    value: ADVANCED_STATS.maxDrawdown.value,
    label: ADVANCED_STATS.maxDrawdown.label,
    accentColor: "#f87171",
  },
  {
    icon: Flame,
    value: ADVANCED_STATS.bestStreak.value,
    label: ADVANCED_STATS.bestStreak.label,
    sublabel: "Giorni consecutivi in profitto",
    accentColor: "#fb923c",
    large: true,
  },
  {
    icon: Percent,
    value: ADVANCED_STATS.avgTrade.value,
    label: ADVANCED_STATS.avgTrade.label,
    sparkline: ADVANCED_STATS.avgTrade.sparkline,
    accentColor: "#38bdf8",
  },
  {
    icon: Calendar,
    value: ADVANCED_STATS.activeSince.value,
    label: ADVANCED_STATS.activeSince.label,
    sublabel: (ADVANCED_STATS.activeSince as any).sublabel,
    accentColor: "#9382DC",
  },
];

export function StatsBento() {
  const [ref, isInView] = useInView(0.15);

  return (
    <section ref={ref} style={{ padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 24 }}
        >
          <h2
            style={{
              fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              color: "rgba(255, 255, 255, 0.9)",
              fontFamily: "var(--font-space), system-ui",
              marginBottom: 4,
            }}
          >
            Statistiche Avanzate
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.35)" }}>
            Metriche dettagliate del track record
          </p>
        </motion.div>

        <style>{`
          .stats-bento-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          @media (min-width: 640px) {
            .stats-bento-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 14px;
            }
          }
        `}</style>
        <div className="stats-bento-grid">
          {cards.map((card, i) => (
            <BentoCard
              key={card.label}
              icon={card.icon}
              value={card.value}
              label={card.label}
              sublabel={card.sublabel}
              sparkline={card.sparkline}
              accentColor={card.accentColor}
              isInView={isInView}
              delay={0.1 + i * 0.08}
              large={card.large}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
