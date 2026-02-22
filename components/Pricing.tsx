"use client";

import { Container } from "./ui/Container";
import { CopyVariant } from "@/content/copy";
import { motion } from "framer-motion";

export function Pricing({ content }: { content: CopyVariant["pricing"] }) {
    return (
        <section id="pricing" className="section-padding bg-black relative">
            <Container>
                <div className="text-center mb-24 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-medium text-liquid-silver mb-8 uppercase italic tracking-tighter">
                        Elite <span className="text-arcadia-gold">Access</span>
                    </h2>
                    <p className="text-white/40 uppercase text-[10px] tracking-[0.4em] font-light">
                        Selective membership for ambitious digital asset ventures.
                    </p>
                </div>

                <div className="max-w-xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="card-arcadia p-12 flex flex-col items-center text-center group min-h-[500px] w-full"
                    >
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/40 group-hover:text-brand-primary transition-colors mb-12">
                            {content.planName}
                        </h3>
                        <div className="flex items-baseline gap-2 mb-12">
                            <span className="text-6xl font-light text-white italic">{content.price}</span>
                            <span className="text-white/20 text-[10px] uppercase tracking-widest">{content.period}</span>
                        </div>
                        <ul className="space-y-6 mb-16 text-[10px] uppercase tracking-[0.25em] text-white/40 font-light">
                            {content.features.map((feature: string, j: number) => (
                                <li key={j} className="flex items-center justify-center gap-3">
                                    <div className="w-1 h-1 bg-brand-primary/40 rounded-full" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className="btn-arcadia w-full mt-auto">
                            Apply for Access
                        </button>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
