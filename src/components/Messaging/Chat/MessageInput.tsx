import { IconButton, Input, InputGroup } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Conversation } from '../../../types/conversation';
import { FormEvent, useState } from 'react';
import { useGenericMutation } from '../../../api/hooks/mutations';
import { queryKeys } from '../../../api/keys';
import axios from 'axios';
import { Message } from '../../../types/message';
import { loggedUserId } from '../../../pages/_app';

export const MessageInput = ({ conversation }: { conversation: Conversation }) => {
  const [newMessage, setNewMessage] = useState('');
  const createMessage = useGenericMutation<Message>(
    queryKeys.messages.conversationId(conversation.id),
    async () =>
      await axios.post(`http://localhost:3005/messages/`, {
        body: newMessage,
        timestamp: Math.floor(Date.now() / 1000),
        conversationId: conversation.id,
        authorId: loggedUserId,
      })
  );
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMessage.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          type="text"
          value={newMessage}
          placeholder={'Send Message'}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <IconButton variant="outline" colorScheme="orange" aria-label="Send email" icon={<ArrowForwardIcon />} />
      </InputGroup>
    </form>
  );
};
