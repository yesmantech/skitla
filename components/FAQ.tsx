"use client";

import { Container } from "./ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "@/content/faq";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

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
            {/* ── SUBTLE ATMOSPHERIC BLOOM ── */}
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-arcadia-gold/5 blur-[120px] rounded-full pointer-events-none opacity-20 hidden md:block" />

            <Container>
                {/* ── HEADER ── */}
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

                {/* ── ACCORDION — Unified clean design for mobile & desktop ── */}
                <div className="max-w-3xl mx-auto relative z-10">
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
                                className="group border-b border-white/[0.08] last:border-b-0"
                            >
                                {/* ── QUESTION BUTTON ── */}
                                <button
                                    onClick={() => toggle(i)}
                                    className="w-full py-5 md:py-6 px-2 md:px-4 text-left flex items-center gap-4 md:gap-5 cursor-pointer relative"
                                >
                                    {/* Number index */}
                                    <span
                                        className={`
                                            text-[10px] md:text-[11px] font-mono tracking-[0.15em] w-6 md:w-7 flex-shrink-0
                                            transition-colors duration-500
                                            ${isOpen ? "text-arcadia-gold/50" : "text-white/15 group-hover:text-white/25"}
                                        `}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    {/* Question text */}
                                    <span
                                        className={`
                                            flex-1 text-[15px] md:text-base font-medium tracking-tight leading-snug
                                            transition-colors duration-500
                                            ${isOpen
                                                ? "text-white"
                                                : "text-white/60 group-hover:text-white/80"
                                            }
                                        `}
                                    >
                                        {faq.question}
                                    </span>

                                    {/* Toggle icon — circular with subtle border */}
                                    <div
                                        className={`
                                            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                            border transition-all duration-500
                                            ${isOpen
                                                ? "text-arcadia-gold border-arcadia-gold/30 bg-arcadia-gold/10"
                                                : "text-white/30 border-white/[0.08] bg-white/[0.03] group-hover:text-white/50 group-hover:border-white/[0.12]"
                                            }
                                        `}
                                    >
                                        <motion.div
                                            animate={{ rotate: isOpen ? 0 : 90 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            {isOpen ? (
                                                <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                                            ) : (
                                                <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
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
                                                    duration: 0.2,
                                                    ease: "circOut"
                                                },
                                                opacity: { duration: 0.2 },
                                            }}
                                            style={{ willChange: "height, opacity" }}
                                            className="overflow-hidden"
                                        >
                                            {/* Answer content — offset to align with question text */}
                                            <div className="pb-6 pl-[calc(1.5rem+16px+1rem)] md:pl-[calc(1.75rem+20px+1.25rem)] pr-12 md:pr-16">
                                                <p className="text-[13px] md:text-[14px] text-white/35 leading-[1.8] font-light tracking-[0.02em]">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
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
