import { ChangeEvent, FormEvent, useState } from 'react';

import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormErrorMessage, Input, InputGroup } from '@chakra-ui/react';

import { Conversation } from '../../../types';

import { createMessageForConversation, queryKeys, useGenericMutation } from '../../../api';
import { loggedUserId } from '../../../pages/_app';

export const MessageInput = ({ conversation }: { conversation: Conversation }) => {
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');

  const createMessage = useGenericMutation({
    key: queryKeys.messages.conversationId(conversation.id),
    mutationFn: () =>
      createMessageForConversation({ body: newMessage, conversationId: conversation.id, authorId: loggedUserId }),
    onSuccess: (data) => {
      setNewMessage('');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMessage.mutate();
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setNewMessage(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
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
