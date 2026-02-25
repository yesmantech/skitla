"use client";

import { motion } from "framer-motion";
import { CopyVariant } from "@/content/copy";
import { Container } from "./ui/Container";
import { CornerBrackets } from "./ui/CornerBrackets";

export function ProofStrip({ content }: { content: CopyVariant["proof"] }) {
    return (
        <section id="stats" className="relative py-12 md:py-24 bg-black overflow-hidden border-b border-white/[0.03]">
            {/* ATMOSPHERIC BACKGROUND */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,177,98,0.03)_0%,transparent_70%)] pointer-events-none" />

            <Container className="px-2 sm:px-6 md:px-10">
                <div className="relative z-10">
                    {/* SECTION HEADER */}
                    <div className="text-center mb-12 lg:mb-16">
                        <motion.div
                            initial={{ opacity: 0, letterSpacing: "0.2em" }}
                            whileInView={{ opacity: 0.6, letterSpacing: "0.5em" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            className="text-[10px] md:text-xs font-mono text-arcadia-gold uppercase mb-5"
                        >
                            TRACK RECORD
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-medium leading-[1.1] md:leading-[1.1] tracking-tight text-liquid-silver pb-4"
                        >
                            {content.title}
                        </motion.h2>
                        <div className="w-24 h-[1px] bg-arcadia-gold/30 mx-auto mt-8 md:mt-10" />
                    </div>

                    {/* METRICS GRID: Hybrid Grid on Mobile (1 Full + 2 Half), 3 Col on Desktop */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10">
                        {content.stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className={`group relative p-[1px] rounded-[16px] overflow-hidden ${i === 0 ? "col-span-2 md:col-span-1" : "col-span-1"
                                    }`}
                            >
                                {/* GRADIENT BORDER MASK (Consistent with Ecosystem) */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className={`relative h-full glass-obsidian rounded-[15px] transition-all duration-700 overflow-hidden ${i === 0 ? "py-10 px-6 md:p-16" : "p-6 md:p-16"
                                    }`}>
                                    {/* CORNER BRACKETS (Tier S Tech Accent) */}
                                    <div className="absolute inset-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                                        <CornerBrackets strokeWidth={1.2} size={8} color="#D9B162" />
                                    </div>

                                    {/* ATMOSPHERIC BLOOM (Jewelry Depth) */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-arcadia-gold/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-arcadia-gold/20 transition-all duration-700 opacity-50" />

                                    {/* RAZOR-SHARP TOP ACCENT (Metallic Shine) */}
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/40 to-transparent group-hover:via-arcadia-gold transition-all duration-700" />

                                    <div className="flex flex-col h-full items-center justify-center relative z-10 text-center">
                                        {/* LARGE METRIC VALUE: Balanced for presence */}
                                        <div className={`font-bold text-liquid-gold mb-2 md:mb-8 tracking-tighter whitespace-nowrap drop-shadow-[0_0_30px_rgba(217,177,98,0.2)] ${i === 0 ? "text-5xl sm:text-6xl md:text-8xl mb-4" : "text-3xl sm:text-4xl md:text-8xl"
                                            }`}>
                                            {stat.value}
                                        </div>

                                        {/* LABEL: Maximized for extreme presence per user request */}
                                        <div className={`font-bold uppercase text-white/60 mb-4 md:mb-12 group-hover:text-white transition-colors duration-500 leading-tight ${i === 0
                                            ? "text-base sm:text-lg md:text-3xl tracking-[0.2em] md:tracking-[0.3em] mb-6"
                                            : "text-xs sm:text-sm md:text-3xl tracking-[0.15em] md:tracking-[0.3em]"
                                            }`}>
                                            {stat.label}
                                        </div>

                                        {/* HELPER TEXT: Subtle anchor */}
                                        <div className="mt-auto">
                                            <p className={`text-white/40 font-light leading-relaxed tracking-wide ${i === 0 ? "text-xs md:text-sm max-w-[200px] md:max-w-none" : "text-[10px] md:text-sm hidden sm:block"
                                                }`}>
                                                {stat.helper}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>


                </div>
            </Container>
        </section>
    );
}
