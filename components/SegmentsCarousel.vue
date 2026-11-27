<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { site } from '~/data/site'

const slides = site.segments
const index = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

function go(n: number) {
  index.value = (n + slides.length) % slides.length
}

onMounted(() => {
  timer = setInterval(() => go(index.value + 1), 4200)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section
    id="segmentos"
    class="bg-agenva-navy py-14 text-white md:py-20"
    aria-labelledby="segmentos-title"
  >
    <div class="mx-auto max-w-6xl px-4">
      <h2
        id="segmentos-title"
        class="text-center text-2xl font-extrabold md:text-3xl"
      >
        Um app, todos os segmentos
      </h2>
      <p class="mx-auto mt-3 max-w-2xl text-center text-white/70">
        Escolha o seu no onboarding e receba serviços, duração e preços já sugeridos —
        customize por cima. Da beleza à mecânica.
      </p>

      <div
        class="mt-10 grid items-center gap-8 rounded-3xl bg-white/5 p-6 md:grid-cols-2 md:p-8"
      >
        <img
          :src="slides[index]!.image"
          :alt="slides[index]!.title"
          width="600"
          height="420"
          class="h-64 w-full rounded-2xl object-cover md:h-80"
          loading="lazy"
        >
        <div>
          <h3 class="text-xl font-bold md:text-2xl">
            {{ slides[index]!.title }}
          </h3>
          <p class="mt-3 text-white/80">
            {{ slides[index]!.description }}
          </p>
          <div class="mt-6 flex gap-2" role="tablist" aria-label="Segmentos">
            <button
              v-for="(slide, i) in slides"
              :key="slide.title"
              type="button"
              class="size-2.5 rounded-full transition-colors"
              :class="i === index ? 'bg-agenva-sky' : 'bg-white/30 hover:bg-white/50'"
              :aria-label="`Ver ${slide.title}`"
              :aria-current="i === index"
              @click="go(i)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
