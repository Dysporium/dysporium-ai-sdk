import type { LanguageModel } from '@dysporium-sdk/provider';
import type { BaseTextOptions, BaseTextResult, Usage } from './types';
import { buildMessages } from './utils/messages';

export interface StreamTextOptions extends BaseTextOptions {
  model: LanguageModel;
  onChunk?: (chunk: TextStreamChunk) => void;
  onFinish?: (result: StreamTextResult) => void;
}

export interface TextStreamChunk {
  type: 'text-delta' | 'finish';
  textDelta?: string;
  finishReason?: string;
}

export interface StreamTextResult extends BaseTextResult {
  usage?: Usage;
  finishReason?: string;
}

export async function streamText(
  options: StreamTextOptions
): Promise<StreamTextResult> {
  const messages = buildMessages({
    messages: options.messages,
    prompt: options.prompt,
    system: options.system,
  });

  let fullText = '';
  let finalUsage;
  let finalFinishReason;

  const stream = options.model.doStream({
    messages,
    maxTokens: options.maxTokens,
    temperature: options.temperature,
    topP: options.topP,
    stopSequences: options.stopSequences,
  });

  for await (const chunk of stream) {
    if (chunk.type === 'text-delta' && chunk.textDelta) {
      fullText += chunk.textDelta;
      options.onChunk?.({
        type: 'text-delta',
        textDelta: chunk.textDelta,
      });
    } else if (chunk.type === 'finish') {
      finalFinishReason = chunk.finishReason;
      finalUsage = chunk.usage;
      options.onChunk?.({
        type: 'finish',
        finishReason: chunk.finishReason,
      });
    }
  }

  const result: StreamTextResult = {
    text: fullText,
    usage: finalUsage,
    finishReason: finalFinishReason,
    provider: options.model.provider,
    model: options.model.modelId,
  };

  options.onFinish?.(result);

  return result;
}