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
} from '@mantine/core';
import { ThemeProvider } from 'theme-ui';
import { Moon, Sun, ChevronDown, ChartBar, Plus, LayoutDashboard, ArrowRight} from 'tabler-icons-react';
import theme from 'theme';
import SEO from 'components/seo';
import { useColorScheme, useViewportSize } from '@mantine/hooks';
import { useStyles } from '..';
import { useUser } from 'lib/hooks';
import { IconArrowLeft, IconArrowRight, IconHelp } from '@tabler/icons';

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

  const NewChart = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [form_id, setFormId] = useState('');
    const [templates, setTemplates] = useState([
      {
        id: 1,
        title: 'New',
        template: <NewTemplate />
      },
      {
        id: 2,
        title: 'H',
        template: <NewTemplate />
      },
      {
        id: 3,
        title: 'New',
        template: <NewTemplate />
      },
      {
        id: 4,
        title: 'New',
        template: <NewTemplate />
      },
      {
        id: 5,
        title: 'New',
        template: <NewTemplate />
      },
      {
        id: 6,
        title: 'New',
        template: <NewTemplate />
      },
      {
        id: 7,
        title: 'New',
        template: <NewTemplate />
      },
      {
        id: 8,
        title: 'New',
        template: <NewTemplate />
      },
      {
        id: 9,
        title: 'New',
        template: <NewTemplate />
      },
      {
        id: 10,
        title: 'New',
        template: <NewTemplate />
      }
    ])

    const NewTemplate = () => {
      return (
        <Card shadow='sm' p='lg' radius='md' withBorder>
            <Card.Section>
          </Card.Section>
    
          <Button leftIcon={<Plus />} variant="light" color="blue" fullWidth mt="md" radius="md">
            Blank template
          </Button>
                </Card> 
      )
    }

    const [step, setStep] = useState(1)

    const storeData = () => {
      setStep(1);
    }


    return (
      step === 0 ? (
        <Container size={width > 1000 ? width * 0.6 : width} my={10} >
        <Anchor href="/v2/create-dashboards/">
          <Center inline>
            <IconArrowLeft size={14} />
            <Box ml={5}>Back to main page</Box>
          </Center>
        </Anchor>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Dashboard details
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5} mb={10}>
        Fill out the basic information below to get started.
      </Text>
        <TextInput label="Dashboard title" placeholder="" classNames={classes} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}} required />

        <TextInput style={{marginTop: 20}} label="Description" placeholder="optional" classNames={classes} value={desc} onChange={(e) => {setDesc(e.currentTarget.value)}} />

        <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={forms}
        value={form_id}
        onChange={(val) => {setFormId(val)}}
        placeholder="Pick one"
        label="Source of data"
        classNames={classes}
        required
      />

      <Group position='right'>
      <Button disabled={title == '' || form_id == '' ? true : false} onClick={() => {storeData()}}  mt="xl">
        Continue
      </Button>
      </Group>
      </Paper>
      </Container>
      ) : step === 1 ? (
        <>
        <MediaQuery smallerThan={'lg'} styles={{display: 'none'}}>
        <SimpleGrid cols={4}>
          {templates.map((item, index) => {
            return <NewTemplate key={index} />
          })}
        </SimpleGrid>
        </MediaQuery>

          <MediaQuery largerThan={'md'} styles={{display: 'none'}}>
          <SimpleGrid cols={2}>
          {templates.map((item, index) => {
            return <NewTemplate key={index} />
          })}
        </SimpleGrid>
          </MediaQuery>
          </>
      ) : (
        <Container>

        </Container>
      )
    )
  }

  const ExistingCharts = () => {
    return (
      dashboards.length === 0 ? (
        <>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        You have 0 Dashboards
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5} mb={10}>
        Dashboards are intuitive, visual means of displaying complex data. They narrate amazing stories 
        curated by data scientists using charts, maps, and pictures. Click the button below to create
        your first dashboard.
        <Anchor href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Learn more about good dashboard designs
        </Anchor>
      </Text>
      <Group my={50} position='center'><Button color='orange' onClick={() => {setNewCharts(true)}} leftIcon={<Plus />}>New Dashboard</Button></Group>

      </Paper>
        </>
      ) : (
        <SimpleGrid cols={4}>
          {dashboards.map((dashboard, index) => {
            return (
              <Card key={index} shadow='sm' p='lg' radius='md' withBorder>
              <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>
    
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Norway Fjord Adventures</Text>
            <Badge color="pink" variant="light">
              On Sale
            </Badge>
          </Group>
    
          <Text size="sm" color="dimmed">
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text>
    
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button>
                </Card> 
            )
          })}
        </SimpleGrid>
      )
    )
  }

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

            <ActionIcon>
              <IconHelp  color='orange'/>
            </ActionIcon>

              </Group>
                </Group>
              </div>
            </Header>
      }
    >
    
      {newcharts ? <NewChart /> :   <ExistingCharts />}
      
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