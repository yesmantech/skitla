"use client";

import { motion } from "framer-motion";
import { CornerBrackets } from "./ui/CornerBrackets";
import { Check, X, ArrowRight, Play } from "lucide-react";
import Image from "next/image";

export function AboutSkitla() {
    return (
        <section id="founder" className="relative w-full py-8 lg:py-12 bg-black overflow-hidden">
            {/* ATMOSPHERIC BLOOM */}
            <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-arcadia-gold/5 blur-[100px] rounded-full pointer-events-none opacity-25" />
            <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[400px] h-[400px] bg-arcadia-gold/[0.03] blur-[80px] rounded-full pointer-events-none opacity-20" />

            <div className="max-w-7xl mx-auto px-5 lg:px-10">
                {/* HEADER — Matching SuccessStories pattern */}
                <div className="text-center mb-16 lg:mb-24 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 0.4, letterSpacing: "0.5em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="text-[9px] md:text-xs font-mono text-arcadia-gold uppercase mb-5"
                    >
                        Il Founder
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-8xl font-serif text-liquid-silver tracking-tighter leading-[1.1] pb-2"
                    >
                        Marco Garavelli
                    </motion.h2>
                </div>

                {/* TWO-COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* ── LEFT COLUMN: Photo Card (Tier S glass-obsidian) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex justify-center order-1"
                    >
                        <div className="group relative p-[1px] rounded-[16px] overflow-hidden w-full max-w-[420px] cursor-pointer">
                            {/* Gradient Border Mask */}
                            <div className="absolute inset-0 bg-gradient-to-b from-arcadia-gold/20 via-white/5 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative w-full rounded-[15px] glass-obsidian overflow-hidden transition-all duration-700">
                                {/* RAZOR-SHARP TOP ACCENT (Tier S Metallic Shine) */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/40 to-transparent group-hover:via-arcadia-gold transition-all duration-700 z-10" />

                                {/* ATMOSPHERIC BLOOM inside card */}
                                <div className="absolute -top-24 -left-24 w-48 h-48 bg-arcadia-gold/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-arcadia-gold/10 transition-colors duration-700" />

                                {/* Corner Brackets */}
                                <div className="absolute inset-4 pointer-events-none opacity-30 group-hover:opacity-80 transition-opacity duration-700 z-10">
                                    <CornerBrackets strokeWidth={1.2} size={12} color="#D9B162" />
                                </div>

                                {/* Photo */}
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <Image
                                        src="/skitla13.jpg"
                                        alt="Skitla13 — Trader & Analyst"
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                                        sizes="(max-width: 768px) 100vw, 420px"
                                        priority
                                    />
                                    {/* Bottom Gradient */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[1]" />
                                </div>

                                {/* Caption Bar */}
                                <div className="relative px-8 py-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-[14px] font-bold text-liquid-gold tracking-[0.25em] uppercase leading-tight">
                                            Skitla13
                                        </p>
                                        <div className="w-10 h-[1px] bg-gradient-to-r from-arcadia-gold/60 to-transparent mt-2.5 group-hover:w-16 group-hover:from-arcadia-gold transition-all duration-700" />
                                        <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 mt-2">
                                            Trader & Analyst
                                        </p>
                                    </div>
                                    <div className="w-3 h-3 rounded-full border border-arcadia-gold/30 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-arcadia-gold/60 animate-pulse" />
                                    </div>
                                </div>

                                {/* INTERNAL REFLECTION GLINT (Tier S Shimmer) */}
                                <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1200ms] pointer-events-none" />
                            </div>
                        </div>
                    </motion.div>

                    {/* ── RIGHT COLUMN: Content (Tier S Typography) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col order-2"
                    >
                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-zinc-500 font-sans leading-relaxed max-w-xl mb-10">
                            Un approccio strutturato al trading, basato sulla trasparenza totale e su un metodo replicabile.
                        </p>

                        {/* Authority Pills */}
                        <div className="flex flex-wrap gap-3 mb-12">
                            {[
                                "Metodo strutturato",
                                "Trasparenza e storico",
                                "Community costante",
                            ].map((bullet, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-arcadia-gold/60 flex-shrink-0" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                                        {bullet}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Cosa fa — glass-obsidian card */}
                        <div className="group relative p-[1px] rounded-[16px] overflow-hidden mb-8">
                            <div className="relative p-6 md:p-8 rounded-[15px] glass-obsidian overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/20 to-transparent" />
                                <h3 className="text-[12px] font-bold text-liquid-gold tracking-[0.3em] uppercase mb-3">
                                    Cosa fa
                                </h3>
                                <p className="text-[13px] md:text-[14px] text-white/40 font-light leading-relaxed tracking-[0.04em]">
                                    Skitla13 analizza i mercati ogni giorno, condivide setups operativi in tempo reale
                                    e guida una community di trader verso un approccio professionale e sostenibile.
                                    Nessuna scorciatoia, solo disciplina e analisi.
                                </p>
                            </div>
                        </div>

                        {/* Come lavora / Come NON lavora — glass-obsidian cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                            <div className="group relative p-[1px] rounded-[16px] overflow-hidden">
                                <div className="relative p-6 rounded-[15px] glass-obsidian overflow-hidden h-full">
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/20 to-transparent" />
                                    <h3 className="text-[11px] font-bold text-liquid-gold tracking-[0.3em] uppercase mb-4">
                                        Come lavora
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        {[
                                            "Analisi giornaliera strutturata",
                                            "Risk management rigoroso",
                                            "Formazione continua",
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-2.5">
                                                <div className="w-4 h-4 rounded-full border border-arcadia-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-2.5 h-2.5 icon-gold" strokeWidth={2.5} />
                                                </div>
                                                <span className="text-[12px] text-white/40 font-light leading-snug tracking-[0.04em]">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="group relative p-[1px] rounded-[16px] overflow-hidden">
                                <div className="relative p-6 rounded-[15px] glass-obsidian overflow-hidden h-full">
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                                    <h3 className="text-[11px] font-bold text-white/20 tracking-[0.3em] uppercase mb-4">
                                        Come NON lavora
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        {[
                                            "Nessuna promessa di guadagni",
                                            "Nessun colpo della vita",
                                            "Zero overtrading emotivo",
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-2.5">
                                                <div className="w-4 h-4 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <X className="w-2.5 h-2.5 text-white/20" strokeWidth={2.5} />
                                                </div>
                                                <span className="text-[12px] text-white/25 font-light leading-snug tracking-[0.04em]">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </motion.div>
                </div>
            </div>
        </section>
    );
}
