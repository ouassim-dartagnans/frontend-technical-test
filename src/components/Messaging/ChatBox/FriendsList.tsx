import React from 'react';

import { ChatIcon } from '@chakra-ui/icons';
import { Avatar, Divider, Flex, IconButton, List, ListItem, Text } from '@chakra-ui/react';

import { User } from '../../../types';

export const FriendsList = ({
  users,
  openConversationWithUser,
}: {
  users: Array<User>;
  openConversationWithUser: (userId: User['id']) => void;
}) => {
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
                onClick={() => openConversationWithUser(current.id)}
              />
            </Flex>
            <Divider />
          </ListItem>
        ))}
      </Flex>
    </List>
  );
};
