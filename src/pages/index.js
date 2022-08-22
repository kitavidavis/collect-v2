import React, {useState, useEffect, createContext, useContext, useReducer} from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import Banner from 'sections/banner';
import Header from 'components/header/header';
import TopBar from 'components/topbar';
import { useUser } from 'lib/hooks';
import UltimateFeatures from 'sections/ultimate-feature';
import Footer from 'components/footer/footer';
import LoaderCard from 'components/loaders/bolt';
import { Hero } from 'sections/hero';
import { Statistics } from 'sections/statistics';
import FAQ from 'sections/frquently-asked-questions';
import Features from 'sections/UFeatures';
import { HeroImageBackground } from 'sections/hero2';

export default function IndexPage() {
  useUser({redirectTo: '/v2/', redirectIfFound: true});
  return (
      <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="GeoPsy Collect"
          description="An open source geospatial data collection toolkit suited for research, science, ecosystem conservation and much more"
        />
        <HeroImageBackground />
      </Layout>
    </ThemeProvider>
  );
} 