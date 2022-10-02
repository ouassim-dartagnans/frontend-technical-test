import { CloseIcon } from '@chakra-ui/icons';
import { Flex, IconButton, ListItem, Text, useColorModeValue } from '@chakra-ui/react';

import { Message, User } from '../../../types';

import { deleteMessageByMessageId, queryKeys, useGenericMutation } from '../../../api';
import { loggedUserId } from '../../../pages/_app';

export const ViewMessage = ({ message }: { message: Message; interlocutor: Omit<User, 'token'> }) => {
  const loggedUser = loggedUserId;
  const color = useColorModeValue('white.600', 'gray.800');

  const deleteMessage = useGenericMutation({
    key: queryKeys.messages.conversationId(message.conversationId),
    mutationFn: () => deleteMessageByMessageId(message.id),
  });

  const props =
    message.authorId === loggedUser
      ? {
          ml: 'auto',
          borderColor: 'brand.600',
          bgColor: 'rgb(254,119,38)',
        }
      : {
          mr: 'auto',
          bgColor: 'gray.200',
          borderColor: 'dark.600',
        };

  return (
    <ListItem key={`message_${message.id}`}>
      <Flex>
        <Text
          {...props}
          mb={5}
          p={'12px'}
          h={'auto'}
          color={color}
          w={'fit-content'}
          borderRadius={'10px'}
          fontSize={'1.05rem'}
          border={'1px solid'}
        >
          {message.body}
        </Text>
        <IconButton
          icon={<CloseIcon />}
          size={'xs'}
          onClick={() => deleteMessage.mutate()}
          isLoading={deleteMessage?.isLoading}
          aria-label={'Delete Message'}
        />
      </Flex>
    </ListItem>
  );
};
