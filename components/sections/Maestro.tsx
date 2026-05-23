export function Maestro() {
  return (
    <section
      id="maestro"
      className="py-24 md:py-32 bg-paper-deep/40 paper-noise relative overflow-hidden"
    >
      <div className="container-wide relative">
        <div className="text-center max-w-3xl mx-auto reveal">
          <p className="eyebrow mb-3">Modalità Maestro</p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-tight text-ink">
            Dalla sinossi all'
            <em className="text-leather">ultima pagina</em>.
            <br />
            In autonomia.
          </h2>
          <p className="lead mt-6 mx-auto">
            Una modalità tutto-in-uno: Calamo genera personaggi, luoghi,
            ambientazioni, oggetti, timeline, scaletta capitoli e prosa di
            ogni scena — in sequenza, autonomamente. Tu prendi un caffè
            (lungo).
          </p>
        </div>

        {/* Pipeline 8 step */}
        <div className="mt-16 md:mt-20 max-w-5xl mx-auto reveal">
          <ol className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Step n="1" icon="👤" label="Personaggi" />
            <Step n="2" icon="📍" label="Luoghi" />
            <Step n="3" icon="🌍" label="Mondo" />
            <Step n="4" icon="📦" label="Oggetti" />
            <Step n="5" icon="🕰️" label="Timeline" />
            <Step n="6" icon="📜" label="Scaletta" />
            <Step n="7" icon="🎬" label="Scene" />
            <Step n="8" icon="✒️" label="Prosa" />
          </ol>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto reveal">
          <Stat
            label="Cosa serve"
            value="1 sinossi"
            sub="60-120 parole bastano. Il resto lo trova Calamo."
          />
          <Stat
            label="Quanto dura"
            value="~10-25 min"
            sub="A seconda della lunghezza scelta e del provider"
          />
          <Stat
            label="Costo API stimato"
            value="€2-7"
            sub="Per un romanzo medio. Pagato direttamente al provider AI."
          />
        </div>

        {/* Highlight box */}
        <div className="max-w-3xl mx-auto mt-12 rounded-xl border-2 border-brass/40 bg-paper p-6 md:p-8 reveal">
          <p className="eyebrow mb-2 text-leather">Sicurezza prima di tutto</p>
          <ul className="space-y-2.5 text-[15px] text-ink/85 leading-relaxed">
            <li className="flex gap-3">
              <span className="text-leather shrink-0 mt-1">◆</span>
              <span>
                <strong>Salvataggio progressivo</strong>: ogni passo viene
                scritto sul disco man mano. Se interrompi, riparti dove eri
                — nessuna perdita.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-leather shrink-0 mt-1">◆</span>
              <span>
                <strong>Bottone "Ferma" sempre disponibile</strong>: ti
                sembra che stia andando in una direzione sbagliata? Stop, e
                tutto quello che ha fatto fino a quel momento resta tuo.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-leather shrink-0 mt-1">◆</span>
              <span>
                <strong>Backup automatico</strong> del database a ogni
                avvio dell'app. Anche se cambi idea il giorno dopo,
                ripristini in 30 secondi.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-leather shrink-0 mt-1">◆</span>
              <span>
                <strong>Tutto modificabile</strong>: alla fine apri la
                lettura, leggi il libro, e poi ti tuffi a limare ogni
                singola scena come faresti con qualunque manoscritto.
              </span>
            </li>
          </ul>
        </div>

        <p className="text-center mt-10 text-sm text-ink/55 italic font-serif max-w-2xl mx-auto reveal">
          La Modalità Maestro non scrive il libro <em>al posto tuo</em>: ti
          dà una bozza completa, ricca di scelte concrete, su cui tornare,
          ribaltare, riscrivere. Lo strumento perfetto per superare il
          blocco della pagina bianca.
        </p>
      </div>
    </section>
  );
}

function Step({
  n,
  icon,
  label,
}: {
  n: string;
  icon: string;
  label: string;
}) {
  return (
    <li className="rounded-lg border border-leather/15 bg-paper p-4 text-center hover:border-leather/40 transition-colors">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-serif italic text-3xl text-brass/70 leading-none">
          {n}
        </span>
        <span className="text-2xl" aria-hidden>
          {icon}
        </span>
      </div>
      <p className="font-serif text-base text-ink">{label}</p>
    </li>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="text-center reveal">
      <p className="eyebrow mb-2">{label}</p>
      <p className="font-serif text-4xl md:text-5xl text-leather leading-none">
        {value}
      </p>
      <p className="text-xs text-ink/60 mt-2 italic font-sans max-w-[200px] mx-auto">
        {sub}
      </p>
    </div>
  );
}
