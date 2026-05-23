export function LocalFirst() {
  return (
    <section className="py-24 md:py-32 bg-paper-deep/40 paper-noise">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 reveal">
            <p className="eyebrow mb-3">Local-first</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tightest leading-tight text-ink">
              Il tuo libro <em className="text-leather">resta tuo</em>.
            </h2>
            <p className="prose-editorial mt-6">
              Tutto vive in un singolo file <code className="text-[14px] bg-paper px-1.5 py-0.5 rounded border border-leather/15">.db</code> sul tuo computer.
              Niente account da creare, niente sincronizzazione obbligatoria,
              niente abbonamento per accedere ai tuoi capitoli.
            </p>
            <p className="prose-editorial">
              Le chiamate AI vanno direttamente da Anthropic o OpenAI con la
              tua chiave. <strong>Calamo non vede mai cosa scrivi, le tue chiavi
              API, le tue idee.</strong> Nessun server intermediario, nessuna
              telemetria, nessun tracking.
            </p>

            <div className="grid grid-cols-2 gap-5 mt-8">
              <Pill title="0 account" sub="Niente registrazione, mai" />
              <Pill title="0 telemetria" sub="Calamo non si connette a Calamo" />
              <Pill title="100% locale" sub="Tutto in app_data_dir/calamo.db" />
              <Pill title="Tue API key" sub="Anthropic / OpenAI · solo tue" />
            </div>
          </div>

          <div className="md:col-span-6 reveal">
            <BackupMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="border-l-2 border-brass/60 pl-4">
      <p className="font-serif text-2xl text-leather leading-none">{title}</p>
      <p className="text-[12px] text-ink/55 mt-1 font-sans italic">{sub}</p>
    </div>
  );
}

function BackupMockup() {
  const backups = [
    { name: "calamo-1748059280.db", size: "894 KB", when: "ora" },
    { name: "calamo-1747987452.db", size: "891 KB", when: "ieri, 19:42" },
    { name: "calamo-1747921204.db", size: "883 KB", when: "2 giorni fa" },
    { name: "calamo-1747838815.db", size: "879 KB", when: "3 giorni fa" },
    { name: "calamo-1747744421.db", size: "871 KB", when: "5 giorni fa" },
    { name: "calamo-1747647309.db", size: "864 KB", when: "6 giorni fa" },
  ];
  return (
    <div className="rounded-xl border border-leather/15 bg-paper p-6 shadow-[0_10px_40px_-15px_rgba(122,100,72,0.3)]">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-leather">📁</span>
        <span className="font-serif italic text-leather text-base">
          %APPDATA%\app.calamo.desktop\backups\
        </span>
      </div>
      <p className="text-xs text-ink/55 font-sans mb-5 italic">
        Calamo copia il database a ogni avvio dell'app. Tiene gli ultimi 30
        backup. Anche se una nostra migration sbagliasse — è successo a noi —
        torni indietro in 30 secondi.
      </p>

      <ul className="font-mono text-[12.5px] space-y-1.5">
        {backups.map((b, i) => (
          <li
            key={b.name}
            className={
              "flex items-baseline gap-3 px-3 py-1.5 rounded " +
              (i === 0 ? "bg-leather/8 text-leather" : "text-ink/65")
            }
          >
            <span className="truncate flex-1">{b.name}</span>
            <span className="text-ink/40">{b.size}</span>
            <span className="text-ink/50 italic text-[11px] font-sans">
              {b.when}
            </span>
          </li>
        ))}
        <li className="text-center text-[11px] text-ink/30 font-sans italic pt-2">
          + altri 24 backup mantenuti automaticamente
        </li>
      </ul>
    </div>
  );
}
