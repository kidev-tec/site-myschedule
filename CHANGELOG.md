# Changelog

## [0.2.0] — 2026-11-26 (feat/admin-embedded, PR #2)

### Admin embutido (SPEC-admin-v1.1.0)
- Painel admin migrado do standalone `agenva-admin` (Vite/Vue) para rota protegida `/admin/*` client-only (ssr:false) no site institucional.
- **Login** Firebase Auth (email/senha) em `/admin/login` com allowlist de UX (NUXT_PUBLIC_ADMIN_EMAILS); autoridade real de segurança = API admin-guard (401/403, users.role=platform_admin).
- **Páginas**: `/admin` (tenants + filtros), `/admin/tenants/[id]` (detalhe), `/admin/audit` (auditoria) — layout admin fullscreen (100svh), pré-render em shells sem dado sensível.
- **Middleware** `admin` (redirect login) + plugin `admin-auth` (init auth client).
- **Env**: `runtimeConfig.public` (NUXT_PUBLIC_FIREBASE_*, NUXT_PUBLIC_API_BASE_URL, NUXT_PUBLIC_ADMIN_EMAILS) — fix B1 do QA (import.meta.env não era inlinado no bundle).
- **noindex** em todas as rotas /admin (useHead no layout) + sitemap sem /admin.
- Dependências: firebase, pinia, @pinia/nuxt; vue-router pin 5.4.0 (bug 5.5.2 no prerender); pnpm-workspace.yaml allowBuilds.
- Testes: 34 (31 pass + 3 skip E2E condicionais), incl. AC1 (HTML pré-render sem Bearer/idToken), AC4 (noindex/sitemap).

### CI
- PR→main com `pnpm install --frozen-lockfile` (pnpm-lock.yaml versionado, sem package-lock).
- E2E Playwright com webServer `pnpm dev`.

> Admin standalone (rafaumeu/agenva-admin) fica DEPRECATED — decommission do deploy Vercel só com aprovação explícita.
