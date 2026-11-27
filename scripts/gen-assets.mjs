/**
 * Gera os assets de marca derivados do PNG oficial do app (512×512):
 *   public/brand/agenva-logo.svg  — wrapper SVG do PNG (G-S3 pendente: trocar
 *                                   pelo SVG final quando chegar)
 *   public/favicon.svg            — idem (vetor por wrapped-PNG)
 *   public/favicon-32.png         — 32×32
 *   public/apple-touch-icon.png   — 180×180 com padding
 *   public/og-image.png           — 1200×630 (navy + logo + wordmark)
 *
 * Uso: node scripts/gen-assets.mjs <caminho-para-agenva_logo.png>
 * Rodar uma vez; artefatos são commitados.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pub = resolve(root, 'public')
mkdirSync(resolve(pub, 'brand'), { recursive: true })

const src = process.argv[2]
if (!src) {
  console.error('uso: node scripts/gen-assets.mjs <agenva_logo.png>')
  process.exit(1)
}

const png = readFileSync(src)
const b64 = png.toString('base64')

// 1. Wrapper SVG (provisório até G-S3)
const svg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512" role="img" aria-label="Logotipo AGENVA">
  <image href="data:image/png;base64,${b64}" width="512" height="512"/>
</svg>`
writeFileSync(resolve(pub, 'brand/agenva-logo.svg'), svg(512))
writeFileSync(resolve(pub, 'favicon.svg'), svg(512))

// 2. Favicons PNG
await sharp(png).resize(32, 32).png().toFile(resolve(pub, 'favicon-32.png'))
await sharp(png)
  .resize({
    width: 180,
    height: 180,
    fit: 'contain',
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .png()
  .toFile(resolve(pub, 'apple-touch-icon.png'))

// 3. OG 1200×630 — navy + logo em card branco + wordmark renderizado como
//    SVG texto (fonte sans genérica; bibliografia de sistema do librsvg).
const logo = await sharp(png).resize(320, 320).png().toBuffer()
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#16325C"/>
  <circle cx="1040" cy="80" r="220" fill="#1E96E8" opacity="0.25"/>
  <circle cx="120" cy="580" r="180" fill="#54B7EA" opacity="0.18"/>
  <rect x="90" y="145" width="340" height="340" rx="48" fill="#FFFFFF"/>
  <image href="data:image/png;base64,${logo.toString('base64')}" x="115" y="170" width="290" height="290"/>
  <text x="500" y="300" font-family="DejaVu Sans, Arial, sans-serif" font-size="110" font-weight="bold" fill="#FFFFFF">AGENVA</text>
  <text x="505" y="370" font-family="DejaVu Sans, Arial, sans-serif" font-size="40" fill="#54B7EA">Agenda e clientes na palma da mão</text>
</svg>`
await sharp(Buffer.from(ogSvg)).png().toFile(resolve(pub, 'og-image.png'))

console.log('assets gerados em public/ (brand/agenva-logo.svg, favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.png)')
