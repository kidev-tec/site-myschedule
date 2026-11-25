<script setup lang="ts">
import { site } from '~/data/site'

const icons: Record<string, { d: string; label: string }> = {
  calendar: {
    label: 'Ícone de calendário',
    d: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  },
  users: {
    label: 'Ícone de pessoas',
    d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  },
  whatsapp: {
    label: 'Ícone de conversa',
    d: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  },
  google: {
    label: 'Ícone de sincronização',
    d: 'M21 12a9 9 0 1 1-3-6.7M21 3v5h-5',
  },
  card: {
    label: 'Ícone de cartão',
    d: 'M2 6h20v12H2zM2 10h20',
  },
}
</script>

<template>
  <section
    id="funcionalidades"
    class="bg-agenva-cloud py-14 md:py-20"
    aria-labelledby="funcionalidades-title"
  >
    <div class="mx-auto max-w-6xl px-4">
      <h2
        id="funcionalidades-title"
        class="text-center text-2xl font-extrabold text-agenva-navy md:text-3xl"
      >
        Tudo que você precisa para atender
      </h2>

      <ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="feature in site.features"
          :key="feature.title"
          class="rounded-2xl border border-agenva-navy/10 bg-white p-6"
        >
          <span class="mb-4 flex size-12 items-center justify-center rounded-xl bg-agenva-blue/10 text-agenva-blue">
            <svg
              viewBox="0 0 24 24"
              class="size-6"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path :d="icons[feature.icon]!.d" />
            </svg>
            <span class="sr-only">{{ icons[feature.icon]!.label }}</span>
          </span>
          <h3 class="text-lg font-bold text-agenva-navy">
            {{ feature.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-agenva-navy/75">
            {{ feature.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
