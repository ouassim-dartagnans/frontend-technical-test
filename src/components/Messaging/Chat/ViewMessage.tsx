import { Message } from '../../../types/message';
import { ListItem, Text, useColorModeValue } from '@chakra-ui/react';
import { loggedUserId } from '../../../pages/_app';
import { User } from '../../../types/user';

export const ViewMessage = ({ message }: { message: Message; interlocutor: Omit<User, 'token'> }) => {
  const loggedUser = loggedUserId;
  const color = useColorModeValue('white.600', 'gray.800');

  return (
    <ListItem key={`message_${message.id}`}>
      {message.authorId === loggedUser ? (
        <Text
          ml={'auto'}
          mb={5}
          p={'12px'}
          color={color}
          // bgColor={'rgb(180,58,78)'}
          // background={'linear-gradient(90deg, rgba(180,58,78,1) 0%, rgba(236,110,32,1) 66%, rgba(252,176,69,1) 100%)'}
          backgroundColor={'rgb(254,119,38)'}
          w={'fit-content'}
          h={'auto'}
          textAlign={'left'}
          borderRadius={'10px'}
          border={'1px solid'}
          borderColor={'brand.600'}
          fontSize={'1.1rem'}
        >
          {message.body}
        </Text>
      ) : (
        <Text
          color={color}
          mr={'auto'}
          mb={5}
          p={'10px'}
          bgColor={'gray.200'}
          w={'fit-content'}
          h={'auto'}
          textAlign={'left'}
          borderRadius={'10px'}
          border={'1px solid'}
          borderColor={'dark.600'}
          fontSize={'1.1rem'}
        >
          {message.body}
        </Text>
      )}
    </ListItem>
  );
};
// position: relative;
// margin-left: 20px;
// margin-bottom: 10px;
// padding: 10px;
// background-color: #A8DDFD;
// width: 200px;
// height: 50px;
// text-align: left;
// font: 400 .9em 'Open Sans', sans-serif;
// border: 1px solid #97C6E3;
// border-radius: 10px;
// }
//
// .message-orange {
//   position: relative;
//   margin-bottom: 10px;
//   margin-left: calc(100% - 240px);
//   padding: 10px;
//   background-color: #f8e896;
//   width: 200px;
//   height: 50px;
//   text-align: left;
//   font: 400 .9em 'Open Sans', sans-serif;
//   border: 1px solid #dfd087;
//   border-radius: 10px;
// }
