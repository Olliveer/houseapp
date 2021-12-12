import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
// import NProgress from 'nprogress';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { Layout } from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Head></Head> */}
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
