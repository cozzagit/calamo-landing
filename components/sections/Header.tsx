"use client";

import { useEffect, useState } from "react";

const NAV = [
  { href: "#cosa-fa", label: "Cosa fa" },
  { href: "#maestro", label: "Maestro" },
  { href: "#agenti", label: "I due agenti" },
  { href: "#strumenti", label: "Strumenti" },
  { href: "#prezzo", label: "Prezzo" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-leather/10"
          : "bg-transparent")
      }
    >
      <div className="container-wide flex items-center h-16">
        <a href="#top" className="flex items-center gap-2.5 mr-auto" aria-label="Calamo">
          <CalamoMark className="h-8 w-8" />
          <span className="font-serif text-xl tracking-tight leading-none">
            Calamo
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 mr-7">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-ink/70 hover:text-leather transition-colors font-sans"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a href="#beta" className="hidden md:inline-flex btn-primary !py-2 !px-4 !text-sm">
          Beta
        </a>

        <button
          type="button"
          onClick={() => setMobileOpen((s) => !s)}
          className="md:hidden p-2 -mr-2 text-leather"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-paper border-t border-leather/10">
          <div className="container-wide py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-ink/80 hover:text-leather font-sans py-1"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#beta"
              onClick={() => setMobileOpen(false)}
              className="btn-primary !py-2.5 mt-2 self-start"
            >
              Entra in beta
            </a>
          </div>
        </div>
      )}
    </header>
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
