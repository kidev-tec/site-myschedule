/**
 * Guard de sessão admin (client-only nas páginas ssr:false).
 * NÃO substitui a API: toda ação continua sujeita a 401/403 do admin-guard.
 */
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;
  const auth = useAuthStore();
  if (to.path !== "/admin/login" && !auth.isLoggedIn) {
    return navigateTo("/admin/login");
  }
  if (to.path === "/admin/login" && auth.isLoggedIn) {
    return navigateTo("/admin");
  }
});
