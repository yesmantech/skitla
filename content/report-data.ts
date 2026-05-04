// ═══════════════════════════════════════════════════════════════
// Skitla13 — Report Page Data
// Reads from trades.json and computes all stats automatically.
//
// DATA SOURCE: content/trades.json
// - dailyReports[]: the ACTUAL daily P&L (used for equity curve + heatmap)
// - trades[]:       individual signals with multi-TP levels (used for trade log)
// ═══════════════════════════════════════════════════════════════

import rawData from "./trades.json";

// ── Types ───────────────────────────────────────────────

export interface TakeProfit {
  label: string;
  price: number;
  pnl: number;
  rr?: string;
}

export interface Trade {
  id: number;
  pair: string;
  direction: "LONG" | "SHORT";
  result: number;       // actual pnl %
  date: string;
  entry?: number;
  tp?: number;
  sl?: number;
  stopLossPnl?: number;
  rr?: string;
  duration?: string;
  note?: string;
  status?: string;      // "tp_hit" | "stopped" | "setup"
  takeProfits?: TakeProfit[];
}

export interface DailyReport {
  date: string;
  referenceCapital: number;
  netPnlUsd: number;
  netPnlPercent: number;
  closedTrades: number;
  winningTrades: number;
  losingTrades: number;
  totalLossesUsd: number;
  totalProfitsUsd: number;
  finalResultUsd: number;
}

export interface DailyReturn {
  date: string;
  pnl: number;
}

// ── Parse from JSON ─────────────────────────────────────

const dailyReports: DailyReport[] = (rawData.dailyReports || [])
  .map((r: Record<string, unknown>) => ({
    date: r.date as string,
    referenceCapital: (r.referenceCapital as number) || 0,
    netPnlUsd: (r.netPnlUsd as number) || 0,
    netPnlPercent: (r.netPnlPercent as number) || 0,
    closedTrades: (r.closedTrades as number) || 0,
    winningTrades: (r.winningTrades as number) || 0,
    losingTrades: (r.losingTrades as number) || 0,
    totalLossesUsd: (r.totalLossesUsd as number) || 0,
    totalProfitsUsd: (r.totalProfitsUsd as number) || 0,
    finalResultUsd: (r.finalResultUsd as number) || 0,
  }))
  .sort((a: DailyReport, b: DailyReport) => a.date.localeCompare(b.date));

export { dailyReports as DAILY_REPORTS_RAW };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortedTrades: any[] = [...rawData.trades].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

// ── Trades (for Trade Log) ──────────────────────────────

export const RECENT_TRADES: Trade[] = sortedTrades
  .map((t: any, i: number) => ({
    id: i + 1,
    pair: t.pair,
    direction: t.direction as "LONG" | "SHORT",
    result: t.pnl ?? 0,
    date: t.date,
    entry: t.entry ?? undefined,
    tp: t.tp ?? undefined,
    sl: t.sl ?? undefined,
    stopLossPnl: t.stopLossPnl ?? undefined,
    rr: t.rr && t.rr !== "INVALID_SL" ? t.rr : undefined,
    note: t.note ?? undefined,
    status: t.status ?? undefined,
    takeProfits: (t.takeProfits || []).map((tp: any) => ({
      label: tp.label as string,
      price: tp.price as number,
      pnl: (tp.pnl as number) ?? 0,
      rr: tp.rr as string | undefined,
    })),
  }))
  .reverse(); // most recent first

// ── Daily Returns (for heatmap) ─────────────────────────
// Uses dailyReports for ACTUAL realized PnL per day
export const DAILY_RETURNS: DailyReturn[] = dailyReports.map((r) => ({
  date: r.date,
  pnl: r.netPnlPercent,
}));

// ── Equity Curve ────────────────────────────────────────
// Additive growth: each day's % is relative to the fixed reference capital (not compounding)
let cumulativePnl = 0;

export const EQUITY_DATA: { date: string; value: number }[] = [
  { date: rawData.meta.startDate, value: 100 },
];

for (const report of dailyReports) {
  cumulativePnl += report.netPnlPercent;
  EQUITY_DATA.push({
    date: report.date,
    value: Math.round((100 + cumulativePnl) * 100) / 100,
  });
}

// ── KPI Stats ───────────────────────────────────────────

// Win rate based on profitable DAYS (more accurate than per-trade counts)
const profitableDays = dailyReports.filter((r) => r.netPnlPercent > 0).length;
const lossDays = dailyReports.filter((r) => r.netPnlPercent < 0).length;
const totalDays = dailyReports.length;

const winRate = totalDays > 0
  ? Math.round((profitableDays / totalDays) * 1000) / 10
  : 0;

const totalProfitPct = Math.round(cumulativePnl * 10) / 10;

export const KPI_STATS = {
  winRate,
  totalProfit: totalProfitPct,
  totalTrades: sortedTrades.length,
  profitableDays,
  lossDays,
  totalDays,
} as const;

// ── Advanced Stats ──────────────────────────────────────

function computeMaxDrawdown(): number {
  let peak = EQUITY_DATA[0].value;
  let maxDD = 0;
  for (const p of EQUITY_DATA) {
    if (p.value > peak) peak = p.value;
    const dd = ((p.value - peak) / peak) * 100;
    if (dd < maxDD) maxDD = dd;
  }
  return Math.round(maxDD * 10) / 10;
}

function computeBestStreak(): number {
  // Count consecutive winning DAYS
  let streak = 0;
  let best = 0;
  for (const r of dailyReports) {
    if (r.netPnlPercent > 0) {
      streak++;
      if (streak > best) best = streak;
    } else {
      streak = 0;
    }
  }
  return best;
}

function computeAvgRR(): string {
  const rrs: number[] = [];
  for (const t of sortedTrades) {
    // Use last TP's R:R as the signal's full-target R:R
    const tps = t.takeProfits || [];
    for (let i = tps.length - 1; i >= 0; i--) {
      if (tps[i].rr) {
        const parts = String(tps[i].rr).split(":");
        const val = parseFloat(parts[1]) / parseFloat(parts[0]);
        if (!isNaN(val)) { rrs.push(val); break; }
      }
    }
  }
  if (rrs.length === 0) return "—";
  const avg = rrs.reduce((a, b) => a + b, 0) / rrs.length;
  return `1:${avg.toFixed(1)}`;
}

const avgDailyPnl = dailyReports.length > 0
  ? Math.round(
      (dailyReports.reduce((s, r) => s + r.netPnlPercent, 0) / dailyReports.length) * 10
    ) / 10
  : 0;

// Rolling sparklines
function rollingDailyPnl(window: number): number[] {
  const result: number[] = [];
  for (let i = window; i <= dailyReports.length; i++) {
    const slice = dailyReports.slice(i - window, i);
    const avg = slice.reduce((s, r) => s + r.netPnlPercent, 0) / slice.length;
    result.push(Math.round(avg * 10) / 10);
  }
  return result.slice(-10);
}

const startDate = new Date(rawData.meta.startDate);
const startLabel = startDate.toLocaleDateString("it-IT", {
  month: "short",
  year: "numeric",
});
const yearsActive = Math.round(
  ((Date.now() - startDate.getTime()) / (365.25 * 86400000)) * 10
) / 10;

export const ADVANCED_STATS = {
  winRate: {
    value: `${winRate}%`,
    label: "Win Rate",
    sparkline: rollingDailyPnl(5),
  },
  avgRR: {
    value: computeAvgRR(),
    label: "Risk/Reward Medio",
    sparkline: [] as number[],
  },
  maxDrawdown: {
    value: `${computeMaxDrawdown()}%`,
    label: "Max Drawdown",
    sparkline: [] as number[],
  },
  bestStreak: {
    value: `${computeBestStreak()}`,
    label: "Miglior Streak (giorni)",
    sparkline: [] as number[],
  },
  avgTrade: {
    value: `${avgDailyPnl > 0 ? "+" : ""}${avgDailyPnl}%`,
    label: "PnL Medio/Giorno",
    sparkline: rollingDailyPnl(3),
  },
  activeSince: {
    value: startLabel,
    label: "Attivo Da",
    sublabel: `${yearsActive}+ anni di track record`,
  },
} as const;

// ── Month Labels ────────────────────────────────────────
export const MONTH_LABELS = [
  "Gen", "Feb", "Mar", "Apr", "Mag", "Giu",
  "Lug", "Ago", "Set", "Ott", "Nov", "Dic",
] as const;
