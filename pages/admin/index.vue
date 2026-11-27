<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { api, ApiError } from "~/lib/api";
import type { TenantsPage } from "~/lib/types-admin";
import TenantStatusBadge from "~/components/admin/TenantStatusBadge.vue";
import PaginationControl from "~/components/admin/PaginationControl.vue";

definePageMeta({ ssr: false, middleware: "admin", layout: "admin" });

const page = ref(1);
const pageSize = 25;
const q = ref("");
const status = ref("");
const data = ref<TenantsPage | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

let debounce: ReturnType<typeof setTimeout> | undefined;
function onSearch() {
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    page.value = 1;
    void load();
  }, 250);
}
onBeforeUnmount(() => clearTimeout(debounce));

async function load() {
  loading.value = true;
  error.value = null;
  try {
    const params = new URLSearchParams({
      page: String(page.value),
      page_size: String(pageSize),
    });
    if (q.value.trim()) params.set("q", q.value.trim());
    if (status.value) params.set("status", status.value);
    data.value = await api.get<TenantsPage>(`/v1/admin/tenants?${params}`);
  } catch (e) {
    error.value =
      e instanceof ApiError ? e.message : "Falha ao carregar tenants.";
  } finally {
    loading.value = false;
  }
}

onMounted(load);

function fmt(iso: string | null) {
  return iso ? new Date(iso).toLocaleString("pt-BR") : "—";
}
</script>

<template>
  <section>
    <h1>Tenants</h1>
    <div class="filters">
      <input
        v-model="q"
        placeholder="Buscar por nome ou e-mail do owner…"
        @input="onSearch"
      >
      <select
        v-model="status"
        @change="page = 1; load()"
      >
        <option value="">
          Todos os status
        </option>
        <option value="active">
          Ativos
        </option>
        <option value="suspended">
          Suspensos
        </option>
        <option value="trial">
          Trial
        </option>
        <option value="active_subscription">
          Assinatura ativa
        </option>
        <option value="past_due">
          Past due
        </option>
        <option value="canceled">
          Cancelados
        </option>
      </select>
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
          <th>Nome</th><th>Owner</th><th>Status</th><th>Criado em</th><th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="t in data.items"
          :key="t.id"
        >
          <td>{{ t.name }}</td>
          <td>{{ t.owner_email ?? "—" }}</td>
          <td>
            <TenantStatusBadge
              :suspended-at="t.suspended_at"
              :subscription-status="t.subscription_status"
            />
          </td>
          <td>{{ fmt(t.created_at) }}</td>
          <td>
            <NuxtLink :to="`/admin/tenants/${t.id}`">detalhe</NuxtLink>
          </td>
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
.filters { display: flex; gap: .75rem; margin-bottom: 1rem; }
input, select { padding: .45rem; border: 1px solid #ccc; border-radius: 6px; }
input { flex: 1; }
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: .5rem .5rem; border-bottom: 1px solid #eee; font-size: .9rem; }
.error { color: #b00020; }
</style>
