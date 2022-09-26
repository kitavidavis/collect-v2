import Head from 'next/head';
import { Banner } from './banner/banner';

export function HomePage() {
  return (
    <>
      <Head>
        <title>GeoPsy Collect</title>
      </Head>
      <Banner />
    </>
  );
}