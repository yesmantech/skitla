"use client";

import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { motion } from "framer-motion";

export function FinalCTA() {
    return (
        <section className="py-28 relative overflow-hidden flex items-center justify-center">
            {/* Arcadia Background Effects */}
            <div className="absolute inset-0 bg-brand-background">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 blur-[100px] rounded-full opacity-30" />
            </div>

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl mx-auto text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 0.4, letterSpacing: "0.5em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="text-[9px] md:text-xs font-mono text-arcadia-gold uppercase mb-8"
                    >
                        Il Tuo Momento
                    </motion.div>

                    <h2 className="text-6xl md:text-9xl font-serif text-liquid-silver tracking-tighter leading-[0.9] mb-12">
                        Pronto a Passare <br />
                        <span className="text-liquid-gold italic">all'Eccellenza?</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-white/40 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
                        Unisciti oggi a centinaia di trader che hanno scelto di operare con la logica istituzionale di Skitla.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 px-4">
                        <Button
                            size="lg"
                            className="h-[72px] px-14 text-lg font-bold w-full sm:w-auto shadow-[0_20px_40px_-15px_rgba(212,175,55,0.3)]"
                            onClick={() => trackEvent("final_cta_click")}
                        >
                            Inizia Ora <ArrowRight className="ml-3 w-6 h-6" />
                        </Button>
                        <button className="h-[72px] px-14 text-sm font-mono tracking-[0.3em] uppercase text-white/30 hover:text-white transition-colors">
                            Vedi Performance
                        </button>
                    </div>

                    <div className="mt-20 flex flex-col items-center opacity-20">
                        <div className="w-16 h-[1px] bg-arcadia-gold/40 mb-6" />
                        <p className="text-[10px] text-white uppercase tracking-[0.4em] font-mono">
                            The Elite Standard in Digital Asset Consulting
                        </p>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
