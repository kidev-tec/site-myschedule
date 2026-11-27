<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";

definePageMeta({ ssr: false, layout: "admin" });
useHead({
  title: "Entrar — Painel AGENVA",
  meta: [{ name: "robots", content: "noindex" }],
});

const auth = useAuthStore();
const email = ref("");
const password = ref("");

async function submit() {
  const ok = await auth.login(email.value, password.value);
  if (ok) navigateTo("/admin");
}
</script>

<template>
  <div class="screen">
    <aside class="brand">
      <div class="logo">
        <img
          src="/agenva_logo.png"
          alt="AGENVA"
        >
      </div>
      <h1>Painel AGENVA</h1>
      <p>Agenda e clientes na palma da mão — gerencie tenants, assinaturas e auditoria da plataforma.</p>
      <ul class="checkline">
        <li>Tenants e assinaturas Asaas</li>
        <li>Auditoria append-only</li>
        <li>Suspensão com transparência</li>
      </ul>
    </aside>
    <main class="form-side">
      <form
        class="card"
        @submit.prevent="submit"
      >
        <h2>Entrar</h2>
        <p class="sub">
          Acesso restrito à equipe AGENVA.
        </p>
        <label for="email">E-mail</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          autocomplete="username"
          placeholder="voce@agenva"
        >
        <label for="pass">Senha</label>
        <input
          id="pass"
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          placeholder="••••••••"
        >
        <p
          v-if="auth.error"
          class="error"
          role="alert"
        >
          {{ auth.error }}
        </p>
        <button
          type="submit"
          :disabled="auth.loading"
        >
          {{ auth.loading ? "Entrando…" : "Entrar" }}
        </button>
        <p class="hint">
          Acesso concedido apenas a contas autorizadas.
        </p>
      </form>
    </main>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Marcellus";
  src: url("/fonts/Marcellus-Regular.ttf");
}
@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Regular.ttf");
  font-weight: 400;
}
@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-SemiBold.ttf");
  font-weight: 600;
}

.screen {
  --blue: #1e96e8;
  --navy: #16325c;
  --sky: #54b7ea;
  --surface: #f8f9fa;
  min-height: 100vh;
  display: flex;
  font-family: "Poppins", system-ui, sans-serif;
  color: var(--navy);
}

/* Painel esquerdo — marca */
.brand {
  flex: 1.1;
  background: linear-gradient(160deg, var(--blue) 0%, var(--navy) 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px;
  position: relative;
  overflow: hidden;
}
.brand::after {
  content: "";
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  right: -160px;
  bottom: -160px;
}
.brand .logo {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: #fff;
  display: grid;
  place-items: center;
  margin-bottom: 28px;
}
.brand .logo img {
  width: 48px;
  height: 48px;
  border-radius: 12px;
}
.brand h1 {
  font-family: "Marcellus", serif;
  font-size: 44px;
  font-weight: 400;
  margin-bottom: 14px;
}
.brand p {
  max-width: 42ch;
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
}
.checkline {
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
}
.checkline li {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 14px;
}
.checkline li::before {
  content: "";
  flex: none;
  width: 18px;
  height: 18px;
  background:
    linear-gradient(45deg, transparent 44%, var(--sky) 44%, var(--sky) 56%, transparent 56%) center / 100% 100%,
    linear-gradient(-45deg, transparent 42%, var(--sky) 42%, var(--sky) 58%, transparent 58%) center / 60% 100%,
    linear-gradient(var(--sky), var(--sky)) center / 100% 35%;
  background-repeat: no-repeat;
  background-position: 55% 60%, 40% 62%, left 40% top 55%;
}

/* Formulário */
.form-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: var(--surface);
}
.card {
  width: 100%;
  max-width: 400px;
}
h2 {
  font-family: "Marcellus", serif;
  font-size: 28px;
  font-weight: 400;
}
.sub {
  font-size: 14px;
  color: #5a6b85;
  margin: 8px 0 32px;
}
label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin: 18px 0 6px;
}
input {
  width: 100%;
  padding: 13px 16px;
  border-radius: 12px;
  border: 1.5px solid rgba(30, 150, 232, 0.4);
  background: rgba(30, 150, 232, 0.06);
  font: inherit;
  font-size: 15px;
  color: var(--navy);
  outline: none;
  transition: border 0.15s;
}
input:focus {
  border-color: var(--blue);
  border-width: 2px;
  background: #fff;
}
button {
  width: 100%;
  margin-top: 28px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: var(--blue);
  color: #fff;
  font: inherit;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.15s;
}
button:hover:not(:disabled) {
  background: #1573b5;
}
.hint {
  margin-top: 22px;
  font-size: 12.5px;
  color: #8b98ad;
  text-align: center;
}
.error {
  font-size: 13px;
  color: #c62828;
  margin-top: 14px;
}

@media (max-width: 860px) {
  .screen {
    flex-direction: column;
  }
  .brand {
    flex: none;
    padding: 40px 24px;
    text-align: center;
    align-items: center;
  }
  .checkline {
    display: none;
  }
  .brand .logo {
    margin: 0 auto 16px;
  }
  .brand h1 {
    font-size: 30px;
  }
  .form-side {
    padding: 32px 20px;
  }
}
</style>
