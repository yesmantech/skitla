"use client";

import { Container } from "./ui/Container";
import { motion } from "framer-motion";
import { Badge } from "./ui/Badge";
import { NetworkGraph } from "./ui/NetworkGraph";

export function OfferCards() {
    return (
        <section id="features" className="py-32 bg-black relative overflow-hidden">
            <Container>
                <div className="max-w-3xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 0.4, letterSpacing: "0.5em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="text-[9px] md:text-xs font-mono text-arcadia-gold uppercase mb-5"
                    >
                        Ecosistema Arcadia
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-serif tracking-tighter leading-[1.1] mb-8 pb-4">
                        Una Rete di <br />
                        <span className="text-liquid-silver">Soluzioni Elite</span>
                    </h2>
                    <p className="text-xl text-brand-text-muted leading-relaxed">
                        Non siamo una semplice agenzia. Siamo un hub tecnologico e strategico che collega i migliori talenti alle opportunità globali.
                    </p>
                </div>

                <NetworkGraph />
            </Container>
        </section>
    );
}
