import { ChangeEvent, useState } from 'react';

import axios from 'axios';
import Link from 'next/link';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormErrorMessage, Input, InputGroup } from '@chakra-ui/react';

import { useGenericMutation } from '../../../api/hooks/mutations';
import { createMessageForConversation } from '../../../api/services';

import { Conversation } from '../../../types/conversation';

import { queryKeys } from '../../../api/keys';
import { loggedUserId } from '../../../pages/_app';

export const MessageInput = ({ conversation }: { conversation: Conversation }) => {
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');

  const createMessage = useGenericMutation(
    queryKeys.messages.conversationId(conversation.id),
    () => createMessageForConversation({ body: newMessage, conversationId: conversation.id, authorId: loggedUserId }),
    (data) => {
      setNewMessage('');
    }
  );

  const handleSubmit = () => {
    createMessage.mutate();
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setNewMessage(e.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <FormControl isInvalid={createMessage?.isError}>
        <InputGroup>
          <Input type="text" value={newMessage} placeholder={'Send Message'} onChange={handleInputChange} />
          <Button
            type={'submit'}
            variant="outline"
            loadingText="Loading"
            colorScheme="orange"
            spinnerPlacement="end"
            aria-label="Send message"
            rightIcon={<ArrowForwardIcon />}
            isLoading={createMessage?.isLoading}
            isDisabled={newMessage === '' || createMessage?.isLoading || createMessage?.isError}
          />
        </InputGroup>
        <FormErrorMessage>
          An error has happened, please contact the{' '}
          <Link href={'www.google.com'}>
            <a href={'www.google.com'}> support</a>
          </Link>
        </FormErrorMessage>
      </FormControl>
    </form>
  );
};
