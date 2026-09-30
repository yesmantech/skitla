/**
 * @file copy.ts — A/B test copy variants for the Skitla13 landing page.
 *
 * Defines two complete sets of marketing copy (CONTENT_A and CONTENT_B) that
 * can be swapped in `app/page.tsx` to test different value propositions.
 *
 * ## Variant A ("Domina i Mercati"):
 *   More direct, action-oriented Italian copy focused on trading education,
 *   copy trading, and the Elite Trading Community brand.
 *
 * ## Variant B ("Arcadia"):
 *   Premium, exclusive positioning with references to "institutional-level"
 *   analysis, a "Platinum" trial, and the "Arcadia" methodology brand.
 *
 * ## Structure:
 *   Both variants implement the `CopyVariant` type which provides content for:
 *   hero, trial, guarantee, pricing, ecosystem, and proof sections.
 *   Each section's content maps directly to a landing page component.
 *
 * @module content/copy
 */

export type CopyVariant = {
    hero: {
        badge: string;
        h1: string;
        subheadline: string;
        bullets: string[];
        primaryCTA: string;
        secondaryCTA: string;
        microcopy: string;
    };
    trial: {
        title: string;
        description: string;
        checklist: string[];
        cta: string;
    };
    guarantee: {
        title: string;
        description: string;
    };
    pricing: {
        planName: string;
        price: string;
        period: string;
        features: string[];
    };
    ecosystem: {
        title: string;
        tagline: string;
        features: {
            title: string;
            subtitle: string;
        }[];
    };
    proof: {
        title: string;
        stats: {
            value: string;
            label: string;
            helper: string;
        }[];
        footnote: string;
    };
};

export const CONTENT_A: CopyVariant = {
    hero: {
        badge: "Iscrizioni Limitate Aperte",
        h1: "Domina i Mercati con Skitla",
        subheadline: "Formazione e community di trading di alto livello per chi punta a risultati costanti e professionali.",
        bullets: [
            "Analisi Giornaliera e Setups Operativi",
            "Strategie di Proprietary Trading Esclusive",
            "Accesso all'Hub Privato Discord e Telegram"
        ],
        primaryCTA: "INIZIA ORA",
        secondaryCTA: "Scopri la Metodologia",
        microcopy: "Solo contenuti educativi. Il trading comporta rischi."
    },
    trial: {
        title: "Accesso di Prova Riservato",
        description: "Sperimenta il nostro ecosistema premium prima di impegnarti con la membership completa.",
        checklist: [
            "Iscriviti tramite il link partner",
            "Effettua il deposito di almeno 200€",
            "Sblocca 7 giorni di accesso full"
        ],
        cta: "Richiedi la Tua Prova Riservata"
    },
    guarantee: {
        title: "La Garanzia di Idoneità",
        description: "Se entro 30 giorni senti che la community non fa per te, ti rimborseremo le quote associative. Senza domande."
    },
    pricing: {
        planName: "Premium Mensile",
        price: "Su richiesta",
        period: "",
        features: [
            "Tutti i Moduli Strategici",
            "Sessioni di Trading Live",
            "Supporto Prioritario Discord",
            "Sistema Copytrading Professionale"
        ]
    },
    ecosystem: {
        title: "Il Sistema Integrato",
        tagline: "Cosa Ottieni",
        features: [
            { title: "Copy trading FPG · In arrivo", subtitle: "FPG Gold in arrivo: il servizio automatico non è ancora attivo." },
            { title: "SKITLA scalping XAU", subtitle: "Idee sul Gold con ingressi, target, stop e aggiornamenti operativi." },
            { title: "SKITLA sniper XAU", subtitle: "Un secondo approccio al Gold da seguire secondo il tuo piano di trading." },
            { title: "Hub Privato", subtitle: "Community Discord riservata per il confronto costante." },
            { title: "Sessioni Live", subtitle: "Trading in tempo reale con i nostri trader senior." },
            { title: "Supporto Prioritario", subtitle: "Assistenza dedicata per ogni tua esigenza operativa." }
        ]
    },
    proof: {
        title: "Numeri, non parole",
        stats: [
            { value: "$860,5k", label: "Netto calcolato", helper: "860.545,06 USD · Exness" },
            { value: "$5,1 mld+", label: "Volume negoziato", helper: "5.116.344.767,42 USD" },
            { value: "12.500", label: "Ordini chiusi", helper: "Tutti i conti · ultimi 365 giorni" }
        ],
        footnote: "Fonte: riepilogo Exness fornito dal titolare il 30 settembre 2026, tutti i conti, ultimi 365 giorni alla data del riepilogo. Netto calcolato: 1.313.698,49 USD di profitti − 356.789,69 USD di perdite − 96.363,74 USD di costi = 860.545,06 USD. Il volume non è profitto. Questi dati non rappresentano i risultati dei clienti delle sale Gold. I risultati passati non garantiscono risultati futuri."
    }
};

export const CONTENT_B: CopyVariant = {
    hero: {
        badge: "Community d'Elite Internazionale",
        h1: "Eleva il Tuo Trading con Skitla",
        subheadline: "Non tradare da solo. Entra in un circolo ristretto di trader ad alte prestazioni che utilizzano analisi di livello istituzionale.",
        bullets: [
            "Monitoraggio dei Flussi Istituzionali",
            "Gestione del Rischio Avanzata",
            "Network Esclusivo H24"
        ],
        primaryCTA: "Richiedi l'Accesso d'Elite",
        secondaryCTA: "Esplora la Metodologia Arcadia",
        microcopy: "Il trading è ad alto rischio. Nessun risultato garantito."
    },
    trial: {
        title: "Esperienza di Prova Platinum",
        description: "Accettiamo solo trader dedicati. Dimostra il tuo impegno ed entra nel nostro mondo esclusivo.",
        checklist: [
            "Registrati con il link partner",
            "Completa il deposito di almeno 200€",
            "Accesso Pro Immediato per 7 Giorni"
        ],
        cta: "Verifica l'Impegno e Inizia"
    },
    guarantee: {
        title: "Garanzia di Eccellenza Arcadia",
        description: "Vogliamo solo membri che traggono un valore immenso. Rimborso totale entro 30 giorni se non sei pienamente soddisfatto."
    },
    pricing: {
        planName: "Premium Mensile",
        price: "Su richiesta",
        period: "",
        features: [
            "Libreria Completa Arcadia",
            "Sync di Mercato Live Quotidiani",
            "Eventi Esclusivi di Network",
            "Sistema Copytrading Arcadia"
        ]
    },
    ecosystem: {
        title: "Metodologia Arcadia",
        tagline: "High-Performance Trading System",
        features: [
            { title: "Copy trading FPG · In arrivo", subtitle: "FPG Gold in arrivo: il servizio automatico non è ancora attivo." },
            { title: "Analisi Istituzionale", subtitle: "Decodifica dei flussi di capitale dei grandi player." },
            { title: "Protocolli Arcadia", subtitle: "Sistemi di gestione del rischio di livello bancario." },
            { title: "Network d'Elite", subtitle: "Connessioni con trader professionisti internazionali." },
            { title: "Concierge Trading", subtitle: "Supporto tecnico e psicologico h24 personalizzato." }
        ]
    },
    proof: {
        title: "Numeri, non parole",
        stats: [
            { value: "$860,5k", label: "Netto calcolato", helper: "860.545,06 USD · Exness" },
            { value: "$5,1 mld+", label: "Volume negoziato", helper: "5.116.344.767,42 USD" },
            { value: "12.500", label: "Ordini chiusi", helper: "Tutti i conti · ultimi 365 giorni" }
        ],
        footnote: "Fonte: riepilogo Exness fornito dal titolare il 30 settembre 2026, tutti i conti, ultimi 365 giorni alla data del riepilogo. Netto calcolato: 1.313.698,49 USD di profitti − 356.789,69 USD di perdite − 96.363,74 USD di costi = 860.545,06 USD. Il volume non è profitto. Questi dati non rappresentano i risultati dei clienti delle sale Gold. I risultati passati non garantiscono risultati futuri."
    }
};
