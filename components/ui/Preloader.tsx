"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const progressValue = useMotionValue(0);
    const progressWidth = useTransform(progressValue, (v) => `${Math.round(v)}%`);
    const progressText = useTransform(progressValue, (v) => `${Math.round(v)}%`);

    useEffect(() => {
        // Animate the progress value organically outside the React render cycle
        const animation = animate(progressValue, 100, {
            duration: 2.2,
            ease: [0.16, 1, 0.3, 1], // Custom realistic ease-out
        });

        // Hide preloader shortly after animation completes
        const timer = setTimeout(() => {
            setIsLoading(false);
            window.scrollTo(0, 0);
        }, 2400);

        return () => {
            animation.stop();
            clearTimeout(timer);
        };
    }, [progressValue]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
                >
                    {/* Ambient Gold Glow */}
                    <motion.div
                        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, rgba(217,177,98,0.06) 0%, transparent 70%)",
                            filter: "blur(60px)",
                        }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />

                    {/* Logo Mark — Italic Serif "S" */}
                    <motion.div
                        className="relative z-10 flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Skitla Logo Text */}
                        <motion.span
                            className="font-serif italic text-5xl md:text-6xl tracking-tight pr-4"
                            style={{
                                background: "linear-gradient(180deg, #FCF6BA 0%, #D9B162 40%, #BF953F 60%, #8A6E2F 100%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                filter: "drop-shadow(0 0 25px rgba(217,177,98,0.3))",
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Skitla
                        </motion.span>

                        {/* Tagline */}
                        <motion.span
                            className="mt-3 text-[10px] font-medium tracking-[0.4em] uppercase text-white/30"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            DOMINATORI DEL TEMPO
                        </motion.span>
                    </motion.div>

                    {/* Progress Bar — Minimal Gold Line */}
                    <motion.div
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <div className="relative w-48 h-[1px] bg-white/[0.06] rounded-full overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full rounded-full"
                                style={{
                                    background: "linear-gradient(90deg, #8A6E2F, #D9B162, #FCF6BA)",
                                    boxShadow: "0 0 12px rgba(217,177,98,0.4)",
                                    width: progressWidth,
                                }}
                                transition={{ duration: 0.05 }}
                            />
                        </div>

                        {/* Percentage */}
                        <motion.span
                            className="text-[10px] font-mono tracking-widest text-white/20 tabular-nums"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            {progressText}
                        </motion.span>
                    </motion.div>

                    {/* Corner Accents — Geometric Detail */}
                    <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-white/[0.06]" />
                    <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-white/[0.06]" />
                    <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-white/[0.06]" />
                    <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-white/[0.06]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
