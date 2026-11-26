/** Allowlist de UX (NUXT_PUBLIC_ADMIN_EMAILS) — funções puras, sem inicializar Firebase.
 *
 * NÃO é controle de acesso: a autoridade é users.role=platform_admin na API.
 * Serve apenas para a UI não tentar login com email sabidamente fora.
 */
export function adminAllowlist(): string[] {
  const raw = (import.meta.env.NUXT_PUBLIC_ADMIN_EMAILS ?? "") as string;
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedEmail(email: string): boolean {
  return adminAllowlist().includes(email.trim().toLowerCase());
}
