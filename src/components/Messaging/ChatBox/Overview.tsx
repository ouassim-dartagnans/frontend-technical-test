import React, { useState } from 'react';

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Fade,
  Flex,
  Hide,
  List,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import { Conversation } from '../../../types/conversation';
import { Message } from '../../../types/message';
import { User } from '../../../types/user';

import { ViewConversation } from '../Chat/ViewConversation';
import { FriendsList } from './FriendsList';
import { Summary } from './Summary';

interface Props {
  user: User;
  users: User[];
  conversations: Conversation[];
  messages: Map<Conversation['id'], Message[]>;
}
// TODO sort order conv ? by last message ?

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

  function openConversationWithUser(userId: User['id']) {
    console.log("create conv if it' not created already ");
  }

  return (
    <Flex
      align={'flex-start'}
      overflow={'clip'}
      grow={1}
      h={'100%'}
      p={[0, 5]}
      w={['100vw', '100vw', '95vw']}
      my={['2rem', '2rem']}
      gap={5}
      position={'relative'}
      boxShadow={[
        0,
        '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      ]}
    >
      <Tabs
        flexShrink={0}
        isFitted={true}
        colorScheme={'orange'}
        variant="line"
        h={'100%'}
        w={['100%', '100%', 'min(40%, 600px)']}
      >
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
            <FriendsList
              users={users.filter((usr) => usr.id !== user.id)}
              openConversationWithUser={openConversationWithUser}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box w={1} minH={'100%'} bgColor={'brand.primary'} my={5} color={'brand.primary'} alignSelf={'stretch'}>
        |
      </Box>
      {!!selectedConversation && (
        <>
          <Hide breakpoint={'(max-width: 700px'}>
            <Box flexGrow={1} w={'100%'} h={'100%'} alignSelf={'stretch'}>
              <Fade key={selectedConversation.id} in={!!selectedConversation} delay={0.1}>
                <ViewConversation
                  conversation={selectedConversation}
                  handleClose={() => setSelectedConversation(null)}
                  interlocutor={getConversationInterlocutor(selectedConversation)}
                />
              </Fade>
            </Box>
          </Hide>
          <Hide breakpoint={'(min-width: 701px'}>
            <Drawer
              placement={'bottom'}
              size={'full'}
              onClose={() => setSelectedConversation(null)}
              isOpen={!!selectedConversation}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerBody>
                  <ViewConversation
                    conversation={selectedConversation}
                    handleClose={() => setSelectedConversation(null)}
                    interlocutor={getConversationInterlocutor(selectedConversation)}
                  />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Hide>
        </>
      )}
    </Flex>
  );
};
