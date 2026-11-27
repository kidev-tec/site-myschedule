/**
 * SEO — schema.org JSON-LD, canonical e conteúdo estrutural do output.
 * Rodar DEPOIS de `pnpm generate`.
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, '.output/public')
const readOut = (p: string) => readFileSync(resolve(out, p), 'utf8')

describe('SEO — JSON-LD', () => {
  it('home contém @graph com Organization, WebSite e MobileApplication', () => {
    const html = readOut('index.html')
    const match = html.match(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/)
    expect(match, 'script ld+json ausente').not.toBeNull()
    const graph = JSON.parse(match![1]!)
    const types = graph['@graph'].map((n: { '@type': string }) => n['@type'])
    for (const t of ['Organization', 'WebSite', 'MobileApplication']) {
      expect(types, `tipo ausente: ${t}`).toContain(t)
    }
    expect(graph['@context']).toBe('https://schema.org')
  })

  it('MobileApplication declara oferta BRL 29.90', () => {
    const html = readOut('index.html')
    const graph = JSON.parse(html.match(/application\/ld\+json[^>]*>([\s\S]*?)<\/script>/)![1]!)
    const app = graph['@graph'].find((n: { '@type': string }) => n['@type'] === 'MobileApplication')
    expect(app.offers).toMatchObject({ price: '29.90', priceCurrency: 'BRL' })
  })

  it('canonical aponta para a URL do site', () => {
    expect(readOut('index.html')).toContain('rel="canonical"')
  })
})

describe('SEO — seção de segmentos', () => {
  it('section#segmentos pré-renderizada com heading e todos os títulos', () => {
    const html = readOut('index.html')
    expect(html).toContain('id="segmentos"')
    expect(html).toContain('Um app, todos os segmentos')
    for (const t of ['Barbearia', 'Veterinária', 'Mecânica', 'Odontologia']) {
      expect(html, `segmento ausente no HTML: ${t}`).toContain(t)
    }
  })

  it('imagens do carrossel têm alt descritivo', () => {
    const html = readOut('index.html')
    // SSR renderiza o slide inicial com alt = título do segmento
    expect(html).toMatch(/alt="Estética &amp; Beleza"|alt="Estética & Beleza"/)
  })
})
