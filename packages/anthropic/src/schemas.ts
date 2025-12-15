import { z } from 'zod';

// ===== Usage Schema =====

export const anthropicUsageSchema = z.object({
  input_tokens: z.number().int().nonnegative(),
  output_tokens: z.number().int().nonnegative(),
});

// ===== Content Block Schema =====

export const anthropicTextBlockSchema = z.object({
  type: z.literal('text'),
  text: z.string(),
});

export const anthropicToolUseBlockSchema = z.object({
  type: z.literal('tool_use'),
  id: z.string(),
  name: z.string(),
  input: z.record(z.unknown()),
});

export const anthropicContentBlockSchema = z.union([
  anthropicTextBlockSchema,
  anthropicToolUseBlockSchema,
]);

// ===== Message Schema =====

export const anthropicMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.union([
    z.string(),
    z.array(anthropicContentBlockSchema),
  ]),
});

// ===== Non-streaming Response =====

export const anthropicResponseSchema = z.object({
  id: z.string(),
  type: z.literal('message'),
  role: z.literal('assistant'),
  content: z.array(anthropicContentBlockSchema),
  model: z.string(),
  stop_reason: z.string().nullable(),
  stop_sequence: z.string().nullable().optional(),
  usage: anthropicUsageSchema,
});

// ===== Streaming Response =====

export const anthropicStreamChunkSchema = z.union([
  z.object({
    type: z.literal('message_start'),
    message: z.object({
      id: z.string(),
      type: z.literal('message'),
      role: z.literal('assistant'),
      model: z.string(),
    }),
  }),
  z.object({
    type: z.literal('content_block_start'),
    index: z.number(),
    content_block: z.object({
      type: z.string(),
      text: z.string().optional(),
      id: z.string().optional(),
      name: z.string().optional(),
      input: z.record(z.unknown()).optional(),
    }),
  }),
  z.object({
    type: z.literal('content_block_delta'),
    index: z.number(),
    delta: z.object({
      type: z.string(),
      text: z.string().optional(),
      partial_json: z.string().optional(),
    }),
  }),
  z.object({
    type: z.literal('content_block_stop'),
    index: z.number(),
  }),
  z.object({
    type: z.literal('message_delta'),
    delta: z.object({
      stop_reason: z.string().nullable().optional(),
      stop_sequence: z.string().nullable().optional(),
    }),
    usage: anthropicUsageSchema.optional(),
  }),
  z.object({
    type: z.literal('message_stop'),
  }),
]);

// ===== Error Schema =====

export const anthropicErrorSchema = z.object({
  error: z.object({
    type: z.string(),
    message: z.string(),
  }),
});

// ===== Type Exports =====

export type AnthropicResponse = z.infer<typeof anthropicResponseSchema>;
export type AnthropicStreamChunk = z.infer<typeof anthropicStreamChunkSchema>;
export type AnthropicError = z.infer<typeof anthropicErrorSchema>;
export type AnthropicContentBlock = z.infer<typeof anthropicContentBlockSchema>;

