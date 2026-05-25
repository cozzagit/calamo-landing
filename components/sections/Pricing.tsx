export function Pricing() {
  return (
    <section id="prezzo" className="py-24 md:py-32">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto reveal">
          <p className="eyebrow mb-3">Prezzo</p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-tight text-ink">
            Una tariffa <em className="text-leather">onesta</em>,
            <br />
            zero abbonamenti.
          </h2>
          <p className="lead mt-6 mx-auto">
            Compri Calamo una volta. Lo possiedi. Le tue API key, il tuo libro,
            il tuo computer.
          </p>
        </div>

        <div className="max-w-md mx-auto mt-16 reveal">
          <article className="rounded-2xl border-2 border-leather/30 bg-paper p-8 md:p-10 shadow-[0_20px_60px_-20px_rgba(122,100,72,0.4)] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-leather text-paper text-[10px] uppercase tracking-[0.18em] px-3 py-1 rounded-full font-sans font-medium">
                accesso anticipato
              </span>
            </div>

            <div className="text-center mb-7">
              <p className="eyebrow mb-3">Licenza completa</p>
              <p className="font-serif text-7xl md:text-8xl text-ink leading-none">
                € 49
              </p>
              <p className="text-sm text-ink/60 mt-2 font-sans italic">
                una sola volta · no abbonamenti · Win + macOS
              </p>
            </div>

            <ul className="space-y-3 mb-8 text-[15px] text-ink/80">
              <Inc>Editor letterario completo (TipTap + ProseMirror)</Inc>
              <Inc>Story Bible · personaggi, luoghi, lore, oggetti, timeline</Inc>
              <Inc>Magic Start + Magic Structure (genera mondo + scaletta)</Inc>
              <Inc>Scrivi capitolo con AI · concatenazione automatica</Inc>
              <Inc>Beta Reader · Spinoff Engine · Coherence Check</Inc>
              <Inc>Interventi d'autore con cascade e revert</Inc>
              <Inc>Export PDF impaginato + EPUB 3 per KDP/Apple/Kobo</Inc>
              <Inc>
                <strong>Tutti i provider AI inclusi</strong> · Claude · GPT-5 · Combinato (Writer + Editor)
              </Inc>
              <Inc>Tutto locale, niente cloud, backup automatici</Inc>
              <Inc>Aggiornamenti gratuiti per la versione major corrente</Inc>
            </ul>

            <a href="#beta" className="btn-primary w-full justify-center !py-3.5">
              Entra nella beta gratuita
            </a>
            <p className="text-center text-xs text-ink/50 mt-3 font-sans italic">
              I primi 50 beta tester avranno accesso a vita all'aggiornamento
              v1.0
            </p>
          </article>

          <div className="mt-8 rounded-lg border-2 border-brass/50 bg-brass/12 px-5 py-4">
            <p className="text-[12px] uppercase tracking-[0.12em] text-leather font-sans font-medium mb-2 flex items-center gap-2">
              <span>⚠</span>
              Cosa serve <em className="text-leather/70 normal-case tracking-normal">oltre</em> a Calamo
            </p>
            <p className="text-[14px] text-ink/85 leading-relaxed">
              Per usare le funzioni AI serve <strong>almeno una</strong> tra
              Anthropic Claude API e OpenAI API, con un piano attivo. Non
              forniamo le chiavi noi: le ottieni direttamente dai provider e
              le incolli una volta nelle Impostazioni — restano sul tuo
              computer, Calamo non le vede mai.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-3 text-[13px]">
              <a
                href="https://console.anthropic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-leather/20 bg-paper px-3 py-2 hover:border-leather/50 transition-colors"
              >
                <span className="block text-[10px] uppercase tracking-wider text-leather/70 font-sans">
                  Anthropic
                </span>
                <span className="text-leather">console.anthropic.com →</span>
              </a>
              <a
                href="https://platform.openai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-leather/20 bg-paper px-3 py-2 hover:border-leather/50 transition-colors"
              >
                <span className="block text-[10px] uppercase tracking-wider text-leather/70 font-sans">
                  OpenAI
                </span>
                <span className="text-leather">platform.openai.com →</span>
              </a>
            </div>
          </div>

          <p className="text-center text-xs text-ink/45 mt-6 max-w-md mx-auto font-sans italic">
            I costi delle API sono separati e fatturati direttamente dal
            provider. Per un romanzo medio: ~€ 5–15 in token con Claude o
            GPT-5 singoli, ~€ 12–35 in modalità Combinata (Writer + Editor).
          </p>
        </div>
      </div>
    </section>
  );
}

function Inc({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="text-leather shrink-0 mt-1">✓</span>
      <span>{children}</span>
    </li>
  );
}
