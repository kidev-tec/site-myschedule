/**
 * Erros de login do admin: mensagem distinta p/ credencial inválida,
 * rate limit e falha de rede (offline/timeout não pode virar "senha errada").
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/lib/allowlist", () => ({
  adminAllowlist: () => ["admin@teste.com"],
  isAllowedEmail: (e: string) => e.trim().toLowerCase() === "admin@teste.com",
}));

const loginErrors = vi.hoisted(() => ({ code: "" }));

vi.mock("firebase/auth", async (orig) => {
  const actual = await orig<typeof import("firebase/auth")>();
  return {
    ...actual,
    signInWithEmailAndPassword: vi.fn((_a: unknown, e: string) => {
      if (e === "ok@teste.com") return Promise.resolve({ user: { uid: "u1" } });
      const err = new Error("firebase") as Error & { code: string };
      err.code = loginErrors.code;
      return Promise.reject(err);
    }),
    browserLocalPersistence: actual.inMemoryPersistence,
  };
});

vi.mock("~/lib/firebase", async (orig) => {
  const actual = await orig<typeof import("~/lib/firebase")>();
  return {
    ...actual,
    getFirebaseAuth: () => ({ currentUser: null }),
  };
});

const { useAuthStore } = await import("~/stores/auth");

async function fresh() {
  const { setActivePinia, createPinia } = await import("pinia");
  setActivePinia(createPinia());
}

describe("login: mensagens de erro por causa", () => {
  beforeEach(async () => {
    loginErrors.code = "";
    await fresh();
  });

  it("credencial inválida → E-mail ou senha inválidos", async () => {
    loginErrors.code = "auth/invalid-credential";
    const s = useAuthStore();
    const ok = await s.login("admin@teste.com", "x");
    expect(ok).toBe(false);
    expect(s.error).toContain("E-mail ou senha inválidos");
  });

  it("offline → Falha de conexão (nunca 'senha inválida')", async () => {
    loginErrors.code = "auth/network-request-failed";
    const s = useAuthStore();
    await s.login("admin@teste.com", "x");
    expect(s.error).toContain("Falha de conexão");
    expect(s.error).not.toContain("senha");
  });

  it("rate limit → muitas tentativas", async () => {
    loginErrors.code = "auth/too-many-requests";
    const s = useAuthStore();
    await s.login("admin@teste.com", "x");
    expect(s.error).toContain("Muitas tentativas");
  });
});
