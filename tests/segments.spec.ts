/**
 * Unit — dados e lógica do carrossel de segmentos.
 * Fonte canônica dos segmentos: lib/core/segment/segment_preset.dart (app Flutter).
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { site } from '../data/site'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

describe('site.segments (carrossel multi-segmento)', () => {
  it('contém os 8 segmentos reais do app + genérico', () => {
    const titles = site.segments.map((s) => s.title)
    for (const expected of [
      'Estética & Beleza',
      'Barbearia',
      'Odontologia',
      'Medicina',
      'Estética Automotiva',
      'Banho e Tosa',
      'Veterinária',
      'Mecânica',
    ]) {
      expect(titles, `segmento faltando: ${expected}`).toContain(expected)
    }
    expect(titles.length).toBeGreaterThanOrEqual(9)
  })

  it('cada segmento tem título, descrição e imagem não vazios', () => {
    for (const s of site.segments) {
      expect(s.title.length).toBeGreaterThan(3)
      expect(s.description.length).toBeGreaterThan(20)
      expect(s.image).toMatch(/^https:\/\//)
    }
  })

  it('títulos únicos (keys estáveis do carrossel)', () => {
    const titles = site.segments.map((s) => s.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('hero posiciona o app como multi-segmento', () => {
    expect(site.hero.subtitle).toContain('multi-segmento')
  })
})

describe('segment_preset.dart ↔ site.ts paridade', () => {
  it('todos os segmentos do preset do app aparecem no site', () => {
    const dart = readFileSync(
      resolve(root, 'tests/fixtures/segment_preset.dart'),
      'utf8',
    )
    // Extrai labels do array de segmentos (label: 'X' dentro do preset, ignora default 'AGENVA')
    const labels = [...dart.matchAll(/^\s{6}label:\s*'([^']+)',/gm)].map((m) => m[1]!).filter((l) => l !== 'AGENVA')
    const titles = site.segments.map((s) => s.title)
    for (const label of labels) {
      const norm = (t: string) => t.toLowerCase().replace(/&|e\s/g, '').replace(/\s+/g, ' ').trim()
      const found = titles.some((t) => norm(t) === norm(label) || t.toLowerCase().includes(label.toLowerCase()))
      expect(found, `segmento do app ausente no site: ${label}`).toBe(true)
    }
  })
})
