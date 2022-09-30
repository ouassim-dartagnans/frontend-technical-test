import { Conversation } from '../../../types/conversation';
import { User } from '../../../types/user';
import { useFetchMessagesByConversationId } from '../../../api/hooks/fetchers';
import { Fade, Flex, List, ListItem } from '@chakra-ui/react';
import { MessageInput } from './MessageInput';
import { ViewMessage } from './ViewMessage';

interface Props {
  conversation: Conversation;
  participants: Array<User>;
  // messages: Array<Message>;
}

export const ViewConversation = ({ conversation, participants }: Props) => {
  const { data: messages } = useFetchMessagesByConversationId(conversation.id);
  return (
    <Flex direction={'column'} w={'100%'} flexGrow={1}>
      <Fade key={conversation.id} in={!!conversation} delay={0.1}>
        <List>
          {messages
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((message) => (
              <ViewMessage key={`message_${message.id}`} message={message} participants={participants} />
            ))}
        </List>
        <MessageInput />
      </Fade>
    </Flex>
  );
};
