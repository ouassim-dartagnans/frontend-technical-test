import { User } from '../../../types/user';
import { Conversation } from '../../../types/conversation';
import { Message } from '../../../types/message';

interface Props {
  user: User;
  users: User[];
  conversations: Conversation[];
  messages: Map<Conversation['id'], Message[]>;
}

export const Overview = ({ user, conversations = [], messages = new Map<Conversation['id'], Message[]>() }: Props) => {
  return (
    <div style={{ border: 'solid 2px grey', borderRadius: '2px' }}>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {conversations.map(({ id, senderId, senderNickname, recipientId, recipientNickname }) => {
          const lastMessage = messages
            .get(id)
            ?.sort((a, b) => a.timestamp - b.timestamp)
            .at(-1);
          const interlocutor =
            user.id !== recipientId
              ? { id: recipientId, nickname: recipientNickname }
              : { id: senderId, nickname: senderNickname };
          return (
            <li key={id}>
              {`${interlocutor.nickname}`}
              {!!lastMessage && `-> ${lastMessage.body}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
