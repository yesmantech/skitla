"use client";

import { motion } from "framer-motion";
import React from "react";

interface MorphingArtifactProps {
    progress: any; // MotionValue<number>
}

// Simplified SVGs for distinct states
const GlobePath = "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z M12 2C13.66 2 15 6.48 15 12C15 17.52 13.66 22 12 22C10.34 22 9 17.52 9 12C9 6.48 10.34 2 12 2Z M2 12H22";
const ShieldPath = "M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z M12 11H19C18.47 14.85 15.89 18.33 12 19.45V11H5V7.3L12 4.2V11Z";
const NetworkPath = "M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.91 18 21.91C19.61 21.91 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z";
const EyePath = "M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z";

export function MorphingArtifact({ progress }: MorphingArtifactProps) {
    // We will map 0-0.25 to State 1, 0.25-0.5 to State 2, etc.
    // Instead of complex path morphing which requires matching points, we'll do opacity cross-fading + rotation for "Ultra" feel.

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Core Glow */}
            <div className="absolute inset-[-10%] bg-arcadia-gold/20 blur-[80px]" />

            {/* Container for rotation */}
            <motion.div
                className="relative w-64 h-64 md:w-96 md:h-96"
                style={{ rotate: progress.get() * 360 }} // Simple rotate for now, refined in parent
            >
                {/* STATE 1: GLOBE (0 - 0.25) */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: useTransformValue(progress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0]) }}
                >
                    <div className="w-full h-full border border-arcadia-gold/30 rounded-full animate-spin-slow-reverse" />
                    <svg viewBox="0 0 24 24" className="w-32 h-32 text-arcadia-gold drop-shadow-lg">
                        <path d={GlobePath} fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                    <div className="absolute inset-0 text-center flex items-center justify-center">
                        <span className="text-[10px] font-mono tracking-[0.5em] text-arcadia-gold/50 uppercase">Global Data</span>
                    </div>
                </motion.div>

                {/* STATE 2: SHIELD (0.25 - 0.5) */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: useTransformValue(progress, [0.15, 0.35, 0.5, 0.65], [0, 1, 1, 0]) }}
                >
                    <div className="w-[80%] h-[80%] border border-white/10 rotate-45" />
                    <svg viewBox="0 0 24 24" className="w-32 h-32 text-arcadia-gold drop-shadow-lg">
                        <path d={ShieldPath} fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                    <div className="absolute inset-0 text-center flex items-center justify-center">
                        <span className="text-[10px] font-mono tracking-[0.5em] text-arcadia-gold/50 uppercase mt-40">Verified</span>
                    </div>
                </motion.div>

                {/* STATE 3: NETWORK (0.5 - 0.75) */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: useTransformValue(progress, [0.4, 0.6, 0.75, 0.9], [0, 1, 1, 0]) }}
                >
                    <div className="absolute inset-0 border border-arcadia-gold/20 rounded-full border-dashed animate-spin-slow" />
                    <svg viewBox="0 0 24 24" className="w-32 h-32 text-arcadia-gold drop-shadow-lg">
                        <path d={NetworkPath} fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                    <div className="absolute inset-0 text-center flex items-center justify-center">
                        <span className="text-[10px] font-mono tracking-[0.5em] text-arcadia-gold/50 uppercase -mt-40">Nexus</span>
                    </div>
                </motion.div>

                {/* STATE 4: EYE (0.75 - 1.0) */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: useTransformValue(progress, [0.65, 0.85, 1, 1], [0, 1, 1, 1]) }}
                >
                    {/* The "Ultra" Glow for the final state */}
                    <div className="absolute inset-[-20%] bg-arcadia-gold/40 blur-[100px] animate-pulse" />

                    <svg viewBox="0 0 24 24" className="w-40 h-40 text-white drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">
                        <path d={EyePath} fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
                        <circle cx="12" cy="12" r="3" fill="#D9B162" className="animate-pulse" />
                    </svg>
                    <div className="absolute inset-0 text-center flex items-center justify-center">
                        <span className="text-[10px] font-mono tracking-[0.5em] text-white uppercase mt-48">Execution</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

// Helper for complex transforms that isn't native to framer-motion's useTransform with arrays easily in all versions, 
// creating a wrapper to use standard interpolations.
// Actually useTransform supports input/output range arrays perfectly.
// We just need to make sure we pass the `scrollYProgress` directly.
import { useTransform } from "framer-motion";

function useTransformValue(value: any, inputRange: number[], outputRange: number[]) {
    return useTransform(value, inputRange, outputRange);
}
