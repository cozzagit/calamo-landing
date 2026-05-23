export function Structure() {
  return (
    <section className="py-24 md:py-32 bg-paper-deep/40 paper-noise">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-6 reveal order-2 md:order-1">
            <ChapterListMockup />
          </div>

          <div className="md:col-span-6 reveal order-1 md:order-2">
            <p className="eyebrow mb-3">Struttura narrativa</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tightest leading-tight text-ink">
              Dall'idea all'<em className="text-leather">intero libro</em>,
              <br />
              capitolo dopo capitolo.
            </h2>
            <p className="prose-editorial mt-6">
              <strong>Magic Structure</strong> genera la scaletta di tutto il
              libro in un colpo, distribuendo le tappe nei tre atti classici:
              25% atto I (presentazione, incidente scatenante), 50% atto II
              (complicazioni, punto di non ritorno), 25% atto III (climax,
              risoluzione). Ogni capitolo ha un titolo evocativo e un
              riassunto che spiega cosa succede e perché conta.
            </p>
            <p className="prose-editorial">
              <strong>Scrivi capitolo con AI</strong> trasforma una riga di
              riassunto in scene strutturate (POV, luogo, beat) e poi in prosa
              compiuta. Puoi concatenare automaticamente "Scrivi prossimo
              capitolo" e tornare un'ora dopo a trovare tre capitoli da
              limare.
            </p>

            <ul className="mt-8 space-y-3 text-[15px] text-ink/80">
              <Li>
                <strong>Espandi struttura</strong> aggiunge capitoli in coda
                senza duplicare i beat già stabiliti.
              </Li>
              <Li>
                <strong>Stale Scenes</strong> segnala con un badge le scene
                che potrebbero stridere dopo una modifica alla Bible.
              </Li>
              <Li>
                <strong>Rename Cascade</strong> rinomina un personaggio in
                tutto il manoscritto con un controllo word-boundary Unicode.
              </Li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="text-brass shrink-0 mt-1">◆</span>
      <span>{children}</span>
    </li>
  );
}

function ChapterListMockup() {
  const chapters = [
    { n: "I", title: "L'uomo che porta una vanga", words: "2.412p", act: "I" },
    { n: "II", title: "Il consorzio", words: "1.873p", act: "I" },
    { n: "III", title: "Clem Burridge e il peso dei trent'anni", words: "1.200p", act: "I" },
    { n: "IV", title: "Renata", words: "1.245p", act: "II", current: true },
    { n: "V", title: "Il consorzio e la mappa che non doveva esistere", words: "1.163p", act: "II" },
    { n: "VI", title: "Josephine parla una volta sola", words: "1.184p", act: "II" },
    { n: "VII", title: "Harlan Voss riceve una visita", words: "1.757p", act: "II" },
    { n: "VIII", title: "Quello che c'è sotto", words: "1.941p", act: "III" },
    { n: "IX", title: "La vena e il fango", words: "1.964p", act: "III" },
  ];

  return (
    <div className="rounded-xl border border-leather/15 bg-paper overflow-hidden shadow-[0_10px_40px_-15px_rgba(122,100,72,0.3)]">
      <div className="px-5 py-3 border-b border-leather/10 flex items-center gap-3">
        <span className="font-serif italic text-leather text-sm">
          La Vena e il Fango
        </span>
        <span className="text-xs text-ink/40">·</span>
        <span className="text-xs text-ink/60 font-sans">9 capitoli</span>
        <span className="text-xs text-ink/40">·</span>
        <span className="text-xs text-ink/60 font-sans tabular-nums">14.739 parole</span>
      </div>

      <ul className="divide-y divide-leather/10">
        {chapters.map((c) => (
          <li
            key={c.n}
            className={
              "flex items-baseline gap-4 px-5 py-3 transition-colors " +
              (c.current ? "bg-leather/8" : "hover:bg-brass/5")
            }
          >
            <span className="font-serif text-leather/70 text-lg tracking-wider w-10 text-right shrink-0">
              {c.n}
            </span>
            <span className="flex-1 text-[15px] truncate">{c.title}</span>
            <span className="text-[11px] uppercase tracking-wider text-leather/50 font-sans">
              Atto {c.act}
            </span>
            <span className="text-leather/60 text-xs tabular-nums w-16 text-right">
              {c.words}
            </span>
          </li>
        ))}
      </ul>

      <div className="px-5 py-3 border-t border-leather/10 bg-paper/60 flex items-center gap-3">
        <span className="text-leather text-sm">✨</span>
        <span className="text-[13px] text-leather italic">
          Scrivi il prossimo capitolo con l'AI
        </span>
      </div>
    </div>
  );
}
