export const anthropicModels = {
  // ===== Claude 4.5 (Latest) =====
  'claude-sonnet-4-5-20250929': 'claude-sonnet-4-5-20250929',
  'claude-sonnet-4-5': 'claude-sonnet-4-5', // alias
  'claude-haiku-4-5-20251001': 'claude-haiku-4-5-20251001',
  'claude-haiku-4-5': 'claude-haiku-4-5', // alias
  'claude-opus-4-5-20251101': 'claude-opus-4-5-20251101',
  'claude-opus-4-5': 'claude-opus-4-5', // alias

  // ===== Claude 4.1 =====
  'claude-opus-4-1-20250805': 'claude-opus-4-1-20250805',
  'claude-opus-4-1': 'claude-opus-4-1', // alias

  // ===== Claude 4 =====
  'claude-sonnet-4-20250514': 'claude-sonnet-4-20250514',
  'claude-sonnet-4-0': 'claude-sonnet-4-0', // alias
  'claude-opus-4-20250514': 'claude-opus-4-20250514',
  'claude-opus-4-0': 'claude-opus-4-0', // alias

  // ===== Claude 3.7 =====
  'claude-3-7-sonnet-20250219': 'claude-3-7-sonnet-20250219',
  'claude-3-7-sonnet-latest': 'claude-3-7-sonnet-latest', // alias
} as const;

export type AnthropicModel = typeof anthropicModels[keyof typeof anthropicModels];
