"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 10);
            mouseY.set(e.clientY - 10);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a, button, [role="button"]');
            setIsHovered(!!isClickable);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [isVisible, mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 border border-arcadia-gold/30 rounded-full pointer-events-none z-[9999] hidden md:block"
            animate={{
                scale: isHovered ? 2.5 : 1,
                opacity: isHovered ? 0.6 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
                x: mouseX,
                y: mouseY,
            }}
        >
            {/* Inner Core */}
            <div className="absolute inset-1.5 bg-arcadia-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300"
                style={{ opacity: isHovered ? 0.4 : 1 }} />

            {/* Outer Aura */}
            <div className="absolute inset-0 bg-arcadia-gold/5 blur-[4px] rounded-full" />
        </motion.div>
    );
}
