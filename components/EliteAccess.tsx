"use client";
    microcopy: string;
    featured?: boolean;
    href?: string;
}


const cards: PricingCard[] = [
    {
        eyebrow: "COPY TRADING",
        title: "Copy Trading Passivo",
        price: "GRATIS",
        badge: "Paghi solo se guadagni",
        description:
            "Copia automaticamente le operazioni di Skitla13 e punta a risultati in modo passivo.",
        trustLine:
            "Skitla13 guadagna solo se guadagni anche tu (fee: 10% dei profitti).",
        entryLine:
            "Nessun costo di ingresso. Solo deposito minimo: 200€.",
        benefits: [
            "Copia automatica delle operazioni",
            "Settaggi di rischio personalizzabili",
            "Aggiornamenti operativi e gestione posizioni",
            "Supporto onboarding per configurazione",
            "Pausa / stop in qualsiasi momento",
            "Accesso canale aggiornamenti essenziale",
        ],
        cta: "Attiva Copy Trading",
        href: "https://t.me/m/l5WsLQ39ZTM0",
        microcopy: "Richiede solo deposito minimo. Nessun abbonamento.",
    },
    {
        eyebrow: "MEMBERSHIP",
        title: "Premium Mensile",
        price: "€247",
  priceSuffix: "/ mese",
        description:
            "Formazione, supporto e community per chi vuole un metodo serio e costante.",
        benefits: [
            "Formazione completa (da 0 a 100)",
            "Supporto VIP 7/7 in chatroom riservata",
            "Segnali e update operativi",
            "Analisi strategiche BTC & Altcoin",
            "Supporto tecnico (exchange, wallet, strumenti)",
            "Community d'élite (chat + vocal room)",
            "Accesso a sala segnali VIP",
        ],
        cta: "Unisciti al Premium",
        microcopy: "Accesso immediato a contenuti e community.",
        // featured removed
    },
        {
        eyebrow: "MEMBERSHIP",
        title: "Premium Annual",
        price: "€1.497",
        priceSuffix: "/ anno",
        badge: "Best value",
        description:
            "Formazione, supporto e community per tutto l'anno. Il piano più conveniente per chi vuole crescere con costanza.",
        benefits: [
            "Tutto il Premium Mensile incluso",
            "Risparmio rispetto al piano mensile",
            "Priorità nel supporto",
            "Nuovi contenuti futuri inclusi",
            "Accesso completo alla community",
        ],
        cta: "Unisciti al Premium Annual",
        microcopy: "Fatturato annualmente. Accesso immediato.",
        featured: true, // Gold featured card
    },
];


/* ──────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────── */


export function EliteAccess() {
    const copyTradingCard = cards[0];
    const membershipCards = cards.slice(1);


    const renderCard = (card: PricingCard, i: number) => (
        <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
