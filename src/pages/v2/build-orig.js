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
  Textarea
} from '@mantine/core';
import { useViewportSize, useHash, useWindowScroll, useScrollIntoView } from '@mantine/hooks';
import { Activity, Bulb,User, Search, ChevronDown, Friends, Bell, LayoutDashboard, Folder, DotsVertical, Database, DeviceLaptop, ShieldLock, UserCircle, Plus, Point, InfoCircle, DotsCircleHorizontal, Dots, Strikethrough, ClearFormatting, Numbers, Selector, Checklist, Clock, Calendar, Star, Photo, Speakerphone, Video, Location, Line, Polygon, Calculator, Edit, Copy, Trash, ArrowBack, AdjustmentsHorizontal, Microphone, File, Check, UserCheck, ShieldCheck, CircleCheck, ColorPicker, Signature, Adjustments, ChartBar, FileDatabase, Network, Help, Logout, UserPlus } from 'tabler-icons-react';
import { ThemeProvider } from 'theme-ui';
import Router from 'next/dist/next-server/server/router';
import theme from 'theme';
import SEO from 'components/seo';
import { useRouter } from 'next/router';
import { useUser } from 'lib/hooks';
import { uuid } from 'uuidv4';
import * as d3 from "d3";
import { Bar } from 'react-chartjs-2';
var BarChart = require('react-d3-components').BarChart;
var PieChart = require('react-d3-components').PieChart;

const useStyles = createStyles((theme, _params, getRef) => {
const icon = getRef('icon');
return {
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
      
        linkActive: {
          '&, &:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                : theme.colors[theme.primaryColor][0],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
          },
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
          fontSize: theme.fontSizes.sm,
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



export default function Dashboard(){
    const user = useUser({ redirectTo: '/auth/login' });
    const router = useRouter();
    const user2 = useUser();
    const [linkactive, setLinkActive] = useState('Forms');
    const [hash, setHash] = useHash();
    const { classes, cx } = useStyles();
  const [activeLink, setActiveLink] = useState('Clusters');

    const [active, setActive] = useState('build');
    const [cluster, setCluster] = useState('');
    const [item, setItems] = useState([]);

    const handleCluster = (str) => {
      let newItems = item.concat([{title: str, href: '#'}])
      setItems(newItems);
      setCluster(str);
    }


    const navlinks = [
      { icon: Database, label: 'Forms', href: '/v2/dashboard' },
      { icon: Adjustments, label: 'Build',  href: '/v2/build' },
      { icon: ChartBar, label: 'Charts', href: '#' },
      { icon: ShieldCheck, label: 'Security', href: '#' },
      { icon: FileDatabase, label: 'Database Access', href: '#' },
      { icon: Network, label: 'Network access', href: '#' },
      { icon: Help, label: 'Help', href: '#' },
      { icon: Logout, label: 'Logout', href: '/api/logout' },
    ];

    const navlinks2 = [
    ];

    const navlinks3 = [

    ];

    const collections = [
      { emoji: '👍', label: 'Sales' },
      { emoji: '🚚', label: 'Deliveries' },
      { emoji: '💸', label: 'Discounts' },
      { emoji: '💰', label: 'Profits' },
      { emoji: '✨', label: 'Reports' },
      { emoji: '🛒', label: 'Orders' },
      { emoji: '📅', label: 'Events' },
      { emoji: '🙈', label: 'Debts' },
      { emoji: '💁‍♀️', label: 'Customers' },
    ];

    const collectionLinks = collections.map((collection) => (
      <a
        href="/"
        onClick={(event) => event.preventDefault()}
        key={collection.label}
        className={classes.collectionLink}
      >
        <span style={{ marginRight: 9, fontSize: 16 }}>{collection.emoji}</span> {collection.label}
      </a>
    ));

    const mainLinks = navlinks.map((link) => (
      <UnstyledButton onClick={() => {setLinkActive(link.label)}} component="a" href={link.href} key={link.label} className={cx(classes.mainLink, { [classes.linkActive]: link.label === linkactive })}>
        <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} />
          <span>{link.label}</span>
        </div>
        {link.notifications && (
          <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
            {link.notifications}
          </Badge>
        )}
      </UnstyledButton>
    ));

    const mainLinks2 = navlinks2.map((link) => (
      <UnstyledButton component="a" href={link.href} key={link.label} className={classes.mainLink}>
        <div className={classes.mainLinkInner}>
          <span>{link.label}</span>
        </div>
        {link.notifications && (
          <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
            {link.notifications}
          </Badge>
        )}
      </UnstyledButton>
    ));

    const mainLinks3 = navlinks3.map((link) => (
      <UnstyledButton component="a" href={link.href} key={link.label} className={classes.mainLink}>
        <div className={classes.mainLinkInner}>

          <span>{link.label}</span>
        </div>
        {link.notifications && (
          <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
            {link.notifications}
          </Badge>
        )}
      </UnstyledButton>
    ));

    const Layout = () => {
      const theme = useMantineTheme();
      const { classes } = useStyles();
      const [opened, setOpened] = useState(false);
      const [formname, setFormName] = useState('Untitled Form');
      const [formsaved, setFormSaved] = useState(false);
      const [formnameerror, setFormNameError] = useState(false);
      const [questionerror, setQuestionError] = useState(false);
      const [gridopened, setGridOpened] = useState(false);
      const [loading, setLoading] = useState(false);

      const [forms, setForms] = useState([]);
      const [ctx, setCtx] = useState('');
      const [q, setQ] = useState('');
      const [h, setH] = useState('');
      const [checked, setChecked] = useState(false);

      // stepper
      const [stepperActive, setStepperActive] = useState(0);

      // numbers and floats
      const [min, setMin] = useState(null);
      const [max, setMax] = useState(null);

      // floats
      const [step, setStep] = useState(1);

      // select questions
      const [selectType, setSelectType] = useState('single');
      const [selecterror, setSelectError] = useState(false);
      const [options, setOptions] = useState([
        {
          label: '',
          value: '',
          id: uuid()
        },

      ]);

      // blob
      const [blobType, setBlobType] = useState('photo');

      // calculation
      const [firstNum, setFirstNum] = useState(null);
      const [operation, setOperation] = useState('');
      const [secondNum, setSecondNum] = useState(null);

      const [text, setText] = useState(0);
      const [numbers, setNumbers] = useState(0);
      const [float, setFloat] = useState(0);
      const [select, setSelect] = useState(0);
      const [blob, setBlob] = useState(0);
      const [point, setPoint] = useState(0);
      const [line, setLine] = useState(0);
      const [polygon, setPolygon] = useState(0);
      const [sign, setSign] = useState(0);
      const [time, setTime] = useState(0);
      const [date, setDate] = useState(0);
      const [range, setRange] = useState(0);

      // pie chart state
      const [piedata, setPieData] = useState({
        label: '', values: [
          {
            x: 'Text',
            y: text
          },
          {
            x: 'Numbers',
            y: numbers
          },
          {
            x: 'Float',
            y: float
          },
          {
            x: 'Select',
            y: select
          },
          {
            x: 'Time',
            y: time
          },
          {
            x: 'Date',
            y: date
          },
          {
            x: 'Range',
            y: range
          },
          {
            x: 'Blob',
            y: blob
          },
          {
            x: 'Point',
            y: point
          },
          {
            x: 'Line',
            y: line
          },
          {
            x: 'Polygon',
            y: polygon
          }
        ]
      })

      // skip logic states
      
      // automatically scroll to the bottom of page
      const [scroll, scrollTo] = useWindowScroll();
      const targetRef = useRef();
      const targetRef2 = useRef();

      const createForm = () => {
        console.log(forms);
      }

      const { height, width} = useViewportSize();
      const w = 200;

      const saveFormName = () => {
        setLoading(true);
        // more code
        if(formname !== '' && formname !== 'Untitled Form'){
          setFormSaved(true);
          setStepperActive(1);
        } else {
          setFormNameError(true);

          setTimeout(function(){setFormNameError(false)}, 5000)
        }
        setLoading(false);
      }

      const createQuestion = (question) => {
        setCtx(question);
        setGridOpened(false);
      }

      const saveQuestion = () => {
        let newQuiz;

        if(q === ''){
          setQuestionError(true);
          setTimeout(function(){setQuestionError(false)}, 5000);
          return false;
        }

        switch(ctx){
          case 'text':
            newQuiz = forms.concat([{question: q, conditional: false, hint: h, required: checked, type: ctx, id: uuid()}]);
            setText(text+1);
            break;

          case 'number':
            newQuiz = forms.concat([{question: q, conditional: false, hint: h, required: checked, type: ctx, id: uuid(), min: min, max: max}]);
            setNumbers(numbers+1);
            break;

          case 'float':
            newQuiz = forms.concat([{question: q, conditional: false, hint: h, required: checked, type: ctx, id: uuid(), min: min, max: max, step: step}]);
            setFloat(float+1);
            break;

          case 'select':
            if(options.length === 0){
              setSelectError(true);
              setTimeout(function(){setSelectError(false)}, 5000);
              return false;
            }

            newQuiz = forms.concat([{question: q, conditional: false, hint: h, required: checked, type: ctx, id: uuid(), selectType: selectType, options: options}]);
            setSelect(select+1);
            break;

          case 'blob':
            newQuiz = forms.concat([{question: q, conditional: false, hint: h, required: checked, type: ctx, id: uuid(), blobType: blobType}]);
            setBlob(blob+1);
            break;

          case 'time':
            newQuiz = forms.concat([{question: q, conditional: false, hint: h, required: checked, type: ctx, id: uuid()}]);
            setTime(time+1);
            break;

          case 'date':
            newQuiz = forms.concat([{question: q, conditional: false, hint: h, required: checked, type: ctx, id: uuid()}]);
            setDate(date+1);
            break;

          case 'range':
            newQuiz = forms.concat([{question: q, conditional: false, hint: h, required: checked, type: ctx, id: uuid(), min: min, max: max}]);
            setRange(range+1);
            break;

          case 'point':
            newQuiz = forms.concat([{question: q, conditional: false, hint: h, required: checked, type: ctx, id: uuid()}]);
            setPoint(point+1);
            break;

          case 'line':
            newQuiz = forms.concat([{question: q, conditional: false, hint: h, required: checked, type: ctx, id: uuid()}]);
            setLine(line+1);
            break;

          case 'polygon':
            newQuiz = forms.concat([{question: q, conditional: false, hint: h, required: checked, type: ctx, id: uuid()}]);
            setPolygon(polygon+1);
            break;

          case 'calculation':
            newQuiz = forms.concat([{question: q, conditional: false, hint: h, required: checked, type: ctx, id: uuid(), operation: operation, firstNum: firstNum, secondNum: secondNum}]);
            break;

          default:
            throw new Error("Undefined question type");

        }

        setForms(newQuiz);

        // clear the question
        setQ('');
        setH('');
        setOptions([]);
        setFirstNum(null);
        setOperation('');
        setSecondNum(null);
        setSelectType('single');
        setBlobType('photo');
        setStep(1);
        setMin(null);
        setMax(null);
        setChecked(false);

        setCtx('');

        targetRef.current?.scrollIntoView({behavior: 'smooth'
      });
      }

      let data = {
        label: 'somethingA',
        values: [
        {x: 'Text', y: text},
        {x: 'Numbers', y: numbers},
        {x: 'Float', y: float},
        {x: 'Select', y: select},
        {x: 'Blob', y: blob},
        {x: 'Point', y: point},
        {x: 'Line', y: line},
        {x: 'Polygon', y: polygon},
        {x: 'Signature', y: sign},
        {x: 'Date', y: date},
        {x: 'Time', y: time},]
        };

      const createSkipLogic = (id) => {

      }

      const duplicateQuestion = (id) => {
        let objIndex = forms.findIndex((obj => obj.id  == id));
        let objEl = forms[objIndex];
        let chunk = {question: objEl.question, hint: objEl.hint, required: objEl.required, type: objEl.type, id: uuid()}
        setForms(prevForms => [...prevForms, chunk]);
      }

      const deleteQuestion = (id) => {
        let objIndex = forms.findIndex((obj => obj.id == id));
        forms.splice(objIndex, 1);
        setForms([...forms]);
      }

      const items = item.map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));

      const handleOpenCloseGrid = () => {
        setGridOpened(!gridopened)
        //scrollTo({y: height});
        targetRef.current?.scrollIntoView({behavior: 'smooth'});
      }

      const handleIncrementOptions = () => {
        let chunk = {label: '', value: '', id: uuid()};
        setOptions(prevOptions => [...prevOptions, chunk])
      }

      const deleteOption = (id) => {
        let objIndex = options.findIndex((obj => obj.id === id));
        options.splice(objIndex, 1);
        setOptions([...options]);
      }

      const handleLabelChange = (id, val) => {
        let objIndex = options.findIndex((obj => obj.id === id));
        let option = options[objIndex];

        option.label = val;

        //setOptions([...options]);
      }

      const handleValueChange = (id, val) => {
        let objIndex = options.findIndex((obj => obj.id === id));
        let option = options[objIndex];

        option.value = val;

        //setOptions([...options]);
      }

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
        console.log(w)

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
            <Navbar style={{left: 0}} p="md" hiddenBreakpoint="sm" hidden={!opened} className={classes.navbar} width={{ sm: 200}}>
                            <Navbar.Section className={classes.section}>
<Group className={classes.collectionsHeader} position="apart">
          <Menu control={<Button size='xs' variant='subtle' color='dark' rightIcon={<ChevronDown size={13} />} leftIcon={<Folder fill={theme.colors.gray[8]} size={15}  />}>Project 0</Button>} >
            <Group m={10} >
            <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className={classes.collectionLink}
      style={{fontSize: 11}}
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
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>
            </Navbar>
          }
          aside={
            stepperActive === 1 ? (
              <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ lg: 400 }}>
          <List size='xs' type="ordered">
              {forms.map((item) => {
                return (
                  <List.Item>{item.question}</List.Item>
                )
              })}  
          </List>
          <PieChart
          data={data}
          width={380}
          height={400}
          margin={{top: 10, bottom: 10, left: 100, right: 100}}
          tooltipOffset={{top: 175, left: 200}}
          sort={null}
          />
            {/*
                   <List size={'xs'} type='ordered'>
                     {forms.map((item) => {
                       return (
                         <List.Item key={item.id} mb={10}>
                           <Grid columns={24}>
                             <Grid.Col span={24}>
                               <Box sx={(theme) => ({
                                 backgroundColor: theme.colors.gray[1],
                                 padding: theme.spacing.xl,
                                 borderRadius: theme.radius.md,
                                 cursor: 'pointer',
                               })}>
                                 <Grid columns={24}>
                                   <Grid.Col span={3}>
                                   {item.type === 'text' ? <ClearFormatting size={20} /> : item.type === 'number' ?
                                   <Numbers size={20} /> : item.type === 'float' ? <Point size={20} /> : 
                                   item.type === 'select' && item.selectType === 'single' ? <Selector size={20} /> : item.type === 'select' && item.selectType !== 'single' ? <Checklist size={20} />  : item.type === 'time' ? <Clock size={20} /> :
                                   item.type === 'date' ? <Calendar size={20} /> : item.type === 'range' ? <Star size={20} /> :
                                   item.type === 'blob' ? <Photo size={20} /> : item.type === 'calculation' ? <Calculator size={20} /> :
                                   item.type === 'point' ? <Location size={20} /> : item.type === 'line' ? <Line size={20} /> : <Polygon size={20} />  
                                 }
                                   </Grid.Col>
                                   <Grid.Col span={21}>
                                     {item.type === 'text' ? (
                                       <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                     <TextInput rightSection={item.conditional ? <Badge>Conditional</Badge> : null} disabled  size='xs' my={5} />
                                       </InputWrapper>
                                     ) : item.type === 'number' ? (
                                       <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                       <NumberInput max={item.max} min={item.min} disabled  size='xs' my={5} />
                                       </InputWrapper>
                                     ) : item.type === 'float' ? (
                                       <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                       <NumberInput disabled size='xs' my={5} />
                                       </InputWrapper>
                                     ) : item.type === 'select' ? (
                                       item.selectType === 'single' ? (
                                         <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                         <Select size='xs' my={5} data={item.options} />
                                         </InputWrapper>
                                       ) : (
                                         <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                         <MultiSelect size='xs' my={5} data={item.options} />
                                         </InputWrapper>
                                       )
                                     ): item.type == 'time' ? (
                                       <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                       <TimeInput size='xs'  defaultValue={new Date()} format="12" />
                                       </InputWrapper>
                                     ) : item.type === 'date' ? (
                                       <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                       <DatePicker size='xs' required={item.required} />
                                       </InputWrapper>
                                     ) : item.type == 'blob' ? (
                                       item.blobType === 'photo' ? (
                                         <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                         <TextInput size='xs' icon={<Photo size={14} />} />
                                         </InputWrapper>
                                       ) : item.blobType == 'audio' ? (
                                         <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                         <TextInput size='xs' icon={<Microphone size={14} />} />
                                         </InputWrapper>
                                       ) : item.blobType == 'video' ? (
                                         <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                         <TextInput size='xs' icon={<Video size={14} />} />
                                         </InputWrapper>
                                       ) : (
                                         <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                         <TextInput size='xs' icon={<File size={14} />} />
                                         </InputWrapper>
                                       )
                                     ) : item.type == 'point' ? (
                                       <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                       <TextInput disabled size='xs' my={5} />
                                       </InputWrapper>
                                     ) : item.type == 'line' ? (
                                       <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                       <TextInput disabled size='xs' my={5} />
                                       </InputWrapper>
                                     ) : item.type == 'polygon' ? (
                                       <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                       <TextInput disabled size='xs' my={5} />
                                       </InputWrapper>
                                     ) : item.type == 'range' ? (
                                       <InputWrapper required={item.required} label={item.question} description={item.hint} >
                                       <Slider value={item.max} size='xs' />
                                       </InputWrapper>
                                     ) : null}                            
                                     <Group position='right'>
                                     <ActionIcon title='Edit question attributes' >
                                       <Edit size={15} />
                                     </ActionIcon>
                                     <ActionIcon title='Add skip logic' >
                                       <AdjustmentsHorizontal size={15} />
                                     </ActionIcon>
                                     <ActionIcon onClick={() => {duplicateQuestion(item.id)}} title='Duplicate this question'>
                                       <Copy size={15} />
                                     </ActionIcon>
                                     <ActionIcon onClick={() => {deleteQuestion(item.id)}} title='Delete question'>
                                       <Trash size={15} />
                                     </ActionIcon>
                                   </Group>
                                 </Grid.Col>
                                 </Grid>
                               </Box>
                             </Grid.Col>
                           </Grid>
                         </List.Item>
                       )
                     })}
                   </List>
                    */}
          </Aside>
        </MediaQuery>
            ) : null
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
                <img src='../../assets/logo-no-bg.png' />
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
              <Button className={classes.headerLink} variant='white' color={'dark'} rightIcon={<ChevronDown size={15}  />}>
              Account
            </Button>

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
              Active Forms
            </Title>
              </Group>
              <Group mt={20}>
              <TextInput placeholder="Search forms" icon={<Search size={14} />} />
              </Group>
              <Paper radius={'lg'} style={{}} mt={20} shadow='md' p={'md'} >
                <Group position='apart' className={classes.group} >
                <Group position='left' mb={20} >
                  <Anchor size='xs'  href='#'>
                    Turkana
                  </Anchor>
                  <Button size='xs'  radius={20} color={'dark'} variant='outline'>
                    Connect
                  </Button>
                  <Button size='xs'  onClick={() => {handleCluster('Turkana')}} radius={20} color={'dark'} variant='outline'>
                    Browse Forms
                  </Button>
                  <Button size='xs'  radius={20} color={'dark'} variant='outline'>
                    <Menu control={<ActionIcon><Dots /></ActionIcon>} >
                      <Menu.Item >Edit Configuration </Menu.Item>
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
              </>
  ) : (
    <>
    <Group mt={10}>
      <ActionIcon onClick={() => {setCluster('')}} title='Go Back' >
        <ArrowBack size={20} />
      </ActionIcon>
    </Group>
    <Group mt={20}>
    <Title order={2} className={classes.title} align="center">
    {cluster}
  </Title>
  </Group>
    <Tabs mt={10} >
      <Tabs.Tab label="Overview" value={"Overview"} >Overview</Tabs.Tab>
      <Tabs.Tab label="Real Time">Real Time</Tabs.Tab>
      <Tabs.Tab label="Forms" value={"Forms"}>Forms</Tabs.Tab>
      <Tabs.Tab label="Search" value={"Search"}>Search</Tabs.Tab>
    </Tabs>
    </>
  )
            ) : active === 'build' ? (
              <>
             <Stepper my={20} size='xs' active={stepperActive} onStepClick={setStepperActive} completedIcon={<CircleCheck />}>
              <Stepper.Step disabled icon={<UserCheck size={18} />} label="Form Name" description="Create form name" />
              <Stepper.Step disabled icon={<AdjustmentsHorizontal size={18} />} label="Build Form" description="Assign form questions" />
              <Stepper.Step disabled icon={<ShieldCheck size={18} />} label="Preview" description="Finalize your form" />
             </Stepper>
              {stepperActive === 0 ? (
                 <>

                 <Box sx={(theme) => ({
                                 backgroundColor: theme.colors.gray[0],
                                 padding: theme.spacing.xl,
                                 marginLeft: '5%',
                                 marginRight: '5%',
                                 borderRadius: theme.radius.md,
                                 cursor: 'pointer',
                })}>

                   <InputWrapper label="Form Name" required description="A simple, clear and precise word that corresponds to your project">
                   <TextInput error={formnameerror} value={formname} onChange={(e) => {setFormName(e.target.value)}} />
                   </InputWrapper>
                   <InputWrapper my={10} label="Description" required={false} description="Help users of this form to understand bettter about its objective, mission or purpose(optional)">
                   <Textarea minRows={2} maxRows={5} />
                   </InputWrapper>
                   <Button my={10} fullWidth color={formsaved ? 'dark' : 'cyan'} leftIcon={formsaved ? <Check size={13} /> : null} loading={loading} onClick={() => {saveFormName()}} >{!formsaved ? "Create Form" : "Saved"}</Button>

                </Box>
                                  </>
   
              ) : stepperActive === 1 ? (
                <>
                 {ctx !== ' ' ? (
                   <Grid columns={12}>
                     <Grid.Col style={{justifyContent: 'center', alignItems: 'center'}} span={2}>
                       <Group position='center'>
                       {ctx === 'text' ? <ClearFormatting size={20} /> : ctx === 'number' ?
                     <Numbers size={20} /> : ctx === 'float' ? <Point size={20} /> : 
                     ctx === 'select' ? <Selector size={20} /> : ctx === 'time' ? <Clock size={20} /> :
                     ctx === 'date' ? <Calendar size={20} /> : ctx === 'range' ? <Star size={20} /> :
                     ctx === 'blob' ? <Photo size={20} /> : ctx === 'calculation' ? <Calculator size={20} /> :
                     ctx === 'point' ? <Location size={20} /> : ctx === 'line' ? <Line size={20} /> : ctx === 'polygon' ? <Polygon size={20} /> : null  
                   }
                       </Group>
                     </Grid.Col>
                     <Grid.Col span={10}>
                       {
                         ctx === 'text' ? (
                           <Group grow direction='column' mt={10}>
                           <TextInput error={questionerror} label="Question" value={q} required onChange={(e) => {setQ(e.currentTarget.value)}} placeholder='Enter your question here' size='xs' />
                           <TextInput label="Hint" value={h} onChange={(e) => {setH(e.currentTarget.value)}} placeholder='Enter your question hint here' size='xs' />
                           <Switch required value={checked} onChange={() => {setChecked(!checked)}} label={checked ? "Required" : "Optional"} color={'red'} size='xs' />
                           <Button onClick={() => {saveQuestion()}} fullWidth variant='outline'>Save question</Button>
                         </Group>
                         ) : ctx === 'number' ? (
                           <Group grow direction='column' mt={10}>
                           <TextInput error={questionerror} label="Question" value={q} required onChange={(e) => {setQ(e.currentTarget.value)}} placeholder='Enter your question here' size='xs' />
                           <TextInput label="Hint" value={h} onChange={(e) => {setH(e.currentTarget.value)}} placeholder='Enter your question hint here' size='xs' />
                           <Switch required value={checked} onChange={() => {setChecked(!checked)}} label={checked ? "Required" : "Optional"} color={'red'} size='xs' />
                           <NumberInput label="Minimum value" value={min} onChange={(e) => {setMin(e.currentTarget.value)}} placeholder='Enter the minimum value expected' size='xs' />
                           <NumberInput label="Maximum value" value={max} onChange={(e) => {setMax(e.currentTarget.value)}} placeholder='Enter the maximum value expected' size='xs' />
                           <Button onClick={() => {saveQuestion()}} fullWidth variant='outline'>Save question</Button>
                         </Group>
                         ) : ctx === 'float' ? (
                           <Group grow direction='column' mt={10}>
                           <TextInput error={questionerror} label="Question" value={q} required onChange={(e) => {setQ(e.currentTarget.value)}} placeholder='Enter your question here' size='xs' />
                           <TextInput label="Hint" value={h} onChange={(e) => {setH(e.currentTarget.value)}} placeholder='Enter your question hint here' size='xs' />
                           <Switch required value={checked} onChange={() => {setChecked(!checked)}} label={checked ? "Required" : "Optional"} color={'red'} size='xs' />
                           <NumberInput label="Minimum value" value={min} onChange={(e) => {setMin(e.currentTarget.value)}} placeholder='Enter the minimum value expected' size='xs' />
                           <NumberInput label="Maximum value"  value={max} onChange={(e) => {setMax(e.currentTarget.value)}} placeholder='Enter the maximum value expected' size='xs' />
                           <NumberInput label="Step size" value={step} onChange={(e) => {setStep(e.currentTarget.value)}} placeholder='Enter the maximum number of decimal places expected' size='xs' />
                           <Button onClick={() => {saveQuestion()}} fullWidth variant='outline'>Save question</Button>
                         </Group>
                         ) : ctx === 'select' ? (
                           <Group grow direction='column' mt={10}>
                           <TextInput error={questionerror} label="Question" value={q} required onChange={(e) => {setQ(e.currentTarget.value)}} placeholder='Enter your question here' size='xs' />
                           <TextInput label="Hint" value={h} onChange={(e) => {setH(e.currentTarget.value)}} placeholder='Enter your question hint here' size='xs' />
                           <Switch required value={checked} onChange={() => {setChecked(!checked)}} label={checked ? "Required" : "Optional"} color={'red'} size='xs' />
                           <Select error={selecterror} value={selectType} onChange={(val) => {setSelectType(val)}} data={[{label: 'Select One', value: 'single'}, {label: 'Select Multiple', value: 'multiple'}]} label="Type of Selection" size='xs' placeholder='Mode of selection' />
                           {options.map((item) => {
                             return (
                               <Group position='apart' key={item.id} grow>
                               <TextInput label='Label' onChange={(e) => {handleLabelChange(item.id, e.currentTarget.value)}} size='xs' required />
                               <TextInput label='Option Value' onChange={(e) => {handleValueChange(item.id, e.currentTarget.value)}} size='xs' required />
                               <ActionIcon title='Delete this option' onClick={() => {deleteOption(item.id)}} >
                                 <Trash className={classes.trashBtn} size={20} />
                               </ActionIcon>
                             </Group>
                             )
                           })}
                           <Group position='center'>
                             <Button onClick={() => {handleIncrementOptions()}} variant='subtle' leftIcon={<Plus size={20} />} size='xs'>
                               Option
                             </Button>
                           </Group>
                           <Button onClick={() => {saveQuestion()}} fullWidth variant='outline'>Save question</Button>
                         </Group>
                         ) : ctx === 'time' ? (
                           <Group grow direction='column' mt={10}>
                           <TextInput error={questionerror} label="Question" value={q} required onChange={(e) => {setQ(e.currentTarget.value)}} placeholder='Enter your question here' size='xs' />
                           <TextInput label="Hint" value={h} onChange={(e) => {setH(e.currentTarget.value)}} placeholder='Enter your question hint here' size='xs' />
                           <Switch required value={checked} onChange={() => {setChecked(!checked)}} label={checked ? "Required" : "Optional"} color={'red'} size='xs' />
                           <Button onClick={() => {saveQuestion()}} fullWidth variant='outline'>Save question</Button>
                           </Group>
                         ) : ctx === 'date' ? (
                           <Group grow direction='column' mt={10}>
                           <TextInput error={questionerror} label="Question" value={q} required onChange={(e) => {setQ(e.currentTarget.value)}} placeholder='Enter your question here' size='xs' />
                           <TextInput label="Hint" value={h} onChange={(e) => {setH(e.currentTarget.value)}} placeholder='Enter your question hint here' size='xs' />
                           <Switch required value={checked} onChange={() => {setChecked(!checked)}} label={checked ? "Required" : "Optional"} color={'red'} size='xs' />
                           <Button onClick={() => {saveQuestion()}} fullWidth variant='outline'>Save question</Button>
                           </Group>
                         ) : ctx === 'range' ? (
                           <Group grow direction='column' mt={10}>
                           <TextInput error={questionerror} label="Question" value={q} required onChange={(e) => {setQ(e.currentTarget.value)}} placeholder='Enter your question here' size='xs' />
                           <TextInput label="Hint" value={h} onChange={(e) => {setH(e.currentTarget.value)}} placeholder='Enter your question hint here' size='xs' />
                           <NumberInput label="Minimum value" value={min} onChange={(e) => {setMin(e.currentTarget.value)}} placeholder='Enter the minimum value expected' size='xs' />
                           <NumberInput label="Maximum value" value={max} onChange={(e) => {setMax(e.currentTarget.value)}} placeholder='Enter the maximum value expected' size='xs' />
                           <Switch required value={checked} onChange={() => {setChecked(!checked)}} label={checked ? "Required" : "Optional"} color={'red'} size='xs' />
                           <Button onClick={() => {saveQuestion()}} fullWidth variant='outline'>Save question</Button>
                           </Group>
                         ) : ctx === 'blob' ? (
                           <Group grow direction='column' mt={10}>
                           <TextInput error={questionerror} label="Question" value={q} required onChange={(e) => {setQ(e.currentTarget.value)}} placeholder='Enter your question here' size='xs' />
                           <TextInput label="Hint" value={h} onChange={(e) => {setH(e.currentTarget.value)}} placeholder='Enter your question hint here' size='xs' />
                           <Select value={blobType} onChange={(val) => {setBlobType(val)}} data={[{label: 'Photo', value: 'photo'}, {label: 'Video', value: 'video'}, {label: 'Audio', value: 'audio'}, {label: 'File', value: 'file'}]} label="Type of blob" size='xs' placeholder='Choose type of blob' />
                           <Switch required value={checked} onChange={() => {setChecked(!checked)}} label={checked ? "Required" : "Optional"} color={'red'} size='xs' />
                           <Button onClick={() => {saveQuestion()}} fullWidth variant='outline'>Save question</Button>
                           </Group>
                         ) : ctx === 'calculation' ? (
                           <Group grow direction='column' mt={10}>
                           <TextInput error={questionerror} label="Question" value={q} required onChange={(e) => {setQ(e.currentTarget.value)}} placeholder='Enter your question here' size='xs' />
                           <TextInput label="Hint" value={h} onChange={(e) => {setH(e.currentTarget.value)}} placeholder='Enter your question hint here' size='xs' />
                           <Group position='apart' grow>
                             <TextInput placeholder='First Number' size='xs' required />
                             <Select data={[{label: '+', value: '+'}, {label: '-', value: '-'}, {label: '/', value: '/'}, {label: 'X', value: 'x'}]} label="Arithmetic Operations" size='xs' placeholder='Choose arithmetic operation' />
                             <TextInput placeholder='Second Number' size='xs' required />
                           </Group>
                           <Group position='center'>
                             <Button variant='subtle' leftIcon={<Plus size={20} />} size='xs'>
                               Calculation
                             </Button>
                           </Group>
                           <Switch required value={checked} onChange={() => {setChecked(!checked)}} label={checked ? "Required" : "Optional"} color={'red'} size='xs' />
                           <Button onClick={() => {saveQuestion()}} fullWidth variant='outline'>Save question</Button>
                           </Group>
                         ) : ctx === 'point' ? (
                           <Group grow direction='column' mt={10}>
                           <TextInput error={questionerror} label="Question" value={q} required onChange={(e) => {setQ(e.currentTarget.value)}} placeholder='Enter your question here' size='xs' />
                           <TextInput label="Hint" value={h} onChange={(e) => {setH(e.currentTarget.value)}} placeholder='Enter your question hint here' size='xs' />
                           <Switch required value={checked} onChange={() => {setChecked(!checked)}} label={checked ? "Required" : "Optional"} color={'red'} size='xs' />
                           <Button onClick={() => {saveQuestion()}} fullWidth variant='outline'>Save question</Button>
                           </Group>
                         ): ctx === 'line' ? (
                           <Group grow direction='column' mt={10}>
                           <TextInput error={questionerror} label="Question" value={q} required onChange={(e) => {setQ(e.currentTarget.value)}} placeholder='Enter your question here' size='xs' />
                           <TextInput label="Hint" value={h} onChange={(e) => {setH(e.currentTarget.value)}} placeholder='Enter your question hint here' size='xs' />
                           <Switch required value={checked} onChange={() => {setChecked(!checked)}} label={checked ? "Required" : "Optional"} color={'red'} size='xs' />
                           <Button onClick={() => {saveQuestion()}} fullWidth variant='outline'>Save question</Button>
                           </Group>
                         ) : ctx === 'polygon' ? (
                           <Group grow direction='column' mt={10}>
                           <TextInput error={questionerror} label="Question" value={q} required onChange={(e) => {setQ(e.currentTarget.value)}} placeholder='Enter your question here' size='xs' />
                           <TextInput label="Hint" value={h} onChange={(e) => {setH(e.currentTarget.value)}} placeholder='Enter your question hint here' size='xs' />
                           <Switch required value={checked} onChange={() => {setChecked(!checked)}} label={checked ? "Required" : "Optional"} color={'red'} size='xs' />
                           <Button onClick={() => {saveQuestion()}} fullWidth variant='outline'>Save question</Button>
                           </Group>
                         ) : null
         
                       }
                     </Grid.Col>
                   </Grid>
                   ) : null}
                 {ctx === '' ? (
                  !gridopened ? (
                    <>
                  <Group position='center'>
                    <Text size='xs' >Use the + button below to add questions</Text>
                  </Group>
    
                     <Group ref={targetRef2} mt={20} position='center'>
                       <ActionIcon title='Click to open or close attribute grid.' onClick={() => {handleOpenCloseGrid()}} >
                         <Plus  />
                       </ActionIcon>
                     </Group>
                     </>
                  ) : null
                 ) : null}
                 {gridopened ? (
                   <SimpleGrid mt={20} spacing={'md'} cols={4}>
                     <Group direction='column'>
                       <UnstyledButton onClick={() => {createQuestion('text')}} >
                         <Group>
                           <ClearFormatting size={20} />
                           <div>
                             <Text size='xs' >Text</Text>
                           </div>
                         </Group>
                       </UnstyledButton>
                       <UnstyledButton  onClick={() => {createQuestion('number')}}>
                         <Group>
                           <Numbers size={20} />
                           <div>
                             <Text size='xs' >Number</Text>
                           </div>
                         </Group>
                       </UnstyledButton>
                       <UnstyledButton  onClick={() => {createQuestion('float')}} >
                         <Group>
                           <Point size={20} />
                           <div>
                             <Text size='xs' >Float</Text>
                           </div>
                         </Group>
                       </UnstyledButton>
                     </Group>
                     <Group direction='column'>
                     <UnstyledButton  onClick={() => {createQuestion('select')}} >
                         <Group>
                           <Selector size={20} />
                           <div>
                             <Text size='xs' >Select</Text>
                           </div>
                         </Group>
                       </UnstyledButton>
                       <UnstyledButton  onClick={() => {createQuestion('time')}} >
                         <Group>
                           <Clock size={20} />
                           <div>
                             <Text size='xs' >Time</Text>
                           </div>
                         </Group>
                       </UnstyledButton>
                       <UnstyledButton  onClick={() => {createQuestion('date')}} >
                         <Group>
                           <Calendar size={20} />
                           <div>
                             <Text size='xs' >Date</Text>
                           </div>
                         </Group>
                       </UnstyledButton>
                       </Group>
                       <Group direction='column'>
                       <UnstyledButton  onClick={() => {createQuestion('point')}} >
                         <Group>
                           <Location size={20} />
                           <div>
                             <Text size='xs' >Geo-point</Text>
                           </div>
                         </Group>
                       </UnstyledButton>
                       <UnstyledButton  onClick={() => {createQuestion('line')}}>
                         <Group>
                           <Line size={20} />
                           <div>
                             <Text size='xs' >Polyline</Text>
                           </div>
                         </Group>
                       </UnstyledButton>
                       <UnstyledButton  onClick={() => {createQuestion('polygon')}} >
                         <Group>
                           <Polygon size={20} />
                           <div>
                             <Text size='xs' >Polygon</Text>
                           </div>
                         </Group>
                       </UnstyledButton>
                       </Group>
                                           <Group direction='column'>
                       <UnstyledButton  onClick={() => {createQuestion('range')}} >
                         <Group>
                           <Star size={20} />
                           <div>
                             <Text size='xs' >Range</Text>
                           </div>
                         </Group>
                       </UnstyledButton>
                       <UnstyledButton  onClick={() => {createQuestion('blob')}} >
                         <Group>
                           <Photo size={20} />
                           <div>
                             <Text size='xs' >Blob</Text>
                           </div>
                         </Group>
                       </UnstyledButton>
                       <UnstyledButton  onClick={() => {createQuestion('sign')}} >
                         <Group>
                           <Signature size={20} />
                           <div>
                             <Text size='xs' >Signature</Text>
                           </div>
                         </Group>
                       </UnstyledButton>
                       </Group>
                   </SimpleGrid>
                 ) : null}
                 <div ref={targetRef} style={{height: 200}} ></div>

                </>
              ) : null}
             </>
              ) : (
              <div>
                <Text>Chart</Text>
              </div>
            ) }
          
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