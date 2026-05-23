#!/usr/bin/env bash
# Deploy script per calamo.vibecanyon.com su VPS Aruba.
# Esegui DA LOCALE (c:\work\Cozza\calamo-landing\):
#   bash deploy/deploy.sh
#
# Convenzione VPS Aruba (vedi memoria vps-aruba.md):
#   - IP: 188.213.170.214
#   - user: root
#   - key: ~/.ssh/aruba_vps
#   - path web: /var/www/<progetto>/

set -euo pipefail

VPS_KEY="${HOME}/.ssh/aruba_vps"
VPS_USER="${VPS_USER:-root}"
VPS_HOST="${VPS_HOST:-188.213.170.214}"
VPS_PATH="/var/www/calamo-landing"

SSH="ssh -i ${VPS_KEY} -o StrictHostKeyChecking=accept-new ${VPS_USER}@${VPS_HOST}"
RSYNC="rsync -avz -e \"ssh -i ${VPS_KEY}\""

echo "→ Build statico Next.js"
pnpm install --frozen-lockfile
pnpm build

echo "→ Sync out/ via rsync"
eval ${RSYNC} --delete out/ "${VPS_USER}@${VPS_HOST}:${VPS_PATH}/out/"

echo "→ Sync api/ (escluso node_modules + DB)"
eval ${RSYNC} \
  --exclude=node_modules --exclude=beta-signups.db --exclude=beta-signups.db-shm --exclude=beta-signups.db-wal \
  api/ "${VPS_USER}@${VPS_HOST}:${VPS_PATH}/api/"

echo "→ Sync deploy/ (nginx config + pm2 ecosystem)"
eval ${RSYNC} deploy/ "${VPS_USER}@${VPS_HOST}:${VPS_PATH}/deploy/"

echo "→ Install API deps + restart PM2"
${SSH} "cd ${VPS_PATH}/api && (pnpm install --prod 2>/dev/null || npm install --omit=dev) && (pm2 reload calamo-api 2>/dev/null || pm2 start ${VPS_PATH}/deploy/ecosystem.config.cjs)"

echo "✓ Deploy completato — https://calamo.vibecanyon.com"
