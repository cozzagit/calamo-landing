export function Export() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto reveal">
          <p className="eyebrow mb-3">Quando il libro è pronto</p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-tight text-ink">
            Esporta <em className="text-leather">come vuoi</em>,
            <br />
            pubblica <em className="text-leather">dove vuoi</em>.
          </h2>
          <p className="lead mt-6 mx-auto">
            Due formati per due scopi. Nessun lock-in. Il file che esce è tuo,
            standard, leggibile ovunque.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-16">
          <ExportCard
            kind="PDF"
            tagline="Per la stampa o la lettura su tablet"
            engine="Paged.js (CSS Paged Media Level 3)"
            features={[
              "Impaginazione A4 editoriale (margini 2.5 / 2 cm)",
              "Frontespizio · indice · capitoli con numerale romano",
              "Running header: titolo libro a sinistra, capitolo a destra",
              "Numero pagina al centro del footer · capolettera sul primo paragrafo di ogni scena",
            ]}
          />
          <ExportCard
            kind="EPUB"
            tagline="Per Kindle, Apple Books, Kobo"
            engine="EPUB 3 standard (con TOC NCX fallback per Kindle vecchi)"
            features={[
              "Amazon KDP — Kindle Direct Publishing",
              "Apple Books for Authors",
              "Kobo Writing Life",
              "Google Play Libri Partner Center",
            ]}
          />
        </div>

        <div className="ornament-rule mt-16">
          <span className="text-xs">✦</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto reveal">
          <Mini
            icon="🔒"
            title="Chiudi libro"
            body='Quando hai finito davvero, marca il libro come "definitivo": le funzioni AI distruttive richiedono di riaprirlo prima. Una cintura contro il click sbagliato.'
          />
          <Mini
            icon="↩"
            title="Sempre reversibile"
            body="Riapri il libro con un click. Niente perdita di dati, mai. Le esportazioni PDF / EPUB restano sempre attive."
          />
          <Mini
            icon="📚"
            title="Niente DRM"
            body="Il file EPUB è puro, senza protezioni proprietarie. Caricalo dove vuoi, ridistribuiscilo come ti pare. È il tuo libro."
          />
        </div>
      </div>
    </section>
  );
}

function ExportCard({
  kind,
  tagline,
  engine,
  features,
}: {
  kind: string;
  tagline: string;
  engine: string;
  features: string[];
}) {
  return (
    <article className="feature-card reveal">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-serif text-6xl text-leather/70 leading-none">
          {kind}
        </span>
        <span className="font-serif italic text-ink/60 text-lg">
          {tagline}
        </span>
      </div>
      <p className="text-[11px] font-mono text-ink/50 mb-4">{engine}</p>
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex gap-3 text-[14.5px] text-ink/80">
            <span className="text-brass shrink-0 mt-1">◆</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Mini({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="text-center px-4 reveal">
      <span className="text-3xl block mb-3">{icon}</span>
      <h4 className="font-serif text-xl text-ink mb-2">{title}</h4>
      <p className="text-[14px] text-ink/65 leading-relaxed">{body}</p>
    </div>
  );
}
