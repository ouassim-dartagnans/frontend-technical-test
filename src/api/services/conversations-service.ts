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

export const createConversation = async ({ recipient, sender }: { recipient: User; sender: User }) => {
  const { data } = await axios.post(`${apiRoute}/conversations/${sender.id}`, {
    recipientId: recipient.id,
    recipientNickname: recipient.nickname,
    senderId: sender.id,
    senderNickname: sender.nickname,
    lastMessageTimestamp: Math.floor(Date.now() / 1000),
  });
  console.log({ data });
  return data as Conversation;
};
