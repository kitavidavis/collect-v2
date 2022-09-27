import { useRouter } from 'next/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { HEADER_HEIGHT } from './header/header.style';


export function Layout({children, noHeader = false}) {
  const router = useRouter();
  return (
      <>
      {router.pathname === "/" || router.pathname === "/auth/login" || router.pathname === "/auth/register" ? <Header /> : null}
      <main style={{ paddingTop: router.pathname === "/" || router.pathname === "/auth/login" || router.pathname === "/auth/register" ? HEADER_HEIGHT : 0 }}>{children}</main>
      {router.pathname === "/" ?  <Footer /> : null}
      </>
  );
}