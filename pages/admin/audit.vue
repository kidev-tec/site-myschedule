<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api, ApiError } from "~/lib/api";
import type { AuditPage } from "~/lib/types-admin";
import PaginationControl from "~/components/admin/PaginationControl.vue";

definePageMeta({ ssr: false, middleware: "admin", layout: "admin" });

const page = ref(1);
const pageSize = 25;
const what = ref("");
const tenantId = ref("");
const from = ref("");
const to = ref("");
const data = ref<AuditPage | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

async function load() {
  loading.value = true;
  error.value = null;
  try {
    const params = new URLSearchParams({
      page: String(page.value),
      page_size: String(pageSize),
    });
    if (what.value.trim()) params.set("what", what.value.trim());
    if (tenantId.value.trim()) params.set("tenant_id", tenantId.value.trim());
    if (from.value) params.set("from", new Date(from.value).toISOString());
    if (to.value) params.set("to", new Date(to.value).toISOString());
    data.value = await api.get<AuditPage>(`/v1/admin/audit-log?${params}`);
  } catch (e) {
    error.value =
      e instanceof ApiError ? e.message : "Falha ao carregar auditoria.";
  } finally {
    loading.value = false;
  }
}

onMounted(load);

function fmt(iso: string) {
  const d = new Date(iso);
  return `${d.toLocaleString("pt-BR")} (UTC${d.getTimezoneOffset() <= 0 ? "+" : ""}${-d.getTimezoneOffset() / 60})`;
}
</script>

<template>
  <section>
    <h1>Auditoria</h1>
    <p class="muted">
      Registro append-only: toda ação de administração fica gravada com
      responsável, alvo, horário e IP. Não existe edição nem exclusão.
    </p>
    <div class="filters">
      <input
        v-model="what"
        placeholder="Ação (ex.: tenant.suspended)"
      >
      <input
        v-model="tenantId"
        placeholder="Tenant ID (UUID)"
      >
      <input
        v-model="from"
        type="date"
      >
      <input
        v-model="to"
        type="date"
      >
      <button
        type="button"
        @click="page = 1; load()"
      >
        Filtrar
      </button>
    </div>

    <p v-if="loading">
      Carregando…
    </p>
    <p
      v-else-if="error"
      class="error"
    >
      {{ error }}
    </p>
    <table v-else-if="data">
      <thead>
        <tr>
          <th>Quando</th><th>Ação</th><th>Admin</th><th>Alvo</th><th>IP</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="e in data.items"
          :key="e.id"
        >
          <td>{{ fmt(e.occurred_at) }}</td>
          <td>{{ e.what }}</td>
          <td>{{ e.who.name ?? e.who.email ?? e.who.user_id }}</td>
          <td><code>{{ e.target.type }}:{{ e.target.id.slice(0, 8) }}</code></td>
          <td>{{ e.ip }}</td>
        </tr>
      </tbody>
    </table>
    <PaginationControl
      v-if="data"
      :page="data.page"
      :page-size="data.page_size"
      :total="data.total"
      @change="(p) => { page = p; load(); }"
    />
  </section>
</template>

<style scoped>
.filters { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 1rem; }
input { padding: .4rem; border: 1px solid #ccc; border-radius: 6px; }
button { padding: .45rem .9rem; border: 1px solid #ccc; background: #fff; border-radius: 6px; cursor: pointer; }
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: .45rem .5rem; border-bottom: 1px solid #eee; font-size: .85rem; }
code { font-size: .78rem; color: #555; }
.muted { color: #666; font-size: .9rem; }
.error { color: #b00020; }
</style>
