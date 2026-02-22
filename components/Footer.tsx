"use client";

import { Container } from "./ui/Container";

export function Footer() {
    return (
        <footer className="py-20 border-t border-white/5 bg-black relative">
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,177,98,0.05)_0%,transparent_50%)] pointer-events-none" />

            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
                    <div className="md:col-span-2">
                        <div className="text-2xl font-black italic tracking-tighter mb-6 text-arcadia-gold uppercase">
                            Skitla
                        </div>
                        <p className="text-brand-text-muted text-sm leading-relaxed max-w-xs font-light">
                            L&apos;hub definitivo per trader che cercano l&apos;eccellenza attraverso la logica istituzionale e la community.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Link Rapidi</h4>
                        <ul className="space-y-4 text-sm text-brand-text-muted font-light">
                            <li><a href="#" className="hover:text-brand-primary transition-colors hover:translate-x-1 inline-block duration-300">Performance</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors hover:translate-x-1 inline-block duration-300">Strategie</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors hover:translate-x-1 inline-block duration-300">FAQ</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors hover:translate-x-1 inline-block duration-300">Supporto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Legale</h4>
                        <ul className="space-y-4 text-sm text-brand-text-muted font-light">
                            <li><a href="#" className="hover:text-brand-primary transition-colors hover:translate-x-1 inline-block duration-300">Termini e Condizioni</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors hover:translate-x-1 inline-block duration-300">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors hover:translate-x-1 inline-block duration-300">Dichiarazione sui Rischi</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-brand-text-muted uppercase tracking-[0.2em]">
                    <p>© {new Date().getFullYear()} Skitla. Tutti i diritti riservati.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors hover:scale-110 duration-300">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors hover:scale-110 duration-300">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors hover:scale-110 duration-300">Discord</a>
                    </div>
                </div>

                <div className="mt-12 text-[9px] text-brand-text-muted/40 text-center leading-relaxed uppercase tracking-tighter max-w-5xl mx-auto pt-8">
                    DISCLOSURE: Il trading sul margine comporta un alto livello di rischio e potrebbe non essere adatto a tutti gli investitori.
                    L&apos;elevato grado di leva finanziaria può operare sia a tuo favore che contro di te.
                    Prima di decidere di investire, dovresti considerare attentamente i tuoi obiettivi di investimento, il livello di esperienza e l&apos;appetito per il rischio.
                </div>
            </Container>
        </footer>
    );
}
