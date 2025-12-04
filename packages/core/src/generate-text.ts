import type { LanguageModel } from '@dysporium-sdk/provider';
import type { BaseTextOptions, BaseTextResult, Usage } from './types';
import { buildMessages } from './utils/messages';

export interface GenerateTextOptions extends BaseTextOptions {
  model: LanguageModel;
}

export interface GenerateTextResult extends BaseTextResult {
  usage: Usage;
  finishReason: string;
}

export async function generateText(
  options: GenerateTextOptions
): Promise<GenerateTextResult> {
  const messages = buildMessages({
    messages: options.messages,
    prompt: options.prompt,
    system: options.system,
  });

  const result = await options.model.doGenerate({
    messages,
    maxTokens: options.maxTokens,
    temperature: options.temperature,
    topP: options.topP,
    stopSequences: options.stopSequences,
  });

  return {
    text: result.text,
    usage: result.usage,
    finishReason: result.finishReason,
    provider: options.model.provider,
    model: options.model.modelId,
  };
}