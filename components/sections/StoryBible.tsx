export function StoryBible() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 reveal">
            <p className="eyebrow mb-3">Story Bible</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tightest leading-tight text-ink">
              Il <em className="text-leather">libro mastro</em> del tuo mondo.
            </h2>
            <p className="prose-editorial mt-6">
              Personaggi con motivazioni, archi, segreti. Luoghi con dettagli
              sensoriali, storia, identità. Ambientazioni con regole, eccezioni,
              contraddizioni interessanti. Oggetti che fanno qualcosa nella
              trama. Una timeline che tiene insieme il prima e il dopo.
            </p>
            <p className="prose-editorial">
              Calamo consulta la Bible a <strong>ogni</strong> chiamata AI. La
              prosa che genera non dimentica mai il colore degli occhi del
              protagonista, l'odore della sua città, l'evento accaduto due
              capitoli prima.
            </p>

            <div className="mt-8 rounded-lg border border-brass/40 bg-brass/10 px-5 py-4">
              <p className="eyebrow mb-1">✨ Magic Start</p>
              <p className="text-[15px] text-ink/80 leading-relaxed">
                Dalla sinossi, Calamo propone in pochi secondi un ensemble di
                6 personaggi, 6 luoghi, 6 voci di ambientazione, 4 oggetti
                significativi e 6 eventi timeline.{" "}
                <strong>Tutto modificabile, tutto cancellabile.</strong>
              </p>
            </div>
          </div>

          <div className="md:col-span-7 reveal">
            <CharacterCardsMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function CharacterCardsMockup() {
  const chars = [
    {
      name: "Dale Pruitt",
      role: "protagonist",
      color: "#7a6448",
      one: "Ho passato vent'anni a fondere acciaio per altri. Questa volta fondo per me.",
      motivation: "Trovare un giacimento aurifero su una terra che la legge dice non sua.",
    },
    {
      name: "Clem Burridge",
      role: "antagonist",
      color: "#8b2c1f",
      one: "So già come va a finire. Lo so da trent'anni. Per questo non ho smesso di bere.",
      motivation: "Impedire che Dale scopra quello che la sua famiglia ha sepolto nel 1962.",
    },
    {
      name: "Renata Okafor",
      role: "deuteragonist",
      color: "#3d5a3a",
      one: "Mio padre vendette quella terra convinto di fare la cosa giusta. Io non vendo più niente a nessuno.",
      motivation: "Riprendersi il terreno della famiglia, anche fuori dalla legge.",
    },
    {
      name: "Josephine Pruitt",
      role: "supporting",
      color: "#2e4a6b",
      one: "Non ti ho seguito fin qui per guardare un altro uomo distruggersi su una cosa che non esiste.",
      motivation: "Tenere Dale ancorato alla realtà mentre la perde di vista.",
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {chars.map((c) => (
        <div
          key={c.name}
          className="rounded-xl border border-leather/15 bg-paper p-5 shadow-[0_4px_20px_-8px_rgba(122,100,72,0.2)]"
        >
          <div className="flex items-center gap-2 mb-2.5">
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: c.color }}
              aria-hidden
            />
            <span className="text-[10px] uppercase tracking-[0.12em] text-leather/70 font-sans">
              {c.role}
            </span>
          </div>
          <h3 className="font-serif text-2xl leading-tight mb-2.5 text-ink">
            {c.name}
          </h3>
          <p className="font-serif italic text-[14px] text-ink/70 leading-snug mb-3 border-l-2 border-leather/25 pl-3">
            “{c.one}”
          </p>
          <p className="text-[12.5px] text-ink/60 leading-relaxed">
            <strong className="text-leather/80 font-sans uppercase text-[10px] tracking-wider not-italic block mb-0.5">
              Vuole
            </strong>
            {c.motivation}
          </p>
        </div>
      ))}
    </div>
  );
}
