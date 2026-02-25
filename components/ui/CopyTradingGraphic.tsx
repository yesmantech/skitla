"use client";

import { motion } from "framer-motion";
import { User, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyTradingGraphic({ isMobile = false }: { isMobile?: boolean }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Y coordinates (%) for the 5 users
    const userYPositions = [12, 31, 50, 69, 88];

    // Responsive coordinates
    const startX = isMobile ? 22 : 25;
    const endX = isMobile ? 78 : 85;

    const graphicContent = (
        <>
            {/* Background Texture */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: "radial-gradient(circle, #D9B162 1px, transparent 1px)",
                    backgroundSize: isMobile ? "20px 20px" : "28px 28px",
                    backgroundPosition: "center center"
                }}
            />
            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[150px] bg-arcadia-gold opacity-[0.03] blur-[70px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />

            {/* Top Right Detail Marker */}
            {!isMobile && (
                <div className="absolute top-8 right-8 flex items-center justify-center z-20">
                    <div className="w-5 h-5 rounded-full border border-arcadia-gold/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-arcadia-gold/60" />
                    </div>
                </div>
            )}

            {mounted && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id={`gold-line-gradient-${isMobile ? 'm' : 'd'}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#D9B162" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#D9B162" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>

                    {/* Static dashed background lines */}
                    {userYPositions.map((y, i) => (
                        <path
                            key={`bg-path-${i}`}
                            d={`M ${startX} 50 C ${startX + 25} 50, ${endX - 20} ${y}, ${endX} ${y}`}
                            fill="none"
                            stroke="rgba(217,177,98,0.15)"
                            strokeWidth={isMobile ? "0.4" : "0.5"}
                            strokeDasharray="2 4"
                        />
                    ))}

                    {/* Animated bright gold lines */}
                    {userYPositions.map((y, i) => (
                        <motion.path
                            key={`anim-path-${i}`}
                            d={`M ${startX} 50 C ${startX + 25} 50, ${endX - 20} ${y}, ${endX} ${y}`}
                            fill="none"
                            stroke={`url(#gold-line-gradient-${isMobile ? 'm' : 'd'})`}
                            strokeWidth={isMobile ? "0.8" : "1.25"}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{
                                duration: 1.5,
                                delay: 0.2 * i,
                                ease: "easeOut",
                            }}
                        />
                    ))}

                    {/* Animated moving white/gold pulses (Capsules) */}
                    {userYPositions.map((y, i) => (
                        <motion.path
                            key={`pulse-${i}`}
                            d={`M ${startX} 50 C ${startX + 25} 50, ${endX - 20} ${y}, ${endX} ${y}`}
                            fill="none"
                            stroke="#FCF6BA"
                            strokeWidth={isMobile ? "1.5" : "2.5"}
                            strokeLinecap="round"
                            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                            animate={{
                                pathLength: [0, 0.08, 0.08, 0],
                                pathOffset: [0, 0, 0.92, 1],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                repeatDelay: 1,
                                delay: 0.5,
                                ease: "linear",
                            }}
                        />
                    ))}
                </svg>
            )}

            {/* Ambient center gold glow */}
            <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-arcadia-gold/20 pointer-events-none rounded-full z-[5]"
                style={{
                    left: isMobile ? '28%' : '32%',
                    width: isMobile ? '60px' : '120px',
                    height: isMobile ? '60px' : '120px',
                    filter: isMobile ? 'blur(30px)' : 'blur(50px)',
                }}
            />

            {/* Long Badge */}
            <div
                className="absolute z-10"
                style={{ top: '25%', left: `${startX - (isMobile ? 6 : 10)}%`, transform: 'translate(-50%, -50%)' }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md text-white/50 font-mono tracking-widest shadow-lg ${isMobile ? 'px-2 py-1 text-[8px]' : 'px-3 py-1.5 text-[10px] lg:text-[11px]'
                        }`}
                >
                    <ArrowUpRight className={isMobile ? "w-2.5 h-2.5 text-arcadia-gold/60" : "w-3.5 h-3.5 text-arcadia-gold/60"} />
                    <span>LONG 0.3</span>
                </motion.div>
            </div>

            {/* S Badge (Central Node) */}
            <div
                className="absolute z-20"
                style={{ top: '50%', left: `${startX}%`, transform: 'translate(-100%, -50%)' }}
            >
                <div className="relative">
                    {/* Connection Dot */}
                    <div className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-arcadia-gold/20 bg-black flex items-center justify-center z-30 ${isMobile ? 'right-[-4px] w-2 h-2' : 'right-[-6px] w-3 h-3'
                        }`}>
                        <div className={`rounded-full bg-arcadia-gold/80 ${isMobile ? 'w-[2px] h-[2px]' : 'w-[3px] h-[3px]'}`} />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className={`flex items-center justify-center border border-arcadia-gold/40 bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl overflow-hidden group ${isMobile
                            ? 'w-[44px] h-[44px] rounded-xl shadow-[0_0_25px_rgba(217,177,98,0.2)]'
                            : 'w-[64px] h-[64px] lg:w-[76px] lg:h-[76px] rounded-2xl lg:rounded-[24px] shadow-[0_0_40px_rgba(217,177,98,0.25)]'
                            }`}
                    >
                        <div className={`absolute inset-0 border border-white/10 pointer-events-none ${isMobile ? 'rounded-xl' : 'rounded-2xl lg:rounded-[24px]'}`} />
                        <span className={`font-serif text-arcadia-gold tracking-tight italic leading-none drop-shadow-[0_0_8px_rgba(217,177,98,0.5)] ${isMobile ? 'text-[24px] pl-0.5 pb-0.5' : 'text-[34px] lg:text-[42px] pl-1 pb-1'
                            }`}>
                            S
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Short Badge */}
            <div
                className="absolute z-10"
                style={{ top: '75%', left: `${startX - (isMobile ? 6 : 10)}%`, transform: 'translate(-50%, -50%)' }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md text-white/50 font-mono tracking-widest shadow-lg ${isMobile ? 'px-2 py-1 text-[8px]' : 'px-3 py-1.5 text-[10px] lg:text-[11px]'
                        }`}
                >
                    <ArrowDownRight className={isMobile ? "w-2.5 h-2.5 text-arcadia-gold/60" : "w-3.5 h-3.5 text-arcadia-gold/60"} />
                    <span>SHORT 0.3</span>
                </motion.div>
            </div>

            {/* Right Side: Copiers */}
            {userYPositions.map((y, i) => {
                const num = i + 1;
                return (
                    <div
                        key={num}
                        className="absolute z-20"
                        style={{ top: `${y}%`, left: `${endX}%`, transform: 'translate(0, -50%)' }}
                    >
                        <div className="relative">
                            {/* Connection Dot */}
                            <div className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-arcadia-gold/20 bg-black flex items-center justify-center z-30 ${isMobile ? 'left-[-8px] w-[4px] h-[4px]' : 'left-[-16px] lg:left-[-12px] w-[6px] h-[6px]'
                                }`}>
                                <div className={`rounded-full bg-arcadia-gold/50 ${isMobile ? 'w-[1px] h-[1px]' : 'w-[1.5px] h-[1.5px]'}`} />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                                className={`flex items-center justify-center bg-black/60 backdrop-blur-md border border-white/[0.08] rounded-full z-20 ${isMobile
                                    ? 'gap-1.5 px-2.5 py-1 min-w-[48px] shadow-[0_2px_12px_rgba(0,0,0,1)]'
                                    : 'gap-2.5 px-4 py-2 min-w-[70px] lg:min-w-[80px] shadow-[0_4px_20px_rgba(0,0,0,1)]'
                                    }`}
                            >
                                <User className={isMobile ? "w-2.5 h-2.5 text-arcadia-gold/80" : "w-3.5 h-3.5 lg:w-4 lg:h-4 text-arcadia-gold/80"} />
                                <span className={`text-white/80 font-mono ${isMobile ? 'text-[10px]' : 'text-[13px] lg:text-sm'}`}>{num}</span>
                            </motion.div>
                        </div>
                    </div>
                );
            })}
        </>
    );

    if (isMobile) {
        return (
            <div className="w-full h-full relative overflow-hidden flex flex-col justify-center">
                {graphicContent}
            </div>
        );
    }

    // Default Desktop styling (with card backgrounds/borders)
    return (
        <div className="w-full h-full min-h-[480px] lg:min-h-[550px] flex-1 relative rounded-[19px] overflow-hidden bg-black/40 backdrop-blur-md border border-white/[0.05] p-6 lg:p-10 flex flex-col justify-center">
            {graphicContent}
        </div>
    );
}
