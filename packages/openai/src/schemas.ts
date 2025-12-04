import { z } from 'zod';

// @for validating OpenAI API responses

export const openAIUsageSchema = z.object({
  prompt_tokens: z.number().int().nonnegative(),
  completion_tokens: z.number().int().nonnegative(),
  total_tokens: z.number().int().nonnegative(),
});

export const openAIMessageSchema = z.object({
  role: z.string(),
  content: z.string(),
});

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

export const openAIDeltaSchema = z.object({
  role: z.string().optional(),
  content: z.string().optional(),
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
  choices: z.array(openAIStreamChoiceSchema).min(1),
  usage: openAIUsageSchema.optional(),
});

export const openAIErrorSchema = z.object({
  error: z.object({
    message: z.string(),
    type: z.string().optional(),
    param: z.string().optional(),
    code: z.string().optional(),
  }),
});

// Type exports inferred from schemas
export type OpenAIResponse = z.infer<typeof openAIResponseSchema>;
export type OpenAIStreamChunk = z.infer<typeof openAIStreamChunkSchema>;
export type OpenAIError = z.infer<typeof openAIErrorSchema>;

