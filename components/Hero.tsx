"use client";

import { Container } from "./ui/Container";
import { CopyVariant } from "@/content/copy";
import { HeroCTA } from "./ui/HeroCTA";
import { Starfield } from "./ui/Starfield";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TextReveal } from "./ui/TextReveal";

const SkitlaLogo = dynamic(() => import("./ui/SkitlaLogo"), { ssr: false });

export function Hero({ content }: { content: CopyVariant["hero"] }) {
    return (
        <section id="home" className="relative min-h-svh w-full flex flex-col items-center justify-center bg-black overflow-hidden">
            <Starfield />

            <div className="relative z-10 w-full max-w-[1400px] px-6 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left pt-24 lg:pt-32 pb-12 md:pb-32 lg:h-svh">
                {/* TYPOGRAPHY - Left on Desktop */}
                <div className="flex flex-col items-center lg:items-start z-20 w-full lg:w-[55%] mb-10 lg:mb-0 lg:pr-10">
                    <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-medium leading-[1.05] md:leading-[1.05] tracking-tight mb-6 md:mb-8 w-full max-w-full break-words pb-4">
                        <span className="block text-liquid-silver">
                            <TextReveal className="inline-block">Domina</TextReveal>
                        </span>
                        <span className="block text-liquid-silver">
                            <TextReveal className="inline-block">il mercato</TextReveal>
                        </span>
                        <span className="block mt-0 md:mt-2 text-liquid-silver">
                            <span className="inline-block mr-4">con</span>
                            <span className="text-liquid-gold italic font-serif inline-block pr-6 lg:pr-10">
                                <TextReveal className="inline-block">Skitla</TextReveal>
                            </span>
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-white/40 max-w-lg leading-relaxed font-light px-4 lg:px-0 mb-8 lg:mb-10">
                        {content.subheadline}
                    </p>

                    {/* CTA BUTTON — TIER S (DESKTOP ONLY) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="relative z-20 mt-0 hidden lg:block"
                    >
                        <HeroCTA label={content.primaryCTA} href="#pricing" />
                    </motion.div>
                </div>

                {/* 3D LOGO CONTAINER - Right on Desktop */}
                <div className="relative w-full lg:w-[45%] h-[320px] sm:h-[400px] md:h-[500px] lg:h-[700px] z-10 sm:mb-6 md:mb-10 lg:mb-0 flex items-center justify-center lg:justify-end">
                    {/* Atmospheric Bloom */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[700px] md:h-[700px] bg-[#D9B162]/[0.08] blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />

                    <div className="absolute inset-0 flex items-center justify-center lg:justify-end pointer-events-none select-none">
                        <div
                            onContextMenu={(e) => e.preventDefault()}
                            className="w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] pointer-events-auto select-none"
                        >
                            <SkitlaLogo />
                        </div>
                    </div>
                </div>

                {/* CTA BUTTON — TIER S (MOBILE ONLY) */}
                <div className="relative z-20 mt-0 block lg:hidden">
                    <HeroCTA label={content.primaryCTA} href="#pricing" />
                </div>

            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
        </section>
    );
}
