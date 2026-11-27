<script setup lang="ts">
import { site } from '~/data/site'

const props = defineProps<{ error: { statusCode?: number; statusMessage?: string } }>()

const is404 = props.error.statusCode === 404
const title = is404
  ? 'Página não encontrada — AGENVA'
  : 'Algo deu errado — AGENVA'

useHead({
  title,
  meta: [
    { name: 'robots', content: 'noindex, follow' },
    { name: 'description', content: 'Página não encontrada no site do AGENVA. Volte ao início para conhecer a agenda simples para o seu negócio.' },
  ],
})

const goHome = () => navigateTo('/')
</script>

<template>
  <div
    class="flex min-h-svh flex-col items-center justify-center bg-agenva-cloud px-6 text-center"
    role="main"
  >
    <img
      src="/agenva_logo.png"
      alt="AGENVA — página inicial"
      class="h-12 w-auto"
      width="180"
      height="48"
    >
    <p class="mt-10 text-6xl font-bold text-agenva-navy">
      {{ error.statusCode || 'Erro' }}
    </p>
    <h1 class="mt-4 text-2xl font-semibold text-agenva-navy">
      {{ is404 ? 'Essa página não existe ou foi movida.' : 'Algo inesperado aconteceu.' }}
    </h1>
    <p class="mt-3 max-w-md text-agenva-navy/80">
      {{ is404
        ? 'Confira o endereço ou volte ao início para conhecer o AGENVA.'
        : 'Tente recarregar a página. Se o problema persistir, fale com a gente.' }}
    </p>
    <button
      type="button"
      class="mt-8 rounded-full bg-agenva-blue px-8 py-3 font-semibold text-white hover:bg-agenva-navy"
      @click="goHome"
    >
      Voltar ao início
    </button>
    <a
      :href="site.contact.whatsappUrl"
      class="mt-4 text-sm font-medium text-agenva-blue underline hover:text-agenva-navy"
      rel="noopener"
    >
      Falar no WhatsApp
    </a>
  </div>
</template>
