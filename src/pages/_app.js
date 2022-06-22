/** Uncomment the below codeblock if you want to add google analytics for more info please visit our docs analytics section */

import { useEffect } from 'react';
import Router from 'next/router';
import { initGA, logPageView } from 'analytics';
import { SessionProvider } from 'next-auth/react';
import 'assets/css/react-slick.css';

export default function CustomApp({ Component, pageProps }) {
   useEffect(() => {
     initGA();
     logPageView();
     Router.events.on('routeChangeComplete', logPageView);
   }, []);
   
   return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
   )
}
