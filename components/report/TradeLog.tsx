/**
 * @file TradeLog.tsx — Expandable trade history log for the trading report.
 *
 * Renders a paginated list of individual trade signals with:
 *   - Status dot (green=win, red=loss) with glow effect
 *   - Pair name, direction badge (LONG/SHORT), TP count badge
 *   - Max P&L percentage and date
 *   - Expandable detail panel showing: entry price, stop loss, R:R ratio,
 *     duration, trade notes (warning-style), and multi-TP breakdown
 *   - "LATEST" badge on the most recent trade with pulse animation
 *   - "STOP LOSS" badge on stopped-out trades
 *   - "Show all" / "Show less" toggle (default: 10 trades visible)
 *   - Win/Loss legend and summary (X/Y in profitto)
 *
 * ## Sub-components:
 *   - TradeRow — Individual expandable trade row
 *   - TPBadge — Take profit level badge (label, price, P&L, R:R)
 *   - DetailItem — Key-value detail with icon (entry, SL, R:R, duration)
 *
 * ## Data Source:
 *   Imports `RECENT_TRADES` from `content/report-data.ts` (most recent first).
 *
 * @module report/TradeLog
 */

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight, ArrowDownRight, Clock, DollarSign, AlertTriangle, Target } from "lucide-react";
import { RECENT_TRADES, type Trade, type TakeProfit } from "@/content/report-data";
import { useInView } from "./useInView";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("it-IT", { day: "numeric", month: "short" });
}

function formatPrice(price: number): string {
  if (price >= 1000) return price.toLocaleString("en-US", { minimumFractionDigits: 0 });
  if (price >= 1) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  return price.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 6 });
}

function TPBadge({ tp }: { tp: TakeProfit }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 8,
        background: "rgba(34, 197, 94, 0.06)",
        border: "1px solid rgba(34, 197, 94, 0.1)",
      }}
    >
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.3)",
          textTransform: "uppercase" as const,
          minWidth: 28,
        }}
      >
        {tp.label}
      </span>
      <span
        style={{
          fontSize: 12,
          fontFamily: "var(--font-space), system-ui",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {formatPrice(tp.price)}
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          fontFamily: "var(--font-space), system-ui",
          color: "#4ade80",
        }}
      >
        +{tp.pnl}%
      </span>
      {tp.rr && (
        <span
          style={{
            fontSize: 10,
            color: "rgba(217, 177, 98, 0.7)",
            fontFamily: "var(--font-space), system-ui",
          }}
        >
          {tp.rr}
        </span>
      )}
    </div>
  );
}

function TradeRow({ trade, isInView, delay }: { trade: Trade; isInView: boolean; delay: number }) {
  const [expanded, setExpanded] = useState(false);
  const isWin = trade.result > 0;
  const isStopped = trade.status === "stopped";
  const isNewest = trade.id === RECENT_TRADES[0]?.id;
  const tpCount = trade.takeProfits?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto auto auto",
          alignItems: "center",
          gap: 12,
          padding: "14px 20px",
          background: "transparent",
          border: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          cursor: "pointer",
          color: "white",
          transition: "background 0.2s ease",
          textAlign: "left" as const,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.02)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        {/* Status dot */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isWin ? "#4ade80" : "#f87171",
              boxShadow: isWin ? "0 0 8px rgba(74,222,128,0.4)" : "0 0 8px rgba(248,113,113,0.4)",
            }}
          />
          {isNewest && (
            <div
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: "50%",
                border: "1px solid rgba(74, 222, 128, 0.4)",
                animation: "pulse 2s infinite",
              }}
            />
          )}
        </div>

        {/* Pair + Direction + TP count */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flexWrap: "wrap" as const }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.9)",
              fontFamily: "var(--font-space), system-ui",
            }}
          >
            {trade.pair}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "3px 8px",
              borderRadius: 6,
              background:
                trade.direction === "LONG"
                  ? "rgba(74, 222, 128, 0.1)"
                  : "rgba(248, 113, 113, 0.1)",
              color: trade.direction === "LONG" ? "#4ade80" : "#fca5a5",
            }}
          >
            {trade.direction}
          </span>
          {tpCount > 0 && !isStopped && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: "2px 6px",
                borderRadius: 6,
                background: "rgba(217, 177, 98, 0.1)",
                color: "rgba(217, 177, 98, 0.7)",
              }}
            >
              {tpCount} TP
            </span>
          )}
          {isStopped && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "2px 8px",
                borderRadius: 6,
                background: "rgba(248, 113, 113, 0.12)",
                color: "#f87171",
              }}
            >
              STOP LOSS
            </span>
          )}
          {isNewest && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.15em",
                padding: "2px 8px",
                borderRadius: 9999,
                background: "rgba(74, 222, 128, 0.15)",
                color: "#4ade80",
                animation: "pulse 2s infinite",
              }}
            >
              LATEST
            </span>
          )}
        </div>

        {/* Max PnL */}
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "var(--font-space), system-ui",
            color: isWin ? "#4ade80" : "#f87171",
            minWidth: 65,
            textAlign: "right" as const,
          }}
        >
          {isWin ? "+" : ""}
          {trade.result.toFixed(1)}%
        </span>

        {/* Date */}
        <span
          style={{
            fontSize: 12,
            color: "rgba(255, 255, 255, 0.3)",
            minWidth: 60,
            textAlign: "right" as const,
          }}
        >
          {formatDate(trade.date)}
        </span>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "14px 20px 18px",
                background: "rgba(255, 255, 255, 0.015)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
              }}
            >
              {/* Top row: entry / SL / RR */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: 16,
                  marginBottom: trade.takeProfits && trade.takeProfits.length > 0 ? 16 : 0,
                }}
              >
                {trade.entry != null && (
                  <DetailItem icon={DollarSign} label="Entry" value={formatPrice(trade.entry)} />
                )}
                {trade.sl != null && (
                  <DetailItem
                    icon={ArrowDownRight}
                    label="Stop Loss"
                    value={formatPrice(trade.sl)}
                    color="#f87171"
                    sublabel={trade.stopLossPnl != null ? `${trade.stopLossPnl > 0 ? "+" : ""}${trade.stopLossPnl}%` : undefined}
                  />
                )}
                {trade.rr && (
                  <DetailItem icon={Target} label="Risk/Reward" value={trade.rr} color="#D9B162" />
                )}
                {trade.duration && (
                  <DetailItem icon={Clock} label="Durata" value={trade.duration} />
                )}
              </div>

              {/* Note */}
              {trade.note && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "rgba(251, 146, 60, 0.06)",
                    border: "1px solid rgba(251, 146, 60, 0.1)",
                    marginBottom: 16,
                    fontSize: 11,
                    color: "rgba(251, 146, 60, 0.8)",
                    lineHeight: 1.5,
                  }}
                >
                  <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 2 }} />
                  {trade.note}
                </div>
              )}

              {/* Take Profits grid */}
              {trade.takeProfits && trade.takeProfits.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      color: "rgba(255, 255, 255, 0.2)",
                      marginBottom: 8,
                    }}
                  >
                    Take Profits
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap" as const,
                      gap: 6,
                    }}
                  >
                    {trade.takeProfits.map((tp, i) => (
                      <TPBadge key={i} tp={tp} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
  color,
  sublabel,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  value: string;
  color?: string;
  sublabel?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Icon size={14} strokeWidth={1.5} />
      <div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
          {label}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: color || "rgba(255,255,255,0.8)",
              fontFamily: "var(--font-space), system-ui",
            }}
          >
            {value}
          </span>
          {sublabel && (
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
              {sublabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function TradeLog() {
  const [ref, isInView] = useInView(0.1);
  const [showAll, setShowAll] = useState(false);

  const visibleTrades = showAll ? RECENT_TRADES : RECENT_TRADES.slice(0, 10);
  const winCount = RECENT_TRADES.filter((t) => t.result > 0).length;

  return (
    <section ref={ref} style={{ padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            flexWrap: "wrap" as const,
            gap: 12,
          }}
        >
          <div>
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
              Ultimi Segnali
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.35)" }}>
              {winCount}/{RECENT_TRADES.length} in profitto — clicca per i dettagli e i TP
            </p>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Win</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f87171" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Loss</span>
            </div>
          </div>
        </motion.div>

        {/* Trade list */}
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
            overflow: "hidden",
          }}
        >
          {visibleTrades.map((trade, i) => (
            <TradeRow key={trade.id} trade={trade} isInView={isInView} delay={0.3 + i * 0.04} />
          ))}

          {/* Show more button */}
          {RECENT_TRADES.length > 10 && (
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                width: "100%",
                padding: "16px",
                background: "transparent",
                border: "none",
                color: "#D9B162",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(217,177,98,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {showAll ? "Mostra meno" : `Mostra tutti (${RECENT_TRADES.length})`}
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
