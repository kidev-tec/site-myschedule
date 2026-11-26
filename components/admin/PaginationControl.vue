<script setup lang="ts">
defineProps<{ page: number; pageSize: number; total: number }>();
const emit = defineEmits<{ change: [page: number] }>();
</script>

<template>
  <div class="pager">
    <button
      type="button"
      :disabled="page <= 1"
      @click="emit('change', page - 1)"
    >
      ← Anterior
    </button>
    <span>
      Página {{ page }} · {{ total }} registros
    </span>
    <button
      type="button"
      :disabled="page * pageSize >= total"
      @click="emit('change', page + 1)"
    >
      Próxima →
    </button>
  </div>
</template>

<style scoped>
.pager { display: flex; gap: 1rem; align-items: center; margin-top: 1rem; }
button { padding: .35rem .8rem; border: 1px solid #ccc; background: #fff; border-radius: 6px; cursor: pointer; }
button:disabled { opacity: .45; cursor: default; }
</style>
