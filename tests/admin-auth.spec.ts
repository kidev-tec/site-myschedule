/**
 * TDD F4 — allowlist de UX (normalização lowercase, trim, separada por vírgula).
 * A autoridade continua na API; aqui é só evitar tentativa de login na UI.
 */
import { describe, expect, it } from "vitest";
import { adminAllowlist, isAllowedEmail } from "~/lib/allowlist";

describe("allowlist de UX (NUXT_PUBLIC_ADMIN_EMAILS)", () => {
  it("lista é de strings normalizadas (lowercase, sem vazios)", () => {
    for (const e of adminAllowlist()) {
      expect(e).toBe(e.trim().toLowerCase());
      expect(e.length).toBeGreaterThan(0);
    }
  });

  it("aceita email com maiúsculas/espaços (normalizado)", () => {
    // env de teste define NUXT_PUBLIC_ADMIN_EMAILS com admin@teste.com
    expect(isAllowedEmail("  ADMIN@Teste.COM ")).toBe(
      isAllowedEmail("admin@teste.com"),
    );
  });

  it("recusa email fora da lista", () => {
    expect(isAllowedEmail("intruso@evil.com")).toBe(false);
  });
});
