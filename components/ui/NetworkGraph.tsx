"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Container } from "./Container";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

const LOCATIONS = [
    { name: "Dubai", top: "25%", left: "65%" },
    { name: "London", top: "35%", left: "45%" },
    { name: "New York", top: "45%", left: "25%" },
    { name: "Singapore", top: "55%", left: "75%" },
    { name: "Sydney", top: "70%", left: "80%" },
];

export function NetworkGraph() {
    return (
        <section id="network" className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden py-32">
            <Container className="relative z-10 text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-medium text-white mb-6 tracking-tighter uppercase italic">
                    The Global <span className="text-arcadia-gold">Network</span>
                </h2>
                <p className="text-white/40 max-w-xl mx-auto text-[10px] uppercase tracking-[0.4em] font-light">
                    Direct access to prime digital inventory across all major financial nodes.
                </p>
            </Container>

            <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center">
                {/* 2.5D Glass Orb (High Performance Alternative to WebGL) */}
                <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full">
                    {/* Layered Glows */}
                    <div className="absolute inset-0 rounded-full bg-arcadia-gold/5 blur-[80px]" />
                    <div className="absolute inset-4 rounded-full border border-arcadia-gold/10 shadow-[inset_0_0_50px_rgba(217,177,98,0.1)]" />

                    {/* Inner Content (The Hub) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-arcadia-gold/10 rounded-full blur-[20px] animate-pulse" />
                    </div>
                </div>

                {/* Floating AR Labels */}
                <div className="absolute inset-0 pointer-events-none">
                    {LOCATIONS.map((loc, i) => (
                        <motion.div
                            key={loc.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.6, scale: 1 }}
                            transition={{ delay: i * 0.2 + 0.5, duration: 1 }}
                            className="absolute flex items-center gap-3"
                            style={{ top: loc.top, left: loc.left }}
                        >
                            <div className="w-1.5 h-1.5 bg-[#D9B162] rounded-full shadow-[0_0_10px_#D9B162]" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em] whitespace-nowrap">
                                {loc.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
