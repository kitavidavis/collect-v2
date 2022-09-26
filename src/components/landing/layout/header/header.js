import { Container, Center, Title, Group, Button, useMantineColorScheme } from '@mantine/core';
import Link from 'next/link';
import { UserCircle } from "tabler-icons-react";
import useStyles from './header.style';
import {ColorSchemeControl } from '@mantine/ds';

export function Header() {
  const { classes } = useStyles();
  const theme = useMantineColorScheme()
  return (
    <div style={{backgroundColor: theme.colorScheme === 'dark' ? "#141517": "#F1F3F5" }} className={classes.header}>
      <Container size="xl" px="md" className={classes.inner}>
        <Link href="/" passHref>
          <Center component="a" sx={(theme) => theme.fn.focusStyles()}>
            <Title >Collect</Title>
          </Center>
        </Link>
        
        <Group>
          <Group sx={(theme) => ({ [theme.fn.smallerThan('sm')]: { display: 'none' } })}>
          <Link href='/auth/login' passHref>
            <Button leftIcon={<UserCircle />}>Login</Button>
            </Link>
            <Link href="/auth/register" passHref>
            <Button leftIcon={<UserCircle />} variant="outline" >Sign Up</Button>
            </Link>
          </Group>

          <ColorSchemeControl />
        </Group>
      </Container>
    </div>
  );
}