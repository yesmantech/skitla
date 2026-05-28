import { Container } from "./ui/Container";
import { InfiniteMarquee } from "./ui/InfiniteMarquee";

export function TrustStrip() {
    const logos = [
        "Binance", "Bybit", "BingX", "OKX", "KuCoin", "Kraken", "Coinbase"
    ];

    const logoItems = logos.map((logo) => (
        <div key={logo} className="px-12 group">
            <span className="text-xl md:text-2xl font-serif tracking-[0.2em] text-white/10 group-hover:text-liquid-gold transition-all duration-700 uppercase italic cursor-default select-none">
                {logo}
            </span>
        </div>
    ));

    return (
        <section className="py-24 border-y border-white/[0.03] bg-black overflow-hidden relative">
            {/* ATMOSPHERIC BLOOM — Institutional Gold */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-arcadia-gold/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="mb-16 text-center">
                <p className="text-[9px] font-mono uppercase tracking-[0.5em] text-liquid-silver opacity-40">
                    Institutional Trading Partners
                </p>
            </div>

            <InfiniteMarquee items={logoItems} speed={60} />

            <Container className="mt-20">
                <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto opacity-30">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-arcadia-gold/40 to-transparent" />
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white font-light text-center leading-loose">
                        Disclaimer: Direct Asset Consulting involves strategic risk exposure.
                        Past performance is not indicative of future results.
                        Operate with professional discipline.
                    </p>
                    <div className="flex gap-12 text-[9px] uppercase tracking-[0.4em] text-white/40 font-mono">
                        <span>EST. 2021</span>
                        <span>London • Dubai • SG</span>
                    </div>
                </div>
            </Container>
        </section>
    );
}
