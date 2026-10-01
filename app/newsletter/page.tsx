"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { newsletterForms } from "@/content/newsletter";

export default function NewsletterPage() {
  const { language, setLanguage } = useLanguage();
  const lang = language === "it" ? "it" : "en";
  const it = lang === "it";
  const [accepted, setAccepted] = useState(false);
  return <><Navbar/><main className="min-h-screen bg-black text-white pt-36 pb-20 px-6" dir="ltr" lang={lang}>
    <div className="max-w-3xl mx-auto">
      <p className="text-arcadia-gold tracking-widest">SKITLA GOLD · EMAIL</p>
      <h1 className="font-serif text-4xl md:text-6xl mt-5 mb-7">{it ? "Il mio lavoro sull’oro, nella tua casella." : "My work on Gold, in your inbox."}</h1>
      <p className="text-lg text-white/80 leading-relaxed">{it ? "Sono Marco Garavelli. Ricevi il mio benvenuto e poi un report a settimana: idee, risultati e decisioni delle sale Gold Scalping e Sniper, con i collegamenti per approfondire." : "I’m Marco Garavelli. Receive my welcome email, then one weekly report: ideas, results and decisions from the Gold Scalping and Sniper rooms, with links to explore the work."}</p>
      <p className="my-5 text-white/65">{it ? "Iscrizione gratuita e facoltativa. Nessun deposito richiesto. Puoi annullarla dal link in ogni email." : "Free and optional. No deposit required. Unsubscribe using the link in any email."}</p>
      <label className="block my-6">{it ? "Lingua delle email" : "Email language"}<select className="block mt-2 bg-black border border-white/40 rounded-lg p-3" value={lang} onChange={e=>{setLanguage(e.target.value as "it"|"en");setAccepted(false);}}><option value="it">Italiano</option><option value="en">English</option></select></label>
      <form onSubmit={e=>{e.preventDefault();if(accepted && newsletterForms[lang])window.location.assign(newsletterForms[lang]);}} className="rounded-2xl border border-arcadia-gold/30 p-6 my-8">
        <label className="flex gap-3 items-start cursor-pointer"><input type="checkbox" required checked={accepted} onChange={e=>setAccepted(e.target.checked)} className="mt-1.5 size-5 shrink-0"/><span>{it ? "Desidero ricevere il benvenuto e il report settimanale SKITLA via email e ho letto l’informativa newsletter." : "I would like to receive the SKITLA welcome email and weekly report, and I have read the newsletter privacy notice."}</span></label>
        <a href={`/newsletter/privacy/?lang=${lang}`} target="_blank" rel="noopener noreferrer" className="block text-arcadia-gold underline mt-4">{it ? "Leggi l’informativa" : "Read the privacy notice"}</a>
        <p className="mt-5 text-white/65">{it ? "Continua al modulo, inserisci la tua email e conferma dal messaggio che riceverai. Solo dopo la conferma partirà il benvenuto." : "Continue to the form, enter your email and confirm using the message you receive. The welcome email follows only after confirmation."}</p>
        <button type="submit" disabled={!accepted || !newsletterForms[lang]} className="mt-6 rounded-lg bg-arcadia-gold text-black px-6 py-3 font-semibold disabled:opacity-40">{it ? "Continua con l’iscrizione" : "Continue to subscribe"}</button>
      </form>
      <p className="text-sm text-white/60">{it ? "Il trading comporta rischio di perdita. I risultati passati non garantiscono risultati futuri. La newsletter non iscrive alle sale private." : "Trading involves risk of loss. Past results do not guarantee future results. The newsletter does not enrol you in the private rooms."}</p>
      <a className="inline-block text-arcadia-gold mt-8" href={`/gold/?lang=${language}`}>← SKITLA Gold</a>
    </div>
  </main><Footer/></>;
}
