import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Houseapp</title>
      </Head>

      <Box maxW={'1280px'} m="auto">
        <header>Navbar</header>
        <main>{children}</main>
      </Box>

      <footer>Footer</footer>
    </>
  );
}
