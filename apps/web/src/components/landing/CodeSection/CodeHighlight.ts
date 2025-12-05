function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

type TokenType = 'keyword' | 'string' | 'comment' | 'function' | 'type' | 'number' | 'operator' | 'plain'

interface Token {
  type: TokenType
  value: string
}

const COLORS: Record<TokenType, string> = {
  keyword: '#ff79c6',
  string: '#f1fa8c',
  comment: '#6272a4',
  function: '#50fa7b',
  type: '#8be9fd',
  number: '#bd93f9',
  operator: '#ff79c6',
  plain: '#f8f8f2',
}

const KEYWORDS = [
  'import', 'export', 'from', 'const', 'let', 'var', 'function', 'async', 'await',
  'return', 'if', 'else', 'for', 'while', 'true', 'false', 'null', 'undefined',
  'new', 'class', 'extends', 'interface', 'type', 'enum', 'default', 'try', 'catch'
]

export function highlightLine(line: string): string {
  if (!line.trim()) {
    return ''
  }

  if (line.trim().startsWith('//')) {
    const leadingSpaces = line.match(/^(\s*)/)?.[1] || ''
    return `${escapeHtml(leadingSpaces)}<span style="color: ${COLORS.comment}">${escapeHtml(line.trim())}</span>`
  }

  let result = ''
  let i = 0

  while (i < line.length) {
    if (line.slice(i, i + 2) === '//') {
      result += `<span style="color: ${COLORS.comment}">${escapeHtml(line.slice(i))}</span>`
      break
    }

    if (line[i] === "'" || line[i] === '"' || line[i] === '`') {
      const quote = line[i]
      let j = i + 1
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++
        j++
      }
      j++
      result += `<span style="color: ${COLORS.string}">${escapeHtml(line.slice(i, j))}</span>`
      i = j
      continue
    }

    if (/\d/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
      let j = i
      while (j < line.length && /[\d.]/.test(line[j])) j++
      result += `<span style="color: ${COLORS.number}">${escapeHtml(line.slice(i, j))}</span>`
      i = j
      continue
    }

    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++
      const word = line.slice(i, j)
      const isFunction = line[j] === '(' || (line[j] === '<' && /^[A-Z]/.test(word))
      const prevNonSpace = line.slice(0, i).trimEnd()
      const isType = prevNonSpace.endsWith(':') || prevNonSpace.endsWith('<')

      if (KEYWORDS.includes(word)) {
        result += `<span style="color: ${COLORS.keyword}">${escapeHtml(word)}</span>`
      } else if (isFunction && /^[a-z]/.test(word)) {
        result += `<span style="color: ${COLORS.function}">${escapeHtml(word)}</span>`
      } else if (isType || /^[A-Z]/.test(word)) {
        result += `<span style="color: ${COLORS.type}">${escapeHtml(word)}</span>`
      } else {
        result += `<span style="color: ${COLORS.plain}">${escapeHtml(word)}</span>`
      }
      i = j
      continue
    }

    if (/[+\-*/%=<>!&|?:]/.test(line[i])) {
      let j = i
      while (j < line.length && /[+\-*/%=<>!&|?:]/.test(line[j])) j++
      result += `<span style="color: ${COLORS.operator}">${escapeHtml(line.slice(i, j))}</span>`
      i = j
      continue
    }

    result += escapeHtml(line[i])
    i++
  }

  return result
}
