import { log } from 'console';

import { ListItem, Text, useColorModeValue } from '@chakra-ui/react';

import { Message } from '../../../types/message';
import { User } from '../../../types/user';

import { loggedUserId } from '../../../pages/_app';

export const ViewMessage = ({ message }: { message: Message; interlocutor: Omit<User, 'token'> }) => {
  const loggedUser = loggedUserId;
  const color = useColorModeValue('white.600', 'gray.800');
  {
    console.log({ message: message, loggedUserId, test: message.authorId === loggedUser });
  }
  return (
    <ListItem key={`message_${message.id}`}>
      {message.authorId === loggedUser ? (
        <Text
          ml={'auto'}
          mb={5}
          p={'12px'}
          color={color}
          backgroundColor={'rgb(254,119,38)'}
          w={'fit-content'}
          h={'auto'}
          textAlign={'left'}
          borderRadius={'10px'}
          border={'1px solid'}
          borderColor={'brand.600'}
          fontSize={'1.1rem'}
        >
          {message.body}
        </Text>
      ) : (
        <Text
          color={color}
          mr={'auto'}
          mb={5}
          p={'10px'}
          bgColor={'gray.200'}
          w={'fit-content'}
          h={'auto'}
          textAlign={'left'}
          borderRadius={'10px'}
          border={'1px solid'}
          borderColor={'dark.600'}
          fontSize={'1.1rem'}
        >
          {message.body}
        </Text>
      )}
    </ListItem>
  );
};
