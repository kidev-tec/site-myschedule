/** Init da sessão admin no client — observa Firebase e valida role na API. */
export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const auth = useAuthStore();
    auth.init();
  }
});
