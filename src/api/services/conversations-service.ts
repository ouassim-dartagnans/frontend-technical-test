import axios from 'axios';

import { Conversation } from '../../types/conversation';
import { Message } from '../../types/message';
import { User } from '../../types/user';

export const createMessageForConversation = async ({
  body,
  authorId,
  conversationId,
}: {
  authorId: User['id'];
  body: Message['body'];
  conversationId: Conversation['id'];
}) =>
  await axios.post(`http://localhost:3005/messages/`, {
    body,
    authorId,
    conversationId,
    timestamp: Math.floor(Date.now() / 1000),
  });
