import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import { Layout } from 'components/landing/layout/layout';
import Footer from 'components/footer/footer';
import Support from 'sections/support';
import Header from 'components/header/header';
import { Register } from 'sections/register';
import { useUser } from 'lib/hooks';

export default function IndexPage(){
  useUser({redirectTo: '/v2/', redirectIfFound: true});
    return (
        <ThemeProvider theme={theme}>
        <Layout header >
        <SEO
          title="GeoPsy Collect | Register"
          description="An open source geospatial data collection toolkit suited for research, science, ecosystem conservation and much more"
        />
        <Register />
        </Layout>
        </ThemeProvider>
    )
}