import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  createStyles,
  Tab,
  Tabs
} from '@mantine/core';
import { HeaderComponent } from './header';
import { ChevronDown, Man } from 'tabler-icons-react';
import { MantineLogo } from 'pages/shared/logo';
import { useUser } from 'pages/lib/hooks';

const useStyles = createStyles((theme) => ({
    header: {
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
    },
  
    inner: {
      height: 24,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    links: {
      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },

    logo: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        height: 60,
        paddingTop: theme.spacing.md,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
        }`,
        marginBottom: theme.spacing.xl,
      },
  
    search: {
      [theme.fn.smallerThan('xs')]: {
        display: 'none',
      },
    },
  
    link: {
      display: 'block',
      lineHeight: 1,
      padding: '8px 12px',
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    },
  }));

  const links = [
    {
      "link": "/about",
      "label": "All Projects"
    },
    {
      "link": "/pricing",
      "label": "Get Help"
    },
    {
      "link": "/community",
      "label": "Account"
    }
  ]

export default function Layout() {
  const theme = useMantineTheme();
  const user = useUser({ redirectTo: '/auth/login' })
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 200 }}>
          <Text>Application navbar</Text>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header className={classes.header}  height={50} p="md">
          <div className={classes.inner}>
          <Group>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <p>LOGO</p>
            <a
      href='#'
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
        Access Manager <ChevronDown size={15} />
    </a>
    <a
      href='#'
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
        Billing
    </a>
            </Group>
            <Group>
            <Group ml={50} spacing={5} className={classes.links}>
            <a
      href='#'
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      All Clusters
    </a>

    <a
      href='#'
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
        Help <ChevronDown size={15} />
    </a>

    <a
      href='#'
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
        {user && user.user.firstname} <ChevronDown size={15} />
    </a>

    <a
      href='/api/logout'
      className={classes.link}
    >
       Logout
    </a>

          </Group>
            </Group>
          </div>
        </Header>
      }
    >
      <Tabs position="left"       
      styles={(theme) => ({
        tabControl: {
          marginRight: 50,
        },
      })}
>
      <Tabs.Tab label="Collections">Collections</Tabs.Tab>
      <Tabs.Tab label="Build">Build</Tabs.Tab>
      <Tabs.Tab label="Charts">Charts</Tabs.Tab>
    </Tabs>
    </AppShell>
  );
}