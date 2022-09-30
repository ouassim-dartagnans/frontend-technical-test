import { Conversation } from '../../../types/conversation';
import { User } from '../../../types/user';
import { useFetchMessagesByConversationId } from '../../../api/hooks/fetchers';
import { Avatar, Center, Flex, List, Text } from '@chakra-ui/react';
import { MessageInput } from './MessageInput';
import { ViewMessage } from './ViewMessage';
import React from 'react';

interface Props {
  conversation: Conversation;
  interlocutor: Omit<User, 'token'>;
}

export const ViewConversation = ({ conversation, interlocutor }: Props) => {
  const { data: messages } = useFetchMessagesByConversationId(conversation.id);
  return (
    <Flex direction={'column'} w={'100%'} flexGrow={1} mt={'auto'}>
      <Flex direction={'column'} w={'100%'} flexGrow={1} gap={10}>
        <Center borderBottom={'2px solid grey'} p={5} gap={3}>
          <Avatar name={interlocutor.nickname} size={'md'} />
          <Text fontSize={'1.2rem'}>{interlocutor.nickname}</Text>
        </Center>
        <List>
          {messages
            .sort((a, b) => a.timestamp - b.timestamp)
            .map((message) => (
              <ViewMessage key={`message_${message.id}`} message={message} interlocutor={interlocutor} />
            ))}
        </List>
      </Flex>
      <MessageInput conversation={conversation} />
    </Flex>
  );
};
