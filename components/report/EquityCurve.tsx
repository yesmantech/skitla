/**
 * @file EquityCurve.tsx — Interactive equity curve chart for the trading report.
 *
 * Renders a cumulative P&L line chart using the raw Canvas 2D API (no chart library).
 * The chart features:
 *   - Animated draw-in effect on first viewport entry (ease-out cubic, 2s)
 *   - Period filter tabs (1M, 3M, 6M, 1Y, ALL)
 *   - Leverage multiplier selector (1x–20x) to simulate leveraged returns
 *   - Interactive tooltip on hover showing date and P&L percentage
 *   - Vertical crosshair line at the hovered data point
 *   - Gradient fill under the curve (gold-to-transparent)
 *   - Glowing endpoint dot with label showing current total growth
 *   - Responsive: redraws on window resize using devicePixelRatio for crisp rendering
 *
 * ## Data Source:
 *   Imports `EQUITY_DATA` from `content/report-data.ts`.
 *   Each point is { date, value } where value=100 is the starting baseline.
 *
 * ## Canvas Drawing Pipeline:
 *   1. Grid lines + Y-axis labels (percentage)
 *   2. X-axis date labels (auto-scaled for viewport width)
 *   3. Bezier curve through data points (smooth interpolation)
 *   4. Gradient area fill below the curve
 *   5. Glow dot + value label at the curve endpoint
 *
 * @module report/EquityCurve
 */

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { EQUITY_DATA } from "@/content/report-data";
import { useInView } from "./useInView";

const PERIODS = ["1M", "3M", "6M", "1Y", "ALL"] as const;
type Period = (typeof PERIODS)[number];

const LEVERAGES = [1, 2, 5, 10, 20] as const;
type Leverage = (typeof LEVERAGES)[number];

function applyLeverage(data: typeof EQUITY_DATA, leverage: number): typeof EQUITY_DATA {
  if (leverage === 1) return data;
  return data.map((d) => ({
    ...d,
    value: 100 + (d.value - 100) * leverage,
  }));
}

function filterByPeriod(data: typeof EQUITY_DATA, period: Period) {
  if (period === "ALL") return data;
  const now = new Date(data[data.length - 1].date);
  const months = period === "1M" ? 1 : period === "3M" ? 3 : period === "6M" ? 6 : 12;
  const cutoff = new Date(now);
  cutoff.setMonth(cutoff.getMonth() - months);
  return data.filter((d) => new Date(d.date) >= cutoff);
}

function formatValue(v: number): string {
  const gain = v - 100;
  return (gain >= 0 ? "+" : "") + gain.toFixed(1) + "%";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "2-digit" });
}

export function EquityCurve() {
  const [sectionRef, isInView] = useInView(0.1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [period, setPeriod] = useState<Period>("ALL");
  const [leverage, setLeverage] = useState<Leverage>(1);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; date: string; value: number } | null>(null);
  const [drawProgress, setDrawProgress] = useState(0);
  const animFrameRef = useRef<number>(0);
  const hasAnimated = useRef(false);

  const filteredData = applyLeverage(filterByPeriod(EQUITY_DATA, period), leverage);

  // Normalize data to canvas coordinates
  const getCoords = useCallback(
    (width: number, height: number, padding: { top: number; right: number; bottom: number; left: number }) => {
      const data = filteredData;
      if (data.length === 0) return [];

      const minVal = Math.min(...data.map((d) => d.value)) * 0.98;
      const maxVal = Math.max(...data.map((d) => d.value)) * 1.02;
      const chartW = width - padding.left - padding.right;
      const chartH = height - padding.top - padding.bottom;

      return data.map((d, i) => ({
        x: padding.left + (i / (data.length - 1)) * chartW,
        y: padding.top + chartH - ((d.value - minVal) / (maxVal - minVal)) * chartH,
        date: d.date,
        value: d.value,
      }));
    },
    [filteredData]
  );

  // Draw the chart
  const draw = useCallback(
    (progress: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = Math.min(420, Math.max(280, rect.width * 0.45));

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const padding = { top: 30, right: 20, bottom: 40, left: 60 };
      const coords = getCoords(width, height, padding);
      if (coords.length < 2) return;

      const chartW = width - padding.left - padding.right;
      const chartH = height - padding.top - padding.bottom;
      const data = filteredData;
      const minVal = Math.min(...data.map((d) => d.value)) * 0.98;
      const maxVal = Math.max(...data.map((d) => d.value)) * 1.02;

      // Grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      const gridLines = 5;
      for (let i = 0; i <= gridLines; i++) {
        const y = padding.top + (i / gridLines) * chartH;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();

        // Y-axis labels
        const val = maxVal - (i / gridLines) * (maxVal - minVal);
        const gain = val - 100;
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.font = "11px system-ui, sans-serif";
        ctx.textAlign = "right";
        ctx.fillText((gain >= 0 ? "+" : "") + gain.toFixed(0) + "%", padding.left - 10, y + 4);
      }

      // X-axis labels
      const labelCount = width < 500 ? 4 : 7;
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.font = "11px system-ui, sans-serif";
      ctx.textAlign = "center";
      for (let i = 0; i < labelCount; i++) {
        const idx = Math.floor((i / (labelCount - 1)) * (data.length - 1));
        const d = data[idx];
        const x = padding.left + (idx / (data.length - 1)) * chartW;
        const date = new Date(d.date + "T12:00:00");
        const label = date.toLocaleDateString("it-IT", { day: "numeric", month: "short" });
        ctx.fillText(label, x, height - 10);
      }

      // Draw visible portion based on progress
      const visibleCount = Math.floor(coords.length * progress);
      if (visibleCount < 2) return;

      const visibleCoords = coords.slice(0, visibleCount);

      // Area fill gradient
      const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradient.addColorStop(0, "rgba(217, 177, 98, 0.20)");
      gradient.addColorStop(0.4, "rgba(217, 177, 98, 0.08)");
      gradient.addColorStop(0.7, "rgba(217, 177, 98, 0.02)");
      gradient.addColorStop(1, "rgba(217, 177, 98, 0)");

      ctx.beginPath();
      ctx.moveTo(visibleCoords[0].x, height - padding.bottom);
      ctx.lineTo(visibleCoords[0].x, visibleCoords[0].y);

      for (let i = 1; i < visibleCoords.length; i++) {
        const prev = visibleCoords[i - 1];
        const curr = visibleCoords[i];
        const cpx = (prev.x + curr.x) / 2;
        ctx.bezierCurveTo(cpx, prev.y, cpx, curr.y, curr.x, curr.y);
      }

      ctx.lineTo(visibleCoords[visibleCoords.length - 1].x, height - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Main curve line
      ctx.beginPath();
      ctx.moveTo(visibleCoords[0].x, visibleCoords[0].y);
      for (let i = 1; i < visibleCoords.length; i++) {
        const prev = visibleCoords[i - 1];
        const curr = visibleCoords[i];
        const cpx = (prev.x + curr.x) / 2;
        ctx.bezierCurveTo(cpx, prev.y, cpx, curr.y, curr.x, curr.y);
      }
      ctx.strokeStyle = "#D9B162";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "rgba(217, 177, 98, 0.4)";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Glow dot + value label at the end
      if (progress >= 0.99) {
        const last = visibleCoords[visibleCoords.length - 1];
        ctx.beginPath();
        ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#D9B162";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(last.x, last.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(217, 177, 98, 0.2)";
        ctx.fill();

        // Value label
        const lastGain = last.value - 100;
        const labelText = (lastGain >= 0 ? "+" : "") + lastGain.toFixed(1) + "%";
        ctx.font = "bold 13px system-ui, sans-serif";
        ctx.fillStyle = "#D9B162";
        ctx.textAlign = "right";
        ctx.fillText(labelText, last.x - 12, last.y - 12);
      }
    },
    [filteredData, getCoords]
  );

  // Animate draw-in
  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const duration = 2000;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const progress = 1 - Math.pow(1 - t, 3);
      setDrawProgress(progress);
      draw(progress);
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isInView, draw]);

  // Redraw on period change
  useEffect(() => {
    if (hasAnimated.current) {
      setDrawProgress(1);
      setTooltip(null);
      draw(1);
    }
  }, [period, leverage, draw]);

  // Redraw on resize
  useEffect(() => {
    const handleResize = () => {
      if (drawProgress >= 1) draw(1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw, drawProgress]);

  // Mouse/touch interaction for tooltip
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container || drawProgress < 1) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const height = rect.height;
      const padding = { top: 30, right: 20, bottom: 40, left: 60 };
      const coords = getCoords(width, height, padding);

      // Find closest point
      let closest = coords[0];
      let minDist = Infinity;
      for (const c of coords) {
        const dist = Math.abs(c.x - x);
        if (dist < minDist) {
          minDist = dist;
          closest = c;
        }
      }

      if (closest && minDist < 30) {
        setTooltip({
          x: closest.x,
          y: closest.y,
          date: closest.date,
          value: closest.value,
        });
      } else {
        setTooltip(null);
      }
    },
    [getCoords, drawProgress]
  );

  const lastVal = filteredData.length > 1 ? filteredData[filteredData.length - 1].value : 100;
  const growthNum = lastVal - 100;
  const growth = growthNum.toFixed(1);
  const growthColor = growthNum >= 0 ? "#4ade80" : "#f87171";

  return (
    <section ref={sectionRef} style={{ padding: "40px 20px 80px" }}>
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
            flexWrap: "wrap" as const,
            gap: 16,
            marginBottom: 24,
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
              Equity Curve
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontSize: 13,
                  color: "rgba(255, 255, 255, 0.35)",
                }}
              >
                Crescita nel periodo:
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: growthColor,
                }}
              >
                {growthNum >= 0 ? "+" : ""}{growth}%
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: 8, alignItems: "flex-end" }}>
            {/* Period tabs */}
            <div
              style={{
                display: "flex",
                gap: 4,
                background: "rgba(255, 255, 255, 0.03)",
                borderRadius: 12,
                padding: 4,
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: period === p ? "rgba(217, 177, 98, 0.15)" : "transparent",
                    color: period === p ? "#D9B162" : "rgba(255, 255, 255, 0.35)",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

          </div>
        </motion.div>

        {/* Chart container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          ref={containerRef}
          style={{
            position: "relative",
            background: "rgba(5, 5, 5, 0.4)",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: 20,
            padding: "20px 8px 8px",
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setTooltip(null)}
        >
          <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />

          {/* Tooltip */}
          {tooltip && (
            <div
              style={{
                position: "absolute",
                left: tooltip.x,
                top: tooltip.y - 60,
                transform: "translateX(-50%)",
                background: "rgba(10, 10, 10, 0.95)",
                border: "1px solid rgba(217, 177, 98, 0.2)",
                borderRadius: 10,
                padding: "8px 14px",
                pointerEvents: "none",
                zIndex: 10,
                whiteSpace: "nowrap" as const,
              }}
            >
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>
                {formatDate(tooltip.date)}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#D9B162" }}>
                {formatValue(tooltip.value)}
              </div>
            </div>
          )}

          {/* Crosshair line */}
          {tooltip && (
            <div
              style={{
                position: "absolute",
                left: tooltip.x,
                top: 20,
                bottom: 8,
                width: 1,
                background: "rgba(217, 177, 98, 0.2)",
                pointerEvents: "none",
              }}
            />
          )}
        </motion.div>

        {/* Leverage tabs — below chart */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            marginTop: 16,
          }}
        >
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginRight: 4, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Leva</span>
          <div
            style={{
              display: "flex",
              gap: 4,
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: 12,
              padding: 4,
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            {LEVERAGES.map((lev) => (
              <button
                key={lev}
                onClick={() => setLeverage(lev)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background: leverage === lev ? "rgba(147, 130, 220, 0.15)" : "transparent",
                  color: leverage === lev ? "#9382DC" : "rgba(255, 255, 255, 0.3)",
                }}
              >
                {lev}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
