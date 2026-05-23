# Calamo — Landing Page

Sito di lancio per [Calamo](https://github.com/cozzagit/calamo): editor letterario AI desktop locale, target https://calamo.vibecanyon.com.

## Stack

- **Frontend**: Next.js 14 con `output: "export"` (statico puro), Tailwind CSS, palette editorial Calamo
- **API backend**: Express + SQLite (better-sqlite3), gira su PM2
- **Deploy**: VPS Aruba + nginx, rsync da locale, PM2 per il service Node
- **Form beta**: signup email → SQLite locale sul VPS, niente terze parti

## Sviluppo locale

```bash
# Landing Next.js
pnpm install
pnpm dev                # http://localhost:4321

# API beta (in altro terminale)
cd api
pnpm install
node server.cjs         # http://localhost:3050
```

Per testare il form localmente serve un proxy `/api/*` verso `:3050`.
Next.js dev server lo fa via `next.config` rewrites se necessario, oppure
chiama direttamente `http://localhost:3050/api/signup` da una build di
prova.

## Build statico

```bash
pnpm build              # genera ./out/
```

L'output `out/` è statico: HTML + JS + CSS + asset. Servibile da qualsiasi
web server (nginx, Caddy, GitHub Pages, S3+CloudFront…).

## Deploy su VPS Aruba

### One-time setup sul VPS

```bash
# 1. crea directory e ownership
sudo mkdir -p /var/www/calamo-landing/{out,api,deploy}
sudo chown -R deploy:deploy /var/www/calamo-landing

# 2. installa Node + pnpm + PM2 se non gia' presenti
# (vedi memoria VPS Aruba per le convenzioni)

# 3. linka nginx config (dopo primo deploy che porta i file)
sudo ln -sf /var/www/calamo-landing/deploy/nginx-calamo.conf \
            /etc/nginx/sites-available/calamo.vibecanyon.com
sudo ln -sf /etc/nginx/sites-available/calamo.vibecanyon.com \
            /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 4. cert SSL
sudo certbot --nginx -d calamo.vibecanyon.com

# 5. autostart PM2 + persisti processi
pm2 startup
pm2 save
```

### Deploy iterativo (da locale)

```bash
bash deploy/deploy.sh
```

Lo script:
1. `pnpm build` (genera `out/`)
2. `rsync` `out/` → `/var/www/calamo-landing/out/`
3. `rsync` `api/` → `/var/www/calamo-landing/api/` (esclude DB)
4. `rsync` `deploy/` → `/var/www/calamo-landing/deploy/`
5. SSH al VPS: `pnpm install` in `api/` + `pm2 reload calamo-api`

## Architettura

```
calamo.vibecanyon.com (nginx 443)
├── /         -> static files /var/www/calamo-landing/out/
└── /api/*    -> proxy_pass http://127.0.0.1:3050/
                            ▲
                            └─ calamo-api (PM2, Express)
                               └─ beta-signups.db (SQLite locale)
```

### API endpoints

- `POST /api/signup` body `{ email, profile? }` → `201 { ok: true }`
- `GET /api/health` → `{ ok: true, service, version }`
- `GET /api/stats` → `{ total: N }` (pannello interno, non protetto — proteggere prima del lancio pubblico)

### Rate limiting

Express-rate-limit: 20 richieste / 15 min per IP sul `/api/signup`. Il `trust proxy` è ON per leggere `X-Forwarded-For` correttamente da nginx.

### CORS

Origin whitelist via env `ALLOWED_ORIGINS` (default: `https://calamo.vibecanyon.com,http://localhost:4321`).

## Struttura del codice

```
calamo-landing/
├── app/
│   ├── layout.tsx           # metadata SEO + import globals.css
│   ├── page.tsx             # mounting delle sezioni + IntersectionObserver reveal
│   └── globals.css          # Tailwind + tipografia + .reveal animation
├── components/sections/     # 13 sezioni atomiche
│   ├── Header.tsx           # nav sticky con mobile menu
│   ├── Hero.tsx             # wordmark + tagline + CTA + mockup app
│   ├── WhatItIs.tsx         # 3 colonne Editor / Bible / Coautore
│   ├── StoryBible.tsx       # mockup character cards
│   ├── Structure.tsx        # mockup lista capitoli
│   ├── ThreeMinds.tsx       # provider AI cards
│   ├── TwoAgents.tsx        # ⭐ Writer + Editor pipeline, sezione bg leather
│   ├── ReviewTools.tsx      # Beta Reader + Spinoff + Coherence
│   ├── Interventions.tsx    # mockup intervento autore con cascade
│   ├── Export.tsx           # PDF + EPUB + lock
│   ├── LocalFirst.tsx       # backup mockup + privacy pills
│   ├── Pricing.tsx          # €49 una tantum + addon GPT €19
│   ├── Beta.tsx             # form signup → /api/signup
│   └── Footer.tsx           # link + copyright
├── api/
│   ├── package.json
│   └── server.cjs           # Express + SQLite microservice
├── deploy/
│   ├── nginx-calamo.conf    # config nginx per calamo.vibecanyon.com
│   ├── ecosystem.config.cjs # PM2 ecosystem per calamo-api
│   └── deploy.sh            # rsync + ssh restart
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Palette editorial

Stessa dell'app desktop Calamo:

- `paper` `#f5f1e8` — sfondo principale
- `paper-deep` `#ebe3d0` — sezioni alternate
- `ink` `#1c1a17` — testo
- `leather` `#7a6448` — accent primario (CTA bg)
- `leather-deep` `#5a4a35` — hover CTA
- `brass` `#b89968` — accent secondario
- `brass-light` `#cdac7c` — highlight su fondo leather
- `redmark` `#8b2c1f` — error / critical

Font: Cormorant Garamond (display + titoli + italic) · Source Serif 4 (body) · Inter (microcopy UI).
