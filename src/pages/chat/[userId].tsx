import type { FC } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { stringify } from 'querystring';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import axios from 'axios';
import { MessageInput } from '../../components';
import { useState } from 'react';
import {
  useFetchConversationsByUserId,
  useFetchMessagesByConversationId,
  useFetchUserByUserId,
  useFetchUsers,
} from '../../api/hooks/fetchers';
import { config } from '../../utils/config';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  console.log(process.env);
  await queryClient.prefetchQuery(
    ['users', context.query.userId],
    async () => {
      const { data } = await axios.get('http://localhost:3005/user/' + context.query.userId);
      return data;
    },
    { staleTime: 50000 }
  );

  console.log('query ', context.query.userId);
  console.log('queryClient ', { queryClient: queryClient.getQueryData(['users', context.query.userId]) });

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const ConversationsListPage: FC = ({ test: string }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: user } = useFetchUserByUserId(userId as string);
  const { data: users } = useFetchUsers();
  const { data: conversations } = useFetchConversationsByUserId(userId as string);
  const { data: messages } = useFetchMessagesByConversationId('1');
  console.log({ user, users, conversations, messages, env: config.NEXT_PUBLIC_API_BASE_URL });
  const [newMessage, setNewMessage] = useState('');
  return (
    <MessageInput
      value={newMessage}
      onChange={setNewMessage}
      onSubmit={async () =>
        await axios.post(`http://localhost:3005/messages/`, { body: newMessage, timestamp: 0, conversationId: 1 })
      }
    />
  );
};

export default ConversationsListPage;
