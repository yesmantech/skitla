"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import {
    BarChart3,
    ShieldCheck,
    Users,
    Radio,
    Zap,
    Database,
    ArrowUpRight
} from "lucide-react";

const features = [
    {
        title: "Daily Analysis",
        subtitle: "Premarket & Intraday",
        desc: "Livelli operativi istituzionali aggiornati ogni mattina prima dell'apertura.",
        icon: BarChart3,
        colSpan: 2
    },
    {
        title: "Proprietary Strategies",
        subtitle: "Verified Edge",
        desc: "Accesso ai setup proprietari Skitla con win-rate documentato.",
        icon: ShieldCheck,
        colSpan: 1
    },
    {
        title: "Private Hub",
        subtitle: "Expert Network",
        desc: "Confronto diretto con trader professionisti e desk operativo.",
        icon: Users,
        colSpan: 1
    },
    {
        title: "Live Sessions",
        subtitle: "Real-time Execution",
        desc: "Operatività in diretta durante le sessioni chiave (London/NY).",
        icon: Radio,
        colSpan: 2
    },
    {
        title: "Priority Support",
        subtitle: "Direct Line",
        desc: "Assistenza tecnica e psicologica 1-on-1 garantita entro 2h.",
        icon: Zap,
        colSpan: 1
    },
    {
        title: "Archive Access",
        subtitle: "Knowledge Base",
        desc: "Database storico di tutte le analisi e webinar registrati.",
        icon: Database,
        colSpan: 1
    },
];

export function BentoGrid() {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const transform = useMotionTemplate`perspective(1000px) rotateX(${ySpring}deg) rotateY(${xSpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { width, height, left, top } = ref.current.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;

        const rX = (mouseY / height - 0.5) * 5; // Rotation range
        const rY = (mouseX / width - 0.5) * -5; // Rotation range

        x.set(rY);
        y.set(rX);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="w-full flex items-center justify-center p-10 perspective-[1200px]">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transform }}
                className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                {features.map((feature, i) => (
                    <BentoCard key={i} feature={feature} />
                ))}
            </motion.div>
        </div>
    );
}

function BentoCard({ feature }: { feature: any }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-white/10 rounded-xl bg-zinc-900/40 overflow-hidden ${feature.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'} h-64`}
            onMouseMove={onMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(217, 177, 98, 0.15),
                transparent 80%
              )
            `,
                }}
            />

            <div className="relative h-full p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-arcadia-gold/50 group-hover:bg-arcadia-gold/10 transition-colors duration-500">
                        <feature.icon className="w-5 h-5 text-zinc-400 group-hover:text-arcadia-gold transition-colors duration-500" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <ArrowUpRight className="w-4 h-4 text-arcadia-gold" />
                    </div>
                </div>

                <div>
                    <p className="text-xs font-mono text-arcadia-gold/80 mb-2 tracking-wider uppercase">
                        {feature.subtitle}
                    </p>
                    <h3 className="text-xl font-serif text-white mb-2 group-hover:text-arcadia-gold transition-colors duration-300">
                        {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed font-sans">
                        {feature.desc}
                    </p>
                </div>
            </div>

            {/* Cinematic noise overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        </div>
    );
}
