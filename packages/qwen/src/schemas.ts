import { z } from 'zod';

// ===== Usage Schema =====

export const qwenUsageSchema = z.object({
  input_tokens: z.number().int().nonnegative(),
  output_tokens: z.number().int().nonnegative(),
  total_tokens: z.number().int().nonnegative().optional(),
});

// ===== Message Schema =====

export const qwenMessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant', 'tool']),
  content: z.string(),
  tool_calls: z.array(z.object({
    id: z.string(),
    type: z.literal('function'),
    function: z.object({
      name: z.string(),
      arguments: z.string(),
    }),
  })).optional(),
  tool_call_id: z.string().optional(),
});

// ===== Non-streaming Response =====

export const qwenResponseSchema = z.object({
  id: z.string(),
  model: z.string(),
  choices: z.array(z.object({
    index: z.number(),
    message: qwenMessageSchema,
    finish_reason: z.string().nullable(),
  })),
  usage: qwenUsageSchema,
});

// ===== Streaming Response =====

export const qwenStreamChunkSchema = z.union([
  z.object({
    id: z.string(),
    model: z.string(),
    choices: z.array(z.object({
      index: z.number(),
      delta: z.object({
        role: z.enum(['assistant']).optional(),
        content: z.string().optional(),
        tool_calls: z.array(z.object({
          index: z.number(),
          id: z.string().optional(),
          type: z.literal('function').optional(),
          function: z.object({
            name: z.string().optional(),
            arguments: z.string().optional(),
          }).optional(),
        })).optional(),
      }),
      finish_reason: z.string().nullable().optional(),
    })),
  }),
  z.object({
    id: z.string(),
    model: z.string(),
    choices: z.array(z.object({
      index: z.number(),
      delta: z.object({}),
      finish_reason: z.string().nullable(),
    })),
    usage: qwenUsageSchema.optional(),
  }),
]);

// ===== Error Schema =====

export const qwenErrorSchema = z.object({
  error: z.object({
    message: z.string(),
    type: z.string().optional(),
    code: z.string().optional(),
  }),
});

// ===== Type Exports =====

export type QwenResponse = z.infer<typeof qwenResponseSchema>;
export type QwenStreamChunk = z.infer<typeof qwenStreamChunkSchema>;
export type QwenError = z.infer<typeof qwenErrorSchema>;
export type QwenMessage = z.infer<typeof qwenMessageSchema>;

