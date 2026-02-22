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
        planName: "Iscrizione Pro",
        price: "1497€",
        period: "/mese",
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
            { title: "Copytrading", subtitle: "Replica le operazioni dei nostri top trader in modo automatico." },
            { title: "Analisi Giornaliera", subtitle: "Setup quotidiani e monitoraggio dei volumi istituzionali." },
            { title: "Strategie Proprietary", subtitle: "Accesso ai protocolli operativi esclusivi di Skitla." },
            { title: "Hub Privato", subtitle: "Community Discord riservata per il confronto costante." },
            { title: "Sessioni Live", subtitle: "Trading in tempo reale con i nostri trader senior." },
            { title: "Supporto Prioritario", subtitle: "Assistenza dedicata per ogni tua esigenza operativa." }
        ]
    },
    proof: {
        title: "Numeri, non parole",
        stats: [
            { value: "95%", label: "Win rate", helper: "Operazioni chiuse in profitto*" },
            { value: "+600k", label: "Profitto 12 mesi", helper: "Periodo: ultimi 12 mesi" },
            { value: "+5 Anni", label: "Storico tracciato", helper: "Track record documentato" }
        ],
        footnote: "*Il trading comporta rischio. I risultati passati non garantiscono risultati futuri."
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
        planName: "Pass Platinum",
        price: "1497€",
        period: "/mese",
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
            { title: "Copytrading", subtitle: "Automazione professionale per replicare i flussi operativi d'elite." },
            { title: "Analisi Istituzionale", subtitle: "Decodifica dei flussi di capitale dei grandi player." },
            { title: "Protocolli Arcadia", subtitle: "Sistemi di gestione del rischio di livello bancario." },
            { title: "Network d'Elite", subtitle: "Connessioni con trader professionisti internazionali." },
            { title: "Concierge Trading", subtitle: "Supporto tecnico e psicologico h24 personalizzato." }
        ]
    },
    proof: {
        title: "Numeri, non parole",
        stats: [
            { value: "95%", label: "Win rate", helper: "Operazioni chiuse in profitto*" },
            { value: "+600k", label: "Profitto 12 mesi", helper: "Periodo: ultimi 12 mesi" },
            { value: "+5 Anni", label: "Storico tracciato", helper: "Track record documentato" }
        ],
        footnote: "*Il trading comporta rischio. I risultati passati non garantiscono risultati futuri."
    }
};
