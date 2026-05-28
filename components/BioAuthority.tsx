"use client";

import { motion } from "framer-motion";
import { CornerBrackets } from "./ui/CornerBrackets";
import { Check, ArrowRight, Play, FileText } from "lucide-react";
import Image from "next/image";

export function BioAuthority() {
    return (
        <section id="bio" className="relative w-full py-16 lg:py-24 bg-black overflow-hidden">
            {/* ATMOSPHERIC BLOOMS (Institutional Depth) */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-arcadia-gold/5 blur-[120px] rounded-full pointer-events-none opacity-20" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-arcadia-gold/[0.03] blur-[100px] rounded-full pointer-events-none opacity-15" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* ── HEADER BLOCK (Centered, Minimal) ── */}
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
                        className="text-5xl md:text-8xl font-serif text-liquid-silver tracking-tighter leading-[1.1] mb-6"
                    >
                        Marco Garavelli
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="text-arcadia-gold/60 text-xs md:text-sm font-mono uppercase tracking-[0.3em] mb-4"
                    >
                        Analista Ciclico • Trader • Founder Skitla13
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="max-w-xl mx-auto text-white/40 text-base md:text-lg font-light leading-relaxed tracking-wide italic"
                    >
                        "Definiamo il vantaggio competitivo attraverso l'interpretazione del tempo, non solo del prezzo."
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* ── LEFT COLUMN: Photo Card (Restored to exact previous version) ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex justify-center"
                    >
                        <div className="group relative p-[1px] rounded-[16px] overflow-hidden w-full max-w-2xl cursor-pointer">
                            {/* Gradient Border Mask */}
                            <div className="absolute inset-0 bg-gradient-to-b from-arcadia-gold/20 via-white/5 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative rounded-[15px] glass-obsidian overflow-hidden transition-all duration-700">
                                {/* GOLD TOP BORDER ACCENT */}
                                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-arcadia-gold to-transparent z-30" />

                                {/* Corner Brackets (Wraps the whole card) */}
                                <div className="absolute inset-3 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700 z-10">
                                    <CornerBrackets strokeWidth={1.5} size={14} color="#D9B162" />
                                </div>

                                {/* Photo Area */}
                                <div className="relative aspect-[3/2] overflow-hidden bg-zinc-950">
                                    <Image
                                        src="/skitla13_office.jpg"
                                        alt="Marco Garavelli - Founder & Analyst"
                                        fill
                                        className="object-cover object-center opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-[1.05]"
                                        sizes="(max-width: 768px) 100vw, 672px"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                                </div>

                                {/* Caption Bar (Restored Typography) */}
                                <div className="relative p-7 flex items-center justify-between z-20">
                                    <div>
                                        <h4 className="text-[16px] font-bold text-liquid-gold tracking-[0.2em] uppercase leading-tight">
                                            Skitla13
                                        </h4>
                                        <p className="text-[10px] text-white/30 uppercase tracking-[0.25em] mt-2 font-medium">
                                            Analista Ciclico
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-arcadia-gold/20 flex items-center justify-center bg-arcadia-gold/5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-arcadia-gold animate-pulse shadow-[0_0_10px_rgba(217,177,98,0.5)]" />
                                    </div>
                                </div>

                                {/* INTERNAL REFLECTION GLINT */}
                                <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[2000ms] pointer-events-none" />
                            </div>
                        </div>
                    </motion.div>

                    {/* ── RIGHT COLUMN: Content (Tier S UI/UX Upgrade) ── */}
                    <div className="flex flex-col space-y-12 relative">
                        {/* RIGHT COLUMN BACKGROUND BLOOM */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-arcadia-gold/[0.02] blur-[120px] rounded-full pointer-events-none" />

                        {/* Authority Chips (Tier S Glass Capsules) */}
                        <div className="flex flex-wrap gap-4 relative z-10">
                            {["Visione Indipendente", "Metodo Proprietario", "Trasparenza Totale"].map((chip, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.5, duration: 0.8 }}
                                    className="px-5 py-2 rounded-full border border-arcadia-gold/10 bg-white/[0.02] glass-obsidian backdrop-blur-xl group cursor-default"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-arcadia-gold animate-pulse group-hover:shadow-[0_0_8px_rgba(217,177,98,0.8)] transition-shadow duration-300" />
                                        <span className="text-[10px] md:text-[11px] font-mono tracking-[0.18em] text-white/50 group-hover:text-arcadia-gold/80 transition-colors duration-300 uppercase">
                                            {chip}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Cards Section (Tier S Masterpiece Cards) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            {/* Card 1: Proof */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="group relative p-[1px] rounded-2xl overflow-hidden"
                            >
                                <div className="relative p-7 rounded-[15px] glass-obsidian h-full border border-white/[0.03] group-hover:border-arcadia-gold/20 transition-all duration-700 overflow-hidden">
                                    {/* RAZOR ACCENT */}
                                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-arcadia-gold/40 to-transparent group-hover:via-arcadia-gold transition-all duration-700" />

                                    {/* CORNER BRACKETS */}
                                    <div className="absolute inset-3 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity duration-700">
                                        <CornerBrackets strokeWidth={1} size={10} color="#D9B162" />
                                    </div>

                                    <h3 className="text-[11px] font-bold text-liquid-gold tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-arcadia-gold" />
                                        Perché Fidarsi
                                    </h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Official Partner BingX e Bitget.",
                                            "Analisi Contrarian (BTC ATH $124.5k call).",
                                            "Caso Studio Documentato ($5k to >$300k) — pubblicato dal quotidiano Lo Jonio.",
                                            "Tracciabilità (Ecosistema + pubblicazioni)."
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="w-1 h-1 rounded-full bg-arcadia-gold/40 mt-1.5 flex-shrink-0" />
                                                <span className="text-[12.5px] text-white/40 font-light leading-snug tracking-wide group-hover:text-white/60 transition-colors duration-500">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* GLINT */}
                                    <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1500ms] pointer-events-none" />
                                </div>
                            </motion.div>

                            {/* Card 2: Method */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="group relative p-[1px] rounded-2xl overflow-hidden"
                            >
                                <div className="relative p-7 rounded-[15px] glass-obsidian h-full border border-white/[0.03] group-hover:border-arcadia-gold/20 transition-all duration-700 overflow-hidden">
                                    {/* RAZOR ACCENT */}
                                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-arcadia-gold/40 to-transparent group-hover:via-arcadia-gold transition-all duration-700" />

                                    {/* CORNER BRACKETS */}
                                    <div className="absolute inset-3 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity duration-700">
                                        <CornerBrackets strokeWidth={1} size={10} color="#D9B162" />
                                    </div>

                                    <h3 className="text-[11px] font-bold text-liquid-gold tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-arcadia-gold" />
                                        Il Metodo
                                    </h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Lettura Ciclica del Tempo",
                                            "Strutture Accumulo/Distribuzione",
                                            "Gestione Attiva Floating Profit",
                                            "Controllo del Rischio",
                                            "Strategia Multi-Asset"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className="w-4 h-4 rounded-full border border-arcadia-gold/20 flex items-center justify-center bg-arcadia-gold/5 group-hover:border-arcadia-gold/40 transition-colors duration-500">
                                                    <Check className="w-2.5 h-2.5 text-arcadia-gold/80" strokeWidth={3} />
                                                </div>
                                                <span className="text-[12.5px] text-white/40 font-light tracking-wide group-hover:text-white/60 transition-colors duration-500">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* GLINT */}
                                    <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1500ms] pointer-events-none" />
                                </div>
                            </motion.div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
