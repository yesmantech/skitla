"use client";

import React from "react";
import { BentoGrid } from "@/components/concepts/BentoGrid";
import { NeuralNetwork } from "@/components/concepts/NeuralNetwork";
import { GoldenArchive } from "@/components/concepts/GoldenArchive";

export default function EcosystemConceptsPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-arcadia-gold/30">

            {/* INTRO */}
            <section className="py-32 px-6 border-b border-white/10">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-7xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                        Design Lab: Ecosystem
                    </h1>
                    <p className="text-arcadia-gold/80 font-mono tracking-widest uppercase text-sm">
                        Tier S Concept Explorations
                    </p>
                </div>
            </section>

            {/* CONCEPT A */}
            <section className="py-32 border-b border-white/5 relative bg-zinc-950/50">
                <div className="absolute top-10 left-10 md:left-20 z-10">
                    <span className="text-arcadia-gold font-mono text-xs tracking-[0.5em] block mb-2">CONCEPT A</span>
                    <h2 className="text-3xl font-serif text-white">Holographic Bento</h2>
                </div>
                <BentoGrid />
            </section>

            {/* CONCEPT B */}
            <section className="py-32 border-b border-white/5 relative bg-black">
                <div className="absolute top-10 left-10 md:left-20 z-10">
                    <span className="text-arcadia-gold font-mono text-xs tracking-[0.5em] block mb-2">CONCEPT B</span>
                    <h2 className="text-3xl font-serif text-white">Neural Constellation</h2>
                </div>
                <NeuralNetwork />
            </section>

            {/* CONCEPT C */}
            <section className="py-32 relative bg-zinc-950/80">
                <div className="absolute top-10 left-10 md:left-20 z-10">
                    <span className="text-arcadia-gold font-mono text-xs tracking-[0.5em] block mb-2">CONCEPT C</span>
                    <h2 className="text-3xl font-serif text-white">Golden Archive</h2>
                </div>
                <GoldenArchive />
            </section>

        </main>
    );
}
