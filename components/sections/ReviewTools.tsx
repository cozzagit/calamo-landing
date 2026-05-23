export function ReviewTools() {
  return (
    <section id="strumenti" className="py-24 md:py-32">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto reveal">
          <p className="eyebrow mb-3">Tre strumenti di revisione</p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-tight text-ink">
            Tre <em className="text-leather">lenti</em> sul tuo libro.
          </h2>
          <p className="lead mt-6 mx-auto">
            Complementari, non alternativi. Si usano in momenti diversi della
            scrittura.
          </p>
        </div>

        <div className="mt-16 md:mt-20 space-y-12 md:space-y-16">
          <Tool
            number="01"
            tag="Quando una scena ti sembra fatta"
            title="Beta Reader"
            description="Analizza una scena (o l'intero libro) e produce note con severità info / warn / critical divise per categoria: ripetizione, continuità, personaggio, dialogo, ritmo, stile, ortografia, tema."
            features={[
              "Estratto verbatim dal testo + commento dell'editor",
              "Riformulazione pronta da incollare (editabile)",
              'Bottone "Applica al manoscritto" — find/replace con whitespace tollerante',
              'Marcatura automatica "addressed" dopo applicazione',
            ]}
            mockup={<BetaReaderMockup />}
          />

          <Tool
            number="02"
            tag="Quando vuoi esplorare un'altra strada"
            title="Spinoff Engine"
            description="Da una scena, propone 5 biforcazioni alternative della trama con toni diversi. Ogni proposta include cosa cambia + conseguenze sugli archi a valle."
            features={[
              "Twist — colpo di scena imprevisto",
              "Subversion — sovversione del cliché atteso",
              "Deepening — approfondimento emotivo del momento",
              "Darkening — sterzata tragica più cupa",
              "Lightening — alleggerimento, scampo, respiro",
            ]}
            mockup={<SpinoffMockup />}
            reverse
          />

          <Tool
            number="03"
            tag="Quando il libro è quasi finito"
            title="Coherence Check"
            description="Scansiona l'intero manoscritto contro la Story Bible corrente. Trova contraddizioni che a occhio nudo si perdono."
            features={[
              "Personaggi descritti in modo incompatibile con la scheda",
              "Luoghi diversi dal definito",
              "Regole del mondo violate",
              'Fatti contraddetti tra capitoli (es. "35 anni" → "40 anni")',
              "Sequenze temporali sballate",
              "Per ogni issue: severity + estratto + riscrittura proposta",
            ]}
            mockup={<CoherenceMockup />}
          />
        </div>
      </div>
    </section>
  );
}

function Tool({
  number,
  tag,
  title,
  description,
  features,
  mockup,
  reverse,
}: {
  number: string;
  tag: string;
  title: string;
  description: string;
  features: string[];
  mockup: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <article className="grid md:grid-cols-12 gap-10 md:gap-14 items-center reveal">
      <div
        className={
          "md:col-span-5 " + (reverse ? "md:order-2 md:col-start-8" : "")
        }
      >
        <div className="flex items-baseline gap-4 mb-4">
          <span className="font-serif text-5xl text-brass/60 leading-none">
            {number}
          </span>
          <span className="eyebrow">{tag}</span>
        </div>
        <h3 className="font-serif text-3xl md:text-4xl tracking-tight text-ink mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-[16px] text-ink/75 leading-relaxed mb-5">
          {description}
        </p>
        <ul className="space-y-2">
          {features.map((f, i) => (
            <li key={i} className="flex gap-3 text-[14.5px] text-ink/75">
              <span className="text-brass shrink-0 mt-1">◆</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={
          "md:col-span-7 " + (reverse ? "md:order-1 md:col-end-7" : "")
        }
      >
        {mockup}
      </div>
    </article>
  );
}

// ----------------------------------------------------------------------------
// Mockup decorativi — note di Beta Reader, biforcazioni Spinoff, issues coerenza.
// ----------------------------------------------------------------------------

function BetaReaderMockup() {
  const notes = [
    {
      severity: "critical",
      cat: "Continuità",
      excerpt: "Dale guardò il sole basso a est…",
      body: "Il sole non sorge a est in questa stagione narrativa.",
    },
    {
      severity: "warn",
      cat: "Ripetizione",
      excerpt: '…quelle dita mentre spingevano i fogli. Firmò. Quelle dita',
      body: "“Quelle dita” compare tre volte in dieci righe.",
    },
    {
      severity: "info",
      cat: "Dialogo",
      excerpt: "“Non ti ho seguito fin qui per guardare un altro uomo distruggersi.”",
      body: "Voce forte e coerente con Josephine — niente da modificare.",
    },
  ];
  return (
    <div className="rounded-xl border border-leather/15 bg-paper overflow-hidden shadow-[0_10px_40px_-15px_rgba(122,100,72,0.3)]">
      <div className="px-5 py-3 border-b border-leather/10 flex items-center gap-2.5">
        <span className="text-leather">👁</span>
        <span className="font-serif italic text-leather text-sm">Beta Reader</span>
        <span className="text-xs text-ink/40 ml-auto font-sans">
          3 note · cap. I scena 1
        </span>
      </div>
      <ul className="divide-y divide-leather/10">
        {notes.map((n, i) => (
          <li key={i} className="px-5 py-4">
            <div className="flex items-baseline gap-2 mb-2">
              <SeverityBadge severity={n.severity} />
              <span className="text-[10px] uppercase tracking-wider text-leather/60 font-sans">
                {n.cat}
              </span>
            </div>
            <p className="font-serif italic text-[14px] text-ink/70 border-l-2 border-leather/25 pl-3 mb-2 leading-snug">
              “{n.excerpt}”
            </p>
            <p className="text-[13.5px] text-ink/80 leading-relaxed">{n.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    critical: "bg-redmark/15 text-redmark",
    warn: "bg-brass/20 text-leather",
    info: "bg-leather/10 text-leather/70",
  };
  return (
    <span
      className={
        "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-sans font-medium " +
        (colors[severity] ?? "bg-ink/10 text-ink/60")
      }
    >
      {severity}
    </span>
  );
}

function SpinoffMockup() {
  const items = [
    {
      tone: "twist",
      title: "Sotto la vena, un cadavere",
      body: "Dale scava nel posto giusto e trova ossa, non oro. Un anziano del consorzio sa di chi sono.",
    },
    {
      tone: "subversion",
      title: "L'oro c'è davvero",
      body: "Tutti pensavano fosse un'illusione. Non lo è. Ma Dale capisce che possederlo lo rovinerà.",
    },
    {
      tone: "darkening",
      title: "La trincea di Josephine",
      body: "Josephine se ne va prima del finale. Dale rimane solo con un terreno e un debito.",
    },
  ];
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <div
          key={it.tone}
          className="rounded-lg border border-leather/15 bg-paper p-4 shadow-[0_4px_16px_-8px_rgba(122,100,72,0.2)]"
        >
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-[10px] uppercase tracking-[0.12em] text-leather/70 font-sans">
              {it.tone}
            </span>
          </div>
          <h4 className="font-serif text-xl text-ink mb-1.5 leading-snug">
            {it.title}
          </h4>
          <p className="text-[13.5px] text-ink/70 leading-relaxed">{it.body}</p>
        </div>
      ))}
      <p className="text-center text-xs text-ink/40 font-sans italic">
        + altre 2 biforcazioni · deepening, lightening
      </p>
    </div>
  );
}

function CoherenceMockup() {
  const issues = [
    {
      kind: "fact",
      severity: "critical",
      subject: "Dale Pruitt",
      excerpt: "“…aveva trent'anni quando arrivò a Cass Grove…”",
      body: 'Story Bible dice "ex operaio siderurgico del Michigan rimasto senza lavoro" — a trent\'anni? Cap. 1 lascia intendere oltre quaranta.',
    },
    {
      kind: "place",
      severity: "warn",
      subject: "L'Acciaieria di Carver Lake",
      excerpt: "“…la ciminiera, abbattuta nel 1998…”",
      body: "La timeline dice 2003.",
    },
  ];
  return (
    <div className="rounded-xl border border-leather/15 bg-paper overflow-hidden shadow-[0_10px_40px_-15px_rgba(122,100,72,0.3)]">
      <div className="px-5 py-3 border-b border-leather/10 flex items-center gap-2.5">
        <span className="text-leather">🛡️</span>
        <span className="font-serif italic text-leather text-sm">
          Verifica coerenza
        </span>
        <span className="text-xs text-ink/40 ml-auto font-sans">
          2 incongruenze
        </span>
      </div>
      <ul className="divide-y divide-leather/10">
        {issues.map((i) => (
          <li key={i.subject} className="px-5 py-4">
            <div className="flex items-baseline gap-2 mb-2">
              <SeverityBadge severity={i.severity} />
              <span className="text-[12px] text-leather font-medium font-sans">
                {i.subject}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-ink/40 font-sans ml-auto">
                {i.kind}
              </span>
            </div>
            <p className="font-serif italic text-[13.5px] text-ink/70 border-l-2 border-leather/25 pl-3 mb-2">
              “{i.excerpt}”
            </p>
            <p className="text-[13px] text-ink/80 leading-relaxed">{i.body}</p>
            <button
              type="button"
              className="mt-3 text-[11px] uppercase tracking-wider text-leather font-sans font-medium hover:underline"
            >
              ↩ Riscrivi questa scena per allinearla alla Bible
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
