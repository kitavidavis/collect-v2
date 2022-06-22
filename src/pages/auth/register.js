import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import Footer from 'components/footer/footer';
import Support from 'sections/support';
import Header from 'components/header/header';
import { Register } from 'sections/register';
import { useUser } from 'pages/lib/hooks';

export default function IndexPage(){
  useUser({redirectTo: '/v2/dashboard', redirectIfFound: true});
    return (
        <ThemeProvider theme={theme}>
        <Layout>
        <SEO
          title="GeoPsy Collect | Register"
          description="An open source geospatial data collection toolkit suited for research, science, ecosystem conservation and much more"
        />
        <Register />
        </Layout>
        </ThemeProvider>
    )
}