/**
 * Markdown mínimo e seguro para os documentos legais (RF-S3).
 *
 * Estratégia: ESCAPAR TODO o texto primeiro, depois aplicar tags de uma
 * lista-branca (h2, negrito, item de lista, parágrafo). Nada vira HTML
 * sem passar pelo escape — v-html seguro por construção.
 */

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

/** Inline: `**negrito**` → <strong> (aplicado APÓS o escape). */
function inline(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}

export function renderLegalMarkdown(md: string): string {
  const lines = escapeHtml(md).split('\n')
  const out: string[] = []
  let inList = false

  const closeList = () => {
    if (inList) {
      out.push('</ul>')
      inList = false
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()

    if (line.trim() === '') {
      closeList()
      continue
    }

    // ## título
    if (line.startsWith('## ')) {
      closeList()
      out.push(`<h2>${inline(line.slice(3).trim())}</h2>`)
      continue
    }

    // item de lista
    if (line.startsWith('- ')) {
      if (!inList) {
        out.push('<ul>')
        inList = true
      }
      out.push(`<li>${inline(line.slice(2).trim())}</li>`)
      continue
    }

    // parágrafo (uma linha = um parágrafo, como no texto de origem)
    closeList()
    out.push(`<p>${inline(line)}</p>`)
  }

  closeList()
  return out.join('\n')
}

export interface LegalHeader {
  title: string
  date: string
  body: string
}

/**
 * Extrai o cabeçalho (título em **negrito** + data em *itálico*) dos
 * documentos legais; a página renderiza h1/data com estilo próprio.
 */
export function extractLegalHeader(md: string): LegalHeader {
  const lines = md.split('\n')
  let title = ''
  let date = ''
  let titleIdx = -1
  let dateIdx = -1

  for (let i = 0; i < Math.min(lines.length, 8); i++) {
    const t = lines[i]!.trim()
    if (titleIdx === -1 && /^\*\*(.+)\*\*$/.test(t)) {
      title = t.slice(2, -2)
      titleIdx = i
      continue
    }
    if (titleIdx !== -1 && dateIdx === -1 && /^\*([^*].*)\*$/.test(t)) {
      date = t.slice(1, -1)
      dateIdx = i
      break
    }
  }

  const bodyStart = (dateIdx !== -1 ? dateIdx : titleIdx) + 1
  return {
    title: title || 'Documento legal',
    date: date || 'Última atualização: desconhecida',
    body: lines.slice(bodyStart).join('\n').trim(),
  }
}
