"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    BarChart3,
    ShieldCheck,
    Users,
    Radio,
    Zap,
    Database
} from "lucide-react";

// The Nodes
const nodes = [
    { id: 1, x: 50, y: 50, main: true, title: "Skitla Hub" }, // Center
    { id: 2, x: 20, y: 30, icon: BarChart3, title: "Daily Analysis" },
    { id: 3, x: 80, y: 30, icon: ShieldCheck, title: "Proprietary Strategies" },
    { id: 4, x: 15, y: 70, icon: Users, title: "Private Community" },
    { id: 5, x: 85, y: 70, icon: Radio, title: "Live Execution" },
    { id: 6, x: 35, y: 85, icon: Zap, title: "Priority Support" },
    { id: 7, x: 65, y: 85, icon: Database, title: "Knowledge Archive" },
];

// The Connections (Which node connects to which)
const connections = [
    { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 },
    { from: 1, to: 5 }, { from: 1, to: 6 }, { from: 1, to: 7 },
    { from: 2, to: 4 }, { from: 3, to: 5 }, { from: 6, to: 7 }, // Cross connections
    { from: 4, to: 6 }, { from: 5, to: 7 }
];

export function NeuralNetwork() {
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);

    return (
        <div className="relative w-full h-[700px] bg-black overflow-hidden flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

            <div className="relative w-full max-w-4xl h-full">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {connections.map((conn, i) => {
                        const fromNode = nodes.find(n => n.id === conn.from)!;
                        const toNode = nodes.find(n => n.id === conn.to)!;

                        const isActive = hoveredNode === conn.from || hoveredNode === conn.to;
                        const isMainConnection = conn.from === 1 || conn.to === 1;

                        return (
                            <motion.g key={i}>
                                {/* Base Line */}
                                <line
                                    x1={`${fromNode.x}%`} y1={`${fromNode.y}%`}
                                    x2={`${toNode.x}%`} y2={`${toNode.y}%`}
                                    stroke={isActive ? "#D9B162" : "rgba(255,255,255,0.1)"}
                                    strokeWidth={isActive ? 1.5 : 0.5}
                                    className="transition-colors duration-300"
                                />
                                {/* Pulse Packet */}
                                <motion.circle r="2" fill="#D9B162">
                                    <animateMotion
                                        dur={`${3 + i * 0.5}s`}
                                        repeatCount="indefinite"
                                        path={`M ${fromNode.x * 10},${fromNode.y * 7} L ${toNode.x * 10},${toNode.y * 7}`} // Approximate for visualization logic separate from simple SVG lines. 
                                    // Actually, for simple SVG lines,animateMotion works best with path. 
                                    // Let's use simple CSS animation on a line dash instead for performance and ease.
                                    />
                                </motion.circle>
                                {/* Alternative Pulse: Traveling Dash */}
                                <motion.line
                                    x1={`${fromNode.x}%`} y1={`${fromNode.y}%`}
                                    x2={`${toNode.x}%`} y2={`${toNode.y}%`}
                                    stroke="#D9B162"
                                    strokeWidth={isMainConnection ? 1 : 0.5}
                                    strokeDasharray="5 100"
                                    animate={{ strokeDashoffset: -105 }}
                                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
                                    opacity={0.6}
                                />
                            </motion.g>
                        );
                    })}
                </svg>

                {nodes.map((node) => (
                    <div
                        key={node.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        {/* Glow Ring */}
                        <div className={`absolute inset-0 rounded-full bg-arcadia-gold/20 blur-xl transition-all duration-500 ${hoveredNode === node.id || node.main ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`} />

                        {/* Node Body */}
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`relative rounded-full flex items-center justify-center border transition-all duration-300
                            ${node.main
                                    ? 'w-24 h-24 bg-black border-arcadia-gold shadow-[0_0_30px_rgba(217,177,98,0.3)]'
                                    : 'w-16 h-16 bg-zinc-900 border-white/10 hover:border-arcadia-gold hover:bg-zinc-800'
                                }`
                            }
                        >
                            {node.main ? (
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-arcadia-gold animate-pulse-slow">
                                    <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="12" cy="15" r="3" fill="currentColor" />
                                </svg>
                            ) : (
                                node.icon && <node.icon className={`w-6 h-6 transition-colors duration-300 ${hoveredNode === node.id ? 'text-arcadia-gold' : 'text-zinc-500'}`} />
                            )}
                        </motion.div>

                        {/* Label */}
                        <div className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all duration-300 ${hoveredNode === node.id || node.main ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-2'}`}>
                            <p className={`text-xs font-mono tracking-widest uppercase ${node.main ? 'text-arcadia-gold' : 'text-white'}`}>
                                {node.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
