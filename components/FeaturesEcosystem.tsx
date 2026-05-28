"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    BarChart3,
    ShieldCheck,
    Users,
    Radio,
    Zap,
    Headphones,
    ArrowRight
} from "lucide-react";
import React, { useState, useEffect } from "react";

import { CopyVariant } from "@/content/copy";

// TIER S+ DATA: Geometric mapping for orbital satellites
const featuresLayout = [
    { icon: Zap, angle: 0 },          // Copytrading
    { icon: BarChart3, angle: 60 },   // Analisi Giornaliera
    { icon: ShieldCheck, angle: 120 }, // Strategie Proprietary
    { icon: Users, angle: 180 },       // Hub Privato
    { icon: Radio, angle: 240 },       // Sessioni Live
    { icon: Headphones, angle: 300 },  // Supporto Prioritario
];

export function FeaturesEcosystem({ content }: { content: CopyVariant["ecosystem"] }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    // Derived transforms for 60FPS parallax without re-renders
    const headerTranslateX = useTransform(smoothX, [-0.5, 0.5], [6, -6]);
    const headerTranslateY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
    const stageRotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
    const stageRotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
    const footerTranslateX = useTransform(smoothX, [-0.5, 0.5], [4, -4]);
    const footerTranslateY = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

    return (
        <section
            id="ecosystem"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            className="relative w-full min-h-screen lg:min-h-[900px] bg-black overflow-hidden flex flex-col items-center justify-center py-8 lg:py-12 selection:bg-arcadia-gold/30 perspective-[1500px]"
        >

            {/* ATMOSPHERIC BLOOM (Optimized) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-arcadia-gold/5 blur-[120px] rounded-full pointer-events-none opacity-20 select-none" />

            {/* NOISE OVERLAY - Handled by globals.css */}

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full"
            >
                <motion.div
                    className="text-center mb-12 lg:mb-32"
                    style={{ x: headerTranslateX, y: headerTranslateY }}
                >
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 0.4, letterSpacing: "0.5em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="text-[9px] md:text-xs font-mono text-arcadia-gold uppercase mb-5"
                    >
                        {content.tagline}
                    </motion.div>
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl lg:text-8xl font-serif text-liquid-silver tracking-tighter leading-[1.1] pb-4"
                    >
                        {content.title}
                    </motion.h3>
                </motion.div>

                {/* UNIFIED ECOSYSTEM FEED (Tier S Card Architecture) */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-5 lg:px-10">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
                        {content.features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    delay: i * 0.1,
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                style={{
                                    x: useTransform(smoothX, [-0.5, 0.5], [(i % 3 - 1) * 10, -(i % 3 - 1) * 10]),
                                    y: useTransform(smoothY, [-0.5, 0.5], [Math.floor(i / 3 - 1) * 10, -Math.floor(i / 3 - 1) * 10]),
                                }}
                                className="group relative flex items-center gap-5 p-[1px] rounded-[16px] overflow-hidden cursor-pointer"
                            >
                                <div className="relative flex flex-col w-full p-4 md:p-10 rounded-[15px] glass-obsidian transition-all duration-700 overflow-hidden h-full">
                                    {/* ATMOSPHERIC BLOOM (Jewelry Depth) */}
                                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-arcadia-gold/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-arcadia-gold/10 transition-colors duration-700" />
                                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-arcadia-gold/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-arcadia-gold/10 transition-colors duration-700" />

                                    {/* RAZOR-SHARP TOP ACCENT (Metallic Shine) */}
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/40 to-transparent group-hover:via-arcadia-gold transition-all duration-700" />

                                    <div className="flex items-center gap-6 mb-8 md:mb-10">
                                        {/* VOLUMETRIC ICON EMBLEM */}
                                        <div className="relative flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full border border-arcadia-gold/30 flex items-center justify-center transition-all duration-700 bg-zinc-900/60 shadow-[0_0_20px_rgba(217,177,98,0.1)] group-hover:shadow-[0_0_40px_rgba(217,177,98,0.3)]">
                                            {React.createElement(featuresLayout[i].icon, {
                                                className: "w-4 h-4 md:w-6 md:h-6 icon-gold group-hover:brightness-125 transition-all duration-700 z-10"
                                            })}
                                            {/* Liquid Glow Inner */}
                                            <div className="absolute inset-0 bg-arcadia-gold/25 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        </div>

                                        {/* TYPOGRAPHY: LIQUID GOLD TIER S */}
                                        <div className="flex flex-col">
                                            <h4 className="text-[10px] md:text-[16px] font-bold text-liquid-gold tracking-[0.15em] md:tracking-[0.25em] uppercase leading-tight">
                                                {feature.title}
                                            </h4>
                                            <div className="w-12 h-[1px] bg-gradient-to-r from-arcadia-gold/60 to-transparent mt-4 transition-all duration-700 group-hover:w-24 group-hover:from-arcadia-gold" />
                                        </div>

                                        {/* Minimal CTA Arrow */}
                                        <div className="ml-auto opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-700 hidden md:block">
                                            <ArrowRight className="w-6 h-6 icon-gold" />
                                        </div>
                                    </div>

                                    {/* SUBTITLE: RAW ELEGANCE (Sophisticated Contrast) */}
                                    <p className="text-[10px] md:text-[14px] text-white/40 leading-relaxed font-light tracking-[0.06em] group-hover:text-white/80 transition-colors duration-700">
                                        {feature.subtitle}
                                    </p>

                                    {/* INTERNAL REFLECTION GLINT (Macro Shine) */}
                                    <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1200ms] pointer-events-none" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* REMOVED FOOTER CALLOUT AS IT CLASHES WITH THE NEW GRID CLEANLINESS */}
        </section>
    );
}
