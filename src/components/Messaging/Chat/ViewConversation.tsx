import React, { useEffect, useRef } from 'react';

import { CloseIcon } from '@chakra-ui/icons';
import { Avatar, Box, Center, Flex, Hide, IconButton, List, Text } from '@chakra-ui/react';

import { Conversation, User } from '../../../types';

import { useFetchMessagesByConversationId } from '../../../api';
import { MessageInput } from './MessageInput';
import { ViewMessage } from './ViewMessage';

interface Props {
  conversation: Conversation;
  interlocutor: Omit<User, 'token'>;
  handleClose?: () => void;
}

export const ViewConversation = ({ conversation, interlocutor, handleClose }: Props) => {
  const { data: messages } = useFetchMessagesByConversationId(conversation.id);

  const ref = useRef(null);
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Flex
      direction={'column'}
      w={'100%'}
      flexGrow={1}
      mt={'auto'}
      overflow={'scroll'}
      maxH={'80vh'}
      px={5}
      position={'relative'}
    >
      <Flex direction={'column'} w={'100%'} flexGrow={1} gap={10} position={'relative'}>
        <Center borderBottom={'2px solid grey'} p={5} gap={3} position={'sticky'} top={0} zIndex={5} bgColor={'white'}>
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
          <div ref={ref} />
        </List>
      </Flex>
      <Box position={'sticky'} bottom={0} bgColor={'white'}>
        <MessageInput key={`${messages.length}`} conversation={conversation} />
      </Box>
    </Flex>
  );
};
