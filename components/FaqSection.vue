<script setup lang="ts">
import { site } from '~/data/site'

const openIndex = ref<number | null>(null)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section
    id="faq"
    class="bg-agenva-cloud py-14 md:py-20"
    aria-labelledby="faq-title"
  >
    <div class="mx-auto max-w-3xl px-4">
      <h2
        id="faq-title"
        class="text-center text-2xl font-extrabold text-agenva-navy md:text-3xl"
      >
        Perguntas frequentes
      </h2>

      <div class="mt-8 space-y-3">
        <div
          v-for="(item, i) in site.faq"
          :key="item.question"
          class="overflow-hidden rounded-xl border border-agenva-navy/10 bg-white"
        >
          <h3>
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-agenva-navy"
              :aria-expanded="openIndex === i"
              :aria-controls="`faq-panel-${i}`"
              @click="toggle(i)"
            >
              <span>{{ item.question }}</span>
              <svg
                viewBox="0 0 24 24"
                class="size-5 shrink-0 text-agenva-blue transition-transform"
                :class="{ 'rotate-180': openIndex === i }"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </h3>
          <div
            v-show="openIndex === i"
            :id="`faq-panel-${i}`"
            class="px-5 pb-5"
          >
            <p class="text-sm leading-relaxed text-agenva-navy/80">
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
