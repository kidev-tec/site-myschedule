/**
 * Config Firebase do admin (email/senha por admin; sem sessão compartilhada).
 * NUXT_PUBLIC_ADMIN_EMAILS é allowlist de UX — a autoridade SEMPRE é a API
 * (users.role = 'platform_admin'); allowlist isolada no bundle é bypassável.
 */
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const cfg = {
  apiKey: import.meta.env.NUXT_PUBLIC_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN as
    | string
    | undefined,
  projectId: import.meta.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID as
    | string
    | undefined,
};

export const isFirebaseConfigured = Boolean(
  cfg.apiKey && cfg.authDomain && cfg.projectId,
);

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

/** Lazy: só inicializa se configurado — evita crash do SSG no build. */
export function getFirebaseAuth(): Auth | null {
  if (!isFirebaseConfigured) return null;
  _app ??= initializeApp(cfg as { apiKey: string; authDomain: string; projectId: string });
  _auth ??= getAuth(_app);
  return _auth;
}

export { adminAllowlist, isAllowedEmail } from "./allowlist";
