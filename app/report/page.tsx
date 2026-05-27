/**
 * @file page.tsx — Trading performance report page for Skitla13.
 *
 * Renders the full trading report with the following sections:
 *   1. ReportNavbar — Fixed glassmorphism navigation
 *   2. ReportHero — Headline stats (win rate, profit, trades)
 *   3. EquityCurve — Interactive equity chart (Canvas 2D)
 *   4. DailyHeatmap — GitHub-style P&L calendar heatmap
 *   5. StatsBento — KPI cards with sparklines
 *   6. TradeLog — Paginated trade history table
 *
 * ## Visual Design:
 *   - Pure black (#000) background
 *   - Subtle ambient glow effects (gold top-left, purple bottom-right)
 *   - Gold gradient dividers between sections
 *   - Noise overlay from root layout
 *
 * ## Data Flow:
 *   All data comes from `content/report-data.ts` which reads `trades.json`.
 *   Each component imports its own data slice directly.
 */

"use client";

import React from "react";
import { ReportNavbar } from "@/components/report/ReportNavbar";
import { ReportHero } from "@/components/report/ReportHero";
import { EquityCurve } from "@/components/report/EquityCurve";
import { DailyHeatmap } from "@/components/report/DailyHeatmap";
import { StatsBento } from "@/components/report/StatsBento";
import { TradeLog } from "@/components/report/TradeLog";


export default function ReportPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000000",
        position: "relative",
      }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Ambient glow effects */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {/* Top-left gold glow */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(ellipse, rgba(217, 177, 98, 0.03) 0%, transparent 70%)",
          }}
        />
        {/* Bottom-right subtle glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-10%",
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(ellipse, rgba(147, 130, 220, 0.02) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <ReportNavbar />
        <ReportHero />

        {/* Divider */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(217, 177, 98, 0.15), transparent)",
            }}
          />
        </div>

        <EquityCurve />

        {/* Divider */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto 40px",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent)",
            }}
          />
        </div>

        <DailyHeatmap />
        <StatsBento />

        {/* Divider */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent)",
            }}
          />
        </div>

        <TradeLog />

      </div>
    </main>
  );
}
