import { useEffect } from "react";
import { useRouter } from 'next/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { HEADER_HEIGHT } from './header/header.style';
import {
  MantineProvider,
  ColorSchemeProvider,
} from '@mantine/core';
import { useLocalStorage, useHotkeys } from '@mantine/hooks';

export function Layout({children, noHeader = false}) {
  const router = useRouter();
  const THEME_KEY = 'geopsy-collect-color-scheme';

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
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider
        theme={{ colorScheme, primaryColor: "blue", primaryShade: 9 }}
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