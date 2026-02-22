"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function TextReveal({ children, className }: { children: string; className?: string }) {
    const [isMounted, setIsMounted] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <span ref={ref} className={className} style={{ display: 'inline-block' }}>
            <span className="sr-only">{children}</span>
            <span aria-hidden="true">
                {isMounted ? (
                    children.split("").map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.03, ease: [0.33, 1, 0.68, 1] }}
                            className="inline-block pr-[0.05em]"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))
                ) : (
                    <span className="opacity-0">{children}</span>
                )}
            </span>
        </span>
    );
}
