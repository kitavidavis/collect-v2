/** @jsxRuntime classic /
/** @jsx jsx */
import {
  jsx,
  Box,
  Flex,
  Text,
  Input,
  Label,
  Button,
  Select,
  Heading,
  Container,
} from 'theme-ui';
import { useViewportSize } from '@mantine/hooks';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { rgba } from 'polished';
import Image from 'components/image';
import Header from 'components/header/header';
import serverRack from 'assets/illustrations/444-white.png';
import { useNavigate, Navigate } from 'react-router-dom';

const Banner = () => {
  const router = useRouter();
  const { height, width } = useViewportSize();
  const [state, setState] = useState({
    domainName: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("geopsy-collect-getstarted", state.domainName);
    getStarted()
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value.toLowerCase(),
    });
  };

  const getStarted = async () => {
    return (
      router.push('auth/register')
    )
  }

  return (
    <Box as="section" id="home" sx={styles.section}>
      <Container>
        <Box sx={styles.grid}>
          <Box as="form" sx={styles.domainCard} onSubmit={handleSubmit}>
            <Heading>Data collection made easy</Heading>
            <Flex sx={styles.inputGroup}>
              <Label htmlFor="domainName" variant="styles.srOnly">
                Your Email Address
              </Label>
              <Input
                type="email"
                sx={{borderRadius: '10px', borderColor: 'indigo'}}
                id="domainName"
                value={state.domainName}
                onChange={handleChange}
                placeholder="Your Email Address"
              />
            </Flex>
            <Button disabled={state.domainName === '' ? true : false}  type="submit" sx={styles.submit}>
              Start for free
            </Button>
            <Text as="p" sx={styles.note}>
              No credit card required.
            </Text>
          </Box>
          <Box as="figure" sx={styles.illustration}>
            <Image src={serverRack} loading="lazy" alt="sever-rack" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  section: {
    backgroundColor: '#3929CB',
    pt: [17, null, null, 20, null],
    pb: [1, null, null, 7, 9],
  },
  grid: {
    gap: ['30px 60px', null, null, null, '30px 40px', '30px 60px'],
    display: 'grid',
    minHeight: [null, null, null, null, null, '66vh', '81vh'],
    alignItems: 'center',
    gridTemplateColumns: [
      '1fr',
      null,
      null,
      null,
      'repeat(2, 1fr)',
      '510px 1fr',
    ],
  },
  domainCard: {
    background: 'white',
    boxShadow: '0px 24px 50px rgba(54, 91, 125, 0.05)',
    borderRadius: 10,
    p: ['30px 25px 50px', null, null, '40px 40px 60px'],
    m: [null, null, null, '0 auto', 'unset'],
    maxWidth: [null, null, null, 480, 'none'],
    h2: {
      fontWeight: 700,
      fontSize: [8, null, null, 10, 9, 14],
      lineHeight: 1.36,
      letterSpacing: 'heading',
      color: 'textSecondary',
      mb: [5, null, null, 7, 8],
    },
  },
  inputGroup: {
    alignItems: 'center',
    border: (theme) => `1px solid ${theme.colors.borderColor}`,
    borderRadius: 5,
    px: [3, null, null, 6],
    input: {
      border: 0,
      borderRadius: 0,
      fontSize: [1, null, null, 2],
      minHeight: [45, null, null, 60],
      p: 0,
      ':focus': {
        boxShadow: 'none',
      },
      '::placeholder': {
        fontSize: '15px',
        lineHeight: 1.33,
        color: rgba('#02073E', 0.4),
      },
      ':-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 30px white inset !important',
      },
    },
    select: {
      border: 0,
      color: 'textSecondary',
      fontWeight: 500,
      fontSize: [0, null, null, '15px'],
      lineHeight: 1.33,
      letterSpacing: 'heading',
      minHeight: [45, null, null, 60],
      minWidth: [60, null, null, 75],
      p: 0,
      textTransform: 'uppercase',
      ':focus': {
        outline: 0,
      },
      '+ svg': {
        color: '#A6A8BB',
        height: 40,
        width: 40,
      },
    },
  },
  submit: {
    fontSize: [1, null, null, 2],
    mt: [4],
    minHeight: [45, null, null, 60],
    width: '100%',
    backgroundColor: '#3929CB',
  },
  note: {
    fontStyle: 'italic',
    fontSize: [0, null, null, '15px'],
    lineHeight: 1.33,
    textAlign: 'center',
    color: rgba('#02073E', 0.5),
    mt: [4],
  },
};
