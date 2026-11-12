import type { Language } from "@/components/LanguageProvider";

type GoldEntryPoint = "home" | "reports";

/** Keep Gold entry points consistent across desktop, mobile and languages. */
export function goldBotLink(entryPoint: GoldEntryPoint, language: Language): string {
  return `https://t.me/SkitlaSalaSegnaliBot?start=gold_v1_site_${entryPoint}_${language}`;
}
