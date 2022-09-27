import { useState } from 'react';
import { IconSearch } from '@tabler/icons';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  useMantineColorScheme,
} from '@mantine/core';
import { useLocalStorage, useHotkeys } from '@mantine/hooks';
import rtlPlugin from 'stylis-plugin-rtl';
import { useRouter } from 'next/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { HEADER_HEIGHT } from './header/header.style';

const THEME_KEY = 'geopsy-collect-color-scheme';

export function Layout({children, noHeader = false}) {
  const router = useRouter();
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: THEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const [dir, setDir] = useState('ltr');

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    const toggleDir = () => {
        console.log("Direction changed")
    }

  useHotkeys([
    ['mod+J', () => toggleColorScheme()],
    ['mod+L', toggleDir],
  ]);


  return (
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ colorScheme, dir, primaryColor: "blue", primaryShade: 9 }}
          withGlobalStyles
          withNormalizeCSS
        >
            {router.pathname === "/" || router.pathname === "/auth/login" || router.pathname === "/auth/register" ? <Header /> : null}
            <main style={{ paddingTop: router.pathname === "/" || router.pathname === "/auth/login" || router.pathname === "/auth/register" ? HEADER_HEIGHT : 0 }}>{children}</main>
           {router.pathname === "/" ?  <Footer /> : null}
        </MantineProvider>
      </ColorSchemeProvider>
  );
}