import axios from 'axios';

import { config } from '../../utils/config';

import { Conversation, User } from '../../types';

const apiRoute = `${config.NEXT_PUBLIC_API_BASE_URL}`;

export const fetchConversationsByUserId = async (userId: User['id']) => {
  const { data } = await axios.get(`${apiRoute}/conversations/${userId}`);
  return data as Conversation[];
};

export const deleteConversationByConversationId = async (conversationId: Conversation['id']) => {
  const { data } = await axios.delete(`${apiRoute}/conversation/${conversationId}`);
};

export const createConversationByUserId = async ({
  recipientId,
  conversationId,
}: {
  recipientId: User['id'];
  conversationId: Conversation['id'];
}) => {
  await axios.post(`${apiRoute}/conversations/${conversationId}`, { recipientId });
};
