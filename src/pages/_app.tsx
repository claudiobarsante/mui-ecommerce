import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import { useApollo } from 'graphql/client/apolloClient';
import createEmotionCache from 'utils/emotion/createEmotionCache';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import theme from 'styles/theme';
import Toast from 'components/Toast';
import { WishlistProvider } from 'hooks/use-wishlist';
import type { AppProps as NextAppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// interface MyAppProps extends AppProps {
//   emotionCache?: EmotionCache;
// }
type AppProps<P = any> = {
  pageProps: P;
  emotionCache?: EmotionCache;
} & Omit<NextAppProps<P>, 'pageProps'>;

export default function MyApp(props: AppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps }
  } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <CacheProvider value={emotionCache}>
          <WishlistProvider>
            <Head>
              <title>Book store</title>
              <link rel="shortcut icon" href="/img/icon-512.png" />
              <link rel="apple-touch-icon" href="/img/icon-512.png" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />

              <meta name="theme-color" content="#73bd73" />
              <meta
                name="description"
                content="The best collection of books cured by the world's readers'"
              />
            </Head>
            <DefaultSeo {...SEO} />
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Toast />

              <NextNprogress
                color="#73bd73"
                startPosition={0.3}
                stopDelayMs={200}
                showOnShallow={true}
              />
              <Component {...pageProps} />
            </ThemeProvider>
          </WishlistProvider>
        </CacheProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
