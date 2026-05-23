import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calamo — L'editor letterario che legge il tuo libro mentre lo scrivi",
  description:
    "Calamo è il software desktop per autori che unisce editor letterario, Story Bible, due agenti AI (scrittore + editor) e revisione automatica della coerenza. Locale, niente cloud, niente abbonamenti.",
  metadataBase: new URL("https://calamo.vibecanyon.com"),
  openGraph: {
    type: "website",
    title: "Calamo — Scrivi il tuo libro con un editor letterario locale e due agenti AI",
    description:
      "Story Bible, Magic Structure, Beta Reader, Spinoff, Interventi d'autore, export PDF/EPUB. Claude + GPT-5 in modalità Writer + Editor. Tutto sul tuo computer.",
    locale: "it_IT",
    siteName: "Calamo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calamo — L'editor letterario AI per autori",
    description:
      "Editor desktop locale con due agenti AI. Per romanzieri, racconti, poesie, sceneggiature.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
