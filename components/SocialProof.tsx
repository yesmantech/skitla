"use client";

import { Container } from "./ui/Container";
import { motion } from "framer-motion";
import { Badge } from "./ui/Badge";
import { trackEvent } from "@/lib/analytics";

export function SocialProof() {
    return (
        <section
            onMouseEnter={() => trackEvent("social_proof_view")}
            className="section-padding bg-brand-background relative overflow-hidden"
        >
            <Container>
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 0.4, letterSpacing: "0.5em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="text-[9px] md:text-xs font-mono text-arcadia-gold uppercase mb-5"
                    >
                        Risultati Reali
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold gradient-text">La Voce dei Nostri Membri</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {/* Video Testimonial Placeholder */}
                    <div className="lg:col-span-2 aspect-video glass rounded-3xl relative overflow-hidden flex items-center justify-center group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="relative text-center">
                            <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform cursor-pointer">
                                <div className="border-l-[16px] border-l-black border-y-[10px] border-y-transparent ml-2" />
                            </div>
                            <p className="font-bold">Play Student Video Testimonial</p>
                        </div>
                    </div>

                    {/* Screenshot Testimonial Placeholder */}
                    <div className="aspect-square glass rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary/5 to-transparent" />
                        <div className="relative z-10">
                            <div className="w-full aspect-[4/3] bg-white/5 rounded-xl border border-white/10 mb-6 flex items-center justify-center text-white/10 italic text-sm">
                                [TRADING_RESULT_SCREENSHOT]
                            </div>
                            <p className="text-sm italic text-brand-text-muted leading-relaxed">
                                "The morning analysis alone paid for my membership ten times over. I've never felt this confident."
                            </p>
                            <p className="mt-4 font-bold">- [STUDENT_NAME]</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="glass p-8 rounded-2xl border border-white/5">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <div key={j} className="w-4 h-4 text-brand-primary">★</div>
                                ))}
                            </div>
                            <p className="text-brand-text-muted text-sm leading-relaxed mb-6">
                                "[TEXT_REVIEW_PLACEHOLDER_{i}] - Focus on clarity of teaching, community support, and overall value."
                            </p>
                            <p className="font-bold text-sm">[MEMBER_NAME]</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
