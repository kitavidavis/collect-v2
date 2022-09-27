/** Uncomment the below codeblock if you want to add google analytics for more info please visit our docs analytics section */

import { useEffect } from 'react';
import Router from 'next/router';
import { initGA, logPageView } from 'analytics';
import 'assets/css/react-slick.css';
import 'assets/css/page.css';
import Head from 'next/head';
import {
  MantineProvider,
  ColorSchemeProvider,
} from '@mantine/core';
import { useLocalStorage, useHotkeys } from '@mantine/hooks';

const THEME_KEY = 'geopsy-collect-color-scheme';

export default function CustomApp(props) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: THEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
  setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  useHotkeys([
    ['mod+J', () => toggleColorScheme()],
  ]);

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

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
          theme={{ colorScheme, primaryColor: "blue", primaryShade: 9 }}
          withGlobalStyles
          withNormalizeCSS
        >

        <Component {...pageProps} />
      </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
