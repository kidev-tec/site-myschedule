/**
 * Allowlist de UX (NUXT_PUBLIC_ADMIN_EMAILS via runtimeConfig) — funções puras,
 * sem inicializar Firebase.
 *
 * NÃO é controle de acesso: a autoridade é users.role=platform_admin na API.
 * Serve apenas para a UI não tentar login com email sabidamente fora.
 */
import { adminEnv } from "./env";

export function adminAllowlist(): string[] {
  const raw = adminEnv().adminEmails ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedEmail(email: string): boolean {
  return adminAllowlist().includes(email.trim().toLowerCase());
}
