import tailwindcss from '@tailwindcss/vite'
import { site, siteUrl } from './data/site'

// RF-S1 / ADR-S01 — SSG puro:
//  - sem `server/`, sem runtimeConfig, sem routeRules, sem fetch remoto
//  - `nuxt generate` produz todo o site em `.output/public/`
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },

  ssr: true,
  css: ['~/assets/css/main.css'],

  modules: ['@pinia/nuxt'],

  // RF-U4: runtimeConfig.public recebe NUXT_PUBLIC_* automaticamente (build E runtime).
  runtimeConfig: {
    public: {
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseAppId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      apiBaseUrl: '',
      adminEmails: '',
    },
  },

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/', '/privacidade', '/termos', '/admin', '/admin/login', '/admin/audit'],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: site.seo.title,
      meta: [
        { name: 'description', content: site.seo.description },
        { property: 'og:title', content: site.seo.title },
        { property: 'og:description', content: site.seo.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${siteUrl}/` },
        { property: 'og:image', content: `${siteUrl}/og-image.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:site_name', content: site.brand.name },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: site.seo.title },
        { name: 'twitter:description', content: site.seo.description },
        { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
      ],
      link: [
        // G-S5: canônico provisório — siteUrl é a fonte única (R4)
        { rel: 'canonical', href: `${siteUrl}/` },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },

  typescript: {
    strict: true,
  },
})
