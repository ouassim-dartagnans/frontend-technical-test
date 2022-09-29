import { createQueryKeyStore, inferQueryKeyStore } from '@lukemorales/query-key-factory';

export const queryKeys = createQueryKeyStore({
  users: {
    userId: (userId: string) => userId,
  },
  messages: {
    conversationId: (conversationId: string) => conversationId,
  },
  conversations: {
    conversationId: (conversationId: string) => conversationId,
    userId: (userId: string) => userId,
  },
});

export type QueryKeys = inferQueryKeyStore<typeof queryKeys>;
