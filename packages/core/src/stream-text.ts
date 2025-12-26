import type { LanguageModel, ToolCall } from '@dysporium-sdk/provider';
import type { BaseTextOptions, BaseTextResult, Usage } from './types';
import { buildMessages } from './utils/messages';

export interface StreamTextOptions extends BaseTextOptions {
  model: LanguageModel;
  onChunk?: (chunk: TextStreamChunk) => void;
  onToolCall?: (toolCall: ToolCall) => void;
  onFinish?: (result: StreamTextResult) => void;
}

export type TextStreamChunk =
  | { type: 'text-delta'; textDelta: string }
  | { type: 'tool-call-delta'; toolCallId: string; toolName?: string; argsTextDelta: string }
  | { type: 'tool-call-complete'; toolCall: ToolCall }
  | { type: 'finish'; finishReason: string };

export interface StreamTextResult extends BaseTextResult {
  usage?: Usage;
  finishReason?: string;
  toolCalls?: ToolCall[];
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
  let finalUsage: Usage | undefined;
  let finalFinishReason: string | undefined;
  let finalToolCalls: ToolCall[] | undefined;

  const stream = options.model.doStream({
    messages,
    maxTokens: options.maxTokens,
    temperature: options.temperature,
    topP: options.topP,
    topK: options.topK,
    stopSequences: options.stopSequences,
    tools: options.tools,
    toolChoice: options.toolChoice,
    parallelToolCalls: options.parallelToolCalls,
    responseFormat: options.responseFormat,
    frequencyPenalty: options.frequencyPenalty,
    presencePenalty: options.presencePenalty,
    logitBias: options.logitBias,
    logprobs: options.logprobs,
    topLogprobs: options.topLogprobs,
    n: options.n,
    seed: options.seed,
    user: options.user,
    serviceTier: options.serviceTier,
    store: options.store,
    metadata: options.metadata,
    reasoningEffort: options.reasoningEffort,
    maxCompletionTokens: options.maxCompletionTokens,
    prediction: options.prediction,
    thinking: options.thinking,
  });

  for await (const chunk of stream) {
    switch (chunk.type) {
      case 'text-delta':
        fullText += chunk.textDelta;
        options.onChunk?.({
          type: 'text-delta',
          textDelta: chunk.textDelta,
        });
        break;

      case 'tool-call-delta':
        options.onChunk?.({
          type: 'tool-call-delta',
          toolCallId: chunk.toolCallId,
          toolName: chunk.toolName,
          argsTextDelta: chunk.argsTextDelta,
        });
        break;

      case 'tool-call-complete':
        options.onChunk?.({
          type: 'tool-call-complete',
          toolCall: chunk.toolCall,
        });
        options.onToolCall?.(chunk.toolCall);
        break;

      case 'finish':
        finalFinishReason = chunk.finishReason;
        finalUsage = chunk.usage;
        finalToolCalls = chunk.toolCalls;
        options.onChunk?.({
          type: 'finish',
          finishReason: chunk.finishReason,
        });
        break;
    }
  }

  const result: StreamTextResult = {
    text: fullText,
    usage: finalUsage,
    finishReason: finalFinishReason,
    toolCalls: finalToolCalls,
    provider: options.model.provider,
    model: options.model.modelId,
  };

  options.onFinish?.(result);

  return result;
}
