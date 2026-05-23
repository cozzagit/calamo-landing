// Microservizio API per il form beta della landing Calamo.
// Stack: Express + SQLite (better-sqlite3) + rate limit.
// Deploy: PM2 sul VPS Aruba su porta 3050, nginx proxy /api/ -> 3050.
//
// Endpoints:
//   POST /api/signup        body { email, profile? } -> 201 { ok: true }
//   GET  /api/health        -> 200 { ok: true }
//   GET  /api/stats         -> 200 { total: N }  (per pannello interno, non protetto qui)

const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const rateLimit = require("express-rate-limit");
const path = require("path");

const PORT = process.env.PORT || 3050;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "beta-signups.db");
const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS ||
  "https://calamo.vibecanyon.com,http://localhost:4321"
).split(",");

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

  try {
    insertStmt.run(email.trim().toLowerCase(), cleanProfile, ua, ip);
    res.status(201).json({ ok: true });
  } catch (e) {
    if (e && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
      // Email gia' iscritta: rispondiamo OK lo stesso per UX (niente
      // enumeration), ma logghiamo lato server.
      console.log(`[calamo-api] duplicate signup: ${email}`);
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
