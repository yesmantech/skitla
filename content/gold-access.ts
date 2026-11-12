// Conditions for access to the SKITLA Gold rooms, not broker-wide account minima.
// Broker registration URLs and referral codes are managed by the Telegram bot.
export const GOLD_ACCESS = {
  summary: "Scegli FPG, Exness o Memento nel bot ufficiale. Skitla13 verifica i requisiti prima dell’accesso alle sale Gold.",
  fpgMemento: "FPG e Memento: conto intestato a te e collegato al referral di Skitla13, verifica dell’identità completata e almeno 300€ o equivalente USD accreditati sul conto.",
  exness: "Exness: usa il link partner, se disponibile per la tua residenza e il tuo profilo. SKITLA non impone una soglia di deposito; valgono i requisiti del broker.",
  request: "Avvia @SkitlaSalaSegnaliBot su Telegram e scegli FPG, Exness o Memento. Segui il percorso del broker e invia a @SKITLAService il messaggio preparato dal bot. Skitla13 verifica il conto e i requisiti prima di fornire le istruzioni di accesso.",
  existing: "Nel bot scegli «Ho già un conto» e indica FPG, Exness o Memento. Skitla13 verifica con te il collegamento al referral e i prossimi passi. Contattalo prima di aprire un altro conto.",
  deposit: "Il deposito resta capitale sul tuo conto presso il broker ed è esposto al rischio di trading. Non viene versato agli amministratori Telegram. SKITLA può ricevere commissioni di affiliazione dal broker.",
  membership: "Sono disponibili percorsi Premium mensili e annuali, distinti dall’accesso Gold tramite FPG, Exness o Memento. Contatta @SKITLAService per contenuti, disponibilità, costo e condizioni del piano prima dell’adesione.",
} as const;
