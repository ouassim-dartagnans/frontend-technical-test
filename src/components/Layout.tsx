import React from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Logo from '../assets/lbc-logo.webp';
import { Box, Button, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className={styles.container}>
      <Box as={'header'} w={'100%'} h={20} display={'flex'} className={styles.header}>
        <Image src={Logo} alt="Leboncoin Frontend Team" width={140} height={40} layout="fixed" />

        <Button onClick={toggleColorMode} ml={'auto'}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Box>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
    </div>
  );
};
// width: 100%;
// height: 60px;
// border-top: 1px solid #eaeaea;
// display: flex;
// justify-content: flex-start;
// align-items: center;
// align-content: center;
// border-bottom: 2px solid #ec6e24;
// padding: 1rem 2rem;
