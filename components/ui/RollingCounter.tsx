"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function RollingCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const spring = useSpring(0, {
        stiffness: 40,
        damping: 20,
    });

    const displayValue = useTransform(spring, (current) =>
        Math.floor(current).toLocaleString()
    );

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, spring, value]);

    return (
        <span ref={ref} className="tabular-nums">
            <motion.span>{displayValue}</motion.span>
            {suffix}
        </span>
    );
}
