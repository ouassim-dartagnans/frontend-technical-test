import type { FC } from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { Flex } from '@chakra-ui/react';

import { defaultConversation } from '../../types';

import {
  fetchConversationsByUserId,
  fetchMessagesByConversationId,
  fetchUserByUserId,
  queryKeys,
  useFetchConversationsByUserId,
  useFetchUserByUserId,
} from '../../api';
import { ViewConversation } from '../../components';
import { loggedUserId } from '../_app';

const ConversationPage: FC = ({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { data: currentUser } = useFetchUserByUserId(loggedUserId);
  const { data: interlocutor } = useFetchUserByUserId(userId);

  const { data: conversations } = useFetchConversationsByUserId({ userId: userId });
  if (!currentUser || !interlocutor) return <>Error</>;
  const currentConversation = conversations
    ?.filter(
      ({ recipientId, senderId }) =>
        [recipientId, senderId].includes(currentUser.id) && [recipientId, senderId].includes(interlocutor.id)
    )
    .at(-1);
  return (
    <>
      <Head>
        <title>Demo Conversation - Leboncoin</title>
        <meta name="description" content="Conversation fonctionnelle, conversation qui ira loin"></meta>
      </Head>
      <Flex>
        <ViewConversation
          conversation={currentConversation ?? defaultConversation}
          interlocutor={{ ...interlocutor }}
          handleClose={() => router.push('/')}
        />
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId;
  if (typeof userId !== 'string') {
    return { props: {} };
  }
  const queryClient = new QueryClient();
  const userIdAsNumber = parseInt(userId, 10);
  const conversation = (await fetchConversationsByUserId(userIdAsNumber)).at(0);
  await Promise.all([
    await queryClient.prefetchQuery(queryKeys.conversations.userId(userIdAsNumber), () =>
      fetchConversationsByUserId(userIdAsNumber)
    ),
    await queryClient.prefetchQuery(queryKeys.users.userId(userIdAsNumber), () => fetchUserByUserId(userIdAsNumber)),
    await queryClient.prefetchQuery(queryKeys.users.userId(1), () => fetchUserByUserId(1)),
    await queryClient.prefetchQuery(queryKeys.messages.conversationId(conversation?.id), () =>
      fetchMessagesByConversationId(conversation.id)
    ),
  ]);

  // if () return {props: {}, redirect: {destination: `\\`}}
  return { props: { userId: userIdAsNumber, dehydratedState: dehydrate(queryClient) } };
};

export default ConversationPage;
