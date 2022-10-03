import Link from 'next/link';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react';

export const TechnicalStack = () => {
  const stack = [
    {
      href: 'https://github.com/facebook/react',
      name: 'React',
      text: 'Mandatory. Used to build the User Interface via components.',
    },
    {
      href: 'https://github.com/vercel/next.js',
      name: 'NextJs',
      text: 'Mandatory. React framework with builtins like SSR, SSG, bundling, pref-fetching etc..',
    },
    {
      href: 'https://github.com/chakra-ui/chakra-ui',
      name: 'Chakra-ui',
      text: "I decided to test Chakra-UI. It's a component and styled blocks library. I've never used it before and I was curious about it.",
    },
    {
      href: 'https://github.com/TanStack/query',
      name: 'React-query',
      text: 'ReactQuery is a asynchronous state management with powerful functionalities like caching, refetching etc..',
    },
    {
      href: 'https://github.com/axios/axios',
      name: 'Axios',
      text: 'Popular http client.',
    },
    {
      href: 'https://github.com/lukemorales/query-key-factory',
      name: 'Query-key-factory',
      text: 'Util to normalize ReactQuery keys.',
    },
  ];

  return (
    <Flex direction={'column'} gap={1}>
      <Box as={'h2'}>
        <Text fontSize={'1.5rem'} color={'brand.500'} textDecoration={'underline'}>
          Technologies used
        </Text>
      </Box>
      <List display={'flex'} flexDirection={'column'} gap={2}>
        {stack.map(({ href, name, text }) => (
          <ListItem key={name}>
            <Flex alignItems={'center'}>
              <ListIcon as={ChevronRightIcon} color={'brand.primary'} />
              <Box
                w={'fit-content'}
                transition={' color 0.45s ease'}
                _hover={{
                  color: 'brand.primary',
                }}
                bgColor={'brand.lightBackground'}
              >
                <Link href={href}>
                  <a>
                    <code>{name}</code>
                  </a>
                </Link>
              </Box>
              <Text pl={3}>{text}</Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};
