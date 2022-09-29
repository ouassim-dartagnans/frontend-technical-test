import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryKeys } from '../keys';

export function useFetchUserByUserId(userId: string) {
  return useQuery(queryKeys.users.userId(userId), async () => {
    const { data } = await axios.get(`http://localhost:3005/user/${userId}`);
    return data;
  });
}

export function useFetchUsers() {
  return useQuery(queryKeys.users._def, async () => {
    const { data } = await axios.get('http://localhost:3005/users/');
    return data;
  });
}

export function useFetchConversationByConversationId(conversationId: string) {
  return useQuery(queryKeys.conversations.conversationId(conversationId), async () => {
    const { data } = await axios.get(`http://localhost:3005/conversation/${conversationId}`);
    return data;
  });
}

export function useFetchConversationsByUserId(userId: string) {
  return useQuery(queryKeys.conversations.userId(userId), async () => {
    const { data } = await axios.get(`http://localhost:3005/conversations/${userId}`);
    return data;
  });
}

export function useFetchMessagesByConversationId(conversationId: string) {
  return useQuery(queryKeys.messages.conversationId(conversationId), async () => {
    const { data } = await axios.get(`http://localhost:3005/messages/${conversationId}`);
    return data;
  });
}
