import { Conversation } from '../../../types/conversation';
import { User } from '../../../types/user';
import { Message } from '../../../types/message';
import { Box, Divider, Flex, List, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Summary } from './Summary';
import { useState } from 'react';
import React from 'react';
import { ViewConversation } from '../Chat/ViewConversation';

interface Props {
  user: User;
  users: User[];
  conversations: Conversation[];
  messages: Map<Conversation['id'], Message[]>;
}
// sort order ? by last message ?

export const Overview = ({
  user,
  users = [],
  conversations = [],
  messages = new Map<Conversation['id'], Message[]>(),
}: Props) => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const getConversationLastMessage = ({ id }: Conversation) =>
    messages
      .get(id)
      ?.sort((a, b) => a.timestamp - b.timestamp)
      .at(-1);
  const getConversationInterlocutor = ({ recipientId, recipientNickname, senderNickname, senderId }: Conversation) =>
    user.id !== recipientId
      ? { id: recipientId, nickname: recipientNickname }
      : { id: senderId, nickname: senderNickname };

  function onSelectConversation(conv: Conversation | null) {
    setSelectedConversation(conv);
  }

  return (
    <Flex align={'flex-start'} overflow={'clip'} grow={1} w={['100vw', '100vw', '95vw']} mt={['2rem', '5rem']}>
      <Tabs isFitted={true} colorScheme={'brand'} variant="line" h={'100%'} w={['100%', '100%', 'min(40%, 600px)']}>
        <TabList>
          <Tab>Conversations</Tab>
          <Tab>Friend List</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <List spacing={3}>
              {conversations.map((conversation) => (
                <Summary
                  conversation={conversation}
                  key={`conversation_${conversation.id}`}
                  onSelectConversation={onSelectConversation}
                  isSelected={conversation === selectedConversation}
                  lastMessage={getConversationLastMessage(conversation)}
                  interlocutor={getConversationInterlocutor(conversation)}
                />
              ))}
            </List>
          </TabPanel>
          <TabPanel>
            <Flex direction={'column'}>
              {users
                .filter(({ id }) => id !== user.id)
                .map((current) => (
                  <li key={`user_${current.id}`}>{current.nickname}</li>
                ))}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {selectedConversation && (
        <ViewConversation
          conversation={selectedConversation}
          participants={users.filter(({ id }) =>
            [selectedConversation?.recipientId, selectedConversation?.senderId].includes(id)
          )}
        />
      )}
    </Flex>
  );
};
{
  /*<ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>*/
}
