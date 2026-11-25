<script setup lang="ts">
import { site } from '~/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-agenva-navy/10 bg-white">
    <div class="mx-auto max-w-6xl px-4 py-10">
      <div class="flex flex-col gap-8 md:flex-row md:justify-between">
        <div class="max-w-sm">
          <p class="text-lg font-extrabold text-agenva-navy">
            {{ site.brand.name }}
          </p>
          <p class="mt-2 text-sm text-agenva-navy/70">
            {{ site.brand.tagline }}
          </p>
        </div>

        <div>
          <h2 class="text-sm font-bold uppercase tracking-wide text-agenva-navy/60">
            Contato
          </h2>
          <a
            :href="site.contact.whatsappUrl"
            target="_blank"
            rel="noopener"
            class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-agenva-blue hover:underline"
          >
            <svg
              viewBox="0 0 24 24"
              class="size-5"
              aria-hidden="true"
              fill="currentColor"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.03c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
            </svg>
            WhatsApp {{ site.contact.whatsappLabel }}
          </a>
        </div>

        <div>
          <h2 class="text-sm font-bold uppercase tracking-wide text-agenva-navy/60">
            Legal
          </h2>
          <ul class="mt-3 space-y-2">
            <li>
              <NuxtLink
                to="/privacidade"
                class="text-sm font-semibold text-agenva-blue hover:underline"
              >
                Política de Privacidade
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/termos"
                class="text-sm font-semibold text-agenva-blue hover:underline"
              >
                Termos de Uso
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <p class="mt-10 border-t border-agenva-navy/10 pt-6 text-center text-xs text-agenva-navy/60">
        © {{ year }} AGENVA. Todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>
