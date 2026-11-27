<script setup lang="ts">
import { site } from '~/data/site'

const navOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-agenva-navy/10 bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
      <NuxtLink
        to="/"
        class="flex min-w-0 items-center gap-2"
        aria-label="AGENVA — página inicial"
      >
        <img
          src="/brand/agenva-logo.svg"
          alt=""
          width="36"
          height="36"
          class="size-9 shrink-0"
        >
        <span class="truncate text-lg font-extrabold tracking-tight">{{ site.brand.name }}</span>
      </NuxtLink>

      <nav
        class="no-scrollbar hidden items-center gap-6 md:flex"
        aria-label="Seções"
      >
        <a
          v-for="item in site.nav"
          :key="item.href"
          :href="item.href"
          class="whitespace-nowrap text-sm font-semibold text-agenva-navy/80 hover:text-agenva-blue"
        >
          {{ item.label }}
        </a>
      </nav>

      <a
        :href="site.contact.whatsappUrl"
        target="_blank"
        rel="noopener"
        class="hidden shrink-0 rounded-lg bg-agenva-blue px-4 py-2 text-base font-bold text-white hover:bg-agenva-navy md:inline-block"
      >
        Falar no WhatsApp
      </a>

      <button
        type="button"
        class="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-agenva-navy/15 md:hidden"
        :aria-expanded="navOpen"
        aria-controls="menu-mobile"
        aria-label="Abrir menu de navegação"
        @click="navOpen = !navOpen"
      >
        <svg
          v-if="!navOpen"
          viewBox="0 0 24 24"
          class="size-6"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          class="size-6"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <nav
      v-if="navOpen"
      id="menu-mobile"
      class="border-t border-agenva-navy/10 bg-white px-4 pb-4 md:hidden"
      aria-label="Seções"
    >
      <a
        v-for="item in site.nav"
        :key="item.href"
        :href="item.href"
        class="block border-b border-agenva-navy/5 py-3 text-base font-semibold text-agenva-navy/90"
        @click="navOpen = false"
      >
        {{ item.label }}
      </a>
      <a
        :href="site.contact.whatsappUrl"
        target="_blank"
        rel="noopener"
        class="mt-3 block rounded-lg bg-agenva-blue px-4 py-3 text-center text-base font-bold text-white"
      >
        Falar no WhatsApp
      </a>
    </nav>
  </header>
</template>
