import type { FC } from 'react';
import { GetServerSideProps } from 'next';
import { Overview } from '../../components';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { queryKeys } from '../../api/keys';
import { config } from '../../utils/config';
import { Conversation } from '../../types/conversation';
import {
  useFetchConversationsByUserId,
  useFetchMessagesByConversationId,
  useFetchMessagesByConversationsIds,
  useFetchUserByUserId,
} from '../../api/hooks/fetchers';
import { loggedUserId } from '../_app';
import { Message } from '../../types/message';

const fetchConversationsByUserId = async (userId: string) => {
  const { data } = await axios.get(`http://localhost:3005/conversations/${userId}`);
  return data as Conversation[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    queryKeys.users.userId('1'),
    async () => {
      const { data } = await axios.get(`${config.NEXT_PUBLIC_API_BASE_URL}/user/${'1'}`);
      return data[0];
    },
    { staleTime: 5000 }
  );
  const conversations = await fetchConversationsByUserId('1');
  queryClient.setQueryData(queryKeys.conversations.userId('1'), conversations);
  for (let conversation of conversations) {
    const conversationId = conversation.id;
    await queryClient.prefetchQuery(queryKeys.messages.conversationId(conversationId), async () => {
      const { data } = await axios.get(`http://localhost:3005/messages/${conversationId}`);
      return data;
    });
  }
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const ChatPage: FC = () => {
  const { data: user } = useFetchUserByUserId(loggedUserId);
  const { data: conversations } = useFetchConversationsByUserId(loggedUserId);
  const messages = useFetchMessagesByConversationsIds(conversations?.map(({ id }) => id)).reduce(
    (map, query, currentIndex) => map.set(conversations[currentIndex].id, query.data),
    new Map<Conversation['id'], Array<Message>>()
  );
  console.log('client side data', { user, conversations, messages });
  return <Overview conversations={conversations} user={user} messages={messages} />;
};

export default ChatPage;
