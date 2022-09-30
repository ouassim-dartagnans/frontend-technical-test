import type { FC } from 'react';
import { useState } from 'react';

import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
  useFetchConversationByConversationId,
  useFetchConversationsByUserId,
  useFetchMessagesByConversationId,
  useFetchUserByUserId,
  useFetchUsers,
} from '../../api/hooks/fetchs';

import { defaultConversation } from '../../types/conversation';

import { queryKeys } from '../../api/keys';
import { ViewConversation } from '../../components';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery(
  //   queryKeys.conversations.(), context.query.userId],
  //   async () => {
  //     const { data } = await axios.get('http://localhost:3005/user/' + context.query.userId);
  //     return data;
  //   },
  //   { staleTime: 50000 }
  // );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const ConversationsListPage: FC = ({ test: string }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: user } = useFetchUserByUserId(1);
  const { data: users } = useFetchUsers();
  const { data: conversation } = useFetchConversationByConversationId(1);
  const { data: messages } = useFetchMessagesByConversationId(1);
  const interlocutor = users?.find(
    ({ id }) => [conversation.recipientId, conversation.senderNickname].includes(id) && id !== user.id
  );
  const def = {};
  return (
    <ViewConversation
      conversation={conversation ?? defaultConversation}
      interlocutor={{ ...interlocutor }}
      handleClose={() => null}
    />
  );
};

export default ConversationsListPage;
