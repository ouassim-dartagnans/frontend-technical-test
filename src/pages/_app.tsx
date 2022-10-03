import { useState } from 'react';

import type { AppProps } from 'next/app';

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ChakraProvider } from '@chakra-ui/react';

import { getLoggedUserId } from '../utils/getLoggedUserId';

import { Layout } from '../components';
import ErrorBoundary from '../components/ErrorBoundary';
import '../styles/globals.css';
import theme from '../theme';

// Default way to get a logged user
export const loggedUserId = getLoggedUserId();

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/*// @ts-ignore*/}
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
