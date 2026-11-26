/**
 * fetch wrapper da Admin API — Bearer token Firebase, sem Axios (PLAN §5).
 * Nunca registra token/Authorization/resposta no console.
 */
import type { IdTokenResult } from "firebase/auth";

export const API_BASE = (import.meta.env.NUXT_PUBLIC_API_BASE_URL ?? "") as string;

export class ApiError extends Error {
  status: number;
  code: string | null;
  constructor(status: number, message: string, code: string | null = null) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

let tokenGetter: () => Promise<IdTokenResult | null> = async () => null;

/** Injetado pelo auth store (evita ciclo de import firebase ⇄ api). */
export function setTokenGetter(fn: () => Promise<IdTokenResult | null>) {
  tokenGetter = fn;
}

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = await tokenGetter();
  const headers: Record<string, string> = {
    "content-type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token.token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    throw new ApiError(
      res.status,
      (body.error as string) ?? `erro ${res.status}`,
      (body.error as string) ?? null,
    );
  }
  return body as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
};
