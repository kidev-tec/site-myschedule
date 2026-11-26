<script setup lang="ts">
import { site, siteUrl } from '~/data/site'

const schema = [
  {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: site.brand.name,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/og-image.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-98-9209-3812',
      contactType: 'customer support',
      availableLanguage: ['pt-BR'],
    },
  },
  {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: site.seo.title,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${siteUrl}/#organization` },
  },
  {
    '@type': 'MobileApplication',
    name: site.brand.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Android, iOS',
    description: site.seo.description,
    offers: { '@type': 'Offer', price: '29.90', priceCurrency: 'BRL' },
  },
]

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': schema }),
    },
  ],
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
