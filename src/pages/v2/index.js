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
} from '@mantine/core';
import { useViewportSize, useHash, useWindowScroll, useScrollIntoView, useClipboard } from '@mantine/hooks';
import { Activity, ChevronRight, Bulb,User, Search, ChevronDown, Friends, Bell, LayoutDashboard, Folder, DotsVertical, Database, DeviceLaptop, ShieldLock, UserCircle, Plus, Point, InfoCircle, DotsCircleHorizontal, Dots, Strikethrough, ClearFormatting, Numbers, Selector, Checklist, Clock, Calendar, Star, Photo, Speakerphone, Video, Location, Line, Polygon, Calculator, Edit, Copy, Trash, ArrowBack, AdjustmentsHorizontal, Microphone, File, Check, UserCheck, ShieldCheck, CircleCheck, ColorPicker, Signature, Adjustments, ChartBar, FileDatabase, Network, Help, Logout, UserPlus, Tool, Sun, Moon, ChevronUp, BrandCodesandbox, X, TableExport, Filter, Eye, ExternalLink, Download, Refresh, ChartArea, ArrowLeft, AlertTriangle, ChartDonut } from 'tabler-icons-react';
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
import ReactMapboxGl, { Layer, Feature, Marker, Source } from 'react-mapbox-gl';
import { showNotification } from '@mantine/notifications';
var BarChart = require('react-d3-components').BarChart;
var PieChart = require('react-d3-components').PieChart;
import 'mapbox-gl/dist/mapbox-gl.css';
import LoaderCard from 'components/loaders/bolt';

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
          height: 24,
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
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
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
  },

  mainLinkText: {

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
    const [query2, setQuery2] = useState('');
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
      { icon: Database, label: 'Forms', href: '/v2/', notifications: userforms.length },
      { icon: Tool, label: 'New Form',  href: '/v2/build/' },
      { icon: ChartBar, label: 'Charts', href: '/v2/create-charts/' },
      { icon: LayoutDashboard, label: 'Dashboards', href: '/v2/create-dashboards/'},
      { icon: ShieldCheck, label: 'Security', href: '#' },
      { icon: FileDatabase, label: 'Database Access', href: '#' },
      { icon: Network, label: 'Network access', href: '#' },
      { icon: BrandCodesandbox, label: 'Sandbox', href: '#'},
      { icon: Help, label: 'Help', href: '#' },
      { icon: Logout, label: 'Logout', href: '/api/logout' },
    ];


    const mainLinks = navlinks.filter(item => {
      if(query2 === '') {
        return item;
      } else if(item.label.toLocaleLowerCase().includes(query2.toLocaleLowerCase())){
        return item;
      }
    }).map((link) => (
      <UnstyledButton mt={10} onClick={() => {setLinkActive(link.label)}} component="a" href={link.href} key={link.label} className={classes.mainLink}>
        <div className={classes.mainLinkInner}>
        <link.icon size={20} color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black} className={classes.mainLinkIcon} />
          <span className={classes.mainLinkText}>{link.label}</span>
        </div>
        {link.notifications && (
          <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
            {link.notifications}
          </Badge>
        )}
      </UnstyledButton>
    ));


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
            console.log(data.response);
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

    const handleResponse = (response, type) => {
      switch(type){
        case 'Short Answer':
          return responseShortAnswer(response);

        case 'Paragraph':
          return responseParagraph(response);

        case 'Multiple Choice':
          return responseMultipleChoice(response);

        case 'Checkbox':
          return responseCheckbox(response);

        case 'Dropdown':
          return responseDropdown(response);

        case 'File Upload':
          return responseFileUpload(response);

        case 'Linear Scale':
          return responseLinearScale(response);

        case 'Date':
          return responseDate(response);

        case 'Time':
          return responseTime(response);

        case 'Point':
            return responsePoint(response);

        case 'Polyline':
            return responsePolyline(response);

        case 'Polygon':
            return responsePolygon(response);

        default:
          console.log('undefined');
      }
    }

    const responseShortAnswer = (res) => {
      return (
        <Text align='center'>{res}</Text>
      )
    }

    const responseParagraph = (res) => {
      return (
        <Text align='center'>{res}</Text>
      )
    }

    const responseMultipleChoice = (res) => {
      return (
        <Text align='center'>{res}</Text>
      )
    }

    const responseDropdown = (res) => {
      return (
        <Text align='center'>{res}</Text>
      )
    }

    const responseCheckbox = (res) => {
      return(
        <Group grow>
          {res.map((item, index) => {
            return (
              <Text align='center' key={index} >{item}</Text>
            )
          })}
        </Group>
      )
    }

    const responseFileUpload = (res) => {
      return (
        <Text >
            {res !== null ? res.map((item, index) => {
              return (
                <Anchor size='xs' key={index}>{item.path}</Anchor>
              )
            }) : (
              <Text size='xs'>null</Text>
            )}
        </Text>
      )
    }

    const responseLinearScale = (res) => {
      return (
        <Text align='center'>{res}</Text>
      )
    }

    const responseDate = (res) => {
      return (
        <Text align='center'>{res}</Text>
      )
    }

    const responseTime = (res) => {
      return (
        <Text align='center'>{res}</Text>
      )
    }

    const responsePoint = (item) => {
      console.log(item);
      if(item !== null ){
        return (
          <Group position='center' >
          <Text>{item.latitude + ','+item.longitude}</Text>
        </Group>
        )
      }
    }

    const handleItemResponse = (res) => {
      return (
        <Text size='xs' >
          [
       {res !== null && res.map((item, index) => {
          return (
            <span key={index} >{JSON.stringify(item)},</span>
          )
        })}
          ]
</Text>
      )
    }

    const responsePolyline = (res) => {
      return (
        res.map((item, idx) => {
          if(item.coords !== undefined){
            return (
              <div key={idx}>
              <Text>{"Latitude:"+item.coords.latitude}</Text>
              <Text>{"Longitude:"+item.coords.longitude}</Text>
              <Text>{"Altitude:"+item.coords.altitude}</Text>
              <Text>{"Accuracy:"+item.coords.accuracy}</Text>
            </div>
            )
          }
        })
      )
    }

    const responsePolygon = (res) => {
      return (
        res.map((item, idx) => {
          if(item.coords !== undefined){
            return (
              <div key={idx}>
              <Text>{"Latitude:"+item.coords.latitude}</Text>
              <Text>{"Longitude:"+item.coords.longitude}</Text>
              <Text>{"Altitude:"+item.coords.altitude}</Text>
              <Text>{"Accuracy:"+item.coords.accuracy}</Text>
            </div>
            )
          }
        })
      )
    }

    const VisualizeGeometryData = () => {
      const [data, setData] = useState([]);
      const Map = ReactMapboxGl({
        accessToken: accessToken,
      });

      useEffect(() => {
        for(let i=0; i<response.length; i++){
          let item = response[i];
  
          for(let k=0; k<item.response.length; k++){
            let obj = item.response[k];
  
            if(obj.questionType === 'Point'){
              let chunk = item.response[k].response;
  
              if(chunk !== null){
                setData(prevData => [...prevData, chunk]);
              }
            }
          }
        }
      }, []);

      return (

                <Map
    style="mapbox://styles/mapbox/dark-v10"
    containerStyle={{
      height: height - 250,
      width: width - 250
    }}
    center={data.length > 0 ? [data[0].longitude, data[0].latitude] : [36.567, -1.234]}
    zoom={data.length > 0 ? [14] : [0]}
  >

    {data.length > 0 ? (
      data.map((item, index) => {
        return (
          <Layer key={index} type='symbol'>
          <Marker
        coordinates={[item.longitude, item.latitude]}
        anchor="bottom">
          <p>Hello</p>
      </Marker>
          </Layer>
        )
      })
    ) : null}

  </Map> 
      )
    }
    const sortArr = (arr) => {
      return arr.sort((a, b) => {
        return a.position - b.position;
      });
    }

    

    const Layout = () => {
      const theme = useMantineTheme();
      const [query, setQuery] = useState('');
      const { classes } = useStyles();
      const [opened, setOpened] = useState(false);
      const [drawer, setDrawer] = useState(false);
      const { colorScheme, toggleColorScheme } = useMantineColorScheme();

      const w = 200;

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

        const svg1 = d3.select(".svg-read-write")
        svg1.selectAll("*").remove()
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        x.domain(d3.extent(data, (d) => { return d.date; }));
        y.domain([0, d3.max(data, (d) => { return d.value; })]);
        svg1.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

        var valueLine = d3.line()
        .x((d) => { return x(d.date); })
        .y((d) => { return y(d.value); });
        svg1.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine)
      }

      const createConnectionsGraph = async () => {
        d3.select("svg").remove();
        let data = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
        let parseTime = d3.timeParse("%Y-%m-%d");
        data.forEach((d) => {
          d.date = parseTime(d.date);
          d.value = +d.value;
        });

        var margin = { top: 10, right: 10, bottom: 20, left: 20 },
        width =  w - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

        const svg2 = d3.select(".svg-connections")
        svg2.selectAll("*").remove()

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        x.domain(d3.extent(data, (d) => { return d.date; }));
        y.domain([0, d3.max(data, (d) => { return d.value; })]);
        svg2.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

        var valueLine = d3.line()
        .x((d) => { return x(d.date); })
        .y((d) => { return y(d.value); });
        svg2.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine)
      }

      const createInOutGraph = async () => {
        d3.select("svg").remove();
        let data = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
        let parseTime = d3.timeParse("%Y-%m-%d");
        data.forEach((d) => {
          d.date = parseTime(d.date);
          d.value = +d.value;
        });

        var margin = { top: 10, right: 10, bottom: 20, left: 20 },
        width =  w - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

        const svg3 = d3.select(".svg-in-out")
        svg3.selectAll("*").remove()

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        x.domain(d3.extent(data, (d) => { return d.date; }));
        y.domain([0, d3.max(data, (d) => { return d.value; })]);
        svg3.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

        var valueLine = d3.line()
        .x((d) => { return x(d.date); })
        .y((d) => { return y(d.value); });
        svg3.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine)
      }

      const createSizeGraph = async () => {
        d3.select("svg").remove();
        let data = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
        let parseTime = d3.timeParse("%Y-%m-%d");
        data.forEach((d) => {
          d.date = parseTime(d.date);
          d.value = +d.value;
        });

        var margin = { top: 10, right: 10, bottom: 20, left: 20 },
        width =  w - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

        const svg4 = d3.select(".svg-size")
        svg4.selectAll("*").remove()

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        x.domain(d3.extent(data, (d) => { return d.date; }));
        y.domain([0, d3.max(data, (d) => { return d.value; })]);
        svg4.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

        var valueLine = d3.line()
        .x((d) => { return x(d.date); })
        .y((d) => { return y(d.value); });
        svg4.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine)
      }

      const clipboard = useClipboard({timeout: 2000});

      const copyFormId = (id) => {
        clipboard.copy("https://collect-v2.vercel.app/"+id);
      }

      React.useEffect(() => {
        createReadWriteGraph();
        createConnectionsGraph();
        createInOutGraph();
        createSizeGraph();
      }, []);

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

      const downloadMinifiedJSON = () => {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response));
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
            <Navbar style={{left: 0}} p="md" hiddenBreakpoint="sm" hidden={!opened} className={classes.navbar} width={{ sm: 200}}>
        <Navbar.Section className={classes.section}>
        <UnstyledButton className={classes.user}>
      <Group position='apart' >
        <Avatar src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {firstname + ' ' + lastname}
          </Text>

            <Code>V1.0.0.0</Code>
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
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        styles={{ rightSection: { pointerEvents: 'none' } }}
        mb="sm"
      />
        <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
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
                <Image style={{height: 40}} src={serverRack} loading="lazy" alt="sever-rack" />
                </Group>
                <Group>
                <Group ml={50} spacing={5} className={classes.links}>
                <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Button className={classes.headerLink} variant='white'  rightIcon={<ChevronDown size={15}  />}>
              Access Manager
            </Button>
            </MediaQuery>
            <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Button className={classes.headerLink} variant='white' color={'dark'} >
              Billing
            </Button>
            </MediaQuery>
            <Menu onClose={() => {setDrawer(false)}} size='xl' control={<Button onClick={() => {setDrawer(!drawer)}} className={classes.headerLink} variant='white' color={'dark'} rightIcon={drawer ? <ChevronUp size={15}  /> : <ChevronDown size={15}  />}>
              Account
            </Button>}>
            <Group direction='column' mt={20}>
              <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>{firstname + ' ' + lastname} </Text>
              <Button mb={10} fullWidth color={theme.colors.gray[5]}>Manage your Collect account</Button>
              <Text  size='xs' style={{marginLeft: 'auto', marginRight: 'auto'}}>OR </Text>
              <Button component='a' href='/api/logout' variant='outline' mb={10} fullWidth color='red'>Sign Out</Button>
            </Group>
            </Menu>

              </Group>
                </Group>
              </div>
            </Header>
          }
        >
            {active === 'aggregate' ? (
              cluster === '' ? (
                <>
              <Group mt={10}>
              <Title order={2} className={classes.title} align="center">
               Form Clusters
            </Title>
              </Group>
              <Group mt={10} grow>
                <TextInput onChange={(e) => {setQuery(e.currentTarget.value)}} value={query} placeholder='Search forms...' rightSection={<Search />} />
              </Group>
                {done ? (
                            userforms.length > 0 ? 
                              
                                 (
                                  <>
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
    <Title order={2} className={classes.title} align="center">
    {cluster}
  </Title>
  </Group>
    <Tabs active={activetab} onTabChange={setActiveTab} position='apart' mt={10} >
      <Tabs.Tab label="Overview" value={"Overview"} >
      <Paper radius={'lg'} style={{}} mt={20} shadow='md' p={'md'} >
                                  <Group position='apart' className={classes.group} >
                                  <Group position='left' mb={20} >
                                    <Anchor size='xs'  href='#'>
                                      {cluster}
                                    </Anchor>
                                    <Button onClick={() => {copyFormId(userforms[0].form_id)}} size='xs'  radius={20}  variant='outline'>
                                      {clipboard.copied ? "Copied" : "Copy URL"}
                                    </Button>
                                    <Button onClick={() => {setActiveTab(2)}} size='xs'  radius={20} variant='outline'>
                                      Browse Response
                                    </Button>
                                    <Button size='xs'  radius={20} variant='outline'>
                                      <Menu control={<ActionIcon><Dots /></ActionIcon>} >
                                        <Menu.Item component='a' href={`/${clusterid}`} target="_blank" >Open Form</Menu.Item>
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
                                      <svg width="200px" height="150px" className="svg-read-write" />
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
                                    <svg width="200px" height="150px" className="svg-connections" />
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
                                    <svg width="200px" height="150px" className="svg-in-out" />
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
                                    <svg width="200px" height="150px" className="svg-size" />
                                    </Group>
                                  </Group>
                                </Paper>
      </Tabs.Tab>
      <Tabs.Tab label="Real Time">Real Time</Tabs.Tab>
      <Tabs.Tab label="Response" value={"Response"}>
        <Group mb={10} position='apart'>
          <Group position='left'>
          <Text color='dimmed'>TOTAL DOCUMENTS:<strong>{response.length}</strong></Text>
          </Group>
          <Group position='right'>
          <Menu control={<Button disabled={response.length > 0 ? false : true} compact variant='subtle' leftIcon={<Download />}>Export</Button>}>
            <Menu.Item onClick={() => {downloadCSV()}}>CSV</Menu.Item>
            <Menu.Item onClick={() => {downloadJSON()}}>JSON</Menu.Item>
          </Menu>
          </Group>
        </Group>
        {!visopen ? (
                  <ScrollArea style={{height: height - 250  }} >
                  {response.map((item, index) => {
                    return (
                      <Paper p="md" ml="10%" mr="10%" mb={15} key={index}>
                       <Group mb={5} grow>
                       <Text size='xs' ><strong>Response Id:</strong> <span style={{color: '#D9480F'}}>{'ObjectId("'+item.response_id+'")'}</span></Text>
                       <Group position='right'>
                        <ActionIcon title='Copy response' >
                          <Copy size={15} />
                        </ActionIcon>
                        <ActionIcon title='Delete response'>
                          <Trash size={15} />
                        </ActionIcon>
                       </Group>
                       </Group>
                      {sortArr(item.response).map((item, index) => {
                          return (
                            item.questionType === 'Point' || item.questionType === 'Polyline' || item.questionType === 'Polygon' ? (
                              <div key={index} style={{marginLeft: 20}}>
                                                  <Text size='xs'><strong>id: </strong> <span style={{color: "#339AF0"}} >{'ObjectId("'+item.id+'")'}</span></Text>
                                                  <Text size='xs'><strong>position: </strong> <span style={{color: "#339AF0"}} >{item.position}</span></Text>
                                                  <Text size='xs'><strong>question type: </strong> <span style={{color: "#339AF0"}} >{item.questionType}</span></Text>
                                                  <Text size='xs'><strong>question: </strong> <span style={{color: "#339AF0"}} >{item.question}</span></Text>
                                                  <Text mb={10} size='xs'><strong>response: </strong> <span contentEditable style={{color: "#339AF0"}} >{item.questionType === 'Point' ? JSON.stringify(item.response) : handleItemResponse(item.response)}</span></Text>
                                                  </div>
                            ) : item.questionType === 'File Upload' ? (
                              <div key={index} style={{marginLeft: 20}}>
                              <Text size='xs'><strong>id: </strong> <span style={{color: "#339AF0"}}>{'ObjectId("'+item.id+'")'}</span></Text>
                              <Text size='xs'><strong>position: </strong> <span style={{color: "#339AF0"}} >{item.position}</span></Text>
                              <Text size='xs'><strong>question type: </strong> <span style={{color: "#339AF0"}} >{item.questionType}</span></Text>
                              <Text size='xs'><strong>question: </strong> <span style={{color: "#339AF0"}} >{item.question}</span></Text>
                              <Text mb={10} size='xs'><strong>response: </strong> <span style={{color: "#339AF0"}} >{responseFileUpload(item.response)}</span></Text>
                              </div>
                            ) : (
                              <div key={index} style={{marginLeft: 20}}>
                                                  <Text size='xs'><strong>id: </strong> <span style={{color: "#339AF0"}}>{'ObjectId("'+item.id+'")'}</span></Text>
                                                  <Text size='xs'><strong>position: </strong> <span style={{color: "#339AF0"}} >{item.position}</span></Text>
                                                  <Text size='xs'><strong>question type: </strong> <span style={{color: "#339AF0"}} >{item.questionType}</span></Text>
                                                  <Text size='xs'><strong>question: </strong> <span style={{color: "#339AF0"}} >{item.question}</span></Text>
                                                  <Text mb={10} size='xs'><strong>response: </strong> <span contentEditable style={{color: "#339AF0"}} >{item.response}</span></Text>
                                                  </div>
                            )
                          )
                        })}
                        
                      </Paper>
                    )
                  })}
        
                  </ScrollArea>
        ) : (
          <VisualizeGeometryData />
        )}
      </Tabs.Tab>
          </Tabs>
    </>
  )
            ) : null }
          
        </AppShell>
      );
    }
    
    return (
      <ColorSchemeProvider colorScheme={'light'}>
      <MantineProvider theme={{ colorScheme: 'light' }} withGlobalStyles withNormalizeCSS>
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