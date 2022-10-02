import { useQueries, useQuery } from '@tanstack/react-query';

import { fetchConversationsByUserId, fetchMessagesByConversationId, fetchUserByUserId, fetchUsers } from '../services';

import { Conversation, User } from '../../types';

import { queryKeys } from '../keys';

export function useFetchUsers() {
  return useQuery(queryKeys.users._def, () => fetchUsers());
}

export function useFetchUserByUserId(userId: User['id']) {
  return useQuery(queryKeys.users.userId(userId), () => fetchUserByUserId(userId));
}

export function useFetchConversationsByUserId({ userId, enabled }: { userId: User['id']; enabled?: boolean }) {
  return useQuery(queryKeys.conversations.userId(userId), () => fetchConversationsByUserId(userId), { enabled });
}

export function useFetchMessagesByConversationId(conversationId: Conversation['id']) {
  return useQuery(queryKeys.messages.conversationId(conversationId), () =>
    fetchMessagesByConversationId(conversationId)
  );
}

export function useFetchMessagesByConversationsIds(conversationsIds: Array<Conversation['id']> = []) {
  return useQueries({
    queries: conversationsIds.map((conversationId) => {
      return {
        queryKey: queryKeys.messages.conversationId(conversationId),
        queryFn: () => fetchMessagesByConversationId(conversationId),
      };
    }),
  });
}
