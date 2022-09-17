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
  SimpleGrid,
  Card,
  Tabs,
  Paper,
  Select,
  TextInput,
  Center,
  Box,
  Textarea,
  Container,
  Anchor,
  ActionIcon,
  Title,
  Code,
  Menu,
  Grid,
  Tooltip,
} from '@mantine/core';
import { ThemeProvider } from 'theme-ui';
import { Moon, Sun, ChevronDown, ChartBar, Plus, LayoutDashboard, ArrowRight, Edit, Settings, Palette, Link, BrandAndroid, X, DotsVertical, Photo} from 'tabler-icons-react';
import theme from 'theme';
import SEO from 'components/seo';
import { useColorScheme, useViewportSize } from '@mantine/hooks';
import { useStyles } from '..';
import { useUser } from 'lib/hooks';
import { IconArrowLeft, IconArrowRight, IconHelp } from '@tabler/icons';
import ReactMapboxGl, { Layer, Feature, Marker, Source, GeoJSONLayer } from 'react-mapbox-gl';

const accessToken = 'pk.eyJ1IjoiZGF2aXNraXRhdmkiLCJhIjoiY2w0c2x2NjNwMGRvbDNrbGFqYW9na2NtaSJ9.q5rs7WMJE8oaBQdO4zEAcg';

 function AppShellDemo() {
  const user = useUser({ redirectTo: "/auth/login"})
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [dashboards, setDashboards] = useState([]);
  const [forms, setForms] = useState([]);
  const [response, setResponse] = useState([]);
  const [newcharts, setNewCharts] = useState(false)
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const {height, width} = useViewportSize();

  const Map = ReactMapboxGl({
    accessToken: accessToken,
  });

  // dashboard details
  const [db, setDB] = useState({
    title: '',
    form_id: '',
    desc: '',
  });

  React.useEffect(() => {
    const fetchDashboards = async () => {
      if(user === null){
        return false
      }

      let body = {
        user_id: user? user.user._id : ''
      }

      // fetch dashboards from the database.
    }

    fetchDashboards();

    const fetchForms = async () => {
      if(user === null){
        return false
      }

      let body = {
        user_id: user? user.user._id : ''
      }

      await fetch('/api/getAllUserForms', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(body)
      }).then( async function(res){
        if(res.status === 200){
          const data = await res.json()
          let x = data.forms.reverse();
          console.log(x);
          let y = []
          for(let i=0; i<x.length; i++){
            let chunk = {label: x[i].title, value: x[i].form_id};
            y.push(chunk);
          }
          setForms(y);
        }
      }).catch(function(error){
        console.log(error);
      })
    }

    fetchForms();
  }, [user])

  React.useEffect(() => {
    const fetchResponse = async () => {
      if(user === null){
        return false
      }

      if(db.form_id == ''){
        return false
      }

      const body = {
        form_id: db.form_id
      }

      await fetch('/api/getresponse', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      }).then( async function(res){
        if(res.status === 200){
          const data = await res.json()
          setResponse(data.response)
        }
      }).catch(function(error){
        console.log(error)
      })
    }

    fetchResponse()
  }, [db.form_id])


  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : "white",
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      header={
        <Header className={classes.header}  height={70} p="md">
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
                <Title><Center><Box>Untitled Dashboard </Box><ActionIcon><Edit on size={15} /></ActionIcon></Center></Title>
                </Group>
                <Group>
                <Group spacing={5} className={classes.links}>
                <Menu size='xl' control={<ActionIcon>
              <DotsVertical size={15} />
            </ActionIcon>}>
              <Menu.Item icon={<Palette />} >Change colors</Menu.Item>
              <Menu.Item icon={<Link />} >Add nav links</Menu.Item>
              <Menu.Item icon={<Photo />} >Add logo</Menu.Item>
              <Menu.Item onClick={() => {toggleColorScheme()}} icon={theme.colorScheme === "dark" ? <Sun /> : <Moon />}>Toggle colorScheme</Menu.Item>
              <Menu.Item icon={<X />} >Remove header</Menu.Item>
            </Menu>

              </Group>
                </Group>
              </div>
            </Header>
      }
    >
    
      <Grid columns={24}>
        {/* ----- First panel, shows basic summary information in text form ---- */}
        <Grid.Col span={4}>
          <Box sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        height: height - 100,
      })} >
        <Group position='apart'>
          <Group position='left'>

          </Group>
          <Group position='right'>
            <Tooltip label="Customize this panel">
            <Menu control={<ActionIcon><DotsVertical size={15} /></ActionIcon>}>
              <Menu.Item>Add Title</Menu.Item>
              <Menu.Item>Add Description</Menu.Item>
              <Menu.Item>Add Item</Menu.Item>
              <Menu.Item>Remove this panel</Menu.Item>
            </Menu>
            </Tooltip>
          </Group>
        </Group>
          </Box>
        </Grid.Col>
        {/*-----End of first panel --------------------*/}

        {/*-----Second panel, map information and some statistical data ------*/}
        <Grid.Col span={16}>
        <Box  sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        padding: 0,
        borderRadius: theme.radius.md,
        height: (height - 100) * 0.7,
      })}  >
        <Map
    style={theme.colorScheme ==="dark" ? "mapbox://styles/mapbox/dark-v10" :"mapbox://styles/mapbox/streets-v9"}
    containerStyle={{
      height: '100%',
      width: '100%'
    }}
    zoom={[0]}
    center={[36.768, -1.2345]}
  >
  </Map>
        </Box>
        <Group grow>
        <Box  sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        height: (height - 100) * 0.3,
        marginTop: 10,
        marginRight: 1
      })}  >

      <Group position='apart'>
          <Group position='left'>
            
          </Group>
          <Group position='right'>
            <Tooltip label="Customize this panel">
            <Menu control={<ActionIcon >
              <DotsVertical size={15} />
            </ActionIcon>}>
              <Menu.Item>Remove this panel</Menu.Item>
            </Menu>
            </Tooltip>
          </Group>
        </Group>
        </Box>

        <Box  sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        height: (height - 100) * 0.3,
        marginTop: 10,
        marginLeft: 1,
      })}  >

      <Group position='apart'>
          <Group position='left'>
            
          </Group>
          <Group position='right'>
            <Tooltip label="Customize this panel">
            <Menu control={<ActionIcon >
              <DotsVertical size={15} />
            </ActionIcon>}>
              <Menu.Item>Remove this panel</Menu.Item>
            </Menu>
            </Tooltip>
          </Group>
        </Group>
        </Box>
        </Group>
        </Grid.Col>
      {/*-------End of second panel -------*/}


        {/*---------------Start of the third panel, statistical data and some charts ----------------------*/}
        <Grid.Col span={4}>
        <Box  sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        height: height - 100,
      })}  >

      <Group position='apart'>
          <Group position='left'>
            
          </Group>
          <Group position='right'>
            <Tooltip label="Customize this panel">
            <Menu control={<ActionIcon><DotsVertical size={15} /></ActionIcon>}>
              <Menu.Item>Add Item</Menu.Item>
              <Menu.Item>Remove this panel</Menu.Item>
            </Menu>
            </Tooltip>
          </Group>
        </Group>
        </Box>
        </Grid.Col>
        {/*----------------------End of the third panel -----------------------*/}
      </Grid>
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