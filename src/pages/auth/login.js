import React, { useState} from 'react';
import { ThemeProvider } from 'theme-ui';
import Router from 'next/dist/next-server/server/router';
import theme from 'theme';
import SEO from 'components/seo';
import { Layout } from 'components/landing/layout/layout';
import Footer from 'components/footer/footer';
import Support from 'sections/support';
import Header from 'components/header/header';
import { Login } from 'sections/login';
import { useUser } from 'lib/hooks';
import { useViewportSize, useScrollLock } from '@mantine/hooks';

export default function IndexPage(){
  useUser({redirectTo: '/v2/', redirectIfFound: true});
  const { height, width } = useViewportSize();
    return (
        <ThemeProvider theme={theme}>
          <Layout header >
        <SEO
          title="GeoPsy Collect | Login"
          description="An open source geospatial data collection toolkit suited for research, science, ecosystem conservation and much more"
        />
        <Login />
        </Layout>
        </ThemeProvider>
    )
}