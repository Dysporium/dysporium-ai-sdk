import type {
  EmbeddingModel,
  EmbeddingResult,
  SingleEmbeddingResult,
  EmbeddingUsage,
} from '@dysporium-sdk/provider';

// ===== Options =====

export interface EmbedOptions {
  model: EmbeddingModel;
  value: string;
  dimensions?: number;
}

export interface EmbedManyOptions {
  model: EmbeddingModel;
  values: string[];
  dimensions?: number;
}

// ===== Results =====

export interface EmbedResult extends SingleEmbeddingResult {
  input: string;
}

export interface EmbedManyResult extends EmbeddingResult {
  inputs: string[];
}

// ===== Functions =====

export async function embed(options: EmbedOptions): Promise<EmbedResult> {
  const result = await options.model.doEmbed({
    input: options.value,
    dimensions: options.dimensions,
  });

  const firstEmbedding = result.embeddings[0];
  if (!firstEmbedding || result.embeddings.length === 0) {
    throw new Error('No embeddings returned from the model');
  }

  return {
    embedding: firstEmbedding,
    usage: result.usage,
    model: result.model,
    input: options.value,
  };
}

export async function embedMany(options: EmbedManyOptions): Promise<EmbedManyResult> {
  if (options.values.length === 0) {
    return {
      embeddings: [],
      usage: { totalTokens: 0 },
      model: options.model.modelId,
      inputs: [],
    };
  }

  const result = await options.model.doEmbed({
    input: options.values,
    dimensions: options.dimensions,
  });

  return {
    embeddings: result.embeddings,
    usage: result.usage,
    model: result.model,
    inputs: options.values,
  };
}

// ===== Utility Functions =====

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(`Vector dimensions must match: ${a.length} vs ${b.length}`);
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    const aVal = a[i]!;
    const bVal = b[i]!;
    dotProduct += aVal * bVal;
    normA += aVal * aVal;
    normB += bVal * bVal;
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  
  if (magnitude === 0) {
    return 0;
  }

  return dotProduct / magnitude;
}

export function euclideanDistance(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(`Vector dimensions must match: ${a.length} vs ${b.length}`);
  }

  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = a[i]! - b[i]!;
    sum += diff * diff;
  }

  return Math.sqrt(sum);
}

export function findSimilar<T>(
  query: number[],
  items: Array<{ embedding: number[]; item: T }>,
  options?: {
    topK?: number;
    minSimilarity?: number;
  }
): Array<{ item: T; similarity: number }> {
  const { topK = 10, minSimilarity = -1 } = options ?? {};

  const scored = items
    .map(({ embedding, item }) => ({
      item,
      similarity: cosineSimilarity(query, embedding),
    }))
    .filter(({ similarity }) => similarity >= minSimilarity)
    .sort((a, b) => b.similarity - a.similarity);

  return scored.slice(0, topK);
}

// Re-export types
export type { EmbeddingModel, EmbeddingUsage };
