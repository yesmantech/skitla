"use client";

import { useState, useEffect } from "react";
import Magnetic from "./ui/Magnetic";
import { useTextScramble } from "@/hooks/useTextScramble";
import { ArrowRight } from "lucide-react";
import { Sidebar } from "./Sidebar";

function NavItem({ label, href }: { label: string; href: string }) {
    const { displayText, scramble } = useTextScramble(label);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                const top = element.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "smooth" });
            }
        }
    };

    return (
        <Magnetic>
            <a
                href={href}
                onClick={handleClick}
                onMouseEnter={scramble}
                className="text-xs font-medium text-white/60 hover:text-white transition-colors block px-4 py-2 tracking-tight"
            >
                {displayText}
            </a>
        </Magnetic>
    );
}

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "py-4 bg-black/80 backdrop-blur-md border-b border-white/5" : "py-8 bg-transparent"
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
                    {/* Left Side: Menu + Logo */}
                    <div className="flex items-center gap-8">
                        {/* Mobile Toggle (Minimal) - Now on Left */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="text-white flex flex-col items-center justify-center gap-1.5 group cursor-pointer lg:hidden"
                        >
                            <div className="w-5 h-[1px] bg-white group-hover:bg-arcadia-gold transition-colors" />
                            <div className="w-5 h-[1px] bg-white group-hover:bg-arcadia-gold transition-colors" />
                        </button>

                        {/* Logo - Moved to Left */}
                        <div
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="flex flex-col items-start group cursor-pointer relative"
                        >
                            <span className="font-serif text-2xl text-arcadia-gold tracking-tight group-hover:opacity-80 transition-opacity italic">
                                Skitla
                            </span>
                            <div className="h-[1px] w-0 group-hover:w-full bg-arcadia-gold transition-all duration-500 absolute -bottom-1" />
                        </div>

                        {/* Desktop Links - Kept next to logo but slightly spaced */}
                        <nav className="hidden lg:flex items-center gap-1 ml-4">
                            <NavItem label="Ecosistema" href="#ecosystem" />
                            <NavItem label="Founder" href="#founder" />
                            <NavItem label="Testimonianze" href="#success" />
                            <NavItem label="FAQ" href="#faq" />
                        </nav>
                    </div>

                    {/* Right Side CTA */}
                    <div className="flex items-center">
                        <Magnetic>
                            <a
                                href="#pricing"
                                className="flex items-center gap-2 text-xs font-medium text-arcadia-gold hover:text-white transition-colors tracking-tight uppercase"
                            >
                                UNISCITI A NOI
                                <ArrowRight className="w-3 h-3" />
                            </a>
                        </Magnetic>
                    </div>
                </div>
            </header>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
    );
}
