import { NumberAsString } from './common';

export interface Message {
  body: string;
  timestamp: number;
  id: NumberAsString;
  authorId: NumberAsString;
  conversationId: NumberAsString;
}
