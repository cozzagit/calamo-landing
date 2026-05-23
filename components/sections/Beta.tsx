"use client";

import { useState } from "react";

const API_ENDPOINT = "/api/signup";

export function Beta() {
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<string>("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), profile }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Errore sconosciuto");
      }
      setState("success");
      setEmail("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Errore di rete");
      setState("error");
    }
  };

  return (
    <section id="beta" className="py-24 md:py-32 bg-leather text-paper relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="container-wide relative">
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="eyebrow !text-brass-light mb-3">Beta privata</p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-tight">
            Entra <em className="text-brass-light">prima degli altri</em>.
          </h2>
          <p className="font-serif italic text-xl text-paper/75 mt-6 leading-relaxed">
            I primi 200 beta tester ricevono Calamo gratuitamente. In cambio
            chiediamo solo feedback onesti sulla scrittura.
          </p>
        </div>

        {state === "success" ? (
          <div className="mt-12 max-w-md mx-auto text-center reveal">
            <div className="text-6xl mb-4">✦</div>
            <p className="font-serif text-2xl mb-2">Ci sei dentro.</p>
            <p className="text-paper/70 leading-relaxed">
              Ti scriviamo a breve con istruzioni e accesso. Nel frattempo —
              non smettere di scrivere.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-12 max-w-md mx-auto space-y-4 reveal"
          >
            <div>
              <label
                htmlFor="beta-email"
                className="block text-[11px] uppercase tracking-[0.15em] text-paper/60 mb-2 font-sans"
              >
                Email
              </label>
              <input
                id="beta-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.it"
                className="w-full px-4 py-3 rounded-md bg-paper/8 border border-paper/20 text-paper placeholder:text-paper/40 focus:outline-none focus:border-brass-light focus:bg-paper/12 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="beta-profile"
                className="block text-[11px] uppercase tracking-[0.15em] text-paper/60 mb-2 font-sans"
              >
                Cosa scrivi? <span className="lowercase text-paper/40">(opzionale)</span>
              </label>
              <select
                id="beta-profile"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-paper/8 border border-paper/20 text-paper focus:outline-none focus:border-brass-light transition-colors"
              >
                <option value="">— preferisco non dirlo —</option>
                <option value="novel">Romanzi</option>
                <option value="short-story">Racconti</option>
                <option value="poetry">Poesia</option>
                <option value="memoir">Memoir / Autobiografia</option>
                <option value="essay">Saggistica</option>
                <option value="screenplay">Sceneggiatura / Teatro</option>
                <option value="children-book">Libri per bambini</option>
                <option value="multi">Un po' di tutto</option>
                <option value="aspirant">Non ancora pubblicato, ma ci provo</option>
              </select>
            </div>

            {state === "error" && (
              <p className="text-sm text-brass-light bg-redmark/20 border border-brass-light/40 px-4 py-2 rounded">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "loading" || !email}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-brass-light text-leather-deep px-6 py-3.5 font-medium tracking-wide transition-colors hover:bg-paper disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state === "loading" ? "Salvataggio…" : "Mettimi in lista"}
              {state !== "loading" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              )}
            </button>

            <p className="text-xs text-paper/45 text-center font-sans italic">
              Niente spam, mai. Email solo per il lancio beta. Puoi cancellarti
              quando vuoi.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
