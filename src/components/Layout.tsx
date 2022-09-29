import React from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Logo from '../assets/lbc-logo.webp';

export default function Layout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <Image src={Logo} alt="Leboncoin Frontend Team" width={400} height={125} layout="fixed" />

          {children}
        </main>
        <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
      </div>
    </>
  );
}
