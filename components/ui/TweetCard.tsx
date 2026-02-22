"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    MessageCircle,
    Repeat2,
    Heart,
    Share,
    CheckCircle2,
    MoreHorizontal
} from "lucide-react";

export interface TweetCardProps {
    name: string;
    handle: string;
    avatar: string;
    content: string;
    timestamp: string;
    metrics: {
        replies: string;
        reposts: string;
        likes: string;
    };
    image?: string;
    verified?: boolean;
}

export function TweetCard({ name, handle, avatar, content, timestamp, metrics, image, verified = true }: TweetCardProps) {
    return (
        <div className="relative group p-[1px] rounded-2xl overflow-hidden">
            {/* Border glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-arcadia-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative glass-obsidian rounded-[15px] p-5 w-full font-sans text-[15px] transition-all duration-500 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-900 border border-arcadia-gold/10">
                            <img src={avatar} alt={name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                                <span className="font-bold text-liquid-silver leading-tight">{name}</span>
                                {verified && <CheckCircle2 className="w-3.5 h-3.5 icon-gold fill-arcadia-gold/20" />}
                            </div>
                            <span className="text-white/20 text-xs tracking-wider uppercase font-mono mt-0.5">@{handle}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                    <p className="text-white/60 leading-relaxed font-light tracking-wide text-[14px]">
                        {content}
                    </p>
                </div>

                {/* Media placeholder / Image */}
                {image && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-white/5 aspect-video bg-zinc-950 flex items-center justify-center relative group/img">
                        <img
                            src={image}
                            alt=""
                            className="w-full h-full object-cover opacity-60 group-hover/img:opacity-100 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {/* Shimmer Glint on Image */}
                        <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent translate-x-[-120%] group-hover/img:translate-x-[120%] transition-transform duration-[1500ms] pointer-events-none" />
                    </div>
                )}

                {/* Footer Details */}
                <div className="mb-5 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/10">{timestamp}</span>
                    <div className="w-8 h-[1px] bg-arcadia-gold/20" />
                </div>

                {/* Action Bar */}
                <div className="flex justify-between items-center pt-4 border-t border-white/[0.03]">
                    <div className="flex items-center gap-2.5 group/action cursor-pointer">
                        <div className="p-2 group-hover/action:bg-arcadia-gold/10 rounded-full transition-colors">
                            <MessageCircle className="w-[16px] h-[16px] text-white/20 group-hover/action:text-arcadia-gold" />
                        </div>
                        <span className="text-[11px] font-mono text-white/10 group-hover/action:text-arcadia-gold/60">{metrics.replies}</span>
                    </div>
                    <div className="flex items-center gap-2.5 group/action cursor-pointer">
                        <div className="p-2 group-hover/action:bg-arcadia-gold/10 rounded-full transition-colors">
                            <Repeat2 className="w-[16px] h-[16px] text-white/20 group-hover/action:text-arcadia-gold" />
                        </div>
                        <span className="text-[11px] font-mono text-white/10 group-hover/action:text-arcadia-gold/60">{metrics.reposts}</span>
                    </div>
                    <div className="flex items-center gap-2.5 group/action cursor-pointer">
                        <div className="p-2 group-hover/action:bg-arcadia-gold/10 rounded-full transition-colors">
                            <Heart className="w-[16px] h-[16px] text-white/20 group-hover/action:text-arcadia-gold" />
                        </div>
                        <span className="text-[11px] font-mono text-white/10 group-hover/action:text-arcadia-gold/60">{metrics.likes}</span>
                    </div>
                    <div className="group/action cursor-pointer">
                        <div className="p-2 group-hover/action:bg-arcadia-gold/10 rounded-full transition-colors">
                            <Share className="w-[16px] h-[16px] text-white/20 group-hover/action:text-arcadia-gold" />
                        </div>
                    </div>
                </div>

                {/* Internal Reflection Glint */}
                <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[2000ms] pointer-events-none" />
            </div>
        </div>
    );
}
