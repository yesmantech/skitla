"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Magnetic from "./ui/Magnetic";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { label: "Home", href: "#home" },
    { label: "I Numeri", href: "#stats" },
    { label: "Il Founder", href: "#founder" },
    { label: "Ecosistema", href: "#ecosystem" },
    { label: "Wall of Success", href: "#success" },
    { label: "Elite Access", href: "#pricing" },
    // { label: "Il Metodo", href: "#method" },
    // { label: "Accesso Prova", href: "#trial" },
    { label: "FAQ", href: "#faq" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        onClose();
        const element = document.querySelector(href);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] cursor-pointer"
                    />

                    {/* Sidebar Tray */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 w-full max-w-[280px] bg-black/90 glass-obsidian border-r border-white/5 z-[70] p-6 md:p-8 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-10">
                            <span className="font-serif text-xl text-arcadia-gold italic">Skitla</span>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group"
                            >
                                <X className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex flex-col gap-4">
                            {menuItems.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1 }}
                                >
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleLinkClick(e, item.href)}
                                        className="group flex items-center justify-between py-2 border-b border-white/[0.03] hover:border-arcadia-gold/40 transition-colors"
                                    >
                                        <span className="text-base text-white/50 group-hover:text-arcadia-gold transition-colors font-medium tracking-wide">
                                            {item.label}
                                        </span>
                                        <ArrowRight className="w-3.5 h-3.5 text-arcadia-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </a>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer Info (Minimal) */}
                        <div className="mt-auto pt-8">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 text-center">
                                Tier S Ecosystem
                            </p>
                        </div>

                        {/* RAZOR-SHARP SIDE ACCENT */}
                        <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-arcadia-gold/20 to-transparent" />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
