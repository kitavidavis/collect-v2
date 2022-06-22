import React, { useEffect, useState} from 'react';
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
  Button,
  Tabs,
  ActionIcon,
  Menu,
  UnstyledButton,
  Tooltip,
  TextInput,
  Breadcrumbs,
  Anchor,
  Title,
  Paper,
  Badge
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { Activity, Search, ChevronDown, Friends, Bell, LayoutDashboard, Folder, DotsVertical, Database, DeviceLaptop, ShieldLock, UserCircle, Plus, Point, InfoCircle, DotsCircleHorizontal, Dots } from 'tabler-icons-react';
import { ThemeProvider } from 'theme-ui';
import Router from 'next/dist/next-server/server/router';
import theme from 'theme';
import SEO from 'components/seo';
import { useUser } from 'lib/hooks';
import * as d3 from 'd3';
import LoadingView from 'shared/loading';
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

  group: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
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
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: 'none',
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingRight: theme.spacing.md,
  },

  collectionLink: {
    display: 'block',
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  headerLink: {
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 700,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
  title: {
    color: '#228BE6',
    fontWeight: 300,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export default function Dashboard(){
    const user = useUser({ redirectTo: '/auth/login' })
    const [active, setActive] = useState('aggregate');
    const Layout = () => {
      const theme = useMantineTheme();
      const { classes } = useStyles();
      const [opened, setOpened] = useState(false);
      const { height, width} = useViewportSize();
      const w = 200
      const items = [
        { title: "David's Organization", href: '#' },
        { title: 'Project 0', href: '#' },
      ].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));

      const createReadWriteGraph = async () => {
        let data = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
        let parseTime = d3.timeParse("%Y-%m-%d");
        data.forEach((d) => {
          d.date = parseTime(d.date);
          d.value = +d.value;
        });

        var margin = { top: 10, right: 10, bottom: 20, left: 20 },
        width =  w - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

        var svg = d3.select("#read-write-graph").append("svg").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        x.domain(d3.extent(data, (d) => { return d.date; }));
        y.domain([0, d3.max(data, (d) => { return d.value; })]);
        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
        svg.append("g")
        .call(d3.axisLeft(y));

        var valueLine = d3.line()
        .x((d) => { return x(d.date); })
        .y((d) => { return y(d.value); });
        svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine)
      }

      const createConnectionsGraph = async () => {
        let data = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
        let parseTime = d3.timeParse("%Y-%m-%d");
        data.forEach((d) => {
          d.date = parseTime(d.date);
          d.value = +d.value;
        });

        var margin = { top: 10, right: 10, bottom: 20, left: 20 },
        width =  w - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

        var svg = d3.select("#connections").append("svg").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        x.domain(d3.extent(data, (d) => { return d.date; }));
        y.domain([0, d3.max(data, (d) => { return d.value; })]);
        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
        svg.append("g")
        .call(d3.axisLeft(y));

        var valueLine = d3.line()
        .x((d) => { return x(d.date); })
        .y((d) => { return y(d.value); });
        svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine)
      }

      const createInOutGraph = async () => {
        let data = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
        let parseTime = d3.timeParse("%Y-%m-%d");
        data.forEach((d) => {
          d.date = parseTime(d.date);
          d.value = +d.value;
        });

        var margin = { top: 10, right: 10, bottom: 20, left: 20 },
        width =  w - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

        var svg = d3.select("#in-out").append("svg").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        x.domain(d3.extent(data, (d) => { return d.date; }));
        y.domain([0, d3.max(data, (d) => { return d.value; })]);
        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
        svg.append("g")
        .call(d3.axisLeft(y));

        var valueLine = d3.line()
        .x((d) => { return x(d.date); })
        .y((d) => { return y(d.value); });
        svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine)
      }

      const createSizeGraph = async () => {
        let data = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
        let parseTime = d3.timeParse("%Y-%m-%d");
        data.forEach((d) => {
          d.date = parseTime(d.date);
          d.value = +d.value;
        });
        console.log(w)

        var margin = { top: 10, right: 10, bottom: 20, left: 20 },
        width =  w - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

        var svg = d3.select("#size").append("svg").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        x.domain(d3.extent(data, (d) => { return d.date; }));
        y.domain([0, d3.max(data, (d) => { return d.value; })]);
        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
        svg.append("g")
        .call(d3.axisLeft(y));

        var valueLine = d3.line()
        .x((d) => { return x(d.date); })
        .y((d) => { return y(d.value); });
        svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine)
      }

      React.useEffect(() => {
        createReadWriteGraph();
        createConnectionsGraph();
        createInOutGraph();
        createSizeGraph();
      }, []);
    
      return (
        <AppShell
          styles={{
            main: {
              background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : 'white',
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          fixed
          navbar={
            <Navbar style={{left: 0}} p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 250 }}>
                            <Navbar.Section className={classes.section}>
<Group className={classes.collectionsHeader} position="apart">
          <Menu control={<Button variant='subtle' color='dark' rightIcon={<ChevronDown size={13} />} leftIcon={<Folder fill={theme.colors.gray[8]} size={15}  />}>Project 0</Button>} >
            <Group m={10} >
            <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className={classes.collectionLink}
    >
       Project 0
    </a>
            </Group>
          </Menu>
          <Tooltip label="Project Configurations" withArrow position="right">
            <ActionIcon>
              <Menu control={<ActionIcon><DotsVertical size={12} /></ActionIcon>} >
            <Menu.Item >Project Settings</Menu.Item>
            <Menu.Item >Project Support</Menu.Item>
            <Menu.Item >Integrations</Menu.Item>
            </Menu>
            </ActionIcon>
          </Tooltip>
        </Group>
        </Navbar.Section>
              <Navbar.Section className={classes.section}>
    <UnstyledButton style={{cursor: 'text'}} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <Database size={20} className={classes.mainLinkIcon} />
        <span>DEPLOYMENT</span>
      </div>
    </UnstyledButton>
    <div className={classes.collections}>
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className={classes.collectionLink}
    >
       Clusters
    </a>
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className={classes.collectionLink}
    >
       Data Response
    </a>
    </div>
    </Navbar.Section>

    <Navbar.Section className={classes.section}>
    <UnstyledButton style={{cursor: 'text'}} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <DeviceLaptop size={20} className={classes.mainLinkIcon} />
        <span>DATA SERVICES</span>
      </div>
    </UnstyledButton>
    <div className={classes.collections}>
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className={classes.collectionLink}
    >
       Triggers
    </a>
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className={classes.collectionLink}
    >
       Data APIs
    </a>
    </div>
    </Navbar.Section>

    <Navbar.Section className={classes.section}>
    <UnstyledButton style={{cursor: 'text'}} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <ShieldLock size={20} className={classes.mainLinkIcon} />
        <span>SECURITY</span>
      </div>
    </UnstyledButton>
    <div className={classes.collections}>
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className={classes.collectionLink}
    >
       Cluster Access
    </a>
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className={classes.collectionLink}
    >
       Network Access
    </a>
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className={classes.collectionLink}
    >
       Advanced
    </a>
    </div>
    </Navbar.Section>
    <Navbar.Section className={classes.section}>
    <UnstyledButton style={{cursor: 'text'}} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <UserCircle size={20} className={classes.mainLinkIcon} />
        <span>ACCOUNT</span>
      </div>
    </UnstyledButton>
    <div className={classes.collections}>
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className={classes.collectionLink}
    >
       Help
    </a>
    <a
      href="/api/logout"
      className={classes.collectionLink}
    >
       Logout
    </a>
    </div>
    </Navbar.Section>
            </Navbar>
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
                <p>GeoPsy</p>
                <Button leftIcon={<LayoutDashboard size={15} />} rightIcon={<ChevronDown size={15}  />} variant='default'>
                  David's organization
                </Button>
                <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Button className={classes.headerLink} variant='white' color={'dark'} rightIcon={<ChevronDown size={15}  />}>
              Access Manager
            </Button>
            </MediaQuery>
            <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Button className={classes.headerLink} variant='white' color={'dark'} >
              Billing
            </Button>
            </MediaQuery>
                </Group>
                <Group>
                <Group ml={50} spacing={5} className={classes.links}>
                <Button className={classes.headerLink} variant='white' color={'dark'}>
              Clusters
            </Button>

              </Group>
                </Group>
              </div>
            </Header>
          }
        >
          <Group className={classes.group} direction='row' style={{overflowX: 'auto'}} position='apart'>
            <Group direction='row' position='left'>
            <a
      href="#"
      onClick={() => setActive('aggregate')}
      style={{color: active === 'aggregate' ? theme.colors.gray[9] : theme.colors.gray[7]}}
      className={classes.collectionLink}
    >
       Aggregate
    </a>
    <a
      href="#"
      onClick={() => setActive('build')}
      style={{color: active === 'build' ? theme.colors.gray[9] : theme.colors.gray[7]}}
      className={classes.collectionLink}
    >
       Build
    </a>
    <a
      href="#"
      onClick={() => setActive('charts')}
      style={{color: active === 'charts' ? theme.colors.gray[9] : theme.colors.gray[7]}}
      className={classes.collectionLink}
    >
       Charts
    </a>
            </Group>
            <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Group direction='row' position='right'>
              <ActionIcon title='Invite to project'>
                <Friends size={19} />
              </ActionIcon>
              <ActionIcon title='Project activity feed'>
                <Activity size={19} />
              </ActionIcon>
              <ActionIcon title='Project alerts'>
                <Bell size={19} />
              </ActionIcon>
            </Group>
            </MediaQuery>
          </Group>
          <Group mt={10}>
          <Breadcrumbs separator=">">{items}</Breadcrumbs>
          </Group>
          <Group mt={10}>
          <Title order={2} className={classes.title} align="center">
          Clusters Deployed
        </Title>
          </Group>
          <Group mt={20}>
          <TextInput placeholder="Search clusters" icon={<Search size={14} />} />
          </Group>
          <Paper radius={'lg'} style={{}} mt={20} shadow='md' p={'md'} >
            <Group position='apart' className={classes.group} >
            <Group position='left' mb={20} >
              <Anchor href='#'>
                Turkana
              </Anchor>
              <Button radius={20} color={'dark'} variant='outline'>
                Connect
              </Button>
              <Button radius={20} color={'dark'} variant='outline'>
                View Monitoring
              </Button>
              <Button radius={20} color={'dark'} variant='outline'>
                Browse Forms
              </Button>
              <Button radius={20} color={'dark'} variant='outline'>
                <Menu control={<ActionIcon><Dots /></ActionIcon>} >
                  <Menu.Item>Edit Configuration </Menu.Item>
                  <Menu.Item>Load Sample Dataset</Menu.Item>
                  <Menu.Item>Terminate Cluster</Menu.Item>
                </Menu>
              </Button>
              </Group>
              <Group position='right' mb={20}>
                <Badge>Shared with me</Badge>
              </Group>
            </Group>
            <Group position='apart'>
              <Group direction='column' >
                <Group direction='row' position='apart'>
                <Group position='left'>
                <Text size='xs' >R: 0</Text>
                </Group>
                <Group position='right'>
                <Tooltip label="GeoPsy Collect read and write operations to the cluster">
                  <ActionIcon>
                    <InfoCircle size={14} />
                  </ActionIcon>
                </Tooltip>
                </Group>
                </Group>
                <Text size='xs' >W: 0</Text>
              <div id='read-write-graph'></div>
              </Group>
             <Group direction='column'>
              <Group mb={30} direction='row' position='apart'>
              <Group position='left'>
                <Text size='xs' >Connections: 0</Text>
                </Group>
                <Group position='right'>
                <Tooltip label="The number of active connections to the cluster">
                  <ActionIcon>
                    <InfoCircle size={14} />
                  </ActionIcon>
                </Tooltip>
                </Group>
              </Group>
              <div id='connections'></div>
             </Group>
             <Group direction='column'>
              <Group direction='column'>
              <Group direction='row'>
              <Text size='xs' >In: 0 b/s</Text>
              <Tooltip label="Network bytes send to/from the cluster">
                  <ActionIcon>
                    <InfoCircle size={14} />
                  </ActionIcon>
                </Tooltip>
              </Group>
              <Text size='xs' >Out: 0 b/s</Text>
              </Group>
              <div id='in-out'></div>
             </Group>
             <Group direction='column'>
             <Group mb={30} direction='row' position='apart'>
              <Group position='left'>
                <Text size='xs' >Data Size: 0 MB</Text>
                </Group>
                <Group position='right'>
                <Tooltip label="Logical disk size">
                  <ActionIcon>
                    <InfoCircle size={14} />
                  </ActionIcon>
                </Tooltip>
                </Group>
              </Group>
              <div id='size'></div>
              </Group>
            </Group>
          </Paper>
        </AppShell>
      );
    }

    return (
        <ThemeProvider theme={theme}>
        <SEO
          title="Forms | Cloud: GeoPsy Collect Cloud"
          description="An open source geospatial data collection toolkit suited for research, science, ecosystem conservation and much more"
        />
          <Layout />
        </ThemeProvider>
    )
}