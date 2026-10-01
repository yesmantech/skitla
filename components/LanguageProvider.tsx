"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { EN } from "@/content/translations";
import { INTERNATIONAL } from "@/content/international";

export type Language = "it" | "en" | "ar" | "zh" | "ru";
const supported = (value: string | null): value is Language => !!value && ["it", "en", "ar", "zh", "ru"].includes(value);
const LanguageContext = createContext({ language: "it" as Language, setLanguage: (_: Language) => {}, t: (text: string) => text });
export function resolveLanguage(query: string | null, saved: string | null, browser: string): Language {
  if (supported(query)) return query;
  if (supported(saved)) return saved;
  const base = browser.toLowerCase().split(/[-_]/)[0];
  return supported(base) ? base : "en";
}
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, updateLanguage] = useState<Language>("it");
  const [ready, setReady] = useState(false);
  const setLanguage = (next: Language) => {
    updateLanguage(next);
    try { localStorage.setItem("skitla-language", next); } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
  };
  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem("skitla-language"); } catch {}
    const explicit = new URLSearchParams(location.search).get("lang");
    updateLanguage(resolveLanguage(explicit, saved, navigator.languages?.[0] || navigator.language || "en"));
    if (supported(explicit)) { try { localStorage.setItem("skitla-language", explicit); } catch {} }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.languageReady = "true";
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      if (!description.getAttribute("data-original")) description.setAttribute("data-original", description.getAttribute("content") || "");
      const descriptions = {
        en: "Discover Marco Garavelli and SKITLA: Gold Scalping and Sniper rooms, personal track record, case studies and access information. Trading involves risk of loss.",
        ar: "اكتشف Marco Garavelli وSKITLA: غرف Gold Scalping وSniper، نتائج شخصية ودراسات حالة ومعلومات الدخول. التداول ينطوي على خطر الخسارة.",
        zh: "了解 Marco Garavelli 与 SKITLA：Gold Scalping 和 Sniper 交易室、个人交易记录、案例与参与信息。交易存在亏损风险。",
        ru: "Познакомьтесь с Марко Гаравелли и SKITLA: комнаты Gold Scalping и Sniper, личные результаты, кейсы и условия доступа. Торговля связана с риском убытков."
      };
      description.setAttribute("content", language === "it" ? description.getAttribute("data-original") || "" : descriptions[language]);
    }
  }, [language, ready]);
  const t = (text: string) => {
    if (language === "it") return text;
    if (language === "en") return EN[text] ?? text;
    const index = { ar: 0, zh: 1, ru: 2 }[language];
    return INTERNATIONAL[text]?.[index] ?? EN[text] ?? text;
  };
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
export function T({ text }: { text: string | undefined }) { const { t } = useLanguage(); return <>{text ? t(text) : ""}</>; }
export function LanguageSelect() {
  const { language, setLanguage } = useLanguage();
  return <select aria-label="Language / Lingua" value={language} onChange={e => setLanguage(e.target.value as Language)} className="rounded-lg border border-white/25 bg-black px-2 py-2 text-xs text-white focus-visible:outline-2 focus-visible:outline-arcadia-gold cursor-pointer">
    <option value="it">Italiano</option><option value="en">English</option><option value="ar">العربية</option><option value="zh">简体中文</option><option value="ru">Русский</option>
  </select>;
}
