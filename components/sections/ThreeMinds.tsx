export function ThreeMinds() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto reveal">
          <p className="eyebrow mb-3">Tre intelligenze · tre alla pari</p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-tight text-ink">
            Scegli <em className="text-leather">a colpo</em>,
            <br />
            cambia <em className="text-leather">a piacere</em>.
          </h2>
          <p className="lead mt-6 mx-auto">
            Ogni libro può avere il suo provider AI. Funzionano tutti allo
            stesso modo: <strong>basta avere almeno una chiave attiva</strong>
            {" "}— Anthropic o OpenAI — e Calamo è pieno potere.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-16">
          <ProviderCard
            title="Claude"
            subtitle="Anthropic"
            model="claude-sonnet-4-6 + haiku-4-5"
            strength="Prosa letteraria"
            description="Punto forte sulla scrittura narrativa: dialoghi credibili, ritmo curato, niente cliché. Scelta naturale per romanzieri, racconti, memoir."
          />
          <ProviderCard
            title="GPT-5"
            subtitle="OpenAI"
            model="gpt-5 + gpt-5-mini"
            strength="Ragionamento e struttura"
            description="Voce più analitica, forte nell'organizzazione di idee complesse. Per saggistica, sceneggiature, o se preferisci la voce di OpenAI."
          />
          <ProviderCard
            badge="combinato"
            title="Writer + Editor"
            subtitle="Claude × GPT-5"
            model="ibrido in 3 step"
            strength="Qualità massima"
            description="Il pipeline che fa la differenza: Claude scrive, GPT-5 rilegge come editor, Claude riscrive applicando le note. Serve attivare entrambe le API."
          />
        </div>

        <div className="mt-10 max-w-2xl mx-auto rounded-lg border border-brass/40 bg-brass/8 px-5 py-4 text-center reveal">
          <p className="text-[12px] uppercase tracking-[0.12em] text-leather font-sans font-medium mb-2">
            Cosa serve per usare Calamo
          </p>
          <p className="text-[14.5px] text-ink/85 leading-relaxed">
            <strong>Almeno una</strong> chiave API attiva (Anthropic o OpenAI)
            con piano di credito dal provider. Le configuri una volta nei
            Settings di Calamo — restano sul tuo computer, l'app non le vede
            mai. Per la modalità Combinata servono entrambe.
          </p>
        </div>

        <p className="text-center text-sm text-ink/50 italic mt-6 max-w-xl mx-auto font-sans">
          Calamo non vede mai le tue chiavi, non vede mai cosa scrivi, non
          vede nulla.
        </p>
      </div>
    </section>
  );
}

function ProviderCard({
  badge,
  title,
  subtitle,
  model,
  strength,
  description,
}: {
  badge?: string;
  title: string;
  subtitle: string;
  model: string;
  strength: string;
  description: string;
}) {
  return (
    <article className="feature-card reveal relative">
      {badge && (
        <span className="absolute top-4 right-4 text-[9px] uppercase tracking-[0.15em] text-leather/60 font-sans">
          {badge}
        </span>
      )}
      <p className="text-[10px] uppercase tracking-[0.15em] text-leather/70 font-sans mb-1">
        {subtitle}
      </p>
      <h3 className="!mt-0">{title}</h3>
      <p className="text-[12px] font-mono text-ink/55 -mt-1 mb-3 break-all">
        {model}
      </p>
      <p className="text-[11px] uppercase tracking-[0.1em] text-brass/80 font-sans font-medium mb-2">
        {strength}
      </p>
      <p>{description}</p>
    </article>
  );
}
