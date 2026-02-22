"use client";

import { Container } from "./ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "@/content/faq";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { CornerBrackets } from "./ui/CornerBrackets";

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        const isOpening = openIndex !== index;
        setOpenIndex(isOpening ? index : null);
        if (isOpening) {
            trackEvent("faq_expand", { faq_id: index });
        }
    };

    return (
        <section id="faq" className="relative py-8 lg:py-12 bg-black overflow-hidden">
            {/* ── ATMOSPHERIC BLOOMS — Hidden on mobile for peak performance ── */}
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-arcadia-gold/5 blur-[120px] rounded-full pointer-events-none opacity-20 hidden md:block" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[400px] h-[400px] bg-arcadia-gold/[0.03] blur-[80px] rounded-full pointer-events-none opacity-15 hidden md:block" />

            <Container>
                {/* ── HEADER — Tier S Pattern ── */}
                <div className="text-center mb-16 lg:mb-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 0.4, letterSpacing: "0.5em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="text-[9px] md:text-xs font-mono text-arcadia-gold uppercase mb-5"
                    >
                        FAQ
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-8xl font-serif text-liquid-silver tracking-tighter leading-[1.1] pb-2"
                    >
                        Domande Frequenti
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="text-white/30 text-sm md:text-base font-light leading-relaxed max-w-md mx-auto mt-5"
                    >
                        Tutto quello che devi sapere prima di unirti.
                    </motion.p>
                </div>

                {/* ── ACCORDION ── */}
                <div className="max-w-3xl mx-auto relative z-10 space-y-3">
                    {FAQS.map((faq, i) => {
                        const isOpen = openIndex === i;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{
                                    delay: i * 0.05,
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="group"
                            >
                                {/* Outer border wrapper - OPTIMIZED: Minimal List View on Mobile */}
                                <div
                                    className={`
                                        relative md:rounded-[16px] overflow-hidden
                                        md:transition-all md:duration-700 transition-none
                                        p-0 md:p-[1px]
                                        border-b border-white/10 md:border-b-0
                                        ${isOpen
                                            ? "md:bg-gradient-to-b md:from-arcadia-gold/25 md:via-arcadia-gold/10 md:to-transparent"
                                            : "md:bg-gradient-to-b md:from-white/[0.04] md:via-white/[0.01] md:to-transparent md:hover:from-arcadia-gold/15 md:hover:via-arcadia-gold/[0.04]"
                                        }
                                    `}
                                >
                                    {/* Inner glass-obsidian card - OPTIMIZED: Transparent on mobile */}
                                    <div className={`
                                        relative md:rounded-[15px] overflow-hidden
                                        bg-transparent md:bg-transparent md:glass-obsidian
                                    `}>
                                        {/* RAZOR-SHARP TOP ACCENT - Hidden on mobile */}
                                        <div
                                            className={`
                                                absolute top-0 left-0 right-0 h-[1px] z-10
                                                bg-gradient-to-r from-transparent to-transparent
                                                transition-all duration-700
                                                hidden md:block
                                                ${isOpen ? "via-arcadia-gold/50" : "via-arcadia-gold/10 group-hover:via-arcadia-gold/30"}
                                            `}
                                        />

                                        {/* Corner Brackets — only visible when open */}
                                        <div
                                            className={`
                                                absolute inset-3 pointer-events-none z-10
                                                transition-opacity duration-700
                                                hidden md:block
                                                ${isOpen ? "opacity-40" : "opacity-0 group-hover:opacity-15"}
                                            `}
                                        >
                                            <CornerBrackets strokeWidth={1} size={8} color="#D9B162" />
                                        </div>
                                        {/* Corner Brackets — Hidden on mobile for performance */}

                                        {/* Atmospheric bloom inside card (when open) */}
                                        {isOpen && (
                                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-arcadia-gold/5 blur-[60px] rounded-full pointer-events-none hidden md:block" />
                                        )}

                                        {/* ── QUESTION BUTTON ── */}
                                        <button
                                            onClick={() => toggle(i)}
                                            className="w-full py-6 px-4 md:px-7 md:py-5 text-left flex items-center gap-5 cursor-pointer relative z-10"
                                        >
                                            {/* Number index — Hidden on Mobile for Minimalist Class */}
                                            <span
                                                className={`
                                                    hidden md:block text-[10px] font-mono tracking-[0.2em] w-7 flex-shrink-0
                                                    transition-colors duration-500
                                                    ${isOpen ? "text-arcadia-gold/60" : "text-white/15 group-hover:text-white/25"}
                                                `}
                                            >
                                                {String(i + 1).padStart(2, "0")}
                                            </span>

                                            {/* Mobile Active Accent: A slim gold line on the left when open */}
                                            <div
                                                className={`
                                                    md:hidden absolute left-0 w-[2px] bg-arcadia-gold transition-all duration-300
                                                    ${isOpen ? "h-1/2 opacity-100" : "h-0 opacity-0"}
                                                `}
                                            />

                                            {/* Question text */}
                                            <span
                                                className={`
                                                    flex-1 text-[15px] md:text-base font-medium tracking-tight leading-snug
                                                    transition-colors duration-500
                                                    ${isOpen
                                                        ? "text-liquid-gold"
                                                        : "text-white/60 group-hover:text-white/80"
                                                    }
                                                `}
                                            >
                                                {faq.question}
                                            </span>

                                            {/* Toggle icon — Simplified on Mobile */}
                                            <div
                                                className={`
                                                    flex-shrink-0 flex items-center justify-center
                                                    transition-all duration-500
                                                    ${isOpen
                                                        ? "text-arcadia-gold"
                                                        : "text-white/30 group-hover:text-arcadia-gold/60"
                                                    }
                                                    md:w-8 md:h-8 md:rounded-full md:bg-white/[0.03] md:border md:border-white/[0.06]
                                                    ${isOpen ? "md:bg-arcadia-gold/15 md:border-arcadia-gold/30" : ""}
                                                `}
                                            >
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 0 : 90 }}
                                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                >
                                                    {isOpen ? (
                                                        <Minus className="w-4 h-4 md:w-3.5 md:h-3.5" strokeWidth={1.5} />
                                                    ) : (
                                                        <Plus className="w-4 h-4 md:w-3.5 md:h-3.5" strokeWidth={1.5} />
                                                    )}
                                                </motion.div>
                                            </div>
                                        </button>

                                        {/* ── ANSWER PANEL ── */}
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{
                                                        height: {
                                                            duration: 0.15, // Ultra-fast for mobile fluidity
                                                            ease: "circOut"
                                                        },
                                                        opacity: { duration: 0.15 },
                                                    }}
                                                    style={{ willChange: "height, opacity" }}
                                                    className="overflow-hidden"
                                                >
                                                    {/* Divider — Hidden on mobile for cleaner look */}
                                                    <div className="hidden md:block mx-7 h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/15 to-transparent" />

                                                    {/* Answer content */}
                                                    <div className="pb-6 px-4 md:px-7 md:pt-4 md:pl-[4.5rem]">
                                                        <p className="text-[13px] md:text-[14px] text-white/35 leading-[1.8] font-light tracking-[0.02em]">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* SHIMMER GLINT on hover */}
                                        <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.015] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1200ms] pointer-events-none hidden md:block" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── DECORATIVE BOTTOM LINE ── */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mx-auto mt-12 h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/15 to-transparent origin-center relative z-10"
                />
            </Container>
        </section>
    );
}
