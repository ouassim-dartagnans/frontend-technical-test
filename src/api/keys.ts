import { createQueryKeyStore, inferQueryKeyStore } from '@lukemorales/query-key-factory';
import { Conversation } from '../types/conversation';
import { User } from '../types/user';

export const queryKeys = createQueryKeyStore({
  users: {
    userId: (userId: User['id']) => userId,
  },
  messages: {
    conversationId: (conversationId: Conversation['id']) => conversationId,
  },
  conversations: {
    conversationId: (conversationId: Conversation['id']) => conversationId,
    userId: (userId: User['id']) => userId,
  },
});

export type QueryKeys = inferQueryKeyStore<typeof queryKeys>;
