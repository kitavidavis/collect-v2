/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'components/link';
import LogoSvg from 'components/icons/logo';
import serverRack from 'assets/images/white-logo.png';
import serverRack2 from 'assets/images/blue-logo.png';
import Image  from 'components/image';

export default function Logo({ isSticky, footer, ...props }) {
  return (
    <Link path="/" sx={styles.logo} {...props}>
      <Image style={{height: 60}} src={serverRack} loading="lazy" alt="sever-rack" />
    </Link>
  );
}

export function LogoBlue({ isSticky, footer, ...props }) {
  return (
    <Link path="/" sx={styles.logo} {...props}>
      <Image style={{height: 60}} src={serverRack2} loading="lazy" alt="sever-rack" />
    </Link>
  );
}
const styles = {
  logo: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'inline-flex',
    svg: {
      height: 'auto',
      width: [128, null, '100%'],
    },
  },
};
