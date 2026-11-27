<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api, ApiError } from "~/lib/api";
import type { BillingInfo, TenantDetail } from "~/lib/types-admin";
import TenantStatusBadge from "~/components/admin/TenantStatusBadge.vue";

definePageMeta({ ssr: false, middleware: "admin", layout: "admin" });

const route = useRoute();
const id = route.params.id as string;

const detail = ref<TenantDetail | null>(null);
const billing = ref<BillingInfo | null>(null);
const billingUnavailable = ref(false);
const loading = ref(true);
const error = ref<string | null>(null);

const showSuspendModal = ref(false);
const reason = ref("");
const confirming = ref(false);
const actionError = ref<string | null>(null);

async function load() {
  loading.value = true;
  error.value = null;
  try {
    const [d, b] = await Promise.allSettled([
      api.get<TenantDetail>(`/v1/admin/tenants/${id}`),
      api.get<BillingInfo>(`/v1/admin/tenants/${id}/billing`),
    ]);
    if (d.status === "rejected") {
      throw d.reason instanceof Error ? d.reason : new Error("erro");
    }
    detail.value = d.value;
    if (b.status === "fulfilled") {
      billing.value = b.value;
      billingUnavailable.value = false;
    } else {
      billingUnavailable.value = true;
    }
  } catch (e) {
    error.value =
      e instanceof ApiError ? e.message : "Falha ao carregar tenant.";
  } finally {
    loading.value = false;
  }
}

async function suspend() {
  if (!reason.value.trim()) {
    actionError.value = "Informe o motivo da suspensão.";
    return;
  }
  confirming.value = true;
  actionError.value = null;
  try {
    await api.patch(`/v1/admin/tenants/${id}/status`, {
      status: "suspended",
      reason: reason.value.trim(),
    });
    showSuspendModal.value = false;
    reason.value = "";
    await load();
  } catch (e) {
    actionError.value =
      e instanceof ApiError ? e.message : "Falha ao suspender.";
  } finally {
    confirming.value = false;
  }
}

async function reactivate() {
  if (!window.confirm("Reativar este tenant?")) return;
  confirming.value = true;
  actionError.value = null;
  try {
    await api.patch(`/v1/admin/tenants/${id}/status`, { status: "active" });
    await load();
  } catch (e) {
    actionError.value =
      e instanceof ApiError ? e.message : "Falha ao reativar.";
  } finally {
    confirming.value = false;
  }
}

onMounted(load);

function fmt(iso: string | null) {
  return iso ? new Date(iso).toLocaleString("pt-BR") : "—";
}
const money = (cents?: number) =>
  cents === undefined ? "—" : (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
</script>

<template>
  <section>
    <p><NuxtLink to="/admin">← Tenants</NuxtLink></p>
    <p v-if="loading">
      Carregando…
    </p>
    <p
      v-else-if="error"
      class="error"
    >
      {{ error }}
    </p>
    <template v-else-if="detail">
      <h1>
        {{ detail.name }}
        <TenantStatusBadge
          :suspended-at="detail.suspended_at"
          :subscription-status="detail.subscription_status"
        />
      </h1>
      <dl>
        <dt>Slug</dt><dd>{{ detail.slug }}</dd>
        <dt>Owner</dt><dd>{{ detail.owner_email ?? "—" }}</dd>
        <dt>Segmento</dt><dd>{{ detail.business_type }}</dd>
        <dt>Fuso</dt><dd>{{ detail.timezone }}</dd>
        <dt>Criado em</dt><dd>{{ fmt(detail.created_at) }}</dd>
        <dt>Trial até</dt><dd>{{ fmt(detail.trial_ends_at) }}</dd>
        <dt v-if="detail.suspended_at">
          Suspenso em
        </dt>
        <dd v-if="detail.suspended_at">
          {{ fmt(detail.suspended_at) }}
        </dd>
        <dt v-if="detail.suspension_reason">
          Motivo
        </dt>
        <dd v-if="detail.suspension_reason">
          {{ detail.suspension_reason }}
        </dd>
      </dl>

      <h2>Billing</h2>
      <p
        v-if="billingUnavailable"
        class="muted"
      >
        Billing indisponível (frente Asaas ainda não configurada para este
        tenant/plataforma).
      </p>
      <template v-else-if="billing">
        <dl>
          <dt>Status</dt><dd>{{ billing.subscription_status }}</dd>
          <dt>Provedor</dt><dd>{{ billing.provider ?? "—" }}</dd>
        </dl>
        <table v-if="billing.recent_payments?.length">
          <thead>
            <tr><th>Pagamento</th><th>Status</th><th>Valor</th><th>Vencimento</th><th>Pago em</th></tr>
          </thead>
          <tbody>
            <tr
              v-for="p in billing.recent_payments"
              :key="p.id"
            >
              <td>{{ p.id }}</td>
              <td>{{ p.status }}</td>
              <td>{{ money(p.value_cents) }}</td>
              <td>{{ p.due_date }}</td>
              <td>{{ fmt(p.paid_at) }}</td>
            </tr>
          </tbody>
        </table>
      </template>

      <div class="actions">
        <button
          v-if="!detail.suspended_at"
          type="button"
          class="danger"
          @click="showSuspendModal = true"
        >
          Suspender tenant
        </button>
        <button
          v-else
          type="button"
          :disabled="confirming"
          @click="reactivate"
        >
          Reativar tenant
        </button>
        <p
          v-if="actionError"
          class="error"
        >
          {{ actionError }}
        </p>
      </div>

      <div
        v-if="showSuspendModal"
        class="modal"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal-box">
          <h2>Suspender “{{ detail.name }}”</h2>
          <p class="muted">
            O tenant perde acesso à API e o link público para de aceitar
            agendamentos imediatamente.
          </p>
          <label>
            Motivo (obrigatório, registrado na auditoria)
            <textarea
              v-model="reason"
              rows="3"
              maxlength="500"
            />
          </label>
          <div class="modal-actions">
            <button
              type="button"
              @click="showSuspendModal = false"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="danger"
              :disabled="confirming"
              @click="suspend"
            >
              {{ confirming ? "Suspensão…" : "Confirmar suspensão" }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
dl { display: grid; grid-template-columns: 140px 1fr; gap: .35rem .75rem; font-size: .92rem; }
dt { color: #555; }
.error { color: #b00020; }
.muted { color: #666; font-size: .9rem; }
table { width: 100%; border-collapse: collapse; margin-top: .5rem; }
th, td { text-align: left; padding: .4rem; border-bottom: 1px solid #eee; font-size: .85rem; }
.actions { margin-top: 1.5rem; display: grid; gap: .5rem; }
button { padding: .55rem 1rem; border: 1px solid #ccc; background: #fff; border-radius: 6px; cursor: pointer; }
button.danger { background: #b00020; border-color: #b00020; color: #fff; }
.modal { position: fixed; inset: 0; background: rgba(0,0,0,.45); display: grid; place-items: center; }
.modal-box { background: #fff; border-radius: 10px; padding: 1.25rem 1.5rem; max-width: 440px; width: 92%; }
.modal-box label { display: grid; gap: .3rem; font-size: .9rem; margin: .75rem 0; }
textarea { padding: .45rem; border: 1px solid #ccc; border-radius: 6px; }
.modal-actions { display: flex; justify-content: flex-end; gap: .6rem; }
</style>
