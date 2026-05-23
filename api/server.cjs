// Microservizio API per il form beta della landing Calamo.
// Stack: Express + SQLite (better-sqlite3) + rate limit.
// Deploy: PM2 sul VPS Aruba su porta 3060, nginx proxy /api/ -> 3060.
//
// Endpoints:
//   POST /api/signup        body { email, profile? } -> 201 { ok: true }
//   GET  /api/health        -> 200 { ok: true }
//   GET  /api/stats         -> 200 { total: N }  (per pannello interno, non protetto qui)

// Carica .env locale (non committato in git, contiene segreti SMTP).
// Posizione attesa: api/.env accanto a questo script.
require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const path = require("path");

const PORT = process.env.PORT || 3060;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "beta-signups.db");
const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS ||
  "https://calamo.vibecanyon.com,http://localhost:4321"
).split(",");

// SMTP per notifiche admin + conferma utente. Se le env non sono settate
// l'app gira lo stesso, salva nel DB ma non manda email (failure soft).
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_FROM =
  process.env.SMTP_FROM || `"Calamo" <${SMTP_USER || "noreply@calamo.app"}>`;
const NOTIFICATION_TO = process.env.NOTIFICATION_TO || "info@vibecanyon.com";
const SMTP_ENABLED = SMTP_HOST && SMTP_USER && SMTP_PASS;

const transporter = SMTP_ENABLED
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // SSL su 465, STARTTLS su 587
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

if (transporter) {
  transporter
    .verify()
    .then(() => console.log(`[calamo-api] SMTP ready → notify to ${NOTIFICATION_TO}`))
    .catch((e) =>
      console.error(`[calamo-api] SMTP verify failed: ${e.message}`),
    );
} else {
  console.warn(
    "[calamo-api] SMTP disabled — set SMTP_HOST/SMTP_USER/SMTP_PASS env to enable",
  );
}

// ---------------------------------------------------------------------------
// DB setup
// ---------------------------------------------------------------------------
const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.exec(`
  CREATE TABLE IF NOT EXISTS beta_signup (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    profile TEXT,
    user_agent TEXT,
    ip TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_beta_email ON beta_signup(email);
  CREATE INDEX IF NOT EXISTS idx_beta_created ON beta_signup(created_at);
`);

const insertStmt = db.prepare(
  "INSERT INTO beta_signup (email, profile, user_agent, ip) VALUES (?, ?, ?, ?)",
);

// ---------------------------------------------------------------------------
// Email validation — semplice ma robusta
// ---------------------------------------------------------------------------
function isValidEmail(s) {
  if (typeof s !== "string") return false;
  const trimmed = s.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  // RFC 5322 simplified
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

const VALID_PROFILES = [
  "novel",
  "short-story",
  "poetry",
  "memoir",
  "essay",
  "screenplay",
  "children-book",
  "multi",
  "aspirant",
];

const PROFILE_LABEL = {
  novel: "Romanzi",
  "short-story": "Racconti",
  poetry: "Poesia",
  memoir: "Memoir / Autobiografia",
  essay: "Saggistica",
  screenplay: "Sceneggiatura / Teatro",
  "children-book": "Libri per bambini",
  multi: "Un po' di tutto",
  aspirant: "Non ancora pubblicato",
};

// ---------------------------------------------------------------------------
// Email senders — non-bloccanti. Se SMTP non risponde, l'iscrizione e' gia'
// salvata nel DB e l'utente riceve comunque la conferma sulla UI.
// ---------------------------------------------------------------------------

async function notifyAdmin(signup) {
  if (!transporter) return;
  const { email, profile, ip, user_agent, total } = signup;
  const profileLabel = profile ? PROFILE_LABEL[profile] || profile : "—";
  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: NOTIFICATION_TO,
      subject: `Calamo · nuovo iscritto beta (#${total}): ${email}`,
      text: [
        `Nuova iscrizione alla beta privata di Calamo.`,
        ``,
        `Email:        ${email}`,
        `Profilo:      ${profileLabel}`,
        `Iscritto n°:  ${total}`,
        `IP:           ${ip || "—"}`,
        `User-Agent:   ${user_agent || "—"}`,
        ``,
        `https://calamo.vibecanyon.com/api/stats`,
      ].join("\n"),
      html: `
        <div style="font-family: 'Source Serif 4', Georgia, serif; max-width: 560px; color: #1c1a17;">
          <h2 style="font-family: 'Cormorant Garamond', Georgia, serif; color: #7a6448; font-weight: 500;">
            Calamo · nuova iscrizione beta
          </h2>
          <p>Un nuovo autore si è messo in lista d'attesa.</p>
          <table style="border-collapse: collapse; margin: 1.5em 0;">
            <tr><td style="padding: 6px 12px 6px 0; color: #7a6448; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td><td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 6px 12px 6px 0; color: #7a6448; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Cosa scrive</td><td style="padding: 6px 0;">${profileLabel}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0; color: #7a6448; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Iscritto n°</td><td style="padding: 6px 0;"><strong>${total}</strong></td></tr>
            <tr><td style="padding: 6px 12px 6px 0; color: #7a6448; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">IP</td><td style="padding: 6px 0; font-family: monospace; font-size: 12px;">${ip || "—"}</td></tr>
          </table>
          <p style="font-size: 12px; color: #666; font-style: italic;">
            User-Agent: <span style="font-family: monospace;">${user_agent || "—"}</span>
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 2em 0;">
          <p style="font-size: 11px; color: #999;">
            Notifica automatica da calamo-api · <a href="https://calamo.vibecanyon.com/api/stats" style="color: #7a6448;">/api/stats</a>
          </p>
        </div>
      `,
    });
    console.log(`[calamo-api] admin notification sent for ${email}`);
  } catch (e) {
    console.error(`[calamo-api] admin notify failed for ${email}: ${e.message}`);
  }
}

async function sendUserConfirmation(email, profile) {
  if (!transporter) return;
  const profileLabel = profile ? PROFILE_LABEL[profile] || profile : null;
  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: "Calamo · ci sei dentro",
      text: [
        `Ciao,`,
        ``,
        `grazie per esserti messo in lista d'attesa per Calamo — l'editor`,
        `letterario che legge il tuo libro mentre lo scrivi.`,
        ``,
        profileLabel
          ? `Abbiamo registrato che ti interessa scrivere: ${profileLabel}.`
          : `Ti contatteremo appena la beta sarà aperta.`,
        ``,
        `Calamo è un software desktop locale (Windows + macOS) che unisce un`,
        `editor letterario, una Story Bible, e due agenti AI — uno scrittore`,
        `(Claude) e un editor (GPT-5) — in un pipeline di revisione che`,
        `nessuno ha mai provato a fare prima per la prosa letteraria.`,
        ``,
        `I primi 200 iscritti avranno accesso anticipato e licenza a vita`,
        `gratuita per la v1.0.`,
        ``,
        `A presto,`,
        `Luca Porro · Calamo`,
        `https://calamo.vibecanyon.com`,
      ].join("\n"),
      html: `
        <div style="font-family: 'Source Serif 4', Georgia, serif; max-width: 560px; color: #1c1a17; line-height: 1.7;">
          <div style="text-align: center; margin: 2em 0 2.5em;">
            <div style="display: inline-block; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 48px; color: #1c1a17; line-height: 1;">Calamo</div>
            <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; color: #7a6448; font-size: 18px; margin-top: 8px;">
              ci sei dentro.
            </div>
          </div>

          <p>Ciao,</p>

          <p>grazie per esserti messo in lista d'attesa per <strong>Calamo</strong> —
          l'editor letterario che legge il tuo libro mentre lo scrivi.</p>

          ${
            profileLabel
              ? `<p>Abbiamo registrato che ti interessa scrivere: <strong>${profileLabel}</strong>.</p>`
              : ""
          }

          <p>Calamo è un software desktop locale (Windows + macOS) che unisce
          un editor letterario, una Story Bible, e due agenti AI — uno
          scrittore (Claude) e un editor (GPT-5) — in un pipeline di
          revisione che nessuno ha mai provato a fare prima per la prosa
          letteraria.</p>

          <p style="background: #f5f1e8; border-left: 3px solid #b89968; padding: 16px 20px; margin: 24px 0;">
            <strong>I primi 200 iscritti</strong> avranno accesso anticipato e
            <strong>licenza a vita gratuita</strong> per la v1.0.
          </p>

          <p>Ti scriviamo presto.</p>

          <p style="margin-top: 2em;">
            <span style="font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; color: #7a6448;">— Luca Porro</span><br>
            <a href="https://calamo.vibecanyon.com" style="color: #7a6448; font-size: 13px;">calamo.vibecanyon.com</a>
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 2.5em 0 1em;">
          <p style="font-size: 11px; color: #999; font-style: italic;">
            Hai ricevuto questa mail perché hai compilato il form beta su calamo.vibecanyon.com.
            Niente spam, mai — solo l'annuncio del lancio.
          </p>
        </div>
      `,
    });
    console.log(`[calamo-api] user confirmation sent to ${email}`);
  } catch (e) {
    console.error(
      `[calamo-api] user confirmation failed for ${email}: ${e.message}`,
    );
  }
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
const app = express();
app.set("trust proxy", 1); // VPS nginx davanti

app.use(express.json({ limit: "8kb" }));
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // curl, same-origin
      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      cb(new Error("Origin not allowed"));
    },
  }),
);

const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Troppe richieste, riprova tra qualche minuto." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "calamo-landing-api", version: "0.1.0" });
});

app.get("/api/stats", (_req, res) => {
  const row = db.prepare("SELECT COUNT(*) AS n FROM beta_signup").get();
  res.json({ total: row.n });
});

app.post("/api/signup", signupLimiter, (req, res) => {
  const { email, profile } = req.body || {};

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ error: "Email non valida." });
  }

  const cleanProfile =
    typeof profile === "string" && VALID_PROFILES.includes(profile)
      ? profile
      : null;

  const ua = req.headers["user-agent"] || null;
  const ip =
    (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() ||
    req.ip ||
    null;

  const emailNorm = email.trim().toLowerCase();
  try {
    insertStmt.run(emailNorm, cleanProfile, ua, ip);
    res.status(201).json({ ok: true });

    // Email non-bloccanti: la risposta HTTP e' gia' partita.
    const total = db.prepare("SELECT COUNT(*) AS n FROM beta_signup").get().n;
    notifyAdmin({
      email: emailNorm,
      profile: cleanProfile,
      ip,
      user_agent: ua,
      total,
    }).catch(() => {});
    sendUserConfirmation(emailNorm, cleanProfile).catch(() => {});
  } catch (e) {
    if (e && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
      // Email gia' iscritta: rispondiamo OK lo stesso per UX (niente
      // enumeration), ma logghiamo lato server e NON mandiamo di nuovo email.
      console.log(`[calamo-api] duplicate signup: ${emailNorm}`);
      return res.status(200).json({ ok: true, alreadyRegistered: true });
    }
    console.error("[calamo-api] insert failed:", e);
    res.status(500).json({ error: "Errore interno. Riprova tra un istante." });
  }
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`[calamo-api] listening on :${PORT}`);
  console.log(`[calamo-api] db: ${DB_PATH}`);
  console.log(`[calamo-api] allowed origins: ${ALLOWED_ORIGINS.join(", ")}`);
});
