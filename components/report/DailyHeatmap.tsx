/**
 * @file DailyHeatmap.tsx — GitHub-style calendar heatmap for daily trading P&L.
 *
 * Renders a monthly calendar grid where each cell is color-coded by daily P&L:
 *   - Green shades: profitable days (intensity scales with gain %)
 *   - Red shades: losing days (intensity scales with loss %)
 *   - Transparent: weekends or no-data days
 *
 * Features:
 *   - Month navigation with chevron buttons (prev/next)
 *   - Auto-selects the month with the most data on initial render
 *   - Monthly summary stats strip (trading days, wins, losses, best day)
 *   - Loss-to-Win color legend bar
 *   - Per-cell hover animation (scale + glow) via Framer Motion
 *   - Staggered cell entrance animations triggered by Intersection Observer
 *   - Today indicator (gold dot)
 *
 * ## Data Source:
 *   Imports `DAILY_RETURNS` from `content/report-data.ts`.
 *   Each entry is { date: string, pnl: number }.
 *
 * ## Calendar Grid Algorithm:
 *   Builds a 7-column CSS grid (Mon–Sun) with empty prefix cells to align
 *   the first day of the month to its correct weekday column.
 *
 * @module report/DailyHeatmap
 */

"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DAILY_RETURNS, MONTH_LABELS } from "@/content/report-data";
import { useInView } from "./useInView";

// ── Color + style for a cell ────────────────────────────
function getCellStyle(pnl: number | null): { bg: string; color: string; border: string } {
  if (pnl === null) return { bg: "rgba(255,255,255,0.015)", color: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.03)" };
  if (pnl >= 3) return { bg: "rgba(34, 197, 94, 0.20)", color: "#4ade80", border: "rgba(34, 197, 94, 0.25)" };
  if (pnl >= 1) return { bg: "rgba(34, 197, 94, 0.12)", color: "#86efac", border: "rgba(34, 197, 94, 0.15)" };
  if (pnl > 0) return { bg: "rgba(34, 197, 94, 0.06)", color: "#bbf7d0", border: "rgba(34, 197, 94, 0.08)" };
  if (pnl === 0) return { bg: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.3)", border: "rgba(255,255,255,0.05)" };
  if (pnl > -1) return { bg: "rgba(239, 68, 68, 0.08)", color: "#fca5a5", border: "rgba(239, 68, 68, 0.1)" };
  return { bg: "rgba(239, 68, 68, 0.15)", color: "#f87171", border: "rgba(239, 68, 68, 0.2)" };
}

const DAY_HEADERS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"] as const;

export function DailyHeatmap() {
  const [ref, isInView] = useInView(0.1);

  // Determine which month to show — start from the month with the most data
  const { initialMonth, initialYear, latestDate } = useMemo(() => {
    if (DAILY_RETURNS.length === 0) {
      const now = new Date();
      return { initialMonth: now.getMonth(), initialYear: now.getFullYear(), latestDate: now };
    }
    const latest = new Date(DAILY_RETURNS[DAILY_RETURNS.length - 1].date + "T12:00:00");
    // Count data points per month to find the one with most data
    const counts = new Map<string, { month: number; year: number; count: number }>();
    for (const d of DAILY_RETURNS) {
      const dt = new Date(d.date + "T12:00:00");
      const key = `${dt.getFullYear()}-${dt.getMonth()}`;
      const existing = counts.get(key);
      if (existing) existing.count++;
      else counts.set(key, { month: dt.getMonth(), year: dt.getFullYear(), count: 1 });
    }
    let best = { month: latest.getMonth(), year: latest.getFullYear(), count: 0 };
    for (const v of counts.values()) {
      if (v.count > best.count) best = v;
    }
    return { initialMonth: best.month, initialYear: best.year, latestDate: latest };
  }, []);

  const [viewMonth, setViewMonth] = useState(initialMonth);
  const [viewYear, setViewYear] = useState(initialYear);

  // Build PnL lookup
  const pnlMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of DAILY_RETURNS) map.set(d.date, d.pnl);
    return map;
  }, []);

  // Build calendar grid for the viewed month
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Monday = 0 offset
    let startOffset = firstDay.getDay() - 1;
    if (startOffset < 0) startOffset = 6;

    const cells: { day: number | null; date: string | null; pnl: number | null; isWeekend: boolean }[] = [];

    // Empty cells before month starts
    for (let i = 0; i < startOffset; i++) {
      cells.push({ day: null, date: null, pnl: null, isWeekend: false });
    }

    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(viewYear, viewMonth, d);
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const dow = dateObj.getDay();
      const isWeekend = dow === 0 || dow === 6;
      const pnl = pnlMap.get(dateStr) ?? null;

      cells.push({ day: d, date: dateStr, pnl, isWeekend });
    }

    return cells;
  }, [viewMonth, viewYear, pnlMap]);

  // Stats for this month
  const monthStats = useMemo(() => {
    const monthData = DAILY_RETURNS.filter((d) => {
      const dt = new Date(d.date);
      return dt.getMonth() === viewMonth && dt.getFullYear() === viewYear;
    });
    const wins = monthData.filter((d) => d.pnl > 0).length;
    const losses = monthData.filter((d) => d.pnl < 0).length;
    const totalPnl = monthData.reduce((s, d) => s + d.pnl, 0);
    const best = monthData.length > 0 ? monthData.reduce((b, d) => (d.pnl > b.pnl ? d : b)) : null;

    return { wins, losses, tradingDays: monthData.length, totalPnl: Math.round(totalPnl * 100) / 100, best };
  }, [viewMonth, viewYear]);

  const canGoNext = viewYear < latestDate.getFullYear() || (viewYear === latestDate.getFullYear() && viewMonth < latestDate.getMonth());

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  }
  function nextMonth() {
    if (!canGoNext) return;
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  }

  return (
    <section ref={ref} style={{ padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
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
            Calendario Performance
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.35)" }}>
            Rendimento giornaliero della sala segnali
          </p>
        </motion.div>

        {/* Calendar card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            background: "rgba(5, 5, 5, 0.4)",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: 20,
            padding: "24px",
            overflow: "hidden",
          }}
        >
          {/* Month nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <button
              onClick={prevMonth}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(255,255,255,0.5)",
                transition: "all 0.2s ease",
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <div style={{ textAlign: "center" as const }}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontFamily: "var(--font-space), system-ui",
                }}
              >
                {MONTH_LABELS[viewMonth]} {viewYear}
              </div>
              {monthStats.tradingDays > 0 && (
                <div
                  style={{
                    fontSize: 12,
                    color: monthStats.totalPnl >= 0 ? "#4ade80" : "#f87171",
                    fontWeight: 600,
                    fontFamily: "var(--font-space), system-ui",
                    marginTop: 2,
                  }}
                >
                  {monthStats.totalPnl >= 0 ? "+" : ""}{monthStats.totalPnl.toFixed(2)}% totale
                </div>
              )}
            </div>

            <button
              onClick={nextMonth}
              disabled={!canGoNext}
              style={{
                background: canGoNext ? "rgba(255,255,255,0.04)" : "transparent",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: canGoNext ? "pointer" : "default",
                color: canGoNext ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)",
                transition: "all 0.2s ease",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 6,
              marginBottom: 6,
            }}
          >
            {DAY_HEADERS.map((d) => (
              <div
                key={d}
                style={{
                  textAlign: "center" as const,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255, 255, 255, 0.2)",
                  padding: "0 0 8px",
                }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 6,
            }}
          >
            {calendarDays.map((cell, i) => {
              if (cell.day === null) {
                return <div key={`empty-${i}`} />;
              }

              const hasTrade = cell.pnl !== null;
              const style = getCellStyle(cell.pnl);
              const isToday = (() => { const n = new Date(); return cell.date === `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`; })();

              return (
                <motion.div
                  key={cell.date}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + i * 0.015,
                    ease: "easeOut",
                  }}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 12,
                    background: hasTrade ? style.bg : cell.isWeekend ? "transparent" : "rgba(255,255,255,0.015)",
                    border: `1px solid ${hasTrade ? style.border : isToday ? "rgba(217, 177, 98, 0.3)" : "rgba(255,255,255,0.03)"}`,
                    display: "flex",
                    flexDirection: "column" as const,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    cursor: hasTrade ? "default" : "default",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                    position: "relative",
                  }}
                  whileHover={hasTrade ? {
                    scale: 1.08,
                    boxShadow: `0 8px 24px -8px ${cell.pnl! > 0 ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                    borderColor: style.color,
                  } : {}}
                >
                  {/* Day number */}
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: hasTrade ? "rgba(255,255,255,0.5)" : cell.isWeekend ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.15)",
                    }}
                  >
                    {cell.day}
                  </span>

                  {/* PnL value */}
                  {hasTrade && (
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        fontFamily: "var(--font-space), system-ui",
                        color: style.color,
                        lineHeight: 1,
                      }}
                    >
                      {cell.pnl! >= 0 ? "+" : ""}{cell.pnl!.toFixed(1)}%
                    </span>
                  )}

                  {/* Today indicator */}
                  {isToday && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 4,
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#D9B162",
                        boxShadow: "0 0 6px rgba(217, 177, 98, 0.5)",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Month summary strip */}
          {monthStats.tradingDays > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 24,
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid rgba(255,255,255,0.04)",
                flexWrap: "wrap" as const,
              }}
            >
              <MiniStat label="Giorni operativi" value={`${monthStats.tradingDays}`} />
              <MiniStat label="Win" value={`${monthStats.wins}`} color="#4ade80" />
              <MiniStat label="Loss" value={`${monthStats.losses}`} color="#f87171" />
              {monthStats.best && (
                <MiniStat
                  label="Miglior giorno"
                  value={`+${monthStats.best.pnl.toFixed(1)}%`}
                  color="#4ade80"
                />
              )}
            </div>
          )}
        </motion.div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            marginTop: 16,
            fontSize: 11,
            color: "rgba(255, 255, 255, 0.25)",
          }}
        >
          <span>Loss</span>
          {[
            "rgba(239, 68, 68, 0.15)",
            "rgba(239, 68, 68, 0.08)",
            "rgba(255,255,255,0.02)",
            "rgba(34, 197, 94, 0.06)",
            "rgba(34, 197, 94, 0.12)",
            "rgba(34, 197, 94, 0.20)",
          ].map((bg, i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: bg,
              }}
            />
          ))}
          <span>Win</span>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ textAlign: "center" as const }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          color: "rgba(255, 255, 255, 0.2)",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: color || "rgba(255, 255, 255, 0.7)",
          fontFamily: "var(--font-space), system-ui",
        }}
      >
        {value}
      </div>
    </div>
  );
}
