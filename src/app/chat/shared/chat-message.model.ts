import { ChatClient } from './chat-client.model';

export interface ChatMessage {
  message: string;
  client: ChatClient;
}
