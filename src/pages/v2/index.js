import React, { useEffect, useRef, useState} from 'react';
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
  Badge,
  SimpleGrid,
  Switch,
  List,
  Grid,
  Box,
  NumberInput,
  Select,
  MultiSelect,
  Slider,
  Code,
  InputWrapper,
  Stepper,
  Checkbox,
  Textarea,
  Loader,
  Avatar,
  UnstyledButtonProps,
  useMantineColorScheme,
  Drawer,
  Divider,
  Table,
  ScrollArea,
  Card,
  Modal,
  ThemeIcon,
  JsonInput,
  Center,
  Popover,
  CloseButton,
  Indicator,
} from '@mantine/core';
import { useViewportSize, useHash, useWindowScroll, useScrollIntoView, useClipboard, randomId } from '@mantine/hooks';
import { Activity, ChevronRight, Bulb,User, Search, ChevronDown, Friends, Bell, LayoutDashboard, Folder, DotsVertical, Database, DeviceLaptop, ShieldLock, UserCircle, Plus, Point, InfoCircle, DotsCircleHorizontal, Dots, Strikethrough, ClearFormatting, Numbers, Selector, Checklist, Clock, Calendar, Star, Photo, Speakerphone, Video, Location, Line, Polygon, Calculator, Edit, Copy, Trash, ArrowBack, AdjustmentsHorizontal, Microphone, File, Check, UserCheck, ShieldCheck, CircleCheck, ColorPicker, Signature, Adjustments, ChartBar, FileDatabase, Network, Help, Logout, UserPlus, Tool, Sun, Moon, ChevronUp, BrandCodesandbox, X, TableExport, Filter, Eye, ExternalLink, Download, Refresh, ChartArea, ArrowLeft, AlertTriangle, ChartDonut, Settings, Books, Crosshair, Drone, Tools } from 'tabler-icons-react';
import { ThemeProvider } from 'theme-ui';
import AvaterImage from 'assets/illustrations/215.png'
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import Router from 'next/dist/next-server/server/router';
import theme from 'theme';
import SEO from 'components/seo';
import { useRouter } from 'next/router';
import { useUser } from 'lib/hooks';
import { uuid } from 'uuidv4';
import * as d3 from "d3";
import serverRack from 'assets/images/blue-logo.png';
import Image  from 'components/image';
import { Bar } from 'react-chartjs-2';
import { TableIcon } from '@modulz/radix-icons';
import ReactMapboxGl, { Layer, Feature, Marker, Source, GeoJSONLayer } from 'react-mapbox-gl';
import { showNotification } from '@mantine/notifications';
var BarChart = require('react-d3-components').BarChart;
var PieChart = require('react-d3-components').PieChart;
import 'mapbox-gl/dist/mapbox-gl.css';
import LoaderCard from 'components/loaders/bolt';
import Pin from 'components/pin';
import dynamic from "next/dynamic";
import { IoMdSync } from 'react-icons/io';

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

const accessToken = 'pk.eyJ1IjoiZGF2aXNraXRhdmkiLCJhIjoiY2w0c2x2NjNwMGRvbDNrbGFqYW9na2NtaSJ9.q5rs7WMJE8oaBQdO4zEAcg';


export const useStyles = createStyles((theme, _params, getRef) => {
const icon = getRef('icon');
return {
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
        header: {
          paddingLeft: theme.spacing.md,
          paddingRight: theme.spacing.md,
        },
      
        inner: {
          height: 34,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },

        tableHeader: {
          position: 'sticky',
          top: 0,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          transition: 'box-shadow 150ms ease',
      
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `1px solid ${
              theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
            }`,
          },
        },
      
        scrolled: {
          boxShadow: theme.shadows.sm,
        },
      
        links: {
          [theme.fn.smallerThan('md')]: {
            display: 'none',
          },
        },
      
        linkActive: {
          '&, &:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                : theme.colors[theme.primaryColor][0],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
            [`& .${icon}`]: {
              color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
            },
          },
        },
        user: {
          display: 'block',
          width: '100%',
          padding: theme.spacing.md,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      
          '&:hover': {
            backgroundColor: 'transparent'
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

  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,

  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: "white"
  },

  mainLinkText: {
    color: "white"
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: 'none',
    //color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[6],

  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
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
        trashBtn: {
          '&:hover': {
            color: 'red'
          },
        },
      
        headerLink: {
          padding: `8px ${theme.spacing.xs}px`,
          textDecoration: 'none',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
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
}
});



function Dashboard(){
    useUser({ redirectTo: '/auth/login' });
    const router = useRouter();
    const user2 = useUser();
    const [linkactive, setLinkActive] = useState('Forms');
    const [hash, setHash] = useHash();
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('Clusters');
    const [userforms, setUserForms] = useState([]);
    const [response, setResponse] = useState([]);
    const [done, setDone] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [active, setActive] = useState('aggregate');
    const [cluster, setCluster] = useState('');
    const [clusterid, setClusterID] = useState('');
    const [activetab, setActiveTab] = useState(0);
    const [ctx, setCTX] = useState([]);
    const [activeid, setActiveId] = useState('');
    const [item, setItems] = useState([]);
    const [visopen, setVisOpen] = useState(false);
    const [paper, setPaper] = useState(true);
    const [menuopen, setMenuOpen] = useState({
      form_id: null,
      state: false
    });
    const { height, width } = useViewportSize();

    const handleCluster = (str, id) => {
      let newItems = item.concat([{title: str, href: '#'}])
      let idx = userforms.findIndex((obj => obj.form_id == id));
      let ctx = userforms[idx];
      setCTX(ctx);
      setItems(newItems);
      setCluster(str);
      setClusterID(id);

      setMenuOpen({
        form_id: '',
        state: false
      });

      setActiveId(id);
    }


    const navlinks = [
      { icon: FileDatabase, label: 'Forms', href: '/v2/', notifications: userforms.length },
      { icon: LayoutDashboard, label: 'Dashboards and Charts', href: '#'},
      { icon: Crosshair, label: 'Survey Automation', href: '#' },
      { icon: Drone, label: 'UAV Data', href: '#' },
      { icon: BrandCodesandbox, label: 'API keys', href: '#'},
      { icon: Tools, label: "Configure", href: "#" },
      { icon: Settings, label: 'Settings', href: '#' },
      { icon: Books, label: 'Documentation', href: 'https://geopsy-collect.gitbook.io/home/', target: "_blank" },
      { icon: User, label: "Account", href: "#"},
      { icon: Logout, label: 'Logout', href: '/api/logout' },
    ];

    React.useEffect(() => {
      setDone(false);
      const fetchdata = async () => {
        if(user2 === null){
          return false;
        }

        const body = {
          user_id: user2? user2.user._id : ''
        }

        await fetch('/api/getAllUserForms', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        }).then( async function(res){
          if(res.status === 200){
            const data = await res.json();
            if(user2.user !== null && user2.user !== undefined){
              setFirstname(user2.user.firstname);
              setLastName(user2.user.lastname)
              setEmail(user2.user.username)
            }
            setUserForms(data.forms.reverse());
            setDone(true);
          } 
        }).catch(function(error) {
          console.log(error);
        })
      }

        fetchdata();
    }, [user2]);

    React.useEffect(()=> {
      setHash("app/instanceid?"+randomId().split("").splice(8).join(""))
    }, [])

    React.useEffect(() => {
      const fetchdata = async () => {
        if(user2 === null){
          return false;
        }

        const body = {
          form_id: ctx.form_id
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
      
      if(activeid !== ''){
        fetchdata();
      }
    }, [ctx]);

    const sortArr = (arr) => {
      return arr.sort((a, b) => {
        return a.position - b.position;
      });
    }

    

    const Layout = () => {
      const theme = useMantineTheme();
      const [query, setQuery] = useState('');
      const [query2, setQuery2] = useState('');
      const { classes } = useStyles();
      const [opened, setOpened] = useState(false);
      const [drawer, setDrawer] = useState(false);
      const [image, setImage] = useState('');
      const [imagemodal, setImageModal] = useState(false);
      const [geommodal, setGeomModal] = useState(false);
      const [geomtype, setGeomType] = useState('');
      const [coords, setCoords] = useState(null);
      const [center, setCenter] = useState([])

      const [datatheme, setDataTheme] = useState(theme.colorScheme === "dark" ? "threezerotwofour" : "bright:inverted");
      const [objectsize, setObjectSize] = useState(true);
      const [editable, setEditable] = useState(true);
      const [deletable, setDeletable] = useState(true);
      const [clonable, setClonable] = useState(true);
      const [collapsed, setCollapsed] = useState(true);
      const [datatypes, setDatatypes] = useState(true);
      const { colorScheme, toggleColorScheme } = useMantineColorScheme();

      const mainLinks = navlinks.filter(item => {
        if(query2 === '') {
          return item;
        } else if(item.label.toLocaleLowerCase().includes(query2.toLocaleLowerCase())){
          return item;
        }
      }).map((link) => (
        <UnstyledButton mt={10} onClick={() => {setLinkActive(link.label)}} component="a" href={link.href} target={link.target? link.target : "_parent"} key={link.label} className={classes.mainLink}>
          <div className={classes.mainLinkInner}>
          <link.icon size={20} className={classes.mainLinkIcon} />
            <span className={classes.mainLinkText}>{link.label}</span>
          </div>
          {link.notifications && (
            <Badge size="sm" variant="filled" color='yellow' className={classes.mainLinkBadge}>
              {link.notifications}
            </Badge>
          )}
        </UnstyledButton>
      ));

      const Map = ReactMapboxGl({
        accessToken: accessToken,
      });

      const hideImage = () => {
        setImage("")
        setImageModal(false);
      }


      const hideMap = () => {
        setGeomModal(false);
        setGeomType('');
        setCoords(null);
      }

      const parseArr = (arr) => {
        let parsedArr = [];
        for(let j=0; j<arr.length; j++){
          let item = arr[j].response;
          let itm = arr[j];

          for(let i=0; i<item.length; i++){
            let qType = item[i].questionType;
            let chunk = {position: item[i].position, createdAt: itm.createdAt, questionType: qType, required: item[i].required ? "Yes" : "No", question: item[i].question, response: qType === 'Point' || qType === 'Polyline' || qType === 'Polygon' ? JSON.stringify(item[i].response) : item[i].response}
            parsedArr.push(chunk);
          }
        }

        return parsedArr;
      }

      function convertToCSV(arr) {
        const array = [Object.keys(arr[0])].concat(arr)
      
        return array.map(it => {
          return Object.values(it).toString()
        }).join('\n')
      }

      const downloadCSV = () => {
        let res = parseArr(response);
        let csv = convertToCSV(res);

        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "GeoPsyCollect-"+new Date()+".csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }

      const downloadJSON = () => {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response, null, 2));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "GeoPsyCollect-"+new Date()+".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }


      const deleteForm = async (form_id) => {
        const body = {
          form_id: form_id
        };

        setMenuOpen({
          form_id: '',
          state: false
        });

        try {
          await fetch('/api/deleteform', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
          }).then(async  function(res){
            if(res.status === 200){
              await fetch('/api/deleteallformresponse', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
              }).then(function(res){
                if(res.status === 200){
                  let idx = userforms.findIndex((obj => obj.form_id == form_id));
                  if(idx != -1){
                    userforms.splice(idx, 1);
                  }
          
                  setUserForms([...userforms]);
                }
              })
            }
          });
        } catch(error){
          console.log(error);
        }
      }

      const activateForm = async () => {
        const body = {
          form_id: activeid
        };

        setMenuOpen({
          form_id: '',
          state: false
        });

        try {
          await fetch('/api/activateform', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
          }).then(function(res) {
            if(res.status == 200){
              let idx = userforms.findIndex((obj => obj.form_id == activeid));
              let q = userforms[idx];

              q.active = true;

              setUserForms([...userforms]);
      
            }
          })
        } catch(error) {
          console.log(error);
        }
      }

      const deactivateForm = async () => {
        const body = {
          form_id: activeid
        };

        setMenuOpen({
          form_id: '',
          state: false
        });

        try {
          await fetch('/api/deactivateform', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
          }).then(function(res) {
            if(res.status == 200){
              let idx = userforms.findIndex((obj => obj.form_id == activeid));
              let q = userforms[idx];

              q.active = false;

              setUserForms([...userforms]);
      
            }
          })
        } catch(error) {
          console.log(error);
        }
      }

      const handleMenuClick = (id, state) => {
        setMenuOpen({
          form_id: id,
          state: state
        });
        setActiveId(id);
      }
     
      return (
        <AppShell
          styles={{
            main: {
              background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          fixed
          navbar={
              <MediaQuery smallerThan="md" styles={{display: 'none'}}>
              <Navbar style={{left: 0, top: 0,height: height, backgroundColor: "#002244"}} p="md" hiddenBreakpoint="sm" hidden={!opened} className={classes.navbar} width={{ sm: 250}}>
        <Navbar.Section className={classes.section} >
        <UnstyledButton style={{backgroundColor: 'transparent'}} className={classes.user}>
      <Group  position='apart' >
        <Avatar src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} radius="xl" />

        <div style={{ flex: 1 }}>
        <Text className={classes.mainLinkText} align='center' mb={10} weight={500}>
            {email}
          </Text>
          <Center>
          <Badge  color='yellow' size='xs' style={{textTransform: 'lowercase'}} >Beta release</Badge>
          </Center>
        </div>

      </Group>
    </UnstyledButton>
      </Navbar.Section>
        <TextInput
        placeholder="Search"
        size="xs"
        value={query2}
        onChange={(e) => {setQuery2(e.currentTarget.value)}}
        icon={<Search size={12} />}
        rightSectionWidth={70}
        styles={{input: {backgroundColor: 'white', color: 'black'}}}
        mb="sm"
      />
        <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>
            </Navbar>
              </MediaQuery>
          }

          header={
            <Header className={classes.header} style={{ backgroundColor: "#002244"}} height={60} p="md">
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
                </Group>
                <Group>
                <Group ml={50} spacing="lg" className={classes.links}>
                  <Indicator color="yellow" label={3} overflowCount={10} inline size={22}>
                    <Bell color='white' />
                  </Indicator>
                  <ActionIcon style={{backgroundColor: 'transparent'}} onClick={() => {toggleColorScheme()}} >
                    {theme.colorScheme === "dark" ? <Sun color='white' /> : <Moon color='white' />}
                  </ActionIcon>
              </Group>
                </Group>
              </div>
            </Header>
          }
        >
                <Drawer onClose={() => {setOpened(false)}} opened={opened}>
                <Navbar style={{left: 0, bottom: 0, top: 0,height: height, backgroundColor: "#002244"}} p="md" hiddenBreakpoint="sm" hidden={!opened} className={classes.navbar} width={{ sm: 250}}>
        <Navbar.Section className={classes.section} >
        <UnstyledButton style={{backgroundColor: 'transparent'}} className={classes.user}>
      <Group  position='apart' >
          <Group>
          <Avatar src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} radius="xl" />

        <div style={{ flex: 1 }}>
        <Text className={classes.mainLinkText} align='center' mb={10} weight={500}>
            {email}
          </Text>
          <Center>
          <Badge  color='yellow' size='xs' style={{textTransform: 'lowercase'}} >Beta release</Badge>
          </Center>
        </div>
        </Group>

        <Group position='right'>
          <ActionIcon onClick={() => {setOpened(false)}} >
            <X />
          </ActionIcon>
        </Group>

      </Group>
    </UnstyledButton>
      </Navbar.Section>
        <TextInput
        placeholder="Search"
        size="xs"
        value={query2}
        onChange={(e) => {setQuery2(e.currentTarget.value)}}
        icon={<Search size={12} />}
        rightSectionWidth={70}
        styles={{input: {backgroundColor: 'white', color: 'black'}}}
        mb="sm"
      />
        <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>
            </Navbar>
                </Drawer>

            {active === 'aggregate' ? (
              cluster === '' ? (
                <>

              <Group position='apart' mt={10}>
              <Title order={2} className={classes.title} align="center">
               Forms
            </Title>
            <Group position='right' mb={10}>
            <Button color='yellow'  component='a' href='/v2/build' title='Add New Form' radius={28}>
                  <Plus />
                </Button>
                <Anchor target="_blank" href='https://geopsy-collect.gitbook.io/home/forms'>
                  Learn more about XLSForms
                </Anchor>
            </Group>
              </Group>
              <Group mt={10} grow>
                <TextInput onChange={(e) => {setQuery(e.currentTarget.value)}} value={query} placeholder='Search forms...' rightSection={<Search />} />
              </Group>
                {done ? (
                            userforms.length > 0 ? 
                              
                                 (
                                  <>
                                      {paper ? (
                                    <Paper mb={10} mt={20} ml="5%" mr={"5%"} shadow="xs" p="md">
                                    <Group position='apart' mb={10}>
                                    <Text color='yellow' >QGIS Plugin</Text>
                                    <CloseButton onClick={() => {setPaper(false)}} />
                                    </Group>
                                    <Text>
                                      Hey there, we are rolling out QGIS plugin for Collect. <Anchor href='#'>Learn more.</Anchor>
                                    </Text>
                                  </Paper>
                                  ) : null}
                                  <div style={{overflowX: 'auto'}}>
                                  <Table mt={20} highlightOnHover >
                                    <thead>
                                      <tr >
                                        <th style={{whiteSpace: 'nowrap'}}>Form Name</th>
                                        <th style={{whiteSpace: 'nowrap'}}>Description</th>
                                        <th style={{whiteSpace: 'nowrap'}}>Status</th>
                                        <th style={{whiteSpace: 'nowrap'}}>Created At</th>
                                        <th style={{whiteSpace: 'nowrap'}}>Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {userforms.filter(item => {
                                        if(query === ''){
                                          return item;
                                        } else if(item.title.toLowerCase().includes(query.toLowerCase())) {
                                          return item;
                                        }
                                      }).map((item, index) => {
                                        return (
                                          <tr title='Double click to open' onDoubleClick={() => {handleCluster(item.title, item.form_id)}}   key={index} >
                                            <td>{item.title}</td>
                                            <td>{item.description === 'Form description' ? 'N/A' : item.description}</td>
                                            <td>{item.active ? <Badge size='xs' >Active</Badge> : <Badge size='xs' color='red' >Inactive</Badge>}</td>
                                            <td>{item.createdAt}</td>
                                            <td>
                                              
                                                <Menu onClick={() => {handleMenuClick(item.form_id, !menuopen.state)}} opened={menuopen.state && menuopen.form_id == item.form_id} >
                                                  <Menu.Label>Manage Form</Menu.Label>
                                                  <Menu.Item icon={<Eye size={13} />} component='a' href={`/${item.form_id}`} target="_blank" >View Form</Menu.Item>
                                                  <Menu.Item onClick={() => {handleCluster(item.title, item.form_id)}}  icon={<TableIcon size={13} />}>Response</Menu.Item>
                                                  <Menu.Item icon={<Edit size={13}  />}>Edit</Menu.Item>
                                                  {item.active ? <Menu.Item onClick={() => {deactivateForm()}} icon={<X size={13}  />} >Deactivate Form</Menu.Item> : <Menu.Item onClick={() => {activateForm()}}  icon={<Check size={13}  />} >Activate Form</Menu.Item>}
                                                  <Divider />
                                                  <Menu.Label>Be Careful</Menu.Label>
                                                  <Menu.Item onClick={() => {deleteForm(item.form_id)}} icon={<Trash color='red' size={13}  />} >Delete</Menu.Item>
                                                </Menu>
              
                                            </td>
                                          </tr>
                                        )
                                      })}
                                    </tbody>
                                  </Table>
                                  </div>
                                </>
                                )
                               : (
                                <Group position='center' mt={'10%'}>
                                  <Group direction='column'>
                                  <Text>You have 0 active forms</Text>
                                  <Button leftIcon={<Plus />} component="a" href='/v2/build'>Create New Form</Button>
                                  </Group>
                                </Group>
                              )
                ) : (
                  <Group position='center' mt={'10%'}>
                    <Loader variant='dots' color='dark' />
                  </Group>
                )}
              </>
  ) : (
    <>
    <Group>
      <ActionIcon onClick={() => {setCluster('')}} title='Go Back' >
        <ArrowLeft size={20} />
      </ActionIcon>
    </Group>
    <Group>
    <Title mb={20} order={2} className={classes.title} align="center">
    {cluster}
  </Title>
  </Group>
      {response.length > 0 ? (
              <>
                <Group mb={20} position='apart'>
                <Group position='left'>
                <Text color='dimmed'>Total:<strong>{response.length}</strong></Text>
                </Group>
                <Group position='right'>
                  <Select data={[
                    {label: 'Apathy', value: 'apathy'},
                    {label: 'Apathy:inverted', value: 'apathy:inverted'},
                    {label: 'Ashes', value: 'ashes'},
                    {label: 'Bespin', value: 'bespin'},
                    {label: 'brewer', value: 'brewer'},
                    {label: 'bright', value: 'bright'},
                    {label: 'bright:inverted', value: 'bright:inverted'},
                    {label: 'chalk', value: 'chalk'},
                    {label: 'codeschool', value: 'codeschool'},
                    {label: 'colors', value: 'colors'},
                    {label: 'eighties', value: 'eighties'},
                    {label: 'embers', value: 'embers'},
                    {label: 'flat', value: 'flat'},
                    {label: 'google', value: 'google'},
                    {label: 'grayscale', value: 'grayscale'},
                    {label: 'grayscale:inverted', value: 'grayscale:inverted'},
                    {label: 'greenscreen', value: 'greenscreen'},
                    {label: 'harmonic', value: 'harmonic'},
                    {label: 'hopscotch', value: 'hopscotch'},
                    {label: 'isotope', value: 'isotope'},
                    {label: 'marrakesh', value: 'marrakesh'},
                    {label: 'mocha', value: 'mocha'},
                    {label: 'monokai', value: 'monokai'},
                    {label: 'ocean', value: 'ocean'},
                    {label: 'paraiso', value: 'paraiso'},
                    {label: 'pop', value: 'pop'},
                    {label: 'railscasts', value: 'railscasts'},
                    {label: 'default', value: 'rjv-default'},
                    {label: 'shapeshifter', value: 'shapeshifter'},
                    {label: 'shapeshifter:inverted', value: 'shapeshifter:inverted'},
                    {label: 'solarized', value: 'solarized'},
                    {label: 'summerfruit', value: 'summerfruit'},
                    {label: 'summerfruit:inverted', value: 'summerfruit:inverted'},
                    {label: 'threezerotwofour', value: 'threezerotwofour'},
                    {label: 'tomorrow', value: 'tomorrow'},
                    {label: 'tube', value: 'tube'},
                    {label: 'twilight', value: 'twilight'}
                  ]} value={datatheme} onChange={(val) => {setDataTheme(val)}} placeholder="Data Theme" />
                <Checkbox checked={objectsize} onChange={(e) => {setObjectSize(e.currentTarget.checked)}} label="Display Object Size" />
                <Checkbox checked={editable} onChange={(e) => {setEditable(e.currentTarget.checked)}} label="Editable" />
                <Checkbox checked={deletable} onChange={(e) => {setDeletable(e.currentTarget.checked)}} label="Deletable" />
                <Checkbox checked={clonable} onChange={(e) => {setClonable(e.currentTarget.checked)}} label="Clonable" />
                <Checkbox checked={collapsed} onChange={(e) => {setCollapsed(e.currentTarget.checked)}} label="Collapsed" />
                <Checkbox checked={datatypes} onChange={(e) => {setDatatypes(e.currentTarget.checked)}} label="Show Data types" />
                <Menu control={<Button disabled={response.length > 0 ? false : true} compact variant='subtle'>Export</Button>}>
                  <Menu.Item onClick={() => {downloadCSV()}}>CSV</Menu.Item>
                  <Menu.Item onClick={() => {downloadJSON()}}>JSON</Menu.Item>
                </Menu>
                </Group>
              </Group>
              
          <ScrollArea style={{height: height - 250  }} >
          {response.map((item, index) => {
            return (
              <Paper p="md" ml="10%" mr="10%" mb={15} key={index}>
                <Group mb={5} grow>
                <Text size='xs' ><strong>Response Id:</strong> <span style={{color: '#D9480F'}}>{'ObjectId("'+item.response_id+'")'}</span></Text>
                </Group>
                <DynamicReactJson theme={datatheme} onAdd={(e) => {
                  console.log(e);
                }} onDelete={deletable ?  e => {
                          console.log(e);
                      } : false} onEdit={editable ?  e => {
                          console.log(e);
                      } : false} enableClipboard={clonable} indentWidth={10} collapseStringsAfterLength={20} collapsed={collapsed} displayDataTypes={datatypes} displayObjectSize={objectsize} iconStyle='circle' src={sortArr(item.response)} />
      
                <Modal opened={imagemodal} onClose={() => {hideImage()}} centered withCloseButton={false}>
                    <img src={image} width='100%' height='100%' />
                </Modal>
      
                  <Modal  opened={geommodal} onClose={() => {hideMap()}} size='100%' >
                  {coords !== null ? 
                      <Map style="mapbox://styles/mapbox/streets-v9" containerStyle={{
                        height: height * 0.7,
                        width: width * 0.95
                      }}
                      center={center}
                      zoom={[16]}
                      
                      >
                        {geomtype === 'Point' ? (
                            <Marker coordinates={[coords.longitude, coords.latitude]}>
                            <Pin />
                          </Marker>
                        ) : geomtype === 'Polyline' ? (
                          coords.map((item, index) => {
                            return (
                              <Marker key={index} coordinates={item}>
                              <Pin />
                            </Marker>
                            )
                          })
                        ) : (
                          coords.map((item, index) => {
                            return (
                              <Marker key={index} coordinates={item}>
                              <Pin />
                            </Marker>
                            )
                          })
                        )}
                      </Map>
                    : null}
                  </Modal>
                
              </Paper>
            )
          })}
      
          </ScrollArea>
                </>
      ) : (
        <Group position='center' my={height * 0.15}>
          <Group direction='column'>
          <Text >You have <strong>0</strong> responses recorded.</Text>
          <span style={{marginLeft: 'auto', marginRight: 'auto'}} ><Button color="yellow" leftIcon={<Plus />} component='a' href={`/${clusterid}`} target='_blank' >Create Response</Button></span>
          </Group>
        </Group>
      )}
    </>
  )
            ) : null }
          
        </AppShell>
      );
    }

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
        <SEO
          title="Forms | Cloud: GeoPsy Collect Cloud"
          description="An open source geospatial data collection toolkit suited for research, science, ecosystem conservation and much more"
        />
          <Layout />
        </ThemeProvider>
        </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default Dashboard;