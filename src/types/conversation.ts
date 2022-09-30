import { NumberAsString } from './common';

export interface Conversation {
  id: NumberAsString;
  recipientId: NumberAsString;
  recipientNickname: string;
  senderId: NumberAsString;
  senderNickname: string;
}
