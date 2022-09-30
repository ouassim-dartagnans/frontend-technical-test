import { NumberAsString } from './common';

export interface Message {
  id: NumberAsString;
  conversationId: NumberAsString;
  authorId: NumberAsString;
  timestamp: number;
  body: string;
}
