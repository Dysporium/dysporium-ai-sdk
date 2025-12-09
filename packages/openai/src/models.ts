export const openaiModels = {
    // -----GPT-5.1----- (Latest - November 2025)
    'gpt-5.1': 'gpt-5.1',
    
    // -----GPT-5----- (August 2025)
    'gpt-5': 'gpt-5',
    'gpt-5-mini': 'gpt-5-mini',
    
    // -----Codex----- (Code-optimized models)
    'gpt-5.1-codex-max': 'gpt-5.1-codex-max',
    'gpt-5.1-codex-mini': 'gpt-5.1-codex-mini',
    
    // -----GPT-4.1----- (April 2025)
    'gpt-4.1': 'gpt-4.1',
    'gpt-4.1-mini': 'gpt-4.1-mini',
    'gpt-4.1-nano': 'gpt-4.1-nano',
    
    // -----GPT-4o-----
    'gpt-4o': 'gpt-4o',
    'gpt-4o-mini': 'gpt-4o-mini',
    
    // -----Legacy (Deprecated - use GPT-4o or newer)-----
    /** @deprecated Use gpt-4o or newer */
    'gpt-4-turbo': 'gpt-4-turbo',
    /** @deprecated Use gpt-4o or newer */
    'gpt-4': 'gpt-4',
  } as const;
  
  export type OpenAIModel = typeof openaiModels[keyof typeof openaiModels];