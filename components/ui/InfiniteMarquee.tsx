"use client";

import { motion } from "framer-motion";

export function InfiniteMarquee({ items, speed = 30 }: { items: React.ReactNode[], speed?: number }) {
    return (
        <div className="relative flex overflow-x-hidden border-y border-white/5 py-12 bg-black/20 backdrop-blur-sm">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
            >
                {[...items, ...items].map((item, i) => (
                    <div key={i} className="flex items-center justify-center px-12 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                        {item}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
