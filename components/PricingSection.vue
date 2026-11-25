<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <!-- Preço confirmado no código (ASAAS_PLAN_VALUE=2990, ciclo MONTHLY).
       Sem checkout no site; G-S2 bloqueia apenas variações comerciais. -->
  <section
    id="precos"
    class="bg-white py-14 md:py-20"
    aria-labelledby="precos-title"
  >
    <div class="mx-auto max-w-3xl px-4 text-center">
      <h2
        id="precos-title"
        class="text-2xl font-extrabold text-agenva-navy md:text-3xl"
      >
        {{ site.pricing.heading }}
      </h2>

      <div class="mx-auto mt-8 max-w-sm rounded-2xl border-2 border-agenva-cloud bg-agenva-cloud/40 p-8 shadow-sm">
        <p class="text-sm font-bold uppercase tracking-wide text-agenva-blue">
          {{ site.pricing.planName }}
        </p>
        <p class="mt-3 text-4xl font-extrabold text-agenva-navy md:text-5xl">
          {{ site.pricing.price }}
          <span class="text-lg font-semibold text-agenva-navy/60">{{ site.pricing.period }}</span>
        </p>
        <p class="mt-4 text-sm leading-relaxed text-agenva-navy/75">
          {{ site.pricing.note }}
        </p>
      </div>
    </div>
  </section>
</template>
