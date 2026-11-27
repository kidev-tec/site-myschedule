/** Init da sessão admin no client — só nas rotas /admin (não carrega Firebase no site público). */
export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return;
  if (nuxtApp.payload?.error) return; // página de erro: não inicializa auth
  const path = nuxtApp._route?.path ?? "";
  if (path.startsWith("/admin")) {
    const auth = useAuthStore();
    auth.init();
  }
});
