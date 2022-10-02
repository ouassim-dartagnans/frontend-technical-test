import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ChatIcon } from '@chakra-ui/icons';
import { Avatar, Divider, Flex, IconButton, List, ListItem, Text } from '@chakra-ui/react';

import { Conversation, User } from '../../../types';

import {
  createConversation,
  queryKeys,
  useFetchConversationsForCurrentUser,
  useFetchCurrentLoggedUser,
} from '../../../api';
import { loggedUserId } from '../../../pages/_app';

export const FriendsList = ({
  users,
  onSelectConversation,
}: {
  users: Array<User>;
  onSelectConversation: (conversation: Conversation | null) => void;
}) => {
  const queryClient = useQueryClient();

  const { data: loggedUser } = useFetchCurrentLoggedUser();
  const { data: conversations } = useFetchConversationsForCurrentUser();

  const mutation = useMutation(
    ({ sender, recipient }: { sender: User; recipient: User }) => createConversation({ sender, recipient }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(queryKeys.conversations.userId(loggedUserId));
        onSelectConversation(data);
      },
    }
  );

  return (
    <List p={6}>
      <Flex direction={'column'} overflow={'scroll'} maxHeight={'80vh'} gap={5}>
        {users.map((current) => (
          <ListItem key={`user_s${current.id}`}>
            <Flex align={'center'} gap={5}>
              <Avatar name={current.nickname} size={'md'} />
              <Text fontSize={'1.05rem'}>{current.nickname}</Text>
              <IconButton
                ml={'auto'}
                icon={<ChatIcon />}
                aria-label={'Send a message'}
                onClick={() => {
                  let conversation = conversations.find(({ recipientId, senderId }) =>
                    [senderId, recipientId].includes(current.id)
                  );
                  if (conversation) return onSelectConversation(conversation);
                  return mutation.mutate({ sender: loggedUser, recipient: current });
                }}
              />
            </Flex>
            <Divider />
          </ListItem>
        ))}
      </Flex>
    </List>
  );
};
