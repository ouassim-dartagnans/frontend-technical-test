import type { FC } from 'react';

import Head from 'next/head';

import { Flex } from '@chakra-ui/react';

import { AppSummary, PossibleImprovements, TechnicalStack } from '../components/Home';

const Home: FC = () => {
  return (
    <div>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Home page with explications"></meta>
      </Head>
      <Flex direction={'column'} gap={5} my={3}>
        <AppSummary />
        <TechnicalStack />
        <PossibleImprovements />
      </Flex>
    </div>
  );
};

export default Home;
