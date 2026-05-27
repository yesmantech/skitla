/**
 * @file ReportNavbar.tsx — Fixed navigation bar for the trading report page.
 *
 * A minimal, glassmorphism-style fixed navbar with:
 * - Back arrow linking to the homepage
 * - Skitla13 brand name in gold
 * - "Report" badge
 * - Green "live" pulsing indicator showing the report is up-to-date
 *
 * Uses Framer Motion for the entrance animation (fade + slide down).
 * Inline styles are used intentionally for this standalone component.
 *
 * @module report/ReportNavbar
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ReportNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(0, 0, 0, 0.7)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 20px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Back + Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "rgba(255, 255, 255, 0.4)",
              textDecoration: "none",
              fontSize: 13,
              transition: "color 0.2s ease",
            }}
          >
            <ArrowLeft size={16} />
          </Link>
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-space), system-ui",
            }}
            className="text-liquid-gold"
          >
            Skitla13
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: "rgba(255, 255, 255, 0.25)",
              padding: "3px 8px",
              borderRadius: 6,
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            Report
          </span>
        </div>

        {/* Right: Live indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "rgba(255, 255, 255, 0.35)",
            }}
          >
            Aggiornato
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
