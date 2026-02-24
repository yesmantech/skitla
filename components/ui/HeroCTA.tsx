"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { ArrowRight } from "lucide-react";

export function HeroCTA({
    label = "Unisciti alla membership",
    href,
    className = "",
    interactive = true
}: {
    label?: string;
    href?: string;
    className?: string;
    interactive?: boolean;
}) {
    const handleClick = () => {
        if (!href) return;
        if (href.startsWith("#")) {
            const element = document.getElementById(href.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.open(href, "_blank", "noopener,noreferrer");
        }
    };

    const ButtonElement = (
        <motion.button
            onClick={handleClick}
            className={`hero-cta-tier-s group relative ${className}`}
            whileHover={interactive ? { scale: 1.04 } : undefined}
            whileTap={interactive ? { scale: 0.97 } : undefined}
            transition={interactive ? { type: "spring", stiffness: 400, damping: 17 } : undefined}
        >
            {/* Animated Rotating Border */}
            <span className="hero-cta-border" aria-hidden="true" />

            {/* Inner Glass Surface */}
            <span className="hero-cta-surface w-full inline-flex justify-center">
                {/* Shimmer Sweep */}
                <span className="hero-cta-shimmer" aria-hidden="true" />

                {/* Text */}
                <span className="hero-cta-text">
                    {label}
                </span>

                {/* Arrow */}
                <span className="hero-cta-arrow">
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </span>
            </span>

            {/* Breathing Glow (underneath) */}
            <span className="hero-cta-glow" aria-hidden="true" />
        </motion.button>
    );

    return ButtonElement;
}
