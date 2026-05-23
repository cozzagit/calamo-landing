export function WhatItIs() {
  return (
    <section id="cosa-fa" className="py-24 md:py-32 bg-paper-deep/40 paper-noise">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto reveal">
          <p className="eyebrow mb-3">Tre cose in una</p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-tight text-ink">
            Editor, libro mastro,
            <br />
            <em className="text-leather">coautore.</em>
          </h2>
          <p className="lead mt-6 mx-auto">
            Calamo non è un generatore di testo. È un ambiente di scrittura che
            ricorda cosa hai stabilito, ti propone quando chiedi, e tiene
            traccia di tutto quello che fai.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-20">
          <Pillar
            icon="✎"
            title="Scrittura"
            body="Editor letterario senza fronzoli. Tipografia editoriale curata: Cormorant per i titoli, Source Serif per il corpo, capolettera sul primo paragrafo, giustificato con sillabazione automatica. Auto-save invisibile."
          />
          <Pillar
            icon="❦"
            title="Story Bible"
            body="Personaggi, luoghi, ambientazioni, oggetti, timeline. Tutti collegati: cambia il nome di un personaggio e Calamo aggiorna le scene già scritte. Verifica la coerenza tra Bible e manoscritto a comando."
          />
          <Pillar
            icon="✦"
            title="Coautore AI"
            body="Claude, GPT-5 o entrambi in tandem. Genera intere scaletta, riscrive scene con prompt in linguaggio naturale, propone biforcazioni di trama, beta-reading mirato, controllo coerenza dell'intero libro."
          />
        </div>

        <div className="ornament-rule">
          <span className="text-xs">✦</span>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl mx-auto reveal">
          <FactLine label="Provider AI" value="Claude o GPT-5 (almeno uno richiesto) · entrambi insieme = Writer + Editor" />
          <FactLine label="Tipi di opera" value="Romanzo · Racconto · Raccolta racconti · Poesia · Raccolta poesie · Memoir · Saggio · Manuale · Sceneggiatura · Libro per bambini" />
          <FactLine label="Export" value="PDF impaginato (Paged.js) · EPUB 3 (Amazon KDP, Apple Books, Kobo)" />
          <FactLine label="Privacy" value="Tutto locale · niente account · niente telemetria · backup automatici" />
          <FactLine label="Piattaforme" value="Windows · macOS (Linux in roadmap)" />
          <FactLine label="Lingue" value="Italiano · English (UI + AI nativa in entrambe)" />
        </div>
      </div>
    </section>
  );
}

function Pillar({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <article className="feature-card reveal">
      <span className="text-leather/70 text-3xl block leading-none">{icon}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function FactLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-leather/15 py-2.5">
      <span className="eyebrow whitespace-nowrap shrink-0 w-32">{label}</span>
      <span className="text-[15px] text-ink/85">{value}</span>
    </div>
  );
}
