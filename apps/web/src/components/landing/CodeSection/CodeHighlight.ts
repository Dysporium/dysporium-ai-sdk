import { CODE_HIGHLIGHT_COLORS } from '../../../constants/landing/code'

export function highlightCode(line: string): string {
  return line
    .replace(
      /\b(import|from|const|await|for|new)\b/g,
      `<span class="${CODE_HIGHLIGHT_COLORS.keyword}">$1</span>`
    )
    .replace(
      /(['"`])([^'"`]*)(['"`])/g,
      `<span class="${CODE_HIGHLIGHT_COLORS.string}">$1$2$3</span>`
    )
    .replace(
      /\/\/.*/g,
      `<span class="${CODE_HIGHLIGHT_COLORS.comment}">$&</span>`
    )
    .replace(
      /\b(Dysporium|ai|stream|result)\b/g,
      `<span class="${CODE_HIGHLIGHT_COLORS.variable}">$1</span>`
    )
}

