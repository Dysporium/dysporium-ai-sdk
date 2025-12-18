export const qwenModels = {
  // ===== Qwen 3 Series (Latest) =====
  'qwen3-235b-a22b-instruct': 'qwen3-235b-a22b-instruct',
  'qwen3-32b-instruct': 'qwen3-32b-instruct',
  'qwen3-8b-instruct': 'qwen3-8b-instruct',
  
  // ===== Qwen 2.5 Series =====
  'qwen2.5-72b-instruct': 'qwen2.5-72b-instruct',
  'qwen2.5-32b-instruct': 'qwen2.5-32b-instruct',
  'qwen2.5-14b-instruct': 'qwen2.5-14b-instruct',
  'qwen2.5-7b-instruct': 'qwen2.5-7b-instruct',
  'qwen2.5-3b-instruct': 'qwen2.5-3b-instruct',
  'qwen2.5-1.5b-instruct': 'qwen2.5-1.5b-instruct',
  'qwen2.5-0.5b-instruct': 'qwen2.5-0.5b-instruct',
  
  // Qwen 2.5 Specialized Models
  'qwen2.5-coder-32b-instruct': 'qwen2.5-coder-32b-instruct',
  'qwen2.5-math-72b-instruct': 'qwen2.5-math-72b-instruct',
  
  // ===== Qwen 2.0 Series =====
  'qwen2-72b-instruct': 'qwen2-72b-instruct',
  'qwen2-57b-a14b-instruct': 'qwen2-57b-a14b-instruct',
  'qwen2-32b-instruct': 'qwen2-32b-instruct',
  'qwen2-14b-instruct': 'qwen2-14b-instruct',
  'qwen2-7b-instruct': 'qwen2-7b-instruct',
  'qwen2-1.5b-instruct': 'qwen2-1.5b-instruct',
  'qwen2-0.5b-instruct': 'qwen2-0.5b-instruct',
  
  // ===== Qwen 1.5 Series =====
  'qwen1.5-72b-chat': 'qwen1.5-72b-chat',
  'qwen1.5-32b-chat': 'qwen1.5-32b-chat',
  'qwen1.5-14b-chat': 'qwen1.5-14b-chat',
  'qwen1.5-7b-chat': 'qwen1.5-7b-chat',
  'qwen1.5-4b-chat': 'qwen1.5-4b-chat',
  'qwen1.5-1.8b-chat': 'qwen1.5-1.8b-chat',
  'qwen1.5-0.5b-chat': 'qwen1.5-0.5b-chat',
} as const;

export type QwenModel = typeof qwenModels[keyof typeof qwenModels];

