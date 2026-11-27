/**
 * Env do admin (SPEC RF-U4) — runtimeConfig.public (Nuxt mapeia NUXT_PUBLIC_<KEY>
 * automático, build E runtime). Fallback process.env só p/ vitest standalone.
 */
export function adminEnv() {
  // ponytail: useRuntimeConfig precisa de contexto Nuxt; fora dele (vitest),
  // cai em process.env — add tryNuxtEnv helper quando testes rodarem no Nuxt.
  try {
    const config = useRuntimeConfig();
    return config.public as Record<string, string>;
  } catch {
    return {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY ?? "",
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID ?? "",
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
      firebaseMessagingSenderId:
        process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL ?? "",
      adminEmails: process.env.NUXT_PUBLIC_ADMIN_EMAILS ?? "",
    };
  }
}
