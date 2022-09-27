/** Uncomment the below codeblock if you want to add google analytics for more info please visit our docs analytics section */

import { useEffect } from 'react';
import Router from 'next/router';
import { initGA, logPageView } from 'analytics';
import 'assets/css/react-slick.css';
import 'assets/css/page.css';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

const THEME_KEY = 'geopsy-collect-color-scheme';

export default function CustomApp(props) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: THEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

   useEffect(() => {
     initGA();
     logPageView();
     Router.events.on('routeChangeComplete', logPageView);
   }, []);
   
   return (
    <>
      <Head>
        <title>GeoPsy Collect</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: colorScheme,
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
