"use client";

import { Container } from "./ui/Container";
import { motion } from "framer-motion";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Check, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { CopyVariant } from "@/content/copy";

export function TrialModule({ content }: { content: CopyVariant["trial"] }) {
    return (
        <section id="trial" className="section-padding relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-primary/5 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2 opacity-20" />

            <Container>
                <div className="max-w-4xl mx-auto group relative p-[1px] rounded-[32px] overflow-hidden">
                    {/* Edge Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-arcadia-gold/20 via-white/5 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative glass-obsidian rounded-[31px] overflow-hidden transition-all duration-700">
                        {/* RAZOR TOP ACCENT */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/40 to-transparent group-hover:via-arcadia-gold transition-all duration-700 z-10" />

                        <div className="grid grid-cols-1 md:grid-cols-12">
                            <div className="md:col-span-7 p-8 md:p-14">
                                <motion.div
                                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                                    whileInView={{ opacity: 0.4, letterSpacing: "0.5em" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5 }}
                                    className="text-[9px] md:text-xs font-mono text-arcadia-gold uppercase mb-6"
                                >
                                    {content.title}
                                </motion.div>
                                <h2 className="text-4xl md:text-6xl font-serif text-liquid-silver tracking-tighter leading-tight mb-8">Percorso Privato</h2>
                                <p className="text-white/40 mb-10 text-lg font-light leading-relaxed">
                                    {content.description}
                                </p>

                                <ul className="space-y-5 mb-12">
                                    {content.checklist.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-white/60 group/item">
                                            <div className="w-5 h-5 rounded-full border border-arcadia-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-arcadia-gold transition-colors">
                                                <Check size={12} className="text-arcadia-gold" strokeWidth={3} />
                                            </div>
                                            <span className="text-[14px] font-light tracking-wide">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="w-full sm:w-auto scale-90 sm:scale-100 origin-left">
                                        <Button
                                            size="lg"
                                            className="w-full sm:w-auto px-10 h-14 text-base font-bold"
                                            onClick={() => trackEvent("reserved_trial_module_cta_click")}
                                        >
                                            {content.cta} <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </div>
                                    <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">
                                        *Posti Limitati
                                    </p>
                                </div>
                            </div>

                            <div className="md:col-span-5 bg-white/[0.01] p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/[0.03] backdrop-blur-md">
                                <div className="mb-10 p-8 rounded-2xl border border-white/[0.05] bg-black/40 relative overflow-hidden group/status">
                                    <div className="absolute inset-0 bg-gradient-to-br from-arcadia-gold/5 transition-opacity" />
                                    <p className="text-[10px] font-bold text-liquid-gold uppercase tracking-[0.3em] mb-4">Availability Status</p>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "67%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className="h-full bg-arcadia-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                                        />
                                    </div>
                                    <p className="text-[10px] text-white/20 font-mono tracking-wider tabular-nums">Current Occupancy: 67%</p>
                                </div>
                                <div className="relative">
                                    <p className="text-base font-serif text-white/50 leading-relaxed italic">
                                        &quot;Un approccio radicalmente diverso dal rumore del retail trading. Pura logica istituzionale.&quot;
                                    </p>
                                    <div className="w-10 h-[1px] bg-arcadia-gold/20 mt-6" />
                                </div>
                            </div>
                        </div>

                        {/* INTERNAL REFLECTION GLINT */}
                        <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1500ms] pointer-events-none" />
                    </div>
                </div>
            </Container>
        </section>
    );
}
