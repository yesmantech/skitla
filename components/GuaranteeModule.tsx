"use client";

import { ShieldCheck } from "lucide-react";
import { Container } from "./ui/Container";
import { CopyVariant } from "@/content/copy";
import { motion } from "framer-motion";

export function GuaranteeModule({ content }: { content: CopyVariant["guarantee"] }) {
    return (
        <section className="py-24 relative overflow-hidden bg-black">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto group relative p-[1px] rounded-3xl overflow-hidden"
                >
                    {/* Subtle Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-arcadia-gold/10 via-white/5 to-transparent opacity-40" />

                    <div className="relative glass-obsidian p-10 md:p-14 rounded-[23px] flex flex-col md:flex-row items-center gap-12 overflow-hidden">
                        {/* RAZOR ACCENT */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/30 to-transparent" />

                        <div className="w-28 h-28 rounded-full border border-arcadia-gold/20 flex items-center justify-center flex-shrink-0 bg-white/[0.02] relative group-hover:border-arcadia-gold/40 transition-all duration-700">
                            <ShieldCheck size={56} className="text-liquid-gold" strokeWidth={1.5} />

                            {/* Inner Pulsing Aura */}
                            <div className="absolute inset-0 bg-arcadia-gold/5 blur-[15px] rounded-full animate-pulse" />
                        </div>

                        <div className="text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 0.4 }}
                                transition={{ delay: 0.3 }}
                                className="text-[10px] font-mono text-arcadia-gold uppercase tracking-[0.5em] mb-4"
                            >
                                Garanzia Arcadia
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-serif text-liquid-silver tracking-tighter mb-6 leading-tight">
                                {content.title}
                            </h2>
                            <p className="text-white/40 leading-relaxed text-lg font-light max-w-xl">
                                {content.description}
                            </p>
                        </div>

                        {/* SHIMMER GLINT */}
                        <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[2000ms] pointer-events-none" />
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
