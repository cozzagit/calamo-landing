export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* texture */}
      <div className="absolute inset-0 paper-noise opacity-50 pointer-events-none" />

      <div className="container-wide relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Pill */}
          <div className="animate-fade-in flex justify-center">
            <span className="pill">
              <span className="pill-dot" />
              software desktop · locale · niente cloud
            </span>
          </div>

          {/* Ornamento sopra */}
          <div className="flex items-center justify-center gap-3 mt-10 mb-6 text-leather/40 animate-fade-in">
            <span className="text-sm">❦</span>
            <span className="h-px w-20 bg-leather/30" />
            <span className="text-sm">✦</span>
            <span className="h-px w-20 bg-leather/30" />
            <span className="text-sm">❦</span>
          </div>

          {/* Wordmark */}
          <h1
            className="font-serif text-7xl md:text-9xl tracking-tightest leading-[0.95] text-ink animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Calamo
          </h1>

          <p
            className="font-serif italic text-2xl md:text-3xl text-leather mt-6 max-w-2xl mx-auto leading-tight animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            L'editor letterario che legge il tuo libro mentre lo scrivi.
          </p>

          <p
            className="mt-7 text-lg md:text-xl text-ink/70 max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.55s" }}
          >
            Per romanzieri, autori di racconti, poeti, sceneggiatori, saggisti.
            Un coautore <em>colto</em> che tiene il filo, la coerenza e il
            ritmo — non un chatbot generalista.
          </p>

          <div
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
            style={{ animationDelay: "0.75s" }}
          >
            <a href="#beta" className="btn-primary">
              Entra nella beta
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#cosa-fa" className="btn-secondary">
              Scopri come funziona
            </a>
          </div>

          <p
            className="mt-6 text-xs text-ink/50 tracking-wide font-sans animate-fade-up"
            style={{ animationDelay: "0.9s" }}
          >
            Lista d'attesa aperta · accesso anticipato gratuito per i primi 200
          </p>
        </div>

        {/* Mockup app */}
        <div
          className="mt-20 md:mt-28 max-w-5xl mx-auto reveal"
          style={{ transitionDelay: "0.3s" }}
        >
          <AppMockup />
        </div>
      </div>
    </section>
  );
}

/**
 * Mockup statico dell'app Calamo — finestra con titlebar Calamo,
 * binder a sinistra, scena al centro, companion a destra. Tutto in
 * tipografia editoriale, niente screenshot pesante.
 */
function AppMockup() {
  return (
    <div className="rounded-2xl overflow-hidden border border-leather/15 bg-paper shadow-[0_30px_80px_-30px_rgba(122,100,72,0.35)]">
      {/* Titlebar finta */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-paper-deep/60 border-b border-leather/10">
        <span className="h-3 w-3 rounded-full bg-redmark/70" />
        <span className="h-3 w-3 rounded-full bg-brass/70" />
        <span className="h-3 w-3 rounded-full bg-leather/30" />
        <span className="text-xs text-ink/50 ml-3 font-sans">Calamo</span>
        <span className="text-xs text-ink/40 mx-1.5 font-sans">·</span>
        <span className="text-xs text-leather font-sans">La Vena e il Fango</span>
      </div>

      {/* Body 3-col */}
      <div className="grid grid-cols-12 min-h-[420px] md:min-h-[540px]">
        {/* Binder */}
        <aside className="hidden md:flex md:col-span-3 border-r border-leather/10 bg-paper/60 flex-col">
          <div className="px-4 py-3 border-b border-leather/10">
            <p className="text-[10px] uppercase tracking-[0.15em] text-leather/70 font-sans">
              Struttura
            </p>
          </div>
          <ul className="px-2 py-2 space-y-0.5 text-sm">
            {[
              "I — L'uomo che porta una vanga",
              "II — Il consorzio",
              "III — Clem Burridge",
              "IV — Renata",
              "V — La mappa",
              "VI — Josephine parla",
            ].map((t, i) => (
              <li
                key={t}
                className={
                  "px-3 py-1.5 rounded text-[13px] truncate " +
                  (i === 0 ? "bg-leather/10 text-leather font-medium" : "text-ink/70")
                }
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="px-4 pt-5 pb-2 border-t border-leather/10 mt-auto">
            <p className="text-[10px] uppercase tracking-[0.15em] text-leather/70 font-sans">
              Story Bible
            </p>
          </div>
          <ul className="px-2 pb-3 space-y-0.5 text-[13px] text-ink/70">
            <li className="px-3 py-1">Personaggi · 6</li>
            <li className="px-3 py-1">Luoghi · 4</li>
            <li className="px-3 py-1">Ambientazioni · 3</li>
          </ul>
        </aside>

        {/* Editor */}
        <section className="col-span-12 md:col-span-6 p-7 md:p-10">
          <div className="text-center mb-6">
            <p className="text-leather/70 font-serif text-3xl tracking-widest leading-none">I</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-leather/60 mt-1 mb-3 font-sans">
              Capitolo
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-ink leading-tight">
              L'uomo che porta una vanga
            </h3>
          </div>

          <div className="text-[14.5px] leading-[1.85] text-ink/85 text-justify space-y-2">
            <p>
              <span className="float-left font-serif text-[3em] leading-[0.8] pr-1 pt-1 text-leather">
                I
              </span>
              l funzionario aveva le mani di qualcuno abituato a toccare carta,
              non metallo. Dale guardò quelle dita mentre spingevano i fogli
              attraverso lo sportello, le unghie pulite, le nocche mai callose.
              Firmò dove gli veniva indicato senza leggere i paragrafi
              intermedi.
            </p>
            <p>
              Sapeva già cosa c'era scritto: cifre, confini catastali, clausole
              di resa incondizionata. Aveva passato la settimana precedente a
              leggere quelle stesse clausole finché le parole avevano perso
              forma.
            </p>
          </div>
        </section>

        {/* Companion */}
        <aside className="hidden md:flex md:col-span-3 border-l border-leather/10 bg-paper/60 flex-col p-4">
          <div className="flex gap-0.5 mb-4 border-b border-leather/10 -mx-4 px-4 pb-2 text-[10px] uppercase tracking-wider font-sans text-ink/40">
            <span>Mondo</span>
            <span className="mx-2">·</span>
            <span>Note</span>
            <span className="mx-2">·</span>
            <span>Trama</span>
            <span className="mx-2">·</span>
            <span className="text-leather font-medium">AI</span>
          </div>

          <div className="space-y-3 text-[12.5px] leading-relaxed">
            <div className="rounded-lg bg-leather/8 border border-leather/15 p-3">
              <p className="text-[10px] uppercase tracking-wide text-leather/70 font-sans mb-1">
                Calamo
              </p>
              <p className="text-ink/80">
                Dale firma senza guardare: questo segnala rassegnazione, non
                ignoranza. Per rinforzarlo, prova ad aggiungere un gesto delle
                mani — strofinare, stringere.
              </p>
            </div>
            <div className="rounded-lg border border-leather/15 p-3">
              <p className="text-[10px] uppercase tracking-wide text-leather/70 font-sans mb-1">
                Tu
              </p>
              <p className="text-ink/80">
                Cosa c'è di sensoriale che posso aggiungere?
              </p>
            </div>
          </div>

          <div className="mt-auto pt-4">
            <div className="rounded-md border border-brass/40 bg-brass/10 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-leather font-sans mb-0.5">
                Suggerimento
              </p>
              <p className="text-[12px] text-ink/80 leading-relaxed">
                Cosa sta pensando il POV?
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
