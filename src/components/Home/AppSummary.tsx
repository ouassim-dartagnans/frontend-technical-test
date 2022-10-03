import { useState } from 'react';

import Link from 'next/link';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react';

import { useFetchConversationsByUserId } from '../../api';
import { loggedUserId } from '../../pages/_app';

export const AppSummary = () => {
  const [userId, setUserId] = useState(2);
  const { data: conversations } = useFetchConversationsByUserId({ userId: loggedUserId });

  return (
    <Flex direction={'column'}>
      <Box as={'h2'} mb={1}>
        <Text fontSize={'1.5rem'} color={'brand.500'} textDecoration={'underline'}>
          Product
        </Text>
      </Box>
      <Text>For this test, I chose to deliver two pages : </Text>
      <List as={'nav'} mt={3}>
        <ListItem borderRadius={'10px'} bgColor={'brand.lightBackground'} p={'0.5rem 1rem'}>
          <Flex alignItems={'center'}>
            <ListIcon as={ArrowForwardIcon} color={'brand.primary'} />
            <Text
              as={'code'}
              transition={' color 0.45s ease'}
              bgColor={'gray.100'}
              _hover={{
                color: 'brand.primary',
              }}
              color={'gray.800'}
            >
              <Link href="/chat">
                <a>/chat</a>
              </Link>
            </Text>
          </Flex>
          <Text mt={1} pl={5}>
            This page is a{' '}
            <em>
              <b>chatbox</b>
            </em>{' '}
            with all conversations listed for logged user.
            <br />
            On left, you can choose between currently existing conversations and friend list where you can retrieve or
            create conversations.
            <br />
            When a conversation is picked, it&apos;ll appear on <em>right side</em> on web or in a <em>modal</em> on
            mobile.
          </Text>
        </ListItem>
        <ListItem mt={4} borderRadius={'10px'} bgColor={'brand.lightBackground'} p={'0.5rem 1rem'}>
          <Flex alignItems={'center'}>
            <ListIcon as={ArrowForwardIcon} color={'brand.primary'} />
            <Text
              mr={3}
              bgColor={'gray.100'}
              as={'code'}
              transition={' color 0.45s ease'}
              _hover={{
                color: 'brand.primary',
              }}
              color={'gray.800'}
            >
              <Link href={`/chat/${userId}`}>
                <a>{`/chat/${userId}`}</a>
              </Link>
            </Text>
            <select key={userId} onChange={(event) => setUserId(parseInt(event.target.value, 10))}>
              {conversations?.map(({ id, recipientId, recipientNickname, senderId, senderNickname }) => {
                const interlocutor =
                  loggedUserId === recipientId
                    ? { id: senderId, nickname: senderNickname }
                    : {
                        id: recipientId,
                        nickname: recipientNickname,
                      };
                return (
                  <option selected={userId === interlocutor.id} key={id} value={interlocutor.id}>
                    <code>{interlocutor.nickname}</code>
                  </option>
                );
              })}
            </select>
          </Flex>
          <Text pl={5} mt={1}>
            This a direct link to a conversation with an user.
          </Text>
        </ListItem>
      </List>
    </Flex>
  );
};
