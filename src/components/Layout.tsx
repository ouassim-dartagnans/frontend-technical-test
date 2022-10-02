import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Center, Flex, Spacer, useColorMode } from '@chakra-ui/react';

import Logo from '../assets/lbc-logo.webp';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex direction={'column'} minW={'100vw'} minH={'100vh'} justify={'center'}>
      <Flex
        p={[5, '1.5rem 2rem']}
        h={'fit-content'}
        maxH={[20, '10vh']}
        w={'100%'}
        borderTop={'1px solid #eaeaea'}
        borderBottom={'3px solid'}
        borderBottomColor={'brand.primary'}
        as={'header'}
      >
        <Link href={'/'}>
          <a>
            <Image src={Logo} alt="Leboncoin Frontend Team" width={140} height={40} layout="fixed" />
          </a>
        </Link>
        <Spacer />
        <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
      </Flex>
      <Flex as={'main'} direction={'column'} justify={'center'} alignItems={'center'} grow={1}>
        {children}
      </Flex>
      <Center w={'100%'} height={'min(50px, 10vh)'} borderTop={'1px solid'} borderTopColor={'brand.dark'}>
        &copy; leboncoin - {year}
      </Center>
    </Flex>
  );
};
