/**
 * Auth store — sessão Firebase individual por admin (decisão nº 2).
 * Allowlist é filtro de UX: email fora → nem chama a API; email dentro mas
 * sem role no banco → API responde 403 → logout imediato + mensagem neutra.
 */
import {
  browserLocalPersistence,
  getIdTokenResult,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { defineStore } from "pinia";
import { api, ApiError, setTokenGetter } from "~/lib/api";
import { getFirebaseAuth, isAllowedEmail } from "~/lib/firebase";

type State = {
  email: string | null;
  loading: boolean;
  error: string | null;
  /** 403 da API: conta autenticada sem role platform_admin */
  forbidden: boolean;
};

export const useAuthStore = defineStore("auth", {
  state: (): State => ({ email: null, loading: false, error: null, forbidden: false }),
  getters: {
    isLoggedIn: (s) => s.email !== null && !s.forbidden,
  },
  actions: {
    async init() {
      const auth = getFirebaseAuth();
      if (!auth) {
        this.error = "Firebase não configurado.";
        return;
      }
      setTokenGetter(async () => {
        const u = auth.currentUser;
        return u ? getIdTokenResult(u) : null;
      });
      setPersistence(auth, browserLocalPersistence).catch(() => {});
      return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          if (!user?.email) {
            this.email = null;
            resolve();
            return;
          }
          this.email = user.email;
          if (!isAllowedEmail(user.email)) {
            // allowlist de UX: não tenta a API; desloga com mensagem neutra
            await signOut(auth).catch(() => {});
            this.email = null;
            this.forbidden = true;
            this.error = "Conta não autorizada para este painel.";
            resolve();
            return;
          }
          // autoridade final: API valida role platform_admin no banco
          try {
            await api.get("/v1/admin/tenants?page_size=1");
            this.forbidden = false;
          } catch (e) {
            if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
              await signOut(auth).catch(() => {});
              this.email = null;
              this.forbidden = true;
              this.error =
                e.status === 403
                  ? "Conta sem permissão de administrador."
                  : "Sessão expirada. Entre novamente.";
            }
          }
          resolve();
        });
      });
    },
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      this.forbidden = false;
      const normalized = email.trim().toLowerCase();
      try {
        if (!isAllowedEmail(normalized)) {
          this.forbidden = true;
          this.error = "Conta não autorizada para este painel.";
          return false;
        }
        const auth = getFirebaseAuth();
        if (!auth) {
          this.error = "Firebase não configurado.";
          return false;
        }
        await signInWithEmailAndPassword(auth, normalized, password);
        // onAuthStateChanged faz a checagem de role na API
        return true;
      } catch {
        this.error = "E-mail ou senha inválidos.";
        return false;
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      const auth = getFirebaseAuth();
      if (auth) await signOut(auth).catch(() => {});
      this.email = null;
      this.forbidden = false;
      this.error = null;
    },
  },
});
