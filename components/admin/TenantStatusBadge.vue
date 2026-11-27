<script setup lang="ts">
/** Badge de status do tenant: suspenso > billing > ativo. */
defineProps<{
  suspendedAt: string | null;
  subscriptionStatus: string;
}>();
</script>

<template>
  <span
    class="badge"
    :class="suspendedAt ? 'suspended' : subscriptionStatus"
  >
    {{ suspendedAt ? "suspenso" : subscriptionStatus }}
  </span>
</template>

<style scoped>
.badge { padding: .15rem .5rem; border-radius: 999px; font-size: .75rem; font-weight: 600; text-transform: uppercase; }
.suspended { background: #fdecea; color: #b00020; }
.active { background: #e6f4ea; color: #1e7e34; }
.trial { background: #fff4e5; color: #b26a00; }
.past_due, .canceled { background: #f3f4f6; color: #555; }
</style>
