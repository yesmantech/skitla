"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { EQUITY_DATA } from "@/content/report-data";
import { useInView } from "./useInView";

/**
 * Drawdown "underwater" chart — shows how far equity was from its peak at any time.
 * Standard hedge fund metric. Red areas = drawdown periods.
 */
export function DrawdownChart() {
  const [sectionRef, isInView] = useInView(0.2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDrawn = useRef(false);

  // Calculate drawdown series
  const drawdownData = React.useMemo(() => {
    let peak = EQUITY_DATA[0].value;
    return EQUITY_DATA.map((d) => {
      if (d.value > peak) peak = d.value;
      const dd = ((d.value - peak) / peak) * 100;
      return { date: d.date, drawdown: dd };
    });
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = 120;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 10, right: 20, bottom: 24, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const minDD = Math.min(...drawdownData.map((d) => d.drawdown));
    const maxDD = 0;
    const range = maxDD - minDD || 1;

    // Zero line
    const zeroY = padding.top;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding.left, zeroY);
    ctx.lineTo(width - padding.right, zeroY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Y-axis label
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.font = "10px system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("0%", padding.left - 10, zeroY + 4);
    ctx.fillText(`${minDD.toFixed(1)}%`, padding.left - 10, height - padding.bottom + 4);

    // Build path
    const coords = drawdownData.map((d, i) => ({
      x: padding.left + (i / (drawdownData.length - 1)) * chartW,
      y: padding.top + ((maxDD - d.drawdown) / range) * chartH,
    }));

    // Red gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, "rgba(239, 68, 68, 0)");
    gradient.addColorStop(0.3, "rgba(239, 68, 68, 0.06)");
    gradient.addColorStop(1, "rgba(239, 68, 68, 0.18)");

    ctx.beginPath();
    ctx.moveTo(coords[0].x, zeroY);
    for (const c of coords) {
      ctx.lineTo(c.x, c.y);
    }
    ctx.lineTo(coords[coords.length - 1].x, zeroY);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Drawdown line
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(coords[i].x, coords[i].y);
    }
    ctx.strokeStyle = "rgba(239, 68, 68, 0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [drawdownData]);

  useEffect(() => {
    if (!isInView || hasDrawn.current) return;
    hasDrawn.current = true;
    // Small delay for visual stagger after equity curve
    setTimeout(draw, 400);
  }, [isInView, draw]);

  useEffect(() => {
    if (hasDrawn.current) {
      const handleResize = () => draw();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [draw]);

  return (
    <section ref={sectionRef} style={{ padding: "0 20px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={containerRef}
          style={{
            background: "rgba(5, 5, 5, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.04)",
            borderRadius: 16,
            padding: "14px 8px 8px",
            overflow: "hidden",
          }}
        >
          {/* Label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingLeft: 12,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "rgba(255, 255, 255, 0.25)",
              }}
            >
              Drawdown Underwater
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#f87171",
                fontFamily: "var(--font-space), system-ui",
              }}
            >
              Max: {Math.min(...drawdownData.map((d) => d.drawdown)).toFixed(1)}%
            </span>
          </div>
          <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />
        </motion.div>
      </div>
    </section>
  );
}
