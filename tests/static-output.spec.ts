/**
 * Verificação automatizada do output estático (PLAN passo 7).
 * Rodar DEPOIS de `pnpm generate`.
 *
 * AC1 — 3 rotas pré-renderizadas; sem `server/` no repo.
 * AC2 — links legais no footer + títulos/texto migrado nos HTMLs.
 * AC4 — robots.txt, sitemap.xml, favicon, OG 1200×630 + meta tags na home.
 */
import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, '.output/public')

const readOut = (p: string) => readFileSync(resolve(out, p), 'utf8')

/** PNG IHDR: bytes 16..20 = width, 20..24 = height (big-endian). */
const pngSize = (p: string) => {
  const b = readFileSync(resolve(out, p))
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
}

const hasDir = (p: string) => {
  const full = resolve(root, p)
  return existsSync(full) && statSync(full).isDirectory()
}

describe('AC1 — SSG puro', () => {
  it('.output/public existe (rodar `pnpm generate` antes dos testes)', () => {
    expect(existsSync(out), '.output/public ausente — rode pnpm generate').toBe(true)
  })

  it('pré-renderiza /, /privacidade, /termos', () => {
    for (const f of ['index.html', 'privacidade/index.html', 'termos/index.html']) {
      expect(existsSync(resolve(out, f)), `faltou ${f}`).toBe(true)
    }
  })

  it('repo NÃO contém pasta server/ (RF-S1)', () => {
    const forbidden = ['server', 'server/api', 'server/routes', 'api']
    for (const d of forbidden) {
      expect(hasDir(d), `pasta proibida presente: ${d}`).toBe(false)
    }
  })

  it('seções da home renderizam no HTML gerado', () => {
    const html = readOut('index.html')
    for (const id of ['como-funciona', 'funcionalidades', 'precos', 'faq', 'baixar']) {
      expect(html).toContain(`id="${id}"`)
    }
  })
})

describe('AC2 — páginas LGPD', () => {
  it('footer da home linka /privacidade e /termos', () => {
    const html = readOut('index.html')
    expect(html).toContain('href="/privacidade"')
    expect(html).toContain('href="/termos"')
  })

  it('privacidade contém título, data e texto LGPD migrado literalmente', () => {
    const html = readOut('privacidade/index.html')
    expect(html).toContain('Política de Privacidade')
    expect(html).toContain('09/09/2026')
    expect(html).toContain('LGPD (Lei 13.709/2018)')
    // R3: reuso literal — a inconsistência "Google Cloud (Supabase)" é intencional
    expect(html).toContain('Google Cloud (Supabase)')
    expect(html).toContain('55) 98 9209-3812')
  })

  it('termos contém título, data e seções migradas', () => {
    const html = readOut('termos/index.html')
    expect(html).toContain('Termos de Uso')
    expect(html).toContain('09/09/2026')
    expect(html).toContain('pessoal e intransferível')
    expect(html).toContain('99% de disponibilidade')
  })
})

describe('AC4 — SEO estático', () => {
  it('robots.txt e sitemap.xml no output', () => {
    expect(existsSync(resolve(out, 'robots.txt'))).toBe(true)
    const sm = readOut('sitemap.xml')
    expect(sm).toContain('<urlset')
    expect(sm).toContain('/privacidade')
    expect(sm).toContain('/termos')
  })

  it('favicon e OG image presentes; OG é 1200×630', () => {
    expect(existsSync(resolve(out, 'favicon.svg'))).toBe(true)
    expect(existsSync(resolve(out, 'og-image.png'))).toBe(true)
    expect(pngSize('og-image.png')).toEqual({ width: 1200, height: 630 })
  })

  it('home contém title, description, canonical, OG e twitter card', () => {
    const html = readOut('index.html')
    expect(html).toContain('<title>')
    expect(html).toContain('name="description"')
    expect(html).toContain('rel="canonical"')
    for (const tag of [
      'property="og:title"',
      'property="og:description"',
      'property="og:image"',
      'name="twitter:card"',
    ]) {
      expect(html, `faltou ${tag}`).toContain(tag)
    }
  })
})

describe('Conteúdo comercial (gates)', () => {
  it('Preço único confirmado R$ 29,90/mês (ASAAS_PLAN_VALUE=2990, ciclo MONTHLY)', () => {
    const html = readOut('index.html')
    expect(html).toContain('R$ 29,90')
    expect(html).toContain('/mês')
    // G-S2 bloqueia variações: sem desconto, sem "a partir de", sem checkout no site
    for (const forbidden of [/a partir de|desconto|checkout/i]) {
      expect(html.match(forbidden), `conteúdo comercial proibido: ${forbidden}`).toBeNull()
    }
  })

  it('G-S1 pendente: sem URL TestFlight (CTA cai no WhatsApp/âncora)', () => {
    const html = readOut('index.html')
    expect(html).not.toContain('testflight')
  })

  it('Play Store apenas como "Em breve" — sem URL falsa', () => {
    const html = readOut('index.html')
    expect(html).toContain('Em breve no Google Play')
    expect(html).not.toContain('play.google.com')
  })
})
