import type { FC } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Logo from '../../assets/lbc-logo.webp';
import styles from '../../styles/Home.module.css';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { stringify } from 'querystring';

type userId = string;
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('query ', context.query);

  return { props: { userId: stringify(context.query) } };
};

const ConversationsListPage: FC = ({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <></>;
};

export default ConversationsListPage;
