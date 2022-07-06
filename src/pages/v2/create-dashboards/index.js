import React, { useState } from 'react';
import {
  AppShell,
  Header,
  Group,
  Button,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ColorSchemeProvider,
  MantineProvider,
  useMantineColorScheme,
} from '@mantine/core';
import { ThemeProvider } from 'theme-ui';
import { Moon, Sun, ChevronDown, ChartBar, Plus, LayoutDashboard} from 'tabler-icons-react';
import theme from 'theme';
import SEO from 'components/seo';
import { useColorScheme } from '@mantine/hooks';
import { useStyles } from '../dashboard';

 function AppShellDemo() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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
                <LayoutDashboard className={classes.mainLinkIcon} />
                <Text className={classes.mainLinkText} >Dashboard</Text>
                </Group>
                <Group>
                <Group ml={50} spacing={5} className={classes.links}>
                <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Button onClick={() => {toggleColorScheme()}} leftIcon={theme.colorScheme === 'dark' ? <Sun /> : <Moon />} className={classes.headerLink} variant='white'  >
              Toggle Theme
            </Button>
            </MediaQuery>

            <Button color='orange'  leftIcon={<Plus />} >
              New Dashboard
            </Button>

              </Group>
                </Group>
              </div>
            </Header>
      }
    >
    
    <Group position='center' my={'15%'}>
        <Group direction='column'>
            <Text className={classes.mainLinkText} >You have 0 dashboards created</Text>
            <span style={{marginLeft: 'auto', marginRight: 'auto'}} ><Button color='orange' leftIcon={<Plus />}>New Chart</Button></span>
        </Group>
    </Group>
      
    </AppShell>
  );
}

export default function CreateCharts(){
    const preferredColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useState(preferredColorScheme);

    const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    React.useEffect(() => {
        setColorScheme(preferredColorScheme);
    }, [preferredColorScheme]);
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <ThemeProvider theme={theme}>
                    <SEO title="Dashboards | Cloud: GeoPsy Collect Cloud" description="" />
                    <AppShellDemo />
                </ThemeProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}