import React from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Logo from '../assets/lbc-logo.webp';
import { Button, Center, Flex, Spacer, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex direction={'column'} minH={'100vh'} justify={'center'}>
      <Flex
        p={5}
        h={20}
        w={'100%'}
        borderTop={'1px solid #eaeaea'}
        borderBottom={'3px solid'}
        borderBottomColor={'brand.primary'}
        as={'header'}
      >
        <Image src={Logo} alt="Leboncoin Frontend Team" width={140} height={40} layout="fixed" />
        <Spacer />
        <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
      </Flex>
      <Flex as={'main'} direction={'column'} justify={'center'} alignItems={'center'} grow={1}>
        {children}
      </Flex>
      <Center w={'100%'} height={'50px'} borderTop={'1px solid'} borderTopColor={'brand.dark'}>
        &copy; leboncoin - {year}
      </Center>
    </Flex>
  );
};
