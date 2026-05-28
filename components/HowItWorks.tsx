"use client";

import { Container } from "./ui/Container";
import { motion } from "framer-motion";
import { Badge } from "./ui/Badge";
import { trackEvent } from "@/lib/analytics";

export function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Referral Sign-up",
            description: "Register your account via [REFERRAL_LINK] to link your profile to our community hub."
        },
        {
            number: "02",
            title: "Confirm Deposit",
            description: "Secure your trial by fulfilling the [DEPOSIT_REQUIREMENT_TEXT]. No funds are sent to us."
        },
        {
            number: "03",
            title: "Unlock Access",
            description: "Once verified, you'll receive your Private [CHANNELS] invite and member hub credentials."
        }
    ];

    return (
        <section id="method" className="section-padding relative">
            <Container>
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 0.4, letterSpacing: "0.5em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="text-[9px] md:text-xs font-mono text-arcadia-gold uppercase mb-5"
                    >
                        Il Metodo
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-serif text-liquid-silver tracking-tighter leading-[1.1] pb-2 text-center">
                        Metodologia Arcadia
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    {/* Connection Lines (Desktop) — Pulsing Aura */}
                    <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/20 to-transparent animate-pulse duration-[3000ms]" />

                    {/* Steps — Glass Obsidian Refinement */}
                    {[
                        {
                            step: "01",
                            title: "Identificazione Asset",
                            desc: "Analizziamo i flussi di liquidità globali tramite il nostro ecosistema proprietario per individuare window di opportunità asimmetrica.",
                        },
                        {
                            step: "02",
                            title: "Allocazione Protetta",
                            desc: "Implementiamo protocolli di risk management istituzionali per assicurare che il capitale sia sempre protetto e monitorato.",
                        },
                        {
                            step: "03",
                            title: "Accesso Hub Privato",
                            desc: "Una volta validata l'operatività, ricevi l'accesso diretto ai nostri canali alpha e alle strategie esclusive della community.",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative p-[1px] rounded-2xl overflow-hidden"
                        >
                            {/* Hover Edge Glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-arcadia-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative glass-obsidian p-8 rounded-[15px] h-full flex flex-col items-center text-center overflow-hidden">
                                {/* RAZOR TOP ACCENT */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/40 to-transparent group-hover:via-arcadia-gold transition-all duration-700" />

                                <div className="w-16 h-16 rounded-full border border-arcadia-gold/20 flex items-center justify-center mb-8 relative z-10 group-hover:border-arcadia-gold/40 transition-all duration-500 bg-white/[0.02]">
                                    <span className="text-xl font-serif text-liquid-gold">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-serif text-liquid-silver mb-4 uppercase tracking-wider">{item.title}</h3>
                                <p className="text-[13px] text-white/40 leading-relaxed tracking-wide font-light">{item.desc}</p>

                                {/* SHIMMER GLINT */}
                                <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.015] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1500ms] pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
