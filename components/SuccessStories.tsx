"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CornerBrackets } from "./ui/CornerBrackets";

// Generate paths for the 42 real feedback images
const generateImagePaths = (): string[] => {
    const paths: string[] = [];
    for (let i = 1; i <= 42; i++) {
        const imgNum = 6550 + i;
        paths.push(`/feedbacks/IMG_${imgNum}.JPG`);
    }
    return paths;
};

const allImagePaths = generateImagePaths();

// Distribute 42 images into 3 columns
const column1 = allImagePaths.slice(0, 14);
const column2 = allImagePaths.slice(14, 28);
const column3 = allImagePaths.slice(28, 42);

export function SuccessStories() {
    return (
        <section id="success" className="relative w-full py-16 lg:py-24 bg-black overflow-hidden">
            {/* ATMOSPHERIC BLOOMS (Tier-S Depth) */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-arcadia-gold/5 blur-[120px] rounded-full pointer-events-none opacity-20 -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-arcadia-gold/[0.03] blur-[100px] rounded-full pointer-events-none opacity-30 translate-y-1/2 -translate-x-1/4" />

            <div className="max-w-7xl mx-auto px-6 mb-24 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 0.4, letterSpacing: "0.5em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="text-[9px] md:text-xs font-mono text-arcadia-gold uppercase mb-5"
                    >
                        Wall of Success
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-serif text-liquid-silver tracking-tighter leading-[1.1] mb-8 pb-4">
                        Risultati <span className="text-liquid-gold">Reali</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-white/40 text-lg md:text-xl font-light tracking-wide">
                        Risultati reali, community reale. Guarda cosa dicono i nostri membri su Skitla.
                    </p>
                </motion.div>
            </div>

            {/* The Social Wall Container - DESKTOP/TABLET (Vertical) */}
            <div className="relative h-[1000px] md:h-[1400px] w-full overflow-hidden hidden md:flex">
                <div className="flex w-full gap-8 justify-center px-4">

                    {/* COLUMN 1: Upwards */}
                    <div className="flex-1 max-w-[400px]">
                        <ScrollingColumn items={[...column1, ...column1]} speed={90} direction="up" />
                    </div>

                    {/* COLUMN 2: Downwards */}
                    <div className="flex-1 max-w-[400px]">
                        <ScrollingColumn items={[...column2, ...column2]} speed={110} direction="down" />
                    </div>

                    {/* COLUMN 3: Upwards (Hidden on small screens) */}
                    <div className="flex-1 max-w-[400px] hidden lg:block">
                        <ScrollingColumn items={[...column3, ...column3]} speed={100} direction="up" />
                    </div>

                </div>

                {/* Performance-First Fade Overlays */}
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-black/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
            </div>

            {/* MOBILE HORIZONTAL SLIDER */}
            <div className="md:hidden relative w-full overflow-hidden py-12">
                <div className="flex w-max gap-5 animate-scroll-left">
                    {[...column1, ...column2, ...column3, ...column1, ...column2, ...column3].map((path, i) => (
                        <div key={i} className="w-[320px] flex-shrink-0">
                            <FeedbackCard path={path} />
                        </div>
                    ))}
                </div>
                {/* Horizontal Fade Overlays */}
                <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
            </div>

            <style jsx global>{`
                @keyframes scroll-up {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-50%); }
                }
                @keyframes scroll-down {
                  0% { transform: translateY(-50%); }
                  100% { transform: translateY(0); }
                }
                @keyframes scroll-left {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-scroll-up {
                  animation: scroll-up var(--speed, 40s) linear infinite;
                }
                .animate-scroll-down {
                  animation: scroll-down var(--speed, 40s) linear infinite;
                }
                .animate-scroll-left {
                  animation: scroll-left 80s linear infinite;
                }
            `}</style>
        </section>
    );
}

function FeedbackCard({ path }: { path: string }) {
    return (
        <div className="relative group p-[1px] rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] cursor-pointer">
            {/* Hover Glow Border - INCREASED INTENSITY */}
            <div className="absolute inset-0 bg-gradient-to-b from-arcadia-gold/40 via-arcadia-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative glass-obsidian rounded-[15px] overflow-hidden border border-white/[0.05] shadow-2xl transition-all duration-700 group-hover:border-arcadia-gold/40">
                {/* PERMANENT SUBTLE GOLD PROFILE (defines the card) */}
                <div className="absolute inset-0 border border-arcadia-gold/[0.05] rounded-[15px] pointer-events-none" />

                {/* RAZOR-SHARP TOP ACCENT - INCREASED OPACITY */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-arcadia-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 z-10" />

                {/* Corner Brackets (Tier-S marker) - INCREASED VISIBILITY */}
                <div className="absolute inset-3 pointer-events-none opacity-10 group-hover:opacity-60 transition-opacity duration-700 z-10">
                    <CornerBrackets strokeWidth={1.5} size={12} color="#D9B162" />
                </div>

                {/* Optimization: next/image */}
                <div className="relative w-full h-auto min-h-[200px] flex items-center justify-center bg-zinc-950/50">
                    <Image
                        src={path}
                        alt="Skitla Success Feedback"
                        width={400}
                        height={600}
                        className="w-full h-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                    />

                    {/* Shadow Bottom Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
                </div>

                {/* Internal Reflection Glint (Tier-S) - SHARPER AND MORE VISIBLE */}
                <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1500ms] pointer-events-none" />

                {/* Border Inner Glow */}
                <div className="absolute inset-0 rounded-[15px] border border-white/[0.02] pointer-events-none" />
            </div>
        </div>
    );
}

function ScrollingColumn({ items, speed, direction }: { items: string[], speed: number, direction: 'up' | 'down' }) {
    return (
        <div
            className={`flex flex-col gap-8 will-change-transform transform-gpu ${direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'}`}
            style={{ '--speed': `${speed}s` } as React.CSSProperties}
        >
            {items.map((path, i) => (
                <FeedbackCard key={i} path={path} />
            ))}
        </div>
    );
}
