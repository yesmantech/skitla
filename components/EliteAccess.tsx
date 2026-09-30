
"use client";

import { motion } from "framer-motion";
import { Container } from "./ui/Container";
import { Check } from "lucide-react";
import { CornerBrackets } from "./ui/CornerBrackets";
import { HeroCTA } from "./ui/HeroCTA";
import { CopyTradingGraphic } from "./ui/CopyTradingGraphic";

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
    href?: string;
}

const cards: PricingCard[] = [
    {
        "eyebrow": "SKITLA GOLD",
        "title": "Scalping & Sniper",
        "price": "Due sale",
        "badge": "Copy trading FPG in arrivo",
        "description": "Due approcci al Gold, una community da esplorare. Scopri SKITLA scalping XAU e SKITLA sniper XAU e scegli quali idee seguire secondo il tuo piano.",
        "trustLine": "Le sale pubblicano segnali: oggi le operazioni sono eseguite da te. Il copy trading FPG non è ancora attivo.",
        "entryLine": "Accesso privato: referral FPG, KYC e almeno 300€ o equivalente USD accreditati sul tuo conto.",
        "benefits": [
            "Due sale dedicate al Gold",
            "Ingressi, target e stop nei setup",
            "Aggiornamenti e riepiloghi delle idee",
            "Richiesta tramite il bot ufficiale",
            "Verifica manuale dei requisiti",
            "Gestione del rischio complessivo tra le sale"
        ],
        "cta": "Scopri le sale Gold",
        "href": "https://t.me/SkitlaSalaSegnaliBot?start=gold",
        "microcopy": "Il deposito è capitale sul tuo conto, non una quota SKITLA. Possibili commissioni di affiliazione. Il trading comporta rischio."
    },
    {
        "eyebrow": "MEMBERSHIP",
        "title": "Premium Mensile",
        "price": "",
        "description": "Accesso alla mia operatività e alla community: scopri contenuti, modalità e condizioni prima di aderire.",
        "benefits": [
            "Segnali su crypto, indici e commodities",
            "Setup con ingressi, target e gestione del rischio",
            "Aggiornamenti durante le fasi di mercato",
            "Sessioni live e vocal room",
            "Insight e confronto nella community"
        ],
        "cta": "Richiedi informazioni",
        "href": "https://t.me/SKITLAService",
        "microcopy": "Contatta il supporto per disponibilità e condizioni."
    },
    {
        "eyebrow": "MEMBERSHIP",
        "title": "Premium Annual",
        "price": "",
        "description": "Un percorso annuale nella community SKITLA. Richiedi i dettagli del piano e valuta le condizioni prima di aderire.",
        "benefits": [
            "Contenuti del Premium Mensile",
            "Percorso annuale nella community",
            "Supporto dedicato",
            "Aggiornamenti sui contenuti disponibili",
            "Confronto con la community"
        ],
        "cta": "Scopri il piano annuale",
        "href": "https://t.me/SKITLAService",
        "microcopy": "Condizioni comunicate prima dell’adesione.",
        "featured": true
    }
];

/* ──────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────── */

export function EliteAccess() {
    const copyTradingCard = cards[0];
    const membershipCards = cards.slice(1);

    const renderCard = (card: PricingCard, i: number) => (
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
            className="group relative flex flex-col h-full"
        >
            {/* Outer wrapper for gradient border effect */}
            <div className={`
                relative flex flex-col flex-1 p-[1px] rounded-[20px] overflow-hidden
                transition-all duration-700
                ${card.featured
                    ? "bg-gradient-to-b from-arcadia-gold/40 via-arcadia-gold/20 to-transparent"
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
                    <h3 className="text-xl md:text-2xl font-serif text-liquid-silver tracking-tight pb-1 mb-3 md:mb-5 group-hover:text-white transition-colors duration-500">
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

                    {/* CTA — HERO STYLE */}
                    <div className="w-full flex justify-center">
                        <HeroCTA
                            label={card.cta}
                            href={card.href}
                            className="w-full max-w-[280px]"
                            interactive={false}
                        />
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
    );

    return (
        <section id="pricing" className="relative py-8 lg:py-16 bg-black overflow-hidden">
            {/* Atmospheric bloom */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-arcadia-gold/5 blur-[120px] rounded-full pointer-events-none opacity-20" />

            <Container className="relative z-10">
                {/* MAIN HEADER */}
                <div className="text-center mb-10 lg:mb-16 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 0.4, letterSpacing: "0.5em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="text-[9px] md:text-xs font-mono text-arcadia-gold uppercase mb-5"
                    >
                        Ecosistema
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
                        Scopri le due sale Gold e le membership SKITLA. Il copy trading FPG è in arrivo.
                    </motion.p>
                </div>

                {/* ── DESKTOP / TABLET (lg+): Side-by-side ── */}
                <div className="hidden lg:grid grid-cols-12 gap-10 mb-24 items-stretch">
                    {/* Left: Graphic */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="w-full h-full lg:col-span-7 flex flex-col"
                    >
                        <p className="text-center text-sm text-arcadia-gold mb-4">Copy trading FPG · In arrivo · Illustrazione del servizio futuro</p><CopyTradingGraphic />
                    </motion.div>

                    {/* Right: Copy Trading Card */}
                    <div className="w-full h-full flex flex-col justify-center lg:col-span-5">
                        {renderCard(copyTradingCard, 0)}
                    </div>
                </div>

                {/* ── MOBILE (below lg): Nested card ── */}
                <div className="lg:hidden mb-16 flex justify-center w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative flex flex-col w-full max-w-[500px]"
                    >
                        {/* Outer wrapper for gradient border effect */}
                        <div className={`
                            relative flex flex-col p-[1px] rounded-[24px] overflow-hidden
                            transition-all duration-700
                            ${copyTradingCard.featured
                                ? "bg-gradient-to-b from-arcadia-gold/40 via-arcadia-gold/20 to-transparent"
                                : "bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent group-hover:from-arcadia-gold/20 group-hover:via-arcadia-gold/[0.06]"
                            }
                        `}>
                            {/* Inner glass-obsidian card */}
                            <div className="relative flex flex-col p-5 md:p-8 rounded-[23px] glass-obsidian overflow-hidden">
                                {/* RAZOR-SHARP TOP ACCENT */}
                                <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${copyTradingCard.featured ? "via-arcadia-gold/80" : "via-arcadia-gold/20"} to-transparent group-hover:via-arcadia-gold transition-all duration-700 z-10`} />

                                {/* Corner Brackets */}
                                <div className="absolute inset-4 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity duration-700 z-10">
                                    <CornerBrackets strokeWidth={1} size={10} color="#D9B162" />
                                </div>

                                {/* ── TOP: Card info ── */}
                                <div className="z-10 w-full mb-2">
                                    <span className="block text-[9px] font-bold uppercase tracking-[0.4em] text-arcadia-gold/40 mb-3 font-mono">
                                        {copyTradingCard.eyebrow}
                                    </span>
                                    <h3 className="text-xl font-serif text-liquid-silver tracking-tight pb-1 mb-2 group-hover:text-white transition-colors duration-500">
                                        {copyTradingCard.title}
                                    </h3>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-5xl font-light tracking-tight text-liquid-silver">
                                            {copyTradingCard.price}
                                        </span>
                                    </div>
                                    {copyTradingCard.badge && (
                                        <div className="inline-flex">
                                            <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-arcadia-gold bg-arcadia-gold/10 border border-arcadia-gold/20 rounded-full px-3 py-1 font-mono">
                                                {copyTradingCard.badge}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* ── MIDDLE: Embedded Graphic ── */}
                                <div className="w-full h-[240px] md:h-[340px] mb-3 z-10 border border-white/[0.05] rounded-[14px] bg-[#020202] overflow-hidden relative shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]">
                                    <p className="text-center text-xs text-arcadia-gold mb-2">Copy trading FPG · In arrivo</p><CopyTradingGraphic isMobile />
                                </div>

                                {/* ── Description (below graphic on mobile) ── */}
                                <div className="z-10 w-full mb-3">
                                    <p className="text-[13px] text-white/40 leading-relaxed font-light tracking-[0.04em]">
                                        {copyTradingCard.description}
                                    </p>
                                    {copyTradingCard.trustLine && (
                                        <p className="text-arcadia-gold/50 text-[12px] leading-relaxed font-light mt-2 mb-1 italic tracking-[0.04em]">
                                            {copyTradingCard.trustLine}
                                        </p>
                                    )}
                                    {copyTradingCard.entryLine && (
                                        <p className="text-white/25 text-[12px] leading-relaxed font-light tracking-[0.04em]">
                                            {copyTradingCard.entryLine}
                                        </p>
                                    )}
                                </div>

                                {/* ── BOTTOM: Benefits + CTA ── */}
                                <div className="z-10 w-full">
                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/10 to-transparent mb-3" />
                                    <ul className="space-y-2 mb-4">
                                        {copyTradingCard.benefits.map((b, j) => (
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

                                    <div className="w-full flex justify-center">
                                        <HeroCTA
                                            label={copyTradingCard.cta}
                                            href={copyTradingCard.href}
                                            className="w-full max-w-[280px]"
                                            interactive={false}
                                        />
                                    </div>
                                    <p className="text-center text-[10px] text-white/20 mt-3 font-light tracking-[0.04em]">
                                        {copyTradingCard.microcopy}
                                    </p>
                                </div>

                                {/* INTERNAL REFLECTION GLINT */}
                                <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1200ms] pointer-events-none" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16 lg:mb-24" />

                {/* SECTION 2: MEMBERSHIPS */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-4xl font-serif text-liquid-silver tracking-tight mb-6">
                            Membership <span className="text-liquid-gold italic">Private</span>
                        </h3>
                        <div className="max-w-2xl mx-auto space-y-4 text-white/50 text-[14px] md:text-[15px] leading-relaxed font-light tracking-[0.02em]">
                            <p>
                                <span className="text-white/80 font-normal">Se sei qui, sai già il livello delle analisi e delle previsioni che porto ogni giorno sul mercato.</span> Dalla previsione del top di Bitcoin in area 124.500, fino all'individuazione del bottom in area 60.350, il valore è sempre stato uno: <strong className="text-liquid-gold font-normal italic">anticipare il mercato, non inseguirlo.</strong>
                            </p>
                            <p>
                                <span className="text-white/80 font-normal">ELITE nasce per questo.</span> È l'accesso diretto alla mia operatività. Un ambiente riservato a chi vuole stare dentro al flusso reale del mercato, con riferimenti chiari, senza distrazioni e senza contenuti inutili.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                        {membershipCards.map((card, i) => renderCard(card, i + 1))}
                    </div>
                </div>

                {/* DISCLAIMER */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-[10px] text-white/15 mt-16 lg:mt-24 font-light tracking-wide max-w-2xl mx-auto relative z-10"
                >
                    Il trading comporta rischio. I risultati passati non garantiscono risultati futuri. Nessuna promessa di profitto.
                </motion.p>
            </Container>
        </section>
    );
}

