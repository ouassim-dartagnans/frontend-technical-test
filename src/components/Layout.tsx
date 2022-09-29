import React from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Logo from '../assets/lbc-logo.webp';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear();

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <Image src={Logo} alt="Leboncoin Frontend Team" width={140} height={40} layout="fixed" />
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
      </div>
    </>
  );
};
