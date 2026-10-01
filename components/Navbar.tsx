"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { LanguageSelect, useLanguage } from "./LanguageProvider";
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t, language } = useLanguage();
  const suffix = `?lang=${language}`;
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 50);
    update(); window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <>
    <header className={`fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md ${scrolled ? "py-3" : "py-5"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 md:gap-8">
          <button type="button" aria-label={t("Apri menu")} aria-expanded={isSidebarOpen} onClick={() => setIsSidebarOpen(true)} className="p-2 lg:hidden text-white"><Menu size={22}/></button>
          <a href={`/${suffix}`} className="font-serif text-2xl text-arcadia-gold italic">Skitla</a>
          <nav aria-label={t("Navigazione principale")} className="hidden lg:flex items-center gap-5 text-sm text-white/75">
            <a href={`/${suffix}`}>Home</a>
            <a href={`/gold/${suffix}`} className="text-arcadia-gold font-semibold">Gold</a>
            <a href={`/${suffix}#founder`}>{t("Il Founder")}</a>
            <a href={`/${suffix}#success`}>{t("Testimonianze")}</a>
            <a href={`/${suffix}#faq`}>FAQ</a>
            <a href={`/newsletter/${suffix}`}>Newsletter</a>
          </nav>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <LanguageSelect />
          <a href={`/gold/${suffix}`} className="hidden sm:flex items-center gap-2 text-xs text-arcadia-gold uppercase">{t("Scopri Gold")}<ArrowRight size={14}/></a>
        </div>
      </div>
    </header>
    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
  </>;
}
