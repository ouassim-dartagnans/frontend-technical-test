import type { FC } from 'react';

import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { Conversation, Message } from '../../types';

import {
  fetchConversationsByUserId,
  fetchMessagesByConversationId,
  fetchUserByUserId,
  queryKeys,
  useFetchConversationsByUserId,
  useFetchCurrentLoggedUser,
  useFetchMessagesByConversationsIds,
  useFetchUsers,
} from '../../api';
import { Overview } from '../../components';
import { loggedUserId } from '../_app';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryKeys.users.userId(1), () => fetchUserByUserId(1), { staleTime: 5000 });
  const conversations = await fetchConversationsByUserId(1);
  queryClient.setQueryData(queryKeys.conversations.userId(1), conversations);
  for (let conversation of conversations) {
    const conversationId = conversation.id;
    await queryClient.prefetchQuery(queryKeys.messages.conversationId(conversationId), () =>
      fetchMessagesByConversationId(conversationId)
    );
  }
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const ChatPage: FC = () => {
  const { data: loggedUser } = useFetchCurrentLoggedUser();
  const { data: users } = useFetchUsers();
  const { data: conversations } = useFetchConversationsByUserId({ userId: loggedUserId });
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
      <Overview conversations={conversations} messages={messages} users={users} user={loggedUser} />
    </>
  );
};

export default ChatPage;
