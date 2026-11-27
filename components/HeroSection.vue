<script setup lang="ts">
import { site } from '~/data/site'

const hasTestFlight = computed(() => site.downloads.testflightUrl.startsWith('https://'))
</script>

<template>
  <section
    id="hero"
    class="bg-gradient-to-b from-agenva-cloud to-white"
  >
    <div class="mx-auto max-w-6xl px-4 pb-14 pt-12 text-center md:pb-20 md:pt-20">
      <p class="mb-4 text-sm font-bold uppercase tracking-wide text-agenva-blue">
        {{ site.hero.eyebrow }}
      </p>
      <h1 class="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-agenva-navy md:text-5xl md:leading-tight">
        {{ site.hero.title }}
      </h1>
      <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-agenva-navy/80 md:text-lg">
        {{ site.hero.subtitle }}
      </p>

      <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          v-if="hasTestFlight"
          :href="site.downloads.testflightUrl"
          target="_blank"
          rel="noopener"
          class="inline-block w-full rounded-xl bg-agenva-blue px-8 py-4 text-lg font-bold text-white shadow-lg shadow-agenva-blue/30 hover:bg-agenva-navy sm:w-auto"
        >
          {{ site.hero.primaryCta }}
        </a>
        <a
          v-else
          href="#funcionalidades"
          class="inline-block w-full rounded-xl bg-agenva-blue px-8 py-4 text-lg font-bold text-white shadow-lg shadow-agenva-blue/30 hover:bg-agenva-navy sm:w-auto"
        >
          {{ site.hero.primaryCta }}
        </a>
        <a
          :href="site.contact.whatsappUrl"
          target="_blank"
          rel="noopener"
          class="inline-block w-full rounded-xl border-2 border-agenva-navy px-8 py-4 text-center text-lg font-bold text-agenva-navy hover:bg-agenva-navy hover:text-white sm:w-auto"
        >
          {{ site.hero.secondaryCta }}
        </a>
      </div>

      <p class="mt-4 text-sm font-semibold text-agenva-navy/70">
        {{ site.hero.proof }}
      </p>
      <p class="mt-2 text-sm text-agenva-navy/60">
        Disponível para iOS via TestFlight · {{ site.downloads.playStoreLabel }}
      </p>
    </div>
  </section>
</template>
