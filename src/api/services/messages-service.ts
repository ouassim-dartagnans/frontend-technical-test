import axios from 'axios';

import { config } from '../../utils/config';

import { Conversation, Message, User } from '../../types';

const apiRoute = `${config.NEXT_PUBLIC_API_BASE_URL}`;

export const fetchMessagesByConversationId = async (conversationId: Conversation['id']) => {
  const { data } = await axios.get(`${apiRoute}/messages/${conversationId}`);
  return data as Message[];
};

export const createMessageForConversation = async ({
  body,
  authorId,
  conversationId,
}: {
  authorId: User['id'];
  body: Message['body'];
  conversationId: Conversation['id'];
}) =>
  await axios.post(`${apiRoute}/messages/`, {
    body,
    authorId,
    conversationId,
    timestamp: Math.floor(Date.now() / 1000),
  });

export const deleteMessageByMessageId = async (messageId: Message['id']) => {
  await axios.delete(`${apiRoute}/message/${messageId}`);
};
