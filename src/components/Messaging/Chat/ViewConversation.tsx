import { Conversation } from '../../../types/conversation';
import { User } from '../../../types/user';
import { Message } from '../../../types/message';
import { useFetchMessagesByConversationId } from '../../../api/hooks/fetchers';
import { List, ListItem } from '@chakra-ui/react';

interface Props {
  conversation: Conversation;
  participants: Array<User>;
  // messages: Array<Message>;
}

export const ViewConversation = ({ conversation, participants }: Props) => {
  const { data: messages } = useFetchMessagesByConversationId(conversation.id);
  return (
    <List>
      {messages
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((message) => (
          <ListItem key={`message_${message.id}`}>{message.body}</ListItem>
        ))}
    </List>
  );
};
