/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import Header from './header/header';
import Footer from './footer/footer';
export default function Layout({ children }) {
  return (
    <Fragment>
      <main
        sx={{
          variant: 'layout.main',
        }}
      >
        {children}
      </main>
      <Footer />
    </Fragment>
  );
}
