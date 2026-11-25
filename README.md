# agenva-site

Landing page pública do **AGENVA** — app de agenda de atendimentos para
barbearias, salões e profissionais autônomos. 100% estático (SSG), pt-BR,
mobile-first.

> SPEC-site.md v1.0.0 + PLAN-site.md v1.0.0 (frozen). Sem backend, sem
> i18n, sem rota Nitro server-side (RF-S1).

## Stack

- Nuxt 4 (SSG puro — `nuxt generate`), Vue 3, TypeScript strict
- Tailwind CSS v4 (`@tailwindcss/vite`), tokens AGENVA
- Vitest (verificação do output estático)

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

## Build / verificação

```bash
pnpm generate        # produz .output/public/
pnpm test            # valida o output estático (AC1/AC2/AC4 + gates)
pnpm typecheck
pnpm lint
```

Servir o output localmente (Lighthouse / 360px):

```bash
npx serve .output/public   # ou: python3 -m http.server -d .output/public 4173
```

## Estrutura

```
data/site.ts            fonte única de copy/links/preços (ADR-S02)
content/legal/*.md      textos LGPD literais do app (RF-S3)
pages/                  /, /privacidade, /termos
components/             seções da landing
utils/legalMarkdown.ts  parser markdown escape-first (v-html seguro)
public/                 robots.txt, sitemap.xml, favicon, OG, brand
tests/                  verificação do output estático
scripts/gen-assets.mjs  regenera assets de marca a partir do PNG oficial
```

## URL canônica (G-S5)

`siteUrl` em `data/site.ts` (env `NUXT_PUBLIC_SITE_URL`) é a fonte única do
canonical/OG. `public/robots.txt` e `public/sitemap.xml` referenciam a URL
provisória `https://agenva-site.vercel.app` — atualizar os três ao definir
o domínio definitivo.

## Gates externos pendentes

| Gate | O que libera | Estado |
|---|---|---|
| G-S1 | URL TestFlight (CTA real de download) | pendente — CTA aponta para WhatsApp/âncora |
| G-S2 | planos reais Asaas (preço na home) | pendente — seção "Planos em breve", sem preço |
| G-S3 | SVGs finais de marca | pendente — assets derivados do PNG oficial do app |
| G-S4 | acesso ao projeto Vercel | preview público |
| G-S5 | domínio definitivo | canonical/sitemap/OG provisórios |

## Deploy (Vercel, ADR-S04)

- Framework Preset: **Nuxt** · Build: `pnpm generate` · Output: `.output/public`
- Node `>=24.6` · pnpm `11.20+`
- `NUXT_PUBLIC_SITE_URL` = URL de preview da Vercel (atualizar no domínio final)
- **Nenhuma função Nitro** é criada — output é 100% estático.

## Regras do projeto

- PROIBIDO criar `server/`, `server/api/`, `server/routes/` (lição do bug
  404 SSG do PIANO).
- Preços só entram com artefato aprovado (G-S2). TestFlight só com URL HTTPS
  validada (G-S1). Play Store = "Em breve", sem URL falsa.
- Textos legais são reuso literal do app (09/09/2026); alteração exige
  revisão legal humana.
