export const openaiModels = {
    // -----GPT-4 Turbo-----
    'gpt-4-turbo': 'gpt-4-turbo',
    'gpt-4-turbo-preview': 'gpt-4-turbo-preview',
    
    // -----GPT-4-----
    'gpt-4': 'gpt-4',
    'gpt-4-0613': 'gpt-4-0613',
    
    // -----GPT-4o-----
    'gpt-4o': 'gpt-4o',
    'gpt-4o-mini': 'gpt-4o-mini',
    
    // -----GPT-3.5-----
    'gpt-3.5-turbo': 'gpt-3.5-turbo',
    'gpt-3.5-turbo-16k': 'gpt-3.5-turbo-16k',
  } as const;
  
  export type OpenAIModel = typeof openaiModels[keyof typeof openaiModels];