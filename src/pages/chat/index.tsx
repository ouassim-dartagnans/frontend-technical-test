import type { FC } from 'react';

import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
  useFetchConversationsByUserId,
  useFetchMessagesByConversationsIds,
  useFetchUserByUserId,
  useFetchUsers,
} from '../../api/hooks/fetchs';
import { config } from '../../utils/config';

import { Conversation } from '../../types/conversation';
import { Message } from '../../types/message';

import { queryKeys } from '../../api/keys';
import { Overview } from '../../components';
import { loggedUserId } from '../_app';

const fetchConversationsByUserId = async (userId: string) => {
  const { data } = await axios.get(`http://localhost:3005/conversations/${userId}`);
  return data as Conversation[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    queryKeys.users.userId(1),
    async () => {
      const { data } = await axios.get(`${config.NEXT_PUBLIC_API_BASE_URL}/user/${'1'}`);
      return data[0];
    },
    { staleTime: 5000 }
  );
  const conversations = await fetchConversationsByUserId('1');
  queryClient.setQueryData(queryKeys.conversations.userId(1), conversations);
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
  const { data: users } = useFetchUsers();
  const { data: conversations } = useFetchConversationsByUserId(loggedUserId);
  const messages = useFetchMessagesByConversationsIds(conversations?.map(({ id }) => id)).reduce(
    (map, query, currentIndex) => map.set(conversations[currentIndex].id, query.data),
    new Map<Conversation['id'], Array<Message>>()
  );
  return (
    <>
      <Head>
        <title>Demo Chatbox - Leboncoin</title>
        <meta name="description" content="Chat fonctionnel, chat qui ira loin"></meta>
      </Head>
      <Overview conversations={conversations} messages={messages} users={users} user={user} />
    </>
  );
};

export default ChatPage;
