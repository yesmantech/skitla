"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { MorphingArtifact } from "./archive/MorphingArtifact";

const features = [
    {
        id: "01",
        title: "Intelligence",
        subtitle: "Global Premarket Analysis",
        desc: "Ogni mattina processiamo milioni di data point volumetrici. Ti consegniamo solo l'alpha puro: livelli istituzionali e bias direzionale.",
    },
    {
        id: "02",
        title: "Edge",
        subtitle: "Proprietary Strategies",
        desc: "Non segnali, ma sistemi. Accedi ai setup proprietari Skitla, codificati da anni di backtest e validati su desk reali.",
    },
    {
        id: "03",
        title: "Network",
        subtitle: "The Private Hub",
        desc: "Sei la media delle 5 persone che frequenti. Entra in una war room composta da fund manager, quant developer e trader professionisti.",
    },
    {
        id: "04",
        title: "Execution",
        subtitle: "Live Market Access",
        desc: "La teoria finisce quando apre il mercato. Opera in diretta con noi durante le sessioni di Londra e New York. Vedere per credere.",
    }
];

export function GoldenArchive() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });

    return (
        <div ref={containerRef} className="relative w-full bg-[#050505] font-serif selection:bg-arcadia-gold/30 selection:text-black">

            {/* PROGRESS BAR (LEFT) */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 h-[40vh] w-[2px] bg-white/5 z-50 hidden md:block rounded-full">
                <motion.div
                    className="w-full bg-arcadia-gold rounded-full"
                    style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                />
            </div>

            {/* STICKY VISUAL ANCHOR (CENTER) */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
                {/* The Morphing Artifact */}
                <div className="scale-75 md:scale-100">
                    <MorphingArtifact progress={smoothProgress} />
                </div>

                {/* Cinematic Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] opacity-60" />

                {/* Film Grain */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
                    style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="relative z-10 -mt-[100vh]">
                <div className="h-[20vh]" /> {/* Intro Spacer */}

                {features.map((feature, i) => (
                    <FeatureSection key={i} feature={feature} index={i} />
                ))}

                <div className="h-[20vh]" /> {/* Outro Spacer */}
            </div>
        </div>
    );
}

function FeatureSection({ feature, index }: { feature: any, index: number }) {
    return (
        <div className="h-[120vh] w-full flex items-center justify-center pointer-events-none sticky top-0">
            <motion.div
                initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -100, filter: "blur(20px)" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl text-center p-12 pointer-events-auto"
            >
                {/* Chapter Number */}
                <div className="overflow-hidden mb-6 flex justify-center">
                    <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: "0%" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="block text-arcadia-gold font-mono text-xs md:text-sm tracking-[0.6em] uppercase"
                    >
                        Chapter 0{index + 1}
                    </motion.span>
                </div>

                {/* Title (Staggered Reveal) */}
                <div className="overflow-hidden mb-8">
                    <motion.h3
                        initial={{ y: "150%" }}
                        whileInView={{ y: "0%" }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-9xl text-white font-medium tracking-tight leading-[0.9] mix-blend-difference"
                    >
                        {feature.title}
                    </motion.h3>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-arcadia-gold/80 text-lg md:text-2xl font-serif italic mb-6"
                >
                    {feature.subtitle}
                </motion.p>

                {/* Desc */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mx-auto max-w-lg text-zinc-500 text-sm md:text-base font-sans leading-relaxed"
                >
                    {feature.desc}
                </motion.p>
            </motion.div>
        </div>
    )
}
