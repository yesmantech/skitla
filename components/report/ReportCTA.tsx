/**
 * @file ReportCTA.tsx — Call-to-action section at the bottom of the report page.
 *
 * Encourages visitors to join the Skitla13 community after seeing the track record.
 * Features:
 *   - Risk disclaimer badge at the top (Shield icon)
 *   - "I numeri non mentono" heading with gold text effect
 *   - Descriptive paragraph about transparency
 *   - Tier-S premium CTA button (links to skitla13.com)
 *   - Stacked avatar social proof strip (+500 membri attivi)
 *
 * ## CTA Button:
 *   Uses the `.hero-cta-tier-s` CSS class system defined in globals.css
 *   for the animated border, glow, shimmer, and surface effects.
 *
 * @module report/ReportCTA
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { useInView } from "./useInView";

export function ReportCTA() {
  const [ref, isInView] = useInView(0.2);

  return (
    <section ref={ref} style={{ padding: "40px 20px 100px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" as const }}>
        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: 12,
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            marginBottom: 40,
          }}
        >
          <Shield size={14} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.4)" }} />
          <span style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.35)", lineHeight: 1.5 }}>
            I risultati passati non garantiscono risultati futuri. Il trading comporta rischi.
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
            marginBottom: 16,
            fontFamily: "var(--font-space), system-ui",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.9)" }}>I numeri non </span>
          <span className="text-liquid-gold">mentono</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
            color: "rgba(255, 255, 255, 0.35)",
            maxWidth: 480,
            margin: "0 auto 40px",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Unisciti a una community che mette la trasparenza al primo posto. Ogni segnale documentato, ogni risultato verificabile.
        </motion.p>

        {/* CTA Button — Reusing Tier S pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="https://skitla13.com"
            className="hero-cta-tier-s"
            style={{ textDecoration: "none" }}
          >
            <div className="hero-cta-border" />
            <div className="hero-cta-glow" />
            <div className="hero-cta-surface">
              <div className="hero-cta-shimmer" />
              <span className="hero-cta-text">Unisciti alla Sala</span>
              <ArrowRight size={16} className="hero-cta-arrow" />
            </div>
          </a>
        </motion.div>

        {/* Micro social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {/* Stacked avatars placeholder */}
          <div style={{ display: "flex" }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, hsl(${40 + i * 30}, 50%, ${35 + i * 5}%), hsl(${50 + i * 30}, 40%, ${25 + i * 5}%))`,
                  border: "2px solid #000",
                  marginLeft: i > 0 ? -8 : 0,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            +500 membri attivi
          </span>
        </motion.div>
      </div>
    </section>
  );
}
