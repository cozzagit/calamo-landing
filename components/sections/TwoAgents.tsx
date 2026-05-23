export function TwoAgents() {
  return (
    <section id="agenti" className="py-24 md:py-32 bg-leather text-paper relative overflow-hidden">
      {/* Texture sopra il fondo cuoio */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="container-wide relative">
        <div className="text-center max-w-3xl mx-auto reveal">
          <p className="eyebrow !text-brass-light mb-3">I due agenti</p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-tight">
            Un <em className="text-brass-light">autore</em> che scrive,
            <br />
            un <em className="text-brass-light">editor</em> che rilegge.
          </h2>
          <p className="font-serif italic text-xl md:text-2xl text-paper/70 mt-6 leading-relaxed max-w-2xl mx-auto">
            La modalità Combinata di Calamo è il primo vero pipeline editoriale
            AI: due modelli, due ruoli distinti, una sola scena di uscita —
            tua.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-16 md:mt-20 max-w-5xl mx-auto reveal">
          <AgentStep
            number="1"
            title="Writer"
            who="Claude Sonnet 4.6"
            color="brass"
            body="Genera la prima versione della scena. Lavora dal tuo brief, dalla Story Bible, dagli interventi precedenti. Restituisce prosa pubblicabile nella voce di Claude."
          />
          <ArrowSeparator />
          <AgentStep
            number="2"
            title="Editor"
            who="GPT-5"
            color="paper"
            body="Rilegge il brano. Produce 3-5 note di revisione mirate: clichés, ripetizioni di parole o strutture, POV drift, dialoghi inverosimili, dettagli sensoriali mancanti, ritmo monotono."
          />
          <ArrowSeparator />
          <AgentStep
            number="3"
            title="Writer (revisione)"
            who="Claude Sonnet 4.6"
            color="brass"
            body="Riscrive il brano applicando le note. Stessa lunghezza, stessa trama, stessa voce — ma il testo che salvi è già passato da un occhio critico."
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16 md:mt-20 max-w-4xl mx-auto reveal">
          <Stat label="Stesso brief" value="✓" sub="Trama identica, eventi identici" />
          <Stat label="Costo per scena" value="~2.5×" sub="Vale per i punti che contano" />
          <Stat label="Tempo per scena" value="~2×" sub="Tra 20s e 50s a scena" />
        </div>

        <p className="text-center mt-12 text-sm text-paper/60 italic font-serif">
          Si attiva al volo: in <strong className="text-paper/80">Modifica
          progetto</strong> scegli "Combinato" e ogni nuova generazione di
          prosa passa dal pipeline.
        </p>
      </div>
    </section>
  );
}

function AgentStep({
  number,
  title,
  who,
  body,
  color,
}: {
  number: string;
  title: string;
  who: string;
  body: string;
  color: "brass" | "paper";
}) {
  return (
    <article
      className={
        "rounded-xl p-6 md:p-7 border " +
        (color === "brass"
          ? "bg-brass/15 border-brass/30 text-paper"
          : "bg-paper/8 border-paper/20 text-paper")
      }
    >
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-serif italic text-5xl text-brass-light/70 leading-none">
          {number}
        </span>
        <span className="text-[10px] uppercase tracking-[0.15em] opacity-60 font-sans">
          {who}
        </span>
      </div>
      <h3 className="font-serif text-3xl mb-3 leading-tight">{title}</h3>
      <p className="text-[14.5px] leading-relaxed opacity-85">{body}</p>
    </article>
  );
}

function ArrowSeparator() {
  return (
    <div className="hidden md:flex items-center justify-center -mx-2">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cdac7c" strokeWidth="1.5">
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </div>
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
    <div className="text-center">
      <p className="text-[10px] uppercase tracking-[0.15em] text-paper/50 font-sans mb-1">
        {label}
      </p>
      <p className="font-serif text-4xl md:text-5xl text-brass-light leading-none">
        {value}
      </p>
      <p className="text-xs text-paper/60 mt-2 font-sans italic">{sub}</p>
    </div>
  );
}
