import type { FC } from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

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
  const { data: currentUser } = useFetchUserByUserId(loggedUserId);
  const { data: interlocutor } = useFetchUserByUserId(userId);

  const { data: conversations } = useFetchConversationsByUserId({ userId: userId });
  const currentConversation = conversations
    ?.filter(
      ({ recipientId, senderId }) =>
        [recipientId, senderId].includes(currentUser.id) && [recipientId, senderId].includes(interlocutor.id)
    )
    .at(-1);
  return (
    <Flex>
      <ViewConversation
        conversation={currentConversation ?? defaultConversation}
        interlocutor={{ ...interlocutor }}
        handleClose={() => null}
      />
    </Flex>
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
    await queryClient.prefetchQuery(queryKeys.messages.conversationId(conversation.id), () =>
      fetchMessagesByConversationId(conversation.id)
    ),
  ]);

  return { props: { userId: userIdAsNumber, dehydratedState: dehydrate(queryClient) } };
};

export default ConversationPage;
