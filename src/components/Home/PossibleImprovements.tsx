import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react';

export const PossibleImprovements = () => {
  const list = [
    { id: 0, text: 'Typing of api return (Via zodios)' },
    { id: 1, text: 'Unit tests / end to end' },
    { id: 2, text: 'Auth' },
    { id: 5, text: 'Errors handling' },
    { id: 7, text: 'Use grid to organize chatbox display' },
    { id: 8, text: 'Add datestamp separator' },
    { id: 10, text: 'Custom hooks for derivating data' },
  ];
  return (
    <Flex direction={'column'} gap={1}>
      <Box as={'h2'}>
        <Text fontSize={'1.5rem'} color={'brand.500'} textDecoration={'underline'}>
          Possible Improvements
        </Text>
      </Box>
      <List display={'flex'} flexDirection={'column'} gap={2}>
        {list.map(({ id, text }) => (
          <ListItem key={id}>
            <Flex alignItems={'center'}>
              <ListIcon as={ChevronRightIcon} color={'brand.primary'} />
              <Text pl={3}>{text}</Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};
