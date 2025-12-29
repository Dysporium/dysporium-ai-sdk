import { openaiModels, type OpenAIModel } from '@dysporium-sdk/openai'
import type { ModelOption } from '../types'

const MODEL_METADATA: Record<string, { name: string; description: string }> = {
  'gpt-5.1': {
    name: 'GPT-5.1',
    description: 'Latest model (November 2025)',
  },
  'gpt-5': {
    name: 'GPT-5',
    description: 'August 2025 release',
  },
  'gpt-5-mini': {
    name: 'GPT-5 Mini',
    description: 'Smaller GPT-5 model',
  },
  'gpt-4.1': {
    name: 'GPT-4.1',
    description: 'April 2025 release',
  },
  'gpt-4.1-mini': {
    name: 'GPT-4.1 Mini',
    description: 'Smaller GPT-4.1 model',
  },
  'gpt-4.1-nano': {
    name: 'GPT-4.1 Nano',
    description: 'Smallest GPT-4.1 model',
  },
  'gpt-4o': {
    name: 'GPT-4o',
    description: 'Most capable model, optimized for speed',
  },
  'gpt-4o-mini': {
    name: 'GPT-4o Mini',
    description: 'Fast and affordable',
  },
  'gpt-4-turbo': {
    name: 'GPT-4 Turbo',
    description: 'High intelligence with vision',
  },
  'gpt-4': {
    name: 'GPT-4',
    description: 'High intelligence',
  },
}

const EXCLUDED_MODELS = new Set<OpenAIModel>([
  'gpt-5.1-codex-max',
  'gpt-5.1-codex-mini',
])

// Generate available models from SDK, filtering excluded ones
export const AVAILABLE_MODELS: ModelOption[] = Object.values(openaiModels)
  .filter((modelId): modelId is OpenAIModel => !EXCLUDED_MODELS.has(modelId as OpenAIModel))
  .map((modelId) => {
    const metadata = MODEL_METADATA[modelId]
    return {
      id: modelId as ModelOption['id'],
      name: metadata?.name || modelId,
      description: metadata?.description,
    }
  })

export const DEFAULT_MODEL: ModelOption['id'] = 'gpt-4o'
