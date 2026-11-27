<template>
  <section
    id="como-funciona"
    class="bg-white py-14 md:py-20"
    aria-labelledby="como-funciona-title"
  >
    <div class="mx-auto max-w-6xl px-4">
      <h2
        id="como-funciona-title"
        class="text-center text-2xl font-extrabold text-agenva-navy md:text-3xl"
      >
        Como funciona
      </h2>
      <p class="mx-auto mt-3 max-w-xl text-center text-base text-agenva-navy/70">
        Comece a receber agendamentos em três passos.
      </p>

      <ol class="mt-10 grid gap-6 md:grid-cols-3">
        <li
          v-for="(step, i) in steps"
          :key="step.title"
          class="relative rounded-2xl border border-agenva-navy/10 bg-agenva-cloud p-6"
        >
          <span
            class="mb-4 flex size-11 items-center justify-center rounded-full bg-agenva-blue text-lg font-extrabold text-white"
            aria-hidden="true"
          >
            {{ i + 1 }}
          </span>
          <h3 class="text-lg font-bold text-agenva-navy">
            {{ step.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-agenva-navy/75">
            {{ step.description }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { site } from '~/data/site'
const steps = site.steps
</script>
