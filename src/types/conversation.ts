import { NumberAsString } from './common';

export const defaultConversation = {
  id: -1,
  recipientId: -1,
  recipientNickname: '',
  senderId: -1,
  senderNickname: '',
};

export interface Conversation {
  id: NumberAsString;
  recipientId: NumberAsString;
  recipientNickname: string;
  senderId: NumberAsString;
  senderNickname: string;
}
