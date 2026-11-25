<script setup lang="ts">
import { site, siteUrl } from '~/data/site'
import privacyMd from '~/content/legal/privacidade.md?raw'
import { extractLegalHeader, renderLegalMarkdown } from '~/utils/legalMarkdown'

useHead({
  title: 'Política de Privacidade — AGENVA',
  meta: [
    {
      name: 'description',
      content:
        'Quais dados o AGENVA coleta, por que coleta e quais são os seus direitos pela LGPD (Lei 13.709/2018).',
    },
  ],
  link: [{ rel: 'canonical', href: `${siteUrl}/privacidade` }],
})

const header = extractLegalHeader(privacyMd)
const bodyHtml = renderLegalMarkdown(header.body)
</script>

<template>
  <div>
    <SiteHeader />
    <main
      id="conteudo"
      class="mx-auto max-w-3xl px-4 py-10"
    >
      <nav
        aria-label="Navegação"
        class="mb-6"
      >
        <NuxtLink
          to="/"
          class="text-sm font-semibold text-agenva-blue hover:underline"
        >
          ← Voltar ao início
        </NuxtLink>
      </nav>
      <article class="legal">
        <h1>{{ header.title }}</h1>
        <p class="legal-date">
          {{ header.date }}
        </p>
        <p class="legal-source">
          Documento oficial do aplicativo AGENVA (versão de {{ site.legal.lastUpdated }}).
        </p>
        <!-- Seguro por construção: todo texto é escapado em utils/legalMarkdown.ts -->
        <div v-html="bodyHtml" />
      </article>
    </main>
    <SiteFooter />
  </div>
</template>
