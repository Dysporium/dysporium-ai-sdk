import { z } from 'zod';

// ===== Usage Schema =====

export const openAIUsageSchema = z.object({
  prompt_tokens: z.number().int().nonnegative(),
  completion_tokens: z.number().int().nonnegative(),
  total_tokens: z.number().int().nonnegative(),
});

// ===== Tool Call Schema =====

export const openAIToolCallSchema = z.object({
  id: z.string(),
  type: z.literal('function'),
  function: z.object({
    name: z.string(),
    arguments: z.string(),
  }),
});

// ===== Message Schema =====

export const openAIMessageSchema = z.object({
  role: z.string(),
  content: z.string().nullable(),
  tool_calls: z.array(openAIToolCallSchema).optional(),
});

// ===== Non-streaming Response =====

export const openAIChoiceSchema = z.object({
  index: z.number().int().nonnegative(),
  message: openAIMessageSchema,
  finish_reason: z.string().nullable(),
});

export const openAIResponseSchema = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number().int().nonnegative(),
  model: z.string(),
  choices: z.array(openAIChoiceSchema).min(1),
  usage: openAIUsageSchema,
});

// ===== Streaming Response =====

export const openAIToolCallDeltaSchema = z.object({
  index: z.number().int().nonnegative(),
  id: z.string().optional(),
  type: z.literal('function').optional(),
  function: z.object({
    name: z.string().optional(),
    arguments: z.string().optional(),
  }).optional(),
});

export const openAIDeltaSchema = z.object({
  role: z.string().optional(),
  content: z.string().nullable().optional(),
  tool_calls: z.array(openAIToolCallDeltaSchema).optional(),
});

export const openAIStreamChoiceSchema = z.object({
  index: z.number().int().nonnegative(),
  delta: openAIDeltaSchema,
  finish_reason: z.string().nullable(),
});

export const openAIStreamChunkSchema = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number().int().nonnegative(),
  model: z.string(),
  choices: z.array(openAIStreamChoiceSchema),
  usage: openAIUsageSchema.nullable().optional(),
});

// ===== Error Schema =====

export const openAIErrorSchema = z.object({
  error: z.object({
    message: z.string(),
    type: z.string().optional(),
    param: z.string().nullable().optional(),
    code: z.string().nullable().optional(),
  }),
});

// ===== Type Exports =====

export type OpenAIResponse = z.infer<typeof openAIResponseSchema>;
export type OpenAIStreamChunk = z.infer<typeof openAIStreamChunkSchema>;
export type OpenAIError = z.infer<typeof openAIErrorSchema>;
export type OpenAIToolCallResponse = z.infer<typeof openAIToolCallSchema>;
