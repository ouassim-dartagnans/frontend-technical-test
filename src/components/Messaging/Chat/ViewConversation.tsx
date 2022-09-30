import React from 'react';

import { CloseIcon } from '@chakra-ui/icons';
import { Avatar, Box, Center, Flex, Hide, IconButton, List, Text } from '@chakra-ui/react';

import { useFetchMessagesByConversationId } from '../../../api/hooks/fetchers';

import { Conversation } from '../../../types/conversation';
import { User } from '../../../types/user';

import { MessageInput } from './MessageInput';
import { ViewMessage } from './ViewMessage';

interface Props {
  conversation: Conversation;
  interlocutor: Omit<User, 'token'>;
  handleClose?: () => void;
}

export const ViewConversation = ({ conversation, interlocutor, handleClose }: Props) => {
  const { data: messages } = useFetchMessagesByConversationId(conversation.id);
  return (
    <Flex direction={'column'} w={'100%'} flexGrow={1} mt={'auto'}>
      <Flex direction={'column'} w={'100%'} flexGrow={1} gap={10}>
        <Center borderBottom={'2px solid grey'} p={5} gap={3}>
          <Avatar name={interlocutor.nickname} size={'md'} />
          <Text fontSize={'1.2rem'}>{interlocutor.nickname}</Text>

          <Hide breakpoint={'(min-width: 701px'}>
            <Box ml={'auto'}>
              <IconButton
                icon={<CloseIcon />}
                onClick={handleClose}
                colorScheme="orange"
                aria-label="Close Dialog"
                variant={'outline'}
              />
            </Box>
          </Hide>
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
