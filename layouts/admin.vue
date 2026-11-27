<script setup lang="ts">
/**
 * Layout admin — envolve páginas /admin/* (login e painel) em fullscreen real.
 * Páginas públicas não declaram este layout: caem no default (só NuxtPage).
 */
useHead({
  meta: [{ name: "robots", content: "noindex" }],
});
</script>

<template>
  <div class="admin-root">
    <slot />
  </div>
</template>

<style scoped>
.admin-root {
  min-height: 100svh;
  width: 100%;
}
</style>
