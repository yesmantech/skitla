"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { T, useLanguage } from "@/components/LanguageProvider";

export default function GoldPage() {
  const { language } = useLanguage();
  const channel="https://t.me/+Zb1zz0M4O5M4ZDY0";
  return <><Navbar/><main className="min-h-screen bg-black pt-32 pb-16 px-6 text-white">
    <div className="max-w-5xl mx-auto">
      <a href={`/?lang=${language}`} className="text-sm text-arcadia-gold">← SKITLA13</a>
      <p className="text-arcadia-gold tracking-widest text-sm mt-12">SKITLA GOLD</p>
      <h1 className="font-serif text-5xl md:text-7xl leading-tight mt-5 mb-7"><T text="L’oro si muove. Segui il lavoro."/></h1>
      <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-3xl"><T text="Sono Marco, founder di SKITLA. Nel mio canale pubblico gratuito puoi conoscere le sale Gold Scalping e Sniper e consultare i report. Parti dal lavoro e scegli cosa approfondire."/></p>
      <a href={channel} className="inline-block my-8 rounded-xl bg-arcadia-gold text-black font-semibold px-6 py-4"><T text="Scopri il canale pubblico gratuito"/> →</a>
      <div className="grid md:grid-cols-2 gap-6 my-10">
        {[['SKITLA scalping XAU','Idee sul Gold con ingressi, target, stop e aggiornamenti operativi.'],['SKITLA sniper XAU','Un secondo approccio al Gold da seguire secondo il tuo piano di trading.']].map(([title,body])=><article key={title} className="rounded-2xl border border-arcadia-gold/30 p-7 bg-white/[0.03]"><h2 className="text-2xl font-serif text-arcadia-gold mb-4">{title}</h2><p className="text-white/75 leading-relaxed"><T text={body}/></p></article>)}
      </div>
      <section className="border-t border-white/15 py-10">
        <p className="text-sm text-arcadia-gold"><T text="Scalping · 30 settembre 2026"/></p>
        <h2 className="font-serif text-3xl my-4"><T text="Una giornata da approfondire"/></h2>
        <p className="text-2xl"><T text="12 idee operative · 3 stop"/></p>
        <p dir="ltr" className="my-3">TP1: 9 · TP2: 8 · TP3: 2 · TP4: 2</p>
        <p className="text-white/65 max-w-2xl leading-relaxed"><T text="I target parziali si riferiscono alle stesse idee, non a operazioni aggiuntive. Fonte: riepilogo giornaliero della sala Scalping."/></p>
        <a href={`https://t.me/SkitlaSalaSegnaliBot?start=gold_v1_site_reports_${language}`} className="inline-block mt-5 text-arcadia-gold underline underline-offset-4"><T text="Leggi i report Gold originali"/> →</a>
      </section>
      <section className="border-t border-white/15 py-10">
        <h2 className="font-serif text-3xl mb-5"><T text="Inizia con MT5"/></h2>
        <p className="text-white/65 mb-5"><T text="La guida illustrata ti accompagna nell’accesso al tuo conto. Usa sempre il server e le credenziali forniti dal broker."/></p>
        <a href={language==='it'?'https://t.me/Skitla13Ufficiale/125':'https://t.me/Skitla13Ufficiale/127'} className="text-arcadia-gold underline underline-offset-4">{language==='it'?'Guida MT5 — Italiano':'MT5 Setup Guide — English'}</a>
      </section>
      <section className="border-t border-white/15 py-10" dir="ltr">
        <h2 className="font-serif text-3xl mb-5">{language === 'it' ? 'Il Gold, una volta a settimana.' : 'Gold, once a week.'}</h2>
        <p className="text-white/70 mb-5">{language === 'it' ? 'Ricevi il mio benvenuto e i report delle sale via email. Gratis, in italiano o inglese. Puoi disiscriverti quando vuoi.' : 'Get my welcome email and the room reports. Free, in English or Italian. Unsubscribe whenever you like.'}</p>
        <a href={`/newsletter/?lang=${language}&source=site_gold`} className="inline-block rounded-xl border border-arcadia-gold text-arcadia-gold px-6 py-4">{language === 'it' ? 'Scopri la newsletter' : 'Explore the newsletter'} →</a>
      </section>
      <p className="text-sm text-white/60 leading-relaxed border-t border-white/15 pt-8"><T text="Il canale pubblico è gratuito. Le condizioni per le sale private e le informazioni sulle affiliazioni sono descritte nel percorso di accesso. Il copy trading FPG è in arrivo e non è ancora attivo."/></p>
    </div>
  </main><FAQ/><Footer/></>;
}
