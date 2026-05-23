export function Interventions() {
  return (
    <section className="py-24 md:py-32 bg-paper-deep/40 paper-noise">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 reveal">
            <p className="eyebrow mb-3">Interventi d'autore</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tightest leading-tight text-ink">
              Riscrivi il libro in <em className="text-leather">linguaggio
              naturale</em>.
            </h2>
            <p className="prose-editorial mt-6">
              "Rendilo più cupo dal capitolo 5". "Fai morire Renata nella
              scena del faro". "Cambia la motivazione di Clem in vendetta
              invece che dovere". Sono comandi che daresti a un coautore
              umano. Calamo li capisce.
            </p>

            <ol className="mt-8 space-y-4">
              <Step n="1" title="Scrivi il prompt">
                Su una scena, su un capitolo, o sull'intero libro. Linguaggio
                naturale, lungo o breve.
              </Step>
              <Step n="2" title="Calamo riscrive">
                La scena viene riscritta rispettando il prompt + la Story
                Bible + tutti gli interventi precedenti.
              </Step>
              <Step n="3" title="Cascade strategy">
                Scegli se propagare l'effetto: <em>solo qui</em>, <em>questo
                capitolo</em>, <em>da qui in avanti</em>. Le scene successive
                vengono adattate per restare coerenti.
              </Step>
              <Step n="4" title="Snapshot e traccia">
                Ogni intervento conserva il prima e il dopo di ogni scena
                toccata. Un click su Revert ripristina tutto.
              </Step>
            </ol>
          </div>

          <div className="md:col-span-6 reveal">
            <InterventionMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="font-serif italic text-3xl text-brass/70 leading-none shrink-0 w-10 text-right">
        {n}
      </span>
      <div>
        <p className="font-serif text-lg text-ink leading-tight">{title}</p>
        <p className="text-[14.5px] text-ink/70 leading-relaxed mt-1">
          {children}
        </p>
      </div>
    </li>
  );
}

function InterventionMockup() {
  return (
    <div className="rounded-xl border border-leather/15 bg-paper overflow-hidden shadow-[0_10px_40px_-15px_rgba(122,100,72,0.3)]">
      <div className="px-5 py-3 border-b border-leather/10 flex items-center gap-2.5">
        <span className="text-leather">✶</span>
        <span className="font-serif italic text-leather text-sm">
          Intervento d'autore
        </span>
      </div>

      <div className="px-5 py-5">
        <p className="eyebrow mb-2">Il tuo prompt</p>
        <div className="rounded-lg bg-leather/8 border border-leather/15 p-4 mb-5">
          <p className="font-serif italic text-[15px] text-ink/85 leading-relaxed">
            Da qui in avanti rendi Clem più ambiguo, non malvagio. Lascialo
            come uno che pensa di proteggere la comunità. Le scene successive
            devono lasciar trapelare questo dubbio.
          </p>
        </div>

        <p className="eyebrow mb-2">Propagazione</p>
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-[12px] px-3 py-1 rounded-full border border-leather/30 text-ink/50 font-sans">
            solo questa scena
          </span>
          <span className="text-[12px] px-3 py-1 rounded-full border border-leather/30 text-ink/50 font-sans">
            questo capitolo
          </span>
          <span className="text-[12px] px-3 py-1 rounded-full bg-leather text-paper font-sans font-medium">
            ✓ da qui in avanti
          </span>
        </div>

        <p className="eyebrow mb-2">Scene impattate · 4</p>
        <ul className="space-y-1.5 text-[13px] text-ink/70">
          <li className="flex items-baseline gap-2">
            <span className="text-leather">↻</span>
            <span className="font-serif italic">Capitolo III — Clem Burridge e il peso dei trent'anni</span>
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-leather">↻</span>
            <span className="font-serif italic">Capitolo V — La mappa che non doveva esistere</span>
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-leather">↻</span>
            <span className="font-serif italic">Capitolo VII — Harlan Voss riceve una visita</span>
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-leather">↻</span>
            <span className="font-serif italic">Capitolo IX — La vena e il fango</span>
          </li>
        </ul>

        <div className="mt-5 flex items-center gap-3">
          <button className="btn-primary !py-2 !px-4 !text-sm">
            Applica intervento
          </button>
          <span className="text-xs text-ink/45 font-sans italic">
            ~40 secondi · reversibile
          </span>
        </div>
      </div>
    </div>
  );
}
