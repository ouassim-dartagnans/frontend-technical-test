import { useQuery, useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { queryKeys } from '../keys';
import { User } from '../../types/user';
import { Conversation } from '../../types/conversation';
import { Message } from '../../types/message';

export function useFetchUserByUserId(userId: User['id']) {
  return useQuery(queryKeys.users.userId(userId), async () => {
    const { data } = await axios.get(`http://localhost:3005/user/${userId}`);
    return data[0] as User;
  });
}

export function useFetchUsers() {
  return useQuery(queryKeys.users._def, async () => {
    const { data } = await axios.get('http://localhost:3005/users/');
    return data as User[];
  });
}

export function useFetchConversationByConversationId(conversationId: Conversation['id']) {
  return useQuery(queryKeys.conversations.conversationId(conversationId), async () => {
    const { data } = await axios.get(`http://localhost:3005/conversation/${conversationId}`);
    return data as Conversation;
  });
}

export function useFetchConversationsByUserId(userId: User['id']) {
  return useQuery(queryKeys.conversations.userId(userId), async () => {
    const { data } = await axios.get(`http://localhost:3005/conversations/${userId}`);
    return data as Conversation[];
  });
}

export function useFetchMessagesByConversationId(conversationId: Conversation['id']) {
  return useQuery(queryKeys.messages.conversationId(conversationId), async () => {
    const { data } = await axios.get(`http://localhost:3005/messages/${conversationId}`);
    return data as Message[];
  });
}

export function useFetchMessagesByConversationsIds(conversationsIds: Array<Conversation['id']> = []) {
  return useQueries({
    queries: conversationsIds.map((currentConversationId) => {
      return {
        queryKey: queryKeys.messages.conversationId(currentConversationId),
        queryFn: async () => {
          const { data } = await axios.get(`http://localhost:3005/messages/${currentConversationId}`);
          return data as Message[];
        },
      };
    }),
  });
}
