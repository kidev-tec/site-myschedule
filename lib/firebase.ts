/**
 * Config Firebase do admin (email/senha por admin; sem sessão compartilhada).
 * NUXT_PUBLIC_ADMIN_EMAILS é allowlist de UX — a autoridade SEMPRE é a API
 * (users.role = 'platform_admin'); allowlist isolada no bundle é bypassável.
 */
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { adminEnv } from "./env";

export const isFirebaseConfigured = () => {
  const e = adminEnv();
  return Boolean(e.firebaseApiKey && e.firebaseAuthDomain && e.firebaseProjectId);
};

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

/** Lazy: só inicializa se configurado — evita crash do SSG no build. */
export function getFirebaseAuth(): Auth | null {
  if (!isFirebaseConfigured()) return null;
  const e = adminEnv();
  _app ??= initializeApp({
    apiKey: e.firebaseApiKey,
    authDomain: e.firebaseAuthDomain,
    projectId: e.firebaseProjectId,
  });
  _auth ??= getAuth(_app);
  return _auth;
}

export { adminAllowlist, isAllowedEmail } from "./allowlist";
