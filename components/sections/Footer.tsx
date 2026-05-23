export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-paper-deep/60 border-t border-leather/15 py-12 paper-noise">
      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <CalamoMark className="h-8 w-8" />
              <span className="font-serif text-xl">Calamo</span>
            </div>
            <p className="text-sm text-ink/65 leading-relaxed max-w-xs">
              L'editor letterario che legge il tuo libro mentre lo scrivi.
              Locale, niente cloud, niente abbonamenti.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">Prodotto</p>
            <ul className="space-y-2 text-sm text-ink/75">
              <li><a href="#cosa-fa" className="hover:text-leather">Cosa fa</a></li>
              <li><a href="#agenti" className="hover:text-leather">I due agenti</a></li>
              <li><a href="#strumenti" className="hover:text-leather">Strumenti di revisione</a></li>
              <li><a href="#prezzo" className="hover:text-leather">Prezzo</a></li>
              <li><a href="#beta" className="hover:text-leather">Beta privata</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">Contatti</p>
            <ul className="space-y-2 text-sm text-ink/75">
              <li>
                <a href="mailto:hello@calamo.app" className="hover:text-leather">
                  hello@calamo.app
                </a>
              </li>
              <li className="text-ink/50 italic">
                Made in Italy · costruito da un autore per autori
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-leather/15 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ink/50 font-sans">
          <span>© {year} Calamo · Tutti i diritti riservati</span>
          <span className="italic">
            <a href="/privacy" className="hover:text-leather">Privacy</a>
            <span className="mx-2 text-ink/30">·</span>
            <a href="/termini" className="hover:text-leather">Termini</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function CalamoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="27" fill="none" stroke="#b89968" strokeWidth="1.6" />
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="36"
        fontStyle="italic"
        fontWeight="500"
        fill="#7a6448"
      >
        C
      </text>
      <line x1="14" y1="48" x2="50" y2="16" stroke="#7a6448" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 50 16 L 53 12 L 51 19 Z" fill="#5a4a35" />
    </svg>
  );
}
