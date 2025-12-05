import type { LanguageModel, Provider, ToolCall } from '@dysporium-sdk/provider';
import { generateText, type GenerateTextOptions, type GenerateTextResult } from './generate-text';
import { streamText, type StreamTextOptions, type StreamTextResult } from './stream-text';

export class DysporiumClient {
  constructor(private model: LanguageModel) {}

  getModel(): LanguageModel {
    return this.model;
  }

  setModel(model: LanguageModel): void {
    this.model = model;
  }

  async generate(options: Omit<GenerateTextOptions, 'model'>): Promise<GenerateTextResult> {
    return generateText({
      ...options,
      model: this.model,
    });
  }

  async stream(options: Omit<StreamTextOptions, 'model'>): Promise<StreamTextResult> {
    return streamText({
      ...options,
      model: this.model,
    });
  }

  /**
   * Generate with tool calling support. Automatically handles tool execution loop.
   */
  async generateWithTools(
    options: Omit<GenerateTextOptions, 'model'> & {
      toolExecutor: (toolCall: ToolCall) => Promise<string>;
      maxIterations?: number;
    }
  ): Promise<GenerateTextResult> {
    const { toolExecutor, maxIterations = 10, ...generateOptions } = options;
    
    let messages = generateOptions.messages ? [...generateOptions.messages] : [];
    if (generateOptions.prompt) {
      messages.push({ role: 'user', content: generateOptions.prompt });
    }
    if (generateOptions.system) {
      messages.unshift({ role: 'system', content: generateOptions.system });
    }
    
    let iteration = 0;
    let lastResult: GenerateTextResult;
    
    while (iteration < maxIterations) {
      iteration++;
      
      lastResult = await generateText({
        ...generateOptions,
        model: this.model,
        messages,
        prompt: undefined,
        system: undefined,
      });
      
      // If no tool calls, we're done
      if (!lastResult.toolCalls || lastResult.toolCalls.length === 0) {
        return lastResult;
      }
      
      // Add assistant message with tool calls
      messages.push({
        role: 'assistant',
        content: lastResult.text || '',
      });
      
      // Execute tools and add results
      for (const toolCall of lastResult.toolCalls) {
        const result = await toolExecutor(toolCall);
        messages.push({
          role: 'tool',
          content: result,
          toolCallId: toolCall.id,
        });
      }
    }
    
    throw new Error(`Max tool call iterations (${maxIterations}) exceeded`);
  }

  static fromProvider(provider: Provider, modelId: string): DysporiumClient {
    return new DysporiumClient(provider(modelId));
  }
}
