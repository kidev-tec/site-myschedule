#!/usr/bin/env bash
# Deploy do site AGENVA na hospedagem Hostinger (agenva.app.br).
# Uso: ./scripts/deploy-hostinger.sh            → build + envio
#      ./scripts/deploy-hostinger.sh --dry-run  → só mostra o que mudaria
# Requer: alias SSH `hostinger` em ~/.ssh/config e .env preenchido (ver .env.example).
set -euo pipefail
cd "$(dirname "$0")/.."

REMOTE="hostinger:domains/agenva.app.br/public_html/"
DRY=""
[[ "${1:-}" == "--dry-run" ]] && DRY="--dry-run"

[[ -f .env ]] || { echo "Falta .env (copie de .env.example)"; exit 1; }
set -a; source .env; set +a
[[ -n "${NUXT_PUBLIC_SITE_URL:-}" ]] || { echo "Variável vazia no .env: NUXT_PUBLIC_SITE_URL"; exit 1; }
# Só o /admin depende destas; a landing publica sem elas.
for v in NUXT_PUBLIC_FIREBASE_API_KEY NUXT_PUBLIC_FIREBASE_PROJECT_ID NUXT_PUBLIC_API_BASE_URL NUXT_PUBLIC_ADMIN_EMAILS; do
  [[ -n "${!v:-}" ]] || echo "AVISO: $v vazia — o /admin não vai funcionar neste build."
done

pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm generate
pnpm test

[[ -f .output/public/index.html && -f .output/public/.htaccess ]] || { echo "Build incompleto"; exit 1; }

# --delete remove do servidor o que não existe mais no build (inclui o default.php da Hostinger).
rsync -avz --delete $DRY .output/public/ "$REMOTE"

[[ -n "$DRY" ]] || echo "Publicado. Conferir: https://agenva.app.br"
