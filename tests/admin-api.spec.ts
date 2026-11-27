/**
 * TDD F4 — api.ts: Bearer token injetado, erros 401/403/409 mapeados,
 * billing_not_configured distinguível.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { api, ApiError, setTokenGetter } from "~/lib/api";

beforeEach(() => {
  setTokenGetter(async () => ({ token: "tok-123" } as never));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function stubFetch(status: number, body: unknown) {
  const fetchMock = vi.fn(
    async () =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "content-type": "application/json" },
      }),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("api wrapper", () => {
  it("envia Authorization: Bearer <token>", async () => {
    const mock = stubFetch(200, { items: [], total: 0 });
    await api.get("/v1/admin/tenants?page_size=1");
    const [, init] = mock.mock.calls[0] as unknown as [string, RequestInit];
    expect((init.headers as Record<string, string>).Authorization).toBe(
      "Bearer tok-123",
    );
  });

  it("401 vira ApiError com status correto", async () => {
    stubFetch(401, { error: "Sessão não encontrada. Entre novamente." });
    await expect(api.get("/v1/admin/tenants")).rejects.toMatchObject({
      status: 401,
      message: "Sessão não encontrada. Entre novamente.",
    });
  });

  it("403 vira ApiError (conta sem role)", async () => {
    stubFetch(403, { error: "não autorizado" });
    await expect(api.get("/v1/admin/tenants")).rejects.toBeInstanceOf(
      ApiError,
    );
    await expect(api.get("/v1/admin/tenants")).rejects.toMatchObject({
      status: 403,
    });
  });

  it("409 billing_not_configured é distinguível por código", async () => {
    stubFetch(409, { error: "billing_not_configured" });
    const err = await api
      .get("/v1/admin/tenants/x/billing")
      .catch((e: ApiError) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).status).toBe(409);
    expect((err as ApiError).code).toBe("billing_not_configured");
  });

  it("PATCH envia body JSON", async () => {
    const mock = stubFetch(200, { suspended_at: "2026-11-23T00:00:00Z" });
    await api.patch("/v1/admin/tenants/abc/status", {
      status: "suspended",
      reason: "teste",
    });
    const [, init] = mock.mock.calls[0] as unknown as [string, RequestInit];
    expect(init.method).toBe("PATCH");
    expect(init.body).toBe(
      JSON.stringify({ status: "suspended", reason: "teste" }),
    );
  });
});
