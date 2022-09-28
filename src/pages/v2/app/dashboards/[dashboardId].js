import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
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
  Loader,
  Center,
  Title,
  Container,
  Box,
  Group,
  Anchor,
  Button,
  ActionIcon,
  Paper,
  RingProgress,
  Card,
} from '@mantine/core';

import {
    MantineProvider,
    ColorSchemeProvider,
  } from '@mantine/core';
  import { useLocalStorage, useHotkeys, useViewportSize } from '@mantine/hooks';
import ReactMapboxGl, { Layer, Feature, Marker, Source } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Moon, Sun } from "tabler-icons-react";
import { IconArrowRight } from "@tabler/icons";
import RightArrow from "components/icons/right-arrow";

function UserDashboard() {
  const theme = useMantineTheme();
  const [opened, setOpened] = React.useState(false);
  const [dashboard, setDashboard] = React.useState(null);
  const [ready, setReady] = React.useState(false);
  const [pid, setPID] = React.useState("");
  const [form_id, setFormID] = React.useState("");
  const [response, setResponse] = React.useState([]);
  const [points, setPoints] = React.useState([]);
  const [polylines, setPolylines] = React.useState([]);
  const [polygons, setPolygons] = React.useState([]);
  const [radios, setRadios] = React.useState([]);
  const [labels, setLabels] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [destructuredQuestions, setDestructuredQuestions] = React.useState([]);
  const [stats, setStats] = React.useState([]);
  const router = useRouter();
  const accessToken = 'pk.eyJ1IjoiZGF2aXNraXRhdmkiLCJhIjoiY2w0c2x2NjNwMGRvbDNrbGFqYW9na2NtaSJ9.q5rs7WMJE8oaBQdO4zEAcg';

  React.useEffect(() => {
    const processData = () => {
        let data = [];
        for(let i=0; i<response.length; i++){
            let item = response[i].response;

            for(let k=0; k<item.length; k++){
                let res = item[k];

                let chunk = { questionType: res.questionType, question: res.question, position: res.position, value: res.response };
                data.push(chunk);
            }
        }

        let arr = [];
        let arr2 = [];

        for(let i=0; i<data.length; i++){
            let item = data[i];

            if(item.questionType === "Multiple Choice"){
                if(!arr.includes(item.value)){
                    arr.push(item.value)
                }
                if(!arr2.includes(item.question)){
                    arr2.push(item.question);
                }
                setRadios(prevArr => ([...prevArr, item]));
            }
        }

        setLabels(arr);
        setQuestions(arr2);
    }

    processData();

  }, [response]);

  React.useEffect(() => {
    const preprocess = () => {
        let arr = [];

        for(let i=0; i<questions.length; i++){
            let q = questions[i];
            let total = 0;

            for(let k=0; k<radios.length; k++){
                if(radios[k].question === q){
                    total += 1;
                }
            }

            arr.push({question: q, total: total});

        }

        console.log(arr);
        setDestructuredQuestions(arr);
    }

    preprocess();
  }, [questions])

  const searchTotal = (question) => {
    if(question === ""){
        return -1;
    }

    let idx = destructuredQuestions.findIndex((obj => obj.question == question));
    if(idx !== -1){
        let obj = destructuredQuestions[idx];
        return obj.total
    } else {
        return -1
    }
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  React.useEffect(() => {
    const preprocess = () => {
        let arr = [];
        let pickedColors = [];
        const colors = ["red", "blue", "green", "orange", "pink", "teal", "cyan"]
        for(let i=0; i<labels.length; i++){
            let label = labels[i];
            let total = 0;

            let q = "";
            for(let k=0; k<radios.length; k++){
                q = radios[k].question;
                if(label === radios[k].value){
                    total += 1;
                }
            }
            let color = colors[randomNumber(0, colors.length -1)];

            if(pickedColors.includes(color)){

            }
            arr.push({label: label, question: q, color: color, total: total});
        }

        setStats(arr);
    }

    preprocess();
  }, [labels]);

  function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i].question === val)
            indexes.push(i);
    return indexes;
}


const HandleRingProgress = ({ q }) => {
    const indices = getAllIndexes(stats, q);
    const items = indices.map((item) => {
        let idx = item;
        return (
            <Group>
            <RingProgress size={80} roundCaps thickness={8} sections={[{ value: (stats[idx].total / searchTotal(q)) * 100, color: stats[idx].color}]} label={<Center><IconArrowRight /></Center>} />
            <div>
                <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                    {stats[idx].label}
                </Text>
                <Text weight={700} size="xl">
                    {stats[idx].total}
                </Text>
            </div>
            </Group>
        )
    })
    return (
        <>{items}</>
    )
}


const items = questions.map((itm, index) => {
    return (
        <Paper mb={20} withBorder radius="md" p="xs" key={itm+""+index}>
            <Group mb={20} position="apart">
                <Group position="left">
                    <Text >{itm}</Text>
                </Group>
                <Group position="right">
                    <Text size="xs">
                        {searchTotal(itm)}
                    </Text>
                </Group>
            </Group>

<HandleRingProgress q={itm} />
        </Paper>
    )
})
  const Map = ReactMapboxGl({
    accessToken: accessToken,
  });
  
  const retrieveDashboard = async () => {
    if(router.asPath !== router.route) {
        setPID(router.query.dashboardId);

        const body = {
            dashboardId: router.query.dashboardId
        };

        await fetch("/api/dashboards/getdashboard", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        }).then(async function(res){
            if(res.status === 200) {
                res = await res.json();
                setDashboard(res.dashboard);
                setFormID(res.dashboard.form_id);
                setReady(true);
            } else {
                console.error("An error occured...")
            }
        }).catch(function(error){
            console.error(error);
        })
    }
  }

  React.useEffect(() => {
    retrieveDashboard();
  }, [router]);

  const fetchdata = async () => {
    if(form_id === ""){
      return false;
    }

    const body = {
      form_id: form_id
    }

    await fetch('/api/getresponse', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    }).then( async function(res){
      if(res.status === 200){
        const data = await res.json();
        setResponse(data.response);
      } 
    }).catch(function(error) {
      console.log(error);
    })
  }

  React.useEffect(() => {
    fetchdata();
  }, [form_id]);

  const THEME_KEY = 'geopsy-collect-color-scheme';

  const { height, width } = useViewportSize();
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: THEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
  setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  useHotkeys([
    ['mod+J', () => toggleColorScheme()],
  ]);
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider
        theme={{ colorScheme, primaryColor: "blue", primaryShade: 9 }}
        withGlobalStyles
        withNormalizeCSS
      >
        {ready ? (
                <AppShell
                styles={{
                  main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                  },
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                navbar={
                    dashboard.statistics ? (
                    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                        <Text>Statistics</Text>
                      </Navbar>
                    ) : null
                }
                aside={
                    dashboard.charts ? (
                        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                        <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                            {items}
                        </Aside>
                      </MediaQuery>
                    ) : null
                }
                footer={
                    dashboard.footer ? (
                        <Footer height={60} p="md">
                        <Group position="apart">
                            <Group position="left">
                                <Anchor size="xs" href={"mailto:"+dashboard.username}>
                                &copy;{new Date().getFullYear() + dashboard.username.split("@")[0]}
                                </Anchor>
                            </Group>
                            <Group position="right">
                                {dashboard.nav2 ? (
                                    dashboard.footerLinks.map((item, index) => {
                                        return (
                                            <Anchor key={"footer-"+index} target="_blank" size="xs" href={item.href}>{item.label}</Anchor>
                                        )
                                    })
                                ) : null}
                            </Group>
                        </Group>
                      </Footer>
                    ) : null
                }
                header={
                    dashboard.header ? (
                        <Header height={70}>
                        <Group position="apart" style={{ height: '100%' }}>
                                <Group p="md" >
                                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                              opened={opened}
                              onClick={() => setOpened((o) => !o)}
                              size="sm"
                              color={theme.colors.gray[6]}
                              mr="xl"
                            />
                          </MediaQuery>
                          <Title>{dashboard.title}</Title>
                                </Group>

                                <Group pr={20} style={{height: '100%'}} >
                                    {dashboard.nav ? (
                                        dashboard.headerLinks.map((item, index) => {
                                            return (
                                                <Anchor key={"header-"+index} href={item.href} target="_blank" >{item.label}</Anchor>
                                            )
                                        })
                                    ) : null}

                <ActionIcon onClick={() => {toggleColorScheme()}} >
                    {theme.colorScheme === "dark" ? <Sun /> : <Moon />}
                  </ActionIcon>
                                </Group>
                        </Group>
                      </Header>
                    ) : null
                }
              >
                <Box sx={(theme) => ({height: dashboard.header && dashboard.footer ? height - 140 : dashboard.header ? height - 80 : dashboard.footer ? height - 70 : height})}>
                <Map
    style={colorScheme === "light" ? "mapbox://styles/mapbox/streets-v9" : "mapbox://styles/mapbox/dark-v10"}
    containerStyle={{
      height: '100%',
      width: '100%'
    }}
  >
  </Map> 
                </Box>
              </AppShell>
        ) : (

            <Center mt="20%" >
                <Loader variant="bars" />
            </Center>
        )}
    </MantineProvider>
      </ColorSchemeProvider>
  );
}

export default function IndexPage(){
    return (
        <UserDashboard />
    )
}