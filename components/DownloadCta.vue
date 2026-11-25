<script setup lang="ts">
import { site } from '~/data/site'

const hasTestFlight = computed(() => site.downloads.testflightUrl.startsWith('https://'))
</script>

<template>
  <section
    id="baixar"
    class="bg-agenva-navy py-14 md:py-20"
    aria-labelledby="baixar-title"
  >
    <div class="mx-auto max-w-3xl px-4 text-center">
      <h2
        id="baixar-title"
        class="text-2xl font-extrabold text-white md:text-3xl"
      >
        Comece agora com o AGENVA
      </h2>
      <p class="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/85">
        Baixe o app, crie sua conta e organize seus atendimentos hoje mesmo.
      </p>

      <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          v-if="hasTestFlight"
          :href="site.downloads.testflightUrl"
          target="_blank"
          rel="noopener"
          class="inline-block w-full rounded-xl bg-agenva-blue px-8 py-4 text-lg font-bold text-white hover:bg-agenva-sky sm:w-auto"
        >
          Baixar no TestFlight
        </a>
        <a
          v-else
          :href="site.contact.whatsappUrl"
          target="_blank"
          rel="noopener"
          class="inline-block w-full rounded-xl bg-agenva-blue px-8 py-4 text-lg font-bold text-white hover:bg-agenva-sky sm:w-auto"
        >
          Quero participar do teste
        </a>
        <span
          class="inline-block w-full rounded-xl border border-white/40 px-8 py-4 text-center text-base font-semibold text-white/70 sm:w-auto"
          aria-label="Em breve no Google Play"
        >
          {{ site.downloads.playStoreLabel }}
        </span>
      </div>
    </div>
  </section>
</template>
