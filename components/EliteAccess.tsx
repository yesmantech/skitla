"use client";

import { motion } from "framer-motion";
import { Container } from "./ui/Container";
import { Check, ArrowRight } from "lucide-react"; // Added ArrowRight
import { CornerBrackets } from "./ui/CornerBrackets";

/* ──────────────────────────────────────────────
   CARD DATA
   ────────────────────────────────────────────── */

interface PricingCard {
    eyebrow: string;
    title: string;
    price: string;
    priceSuffix?: string;
    badge?: string;
    description: string;
    trustLine?: string;
    entryLine?: string;
    benefits: string[];
    cta: string;
    microcopy: string;
    featured?: boolean;
}

const cards: PricingCard[] = [
    {
        eyebrow: "COPY TRADING",
        title: "Copy Trading Passivo",
        price: "GRATIS",
        badge: "Paghi solo se guadagni",
        description:
            "Copia automaticamente le operazioni di Skitla13 e punta a risultati in modo passivo.",
        trustLine:
            "Skitla13 guadagna solo se guadagni anche tu (fee: 10% dei profitti).",
        entryLine:
            "Nessun costo di ingresso. Solo deposito minimo: 200€.",
        benefits: [
            "Copia automatica delle operazioni",
            "Settaggi di rischio personalizzabili",
            "Aggiornamenti operativi e gestione posizioni",
            "Supporto onboarding per configurazione",
            "Pausa / stop in qualsiasi momento",
            "Accesso canale aggiornamenti essenziale",
        ],
        cta: "Attiva Copy Trading",
        microcopy: "Richiede solo deposito minimo. Nessun abbonamento.",
    },
    {
        eyebrow: "MEMBERSHIP",
        title: "Premium Annual",
        price: "€1.497",
        priceSuffix: "/ anno",
        description:
            "Formazione, supporto e community per chi vuole un metodo serio e costante.",
        benefits: [
            "Formazione completa (da 0 a 100)",
            "Supporto VIP 7/7 in chatroom riservata",
            "Segnali e update operativi",
            "Analisi strategiche BTC & Altcoin",
            "Supporto tecnico (exchange, wallet, strumenti)",
            "Community d'élite (chat + vocal room)",
            "Accesso a sala segnali VIP",
        ],
        cta: "Unisciti al Premium",
        microcopy: "Accesso immediato a contenuti e community.",
        // featured removed
    },
    {
        eyebrow: "MEMBERSHIP",
        title: "Premium Lifetime",
        price: "€4.997",
        priceSuffix: "una tantum",
        badge: "Best value",
        description:
            "Tutto il Premium, per sempre. Ideale se vuoi bloccare l'accesso nel tempo.",
        benefits: [
            "Tutto il Premium Annual",
            "Accesso lifetime a formazione e aggiornamenti",
            "Priorità nel supporto",
            "Nuovi contenuti futuri inclusi",
            "Accesso completo alla community",
        ],
        cta: "Sblocca Lifetime",
        microcopy: "Un pagamento, accesso per sempre.",
        featured: true, // Now featured (Gold)
    },
];

/* ──────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────── */

export function EliteAccess() {
    return (
        <section id="pricing" className="relative py-8 lg:py-12 bg-black overflow-hidden">
            {/* Atmospheric bloom */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-arcadia-gold/5 blur-[120px] rounded-full pointer-events-none opacity-20" />

            <Container>
                {/* HEADER — Tier S pattern */}
                <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 0.4, letterSpacing: "0.5em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="text-[9px] md:text-xs font-mono text-arcadia-gold uppercase mb-5"
                    >
                        Membership
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-8xl font-serif text-liquid-silver tracking-tighter leading-[1.1] pb-2"
                    >
                        Elite <span className="text-liquid-gold italic">Access</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto mt-5"
                    >
                        Scegli tra copy trading passivo gratuito o membership premium con formazione e supporto completo.
                    </motion.p>
                </div>

                {/* CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 relative z-10 items-stretch">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: i * 0.12,
                                duration: 1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="group relative flex flex-col"
                        >
                            {/* Outer wrapper for gradient border effect */}
                            <div className={`
                                relative flex flex-col flex-1 p-[1px] rounded-[20px] overflow-hidden
                                transition-all duration-700
                                ${card.featured
                                    ? "bg-gradient-to-b from-arcadia-gold/40 via-arcadia-gold/20 to-transparent" // Stronger gold for lifetime
                                    : "bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent group-hover:from-arcadia-gold/20 group-hover:via-arcadia-gold/[0.06]"
                                }
                            `}>
                                {/* Inner glass-obsidian card */}
                                <div className="relative flex flex-col flex-1 p-5 md:p-8 lg:p-10 rounded-[19px] glass-obsidian overflow-hidden">
                                    {/* RAZOR-SHARP TOP ACCENT (Tier S Metallic Shine) */}
                                    <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${card.featured ? "via-arcadia-gold/80" : "via-arcadia-gold/20"} to-transparent group-hover:via-arcadia-gold transition-all duration-700 z-10`} />

                                    {/* Corner Brackets */}
                                    <div className="absolute inset-4 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity duration-700 z-10">
                                        <CornerBrackets strokeWidth={1} size={10} color="#D9B162" />
                                    </div>

                                    {/* Atmospheric Bloom inside card */}
                                    {card.featured && (
                                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-arcadia-gold/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-arcadia-gold/20 transition-colors duration-700" />
                                    )}

                                    {/* Eyebrow */}
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-arcadia-gold/40 mb-4 font-mono">
                                        {card.eyebrow}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-xl md:text-2xl font-serif text-liquid-silver tracking-tight mb-4 md:mb-6 group-hover:text-white transition-colors duration-500">
                                        {card.title}
                                    </h3>

                                    {/* Price block */}
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span
                                            className={`text-5xl lg:text-6xl font-light tracking-tight ${card.featured
                                                ? "text-liquid-gold"
                                                : "text-liquid-silver"
                                                }`}
                                        >
                                            {card.price}
                                        </span>
                                        {card.priceSuffix && (
                                            <span className="text-white/25 text-xs uppercase tracking-widest font-light font-mono">
                                                {card.priceSuffix}
                                            </span>
                                        )}
                                    </div>

                                    {/* Badge pill */}
                                    {card.badge && (
                                        <div className="inline-flex self-start mb-5">
                                            <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-arcadia-gold bg-arcadia-gold/10 border border-arcadia-gold/20 rounded-full px-3 py-1 font-mono">
                                                {card.badge}
                                            </span>
                                        </div>
                                    )}

                                    {/* Description */}
                                    <p className="text-[13px] md:text-[14px] text-white/40 leading-relaxed font-light tracking-[0.04em] mb-5">
                                        {card.description}
                                    </p>

                                    {/* Trust line */}
                                    {card.trustLine && (
                                        <p className="text-arcadia-gold/50 text-[12px] leading-relaxed font-light mb-2 italic tracking-[0.04em]">
                                            {card.trustLine}
                                        </p>
                                    )}

                                    {/* Entry requirement */}
                                    {card.entryLine && (
                                        <p className="text-white/25 text-[12px] leading-relaxed font-light mb-5 tracking-[0.04em]">
                                            {card.entryLine}
                                        </p>
                                    )}

                                    {/* Divider — gradient style */}
                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/10 to-transparent my-5" />

                                    {/* Benefits */}
                                    <ul className="space-y-3 mb-6 md:mb-8 flex-1">
                                        {card.benefits.map((b, j) => (
                                            <li
                                                key={j}
                                                className="flex items-start gap-3 text-[12px] text-white/40 font-light tracking-[0.04em]"
                                            >
                                                <div className="w-4 h-4 rounded-full border border-arcadia-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-2.5 h-2.5 icon-gold" strokeWidth={2.5} />
                                                </div>
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA — HERO STYLE (identical to HeroCTA) */}
                                    <div
                                        className="hero-cta-tier-s relative"
                                        style={{ display: "flex", width: "100%" }}
                                    >
                                        {/* Animated Rotating Border */}
                                        <span className="hero-cta-border" aria-hidden="true" />

                                        {/* Inner Glass Surface */}
                                        <span
                                            className="hero-cta-surface"
                                            style={{ width: "100%", justifyContent: "center" }}
                                        >
                                            {/* Shimmer Sweep */}
                                            <span className="hero-cta-shimmer" aria-hidden="true" />

                                            {/* Text */}
                                            <span className="hero-cta-text">
                                                {card.cta}
                                            </span>

                                            {/* Arrow */}
                                            <span className="hero-cta-arrow">
                                                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                                            </span>
                                        </span>

                                        {/* Breathing Glow (underneath) */}
                                        <span className="hero-cta-glow" aria-hidden="true" />
                                    </div>

                                    {/* Microcopy */}
                                    <p className="text-center text-[10px] text-white/20 mt-3 font-light tracking-[0.04em]">
                                        {card.microcopy}
                                    </p>

                                    {/* INTERNAL REFLECTION GLINT (Tier S Shimmer) */}
                                    <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1200ms] pointer-events-none" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* DISCLAIMER */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-[10px] text-white/15 mt-10 lg:mt-12 font-light tracking-wide max-w-2xl mx-auto relative z-10"
                >
                    Il trading comporta rischio. I risultati passati non garantiscono risultati futuri. Nessuna promessa di profitto.
                </motion.p>
            </Container>
        </section>
    );
}
