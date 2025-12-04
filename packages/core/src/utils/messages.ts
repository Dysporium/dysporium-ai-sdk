import type { Message } from '@dysporium-sdk/provider';

export interface BuildMessagesOptions {
  messages?: Message[];
  prompt?: string;
  system?: string;
}

export function buildMessages(options: BuildMessagesOptions): Message[] {
  const messages: Message[] = [];

  if (options.system) {
    messages.push({
      role: 'system',
      content: options.system,
    });
  }

  if (options.messages) {
    messages.push(...options.messages);
  } else if (options.prompt) {
    messages.push({
      role: 'user',
      content: options.prompt,
    });
  } else {
    throw new Error('Either messages or prompt must be provided');
  }

  return messages;
}

