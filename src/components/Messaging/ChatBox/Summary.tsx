import React, { useMemo } from 'react';
import { Message } from '../../../types/message';
import { Avatar, Divider, Flex, ListItem, Spacer, Text } from '@chakra-ui/react';
import { Conversation } from '../../../types/conversation';
import { User } from '../../../types/user';

interface Props {
  isSelected: boolean;
  lastMessage: Message;
  conversation: Conversation;
  interlocutor: { id: User['id']; nickname: string };
  onSelectConversation: (conversation: Conversation | null) => void;
}

export const Summary = ({
  lastMessage,
  isSelected,
  conversation,
  onSelectConversation,
  interlocutor: { nickname },
}: Props) => {
  const formattedTimestamp = useMemo(() => {
    if (!!lastMessage) {
      const today = Date.now();
      return new Date(lastMessage.timestamp * 1000).toLocaleDateString('fr');
    }
    return '';
  }, [lastMessage]);

  return (
    <>
      <ListItem
        p={2}
        bgColor={isSelected && 'brand.background'}
        transition={'background-color 0.40s ease'}
        onClick={() => {
          onSelectConversation(conversation);
        }}
      >
        <Flex gap={5} align={'center'}>
          <Avatar name={nickname} size={'md'} />
          <Flex flexGrow={1} direction={'column'}>
            <Flex>
              <Text fontWeight={500}>{nickname}</Text>
              <Spacer />
              <Text as={'time'} dateTime={formattedTimestamp.toString()}>
                {formattedTimestamp}
              </Text>
            </Flex>
            <Text marginY={3} w={'80%'} noOfLines={1} h={'1.3rem'}>
              {!!lastMessage && lastMessage.body}
            </Text>
          </Flex>
        </Flex>
      </ListItem>
      <Divider />
    </>
  );
};
