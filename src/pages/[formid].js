import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  ActionIcon,
  Button,
  TextInput,
  Tab,
  Tabs,
  Drawer,
  Paper,
  Title,
  Box,
  Affix,
  Menu,
  InputWrapper,
  Select,
  ScrollArea,
  ColorSwatch,
  MantineProvider,
  Grid,
  Card,
  UnstyledButton,
  Divider,
  Switch,
  RadioGroup,
  Radio,
  Popover,
  Anchor,
  Checkbox as MantineCheckbox,
  CheckboxGroup,
  SimpleGrid,
  Textarea,
  Slider,
  Modal,
  Image,
  Alert,
} from '@mantine/core';
import { createStyles, Autocomplete, Group, } from '@mantine/core';
import { useBooleanToggle, useDocumentTitle, useFocusWithin, useMediaQuery, useScrollLock } from '@mantine/hooks';
import { ColorPicker, FileText, Eye, Search, CircleDot, DotsVertical, Palette, X, Edit, CirclePlus, FileImport, ClearFormatting, Photo, Video, LayoutList, Check, Selector, ChevronDown, AlignCenter, Checkbox, GridPattern, GridDots, Calendar, Clock, Line, Polygon, FileUpload, Location, Copy, Trash, LayoutGrid, Plus, ChevronUp, ArrowBack, Send, Stack, Gps, CircleCheck, Lock, LockOpen, AlertCircle } from 'tabler-icons-react';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical } from 'tabler-icons-react';
import { uuid } from 'uuidv4';
import { useRouter } from 'next/router';
import { useUser } from 'lib/hooks';
import { LoopIcon, SliderIcon, TextAlignLeftIcon } from '@modulz/radix-icons';
import { IoMdArrowDropdownCircle, IoMdCheckmarkCircle, IoMdSave } from 'react-icons/io';
import { DatePicker, TimeInput } from '@mantine/dates';
import { NotificationsProvider } from '@mantine/notifications';
import { showNotification } from '@mantine/notifications'
import ReactMapboxGl, { Layer, Feature, Marker, Source } from 'react-mapbox-gl';
import { UploadAudio, UploadVideo, UploadPresentation, UploadDocument, UploadSpreadshit, UploadPDF, UploadImage, UploadAny } from '../components/upload';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from 'components/pin';
import { Helmet } from 'react-helmet';
import { storeFiles } from 'lib/upload';
import { filesArr } from 'lib/upload';
import SuccessImage from 'assets/illustrations/success.png';
import MapIcon from 'components/marker.gif'
import { pointRadial, timeFormatDefaultLocale } from 'd3';
const accessToken = 'pk.eyJ1IjoiZGF2aXNraXRhdmkiLCJhIjoiY2w0c2x2NjNwMGRvbDNrbGFqYW9na2NtaSJ9.q5rs7WMJE8oaBQdO4zEAcg';

 
const colors = ['#101113', '#212529', '#C92A2A', '#A61E4D', '#862E9C', '#5F3DC4', '#364FC7', '#1864AB', '#0B7285', '#087F5B', '#2B8A3E', '#5C940D', '#E67700', '#D9480F']
const color_strings = ['dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange'];
const backgrounds = [{label: 'Light', value: '#foebf8'}, {label: 'Medium', value: '#e1d8f1'}, {label: 'Dark', value: '#d1c4e9'}, {label: 'Gray', value: '#f6f6f6'}]

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  wrapper: {
    borderRadius: theme.radius.md,
    marginBottom: 20,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: 'column-reverse',
      padding: theme.spacing.xl,
    },
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  maincard: {
    marginBottom: 20,
    borderLeftWidth: 5, 
    borderLeftColor: '#2f5496',
  },

  item: {
    display: 'flex',
    alignItems: 'space-between',
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },

  roboto: {
    fontFamily: 'Roboto',
  },

  splash: {
    fontFamily: 'Splash',
  },

  openSans: {
    fontFamily: 'Open Sans',
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
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


export default function AppShellDemo() {
  const [forms, setForms] = useState([]);
  const { classes } = useStyles();
  const Access_Key = 'SZMxfetdVLzmhlllpelhSjdTiHYhEEnqInpun7hQZFw';
  const video_key = 'AIzaSyDMzfZMNpyPU8zrBu7BiLIrzuldHQgsJ8k';
  const router = useRouter();
  //const { pid } = router.query
  const [pid, setPID] = useState('');
  const [obj, setObj] = useState(null);
  const [done, setDone] = useState(false);
  const [nullform, setNullForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [required, setRequired] = useState([]);

  //useDocumentTitle(obj === null ? 'Loading...' : obj.title + ' | '+ obj.description)

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [accuracy, setAccuracy] = useState('');
  const [altitude, setAltitude] = useState('');
  const [altAccuracy, setAltAccuracy] = useState('');
  const [direction, setDirection] = useState('');
  const [speed, setSpeed] = useState('');

  const [center, setCenter] = useState([37.65, -1.23]);


  React.useEffect(() => {
    const handleGPS = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          setCenter([parseFloat(position.coords.longitude), parseFloat(position.coords.latitude)]);
        }, (error) => {showNotification({
          title: 'Check your location settings',
          message: 'Seems like your device is not configured well',
          color: 'red'
        })})
      } else {
        showNotification({
          title: 'Geolocation error',
          message: 'Your device does not support geolocation'
        })
      }
    }

    handleGPS();

  const retrieveForm = async () => {
    if (router.asPath !== router.route) {
      let a = router.query;
      let form_id = a.formid;
      setPID(form_id);
  
      const body = {
        form_id: form_id
      };
  
      await fetch('/api/getform', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      }).then(async function(res) {
        if(res.status === 200) {
          res = await res.json();
          console.log(res);
          if(res.form !== null){
            setObj(res.form);
            setForms(res.form.question);
            setDone(true);
          } else {
            setDone(true);
            setNullForm(true);
          }
  
        }
      }).catch(function(error){
        console.log(error);
      })
    }
  }

  retrieveForm();
}, [router]);

const prepareAnswerStore = () => {
  let arr = [];
  let required = [];
  for(let i=0; i<forms.length; i++){
    if(forms[i].type === 1){
      let qt = forms[i].question.questionType;
      let req = forms[i].question.required;
      let chunk = {id:forms[i].id, required: req,  position: forms[i].position, questionType: qt, question: forms[i].question.defaultValue, response: qt === 'Short Answer' || qt === 'Paragraph' || qt === 'Multiple Choice' || qt === 'Dropdown' ? '' : qt === 'Checkbox'  ? [] : qt === 'Date' || qt === 'Time' ? new Date() :  null };
      arr.push(chunk);
    } else {
      continue;
    }
  }
  setAnswers(arr);
}

React.useEffect(() => {
  if(done && !nullform){
    prepareAnswerStore();
  }

}, [done]);

const submitAnotherResponse = () => {
  prepareAnswerStore();
  setSubmitted(false);
}

const RenderQuestions = () => {
  const handleQuestion = (q, id, parent) => {
    switch(q) {
      case 'Short Answer':
        return handleShortAnswer(id, parent);
  
      case 'Paragraph':
        return handleParagraph(id, parseInt);
  
  
      case 'Multiple Choice':
        return handleMultipleChoice(id, parseInt);
  
  
      case 'Checkbox':
        return handleCheckbox(id, parent);
  
      case 'Dropdown':
        return handleDropdown(id, parent);
  
      case 'File Upload':
        return handleFileUpload(id, parent);
  
      case 'Linear Scale':
        return handleLinearScale(id, parent);
  
      case 'Multiple Choice Grid':
        return handleMultipleChoiceGrid(id, parent);
  
      case 'Checkbox Grid':
        return handleCheckboxGrid(id, parent);
  
      case 'Date':
        return handleDate(id, parent);
  
      case 'Time':
        return handleTime(id, parent);
  
      case 'Point':
        return handlePoint(id, parent);
  
      case 'Polyline':
        return handlePolyline(id, parent);
  
      case 'Polygon':
        return handlePolygon(id, parent);
  
      default:
        console.log('undefined');
    }
  }

  const retrieveShortAns = (id) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let ans = answers[idx];
      return ans.response;
    } else {
      return null;
    }
  }
  
  const handleShortAnswer = (id, p) => {
    const [text, setText] = useState('');
    const [error, setError] = useState(false);
    const [required, setRequired] = useState(false);
    let idx = forms.findIndex((obj => obj.id == id));
    let item = forms[idx];

  
    React.useEffect(() => {
      let ans = retrieveShortAns(id);
      if(ans !== null){
        setText(ans);
      }
    }, []);

    const handleChange = (text) => {
      setText(text);
      handleChange2(text);
    }

    const handleBlur = (txt) => {
      if(item.question.required){
        if(txt == ''){
          setError(true)
        } else {
          setError(false);
        }
      }
    }

    const handleFocus = () => {
      setError(false);
    }

    const handleChange2 = useCallback((text) => {
      let idx = answers.findIndex((obj => obj.id == id));
      if(idx !== -1){
        let chunk = answers[idx];
        chunk.response = text;
      } else {
        let chunk = {id: id, position: item.position, response: text};
        setAnswers(prevAns => [...prevAns, chunk]);
      }
    
    }, []);
  

    return (
    <InputWrapper error={error} required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
  
  <TextInput error={error ? "The response for this question is required" : null} onFocus={() => {handleFocus()}} onBlur={(e) => {handleBlur(e.currentTarget.value)}} value={text} onChange={(e) => {handleChange(e.currentTarget.value)}} />
  
    </InputWrapper>
      
    )
  }
  
  const retrieveParagraphAnsw = (id) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let ans = answers[idx];
      return ans.response;
    } else {
      return null;
    }
  }
  
  const handleParagraph = (id, p) => {
    const [text, setText] = useState('');
    const [error, setError] = useState(false);
    let idx = forms.findIndex((obj => obj.id == id));
    let item = forms[idx];
  
    React.useEffect(() => {
      let ans = retrieveParagraphAnsw(id);
      if(ans !== null){
        setText(ans);
      }
    }, []);
  
    const handleChange = (text) => {
      setText(text);

      handleChange2(text);
    }

    const handleBlur = (txt) => {
      if(item.question.required){
        if(txt == ''){
          setError(true)
        } else {
          setError(false);
        }
      }
    }

    const handleFocus = () => {
      setError(false);
    }

    const handleChange2 = useCallback((text) => {
      let idx = answers.findIndex((obj => obj.id == id));
      if(idx !== -1){
        let chunk = answers[idx];
        chunk.response = text;
      } else {
        let chunk = {id: id, position: item.position, response: text};
        setAnswers(prevAns => [...prevAns, chunk]);
      }

    
    }, []);

    return (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
  
      <Textarea error={error ? "The response for this question is required" : null} value={text} onFocus={() => {handleFocus()}} onBlur={(e) => {handleBlur(e.currentTarget.value)}} onChange={(e) => {handleChange(e.currentTarget.value)}}  />
  
      </InputWrapper>
    )
  }
  
  const retrieveMultipleChoiceAns = (id) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let answ = answers[idx];
      return answ.response;
    } else {
      return null;
    }
  }
  
  const handleMultipleChoice = (id, p) => {
    const [str, setStr] = useState('');
    const [error, setError] = useState(false);
    let idx = forms.findIndex((obj => obj.id == id));
    let item = forms[idx];
  
    React.useEffect(() => {
      let opt = retrieveMultipleChoiceAns(id);
      if(opt !== null){
        setStr(opt);
      }
    }, []);
  
    const handleChange = (text) => {
      setStr(text);

      handleChange2(text);
    }

    const handleBlur = () => {
      if(item.question.required){
        if(str == ''){
          setError(true)
        } else {
          setError(false);
        }
      }
    }

    const handleFocus = () => {
      setError(false);
    }

    const handleChange2 = useCallback((text) => {
      let idx = answers.findIndex((obj => obj.id == id));
      if(idx !== -1){
        let chunk = answers[idx];
        chunk.response = text;
      } else {
        let chunk = {id: id, position: item.position, response: text};
        setAnswers(prevAns => [...prevAns, chunk]);
      }

    
    }, []);

    return (
      <RadioGroup error={error} onFocus={() => {handleFocus()}} onBlur={() => {handleBlur()}} value={str} onChange={(val) => {handleChange(val)}} required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
          {item.question.radioOptions.length > 0 && item.question.radioOptions.map((radio) => {
            return (
              <Radio value={radio.label} label={radio.label} key={radio.id} />
            )
          })}
        </RadioGroup>
    )
  }
  const retrieveCheckboxAnsw = (id) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let answ = answers[idx];
      return answ.response
    } else {
      return null;
    }
  }
  const handleCheckbox = (id, p) => {
    const [str, setStr] = useState([]);
    let idx = forms.findIndex((obj => obj.id == id));
    let item = forms[idx];
  
    React.useEffect(() => {
      let opts = retrieveCheckboxAnsw(id);
      if(opts !== null){
        setStr(opts);
      }
    }, []);

    const handleChange = (str) => {
      setStr(str);

      handleChange2(str);
    }
  
    const handleChange2 = useCallback((str) => {
      let idx = answers.findIndex((obj => obj.id == id));
      if(idx !== -1){
        let chunk = answers[idx];
        chunk.response = str;
      } else {
        let chunk = {id: id, position: item.position, response: str};
        setAnswers(prevAns => [...prevAns, chunk]);
      }


    }, []);
  
    return (
      <CheckboxGroup value={str} onChange={handleChange} required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      {item.question.checkboxOptions.length > 0 && item.question.checkboxOptions.map((check) => {
        return (
          <MantineCheckbox key={check.id} value={check.label} label={check.label} />
        )
      })}
    </CheckboxGroup>
    )
  }
  
  const handleDropdown = (id, p) => {
    const [str, setStr] = useState('');
    let idx = forms.findIndex((obj => obj.id == id));
    let item = forms[idx];

    const handleChange = (str) => {
      setStr(str);
      handleChange2(str);
    }
  
    const handleChange2 = useCallback((str) => {
      let idx = answers.findIndex((obj => obj.id == id));
      if(idx !== -1){
        let chunk = answers[idx];
        chunk.response = str;
      } else {
        let chunk = {id: id, position: item.position, response: str};
        setAnswers(prevAns => [...prevAns, chunk]);
      }

    }, []);
  
    return (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
        <Select value={str} onChange={(val) => {handleChange(val)}} data={item.question.dropdownOptions} />
      </InputWrapper>
    )
  }
  
  const handleFileUpload = (id, p) => {
    let idx = forms.findIndex((obj => obj.id == id));
    let q = forms[idx];
    let item = forms[idx];
    
    return (
      q.question.uploadSpecifics.document ? (
        <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
        <UploadDocument position={item.position} />
        </InputWrapper>
      ) : q.question.uploadSpecifics.spreadshit ? (
        <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
        <UploadSpreadshit position={item.position} />
        </InputWrapper>
      ) : q.question.uploadSpecifics.pdf ? (
        <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
        <UploadPDF position={item.position} />
        </InputWrapper>
      ) : q.question.uploadSpecifics.video ? (
        <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
        <UploadVideo position={item.position} />
        </InputWrapper>
      ) : q.question.uploadSpecifics.audio ? (
        <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
        <UploadAudio position={item.position} />
        </InputWrapper>
      ) : q.question.uploadSpecifics.presentation ? (
        <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
        <UploadPresentation position={item.position} />
        </InputWrapper>
      ) : q.question.uploadSpecifics.image ? (
        <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
        <UploadImage position={item.position} />
        </InputWrapper>
      ) : (
        <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
        <UploadAny position={item.position} />
        </InputWrapper>
      )
    )
  }
  
  const handleLinearScale = (id, p) => {
    let idx = forms.findIndex((obj => obj.id == id));
    let item = forms[idx];
    const [value, setValue] = useState(item.question.linearFrom)
  
    const handleChange = (value) => {
      setValue(value);

      handleChange2(value);
    }

    const handleChange2 = useCallback((value) => {
      let idx = answers.findIndex((obj => obj.id == id));
      if(idx !== -1){
        let chunk = answers[idx];
        chunk.response = value;
      } else {
        let chunk = {id: id, position: item.position, response: value};
        setAnswers(prevAns => [...prevAns, chunk]);
      }

    }, []);
    return (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
  
  <Slider value={value} min={item.question.linearFrom} max={item.question.linearTo}  onChange={(val) => {handleChange(val)}} marks={[{value: item.question.linearFrom, label: item.question.linearLabel1}, {value: item.question.linearTo, label: item.question.linearLabel2}]} />
  
      </InputWrapper>
    )
  }
  
  const handleDate = (id, p) => {
    const [date, setDate] = useState(new Date());
    let idx = forms.findIndex((obj => obj.id == id));
    let item = forms[idx];

    const handleChange = (date) => {
      setDate(date);
      handleChange2(date);
    }
  
    const handleChange2 = useCallback((date) => {
      let idx = answers.findIndex((obj => obj.id == id));
      if(idx !== -1){
        let chunk = answers[idx];
        chunk.response = date;
      } else {
        let chunk = {id: id, position: item.position, response: date};
        setAnswers(prevAns => [...prevAns, chunk]);
      }

    }, []);
  
    return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <DatePicker value={date} onChange={(val) => {handleChange(val)}} />
    </InputWrapper>
    )
  }
  
  const handleTime = (id, p) => {
    const [time, setTime] = useState(new Date());
    let idx = forms.findIndex((obj => obj.id == id));
    let item = forms[idx];

    const handleChange = (time) => {
      setTime(time);

      handleChange2(time);
    }
  
    const handleChange2 = useCallback((time) => {
      let idx = answers.findIndex((obj => obj.id == id));
      if(idx !== -1){
        let chunk = answers[idx];
        chunk.response = time;
      } else {
        let chunk = {id: id, position: item.position, response: time};
        setAnswers(prevAns => [...prevAns, chunk]);
      }
    }, []);
  
    return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <TimeInput value={time} onChange={(val) => {handleChange(val)}} />
    </InputWrapper>
    )
  }
  
  const retrievePointLoc = (id) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let ans = answers[idx];
      return ans.response;
    } else {
      return null;
    }
  }
  
  const handlePoint = (id) => {
    const Map = ReactMapboxGl({
      accessToken: accessToken,
    });
  
    const [lat1, setLat1] = useState('');
    const [lng1, setLng1] = useState('');
    const [acc1, setAcc1] = useState('');
    const [alt1, setAlt1] = useState('');
    const [locked, setLocked] = useState(false);
  
    React.useEffect(() => {
      let itm = retrievePointLoc(id);
      if(itm !== null){
        setLat1(parseFloat(itm.coords.latitude));
        setLng1(parseFloat(itm.coords.longitude));
        setAcc1(parseFloat(itm.coords.accuracy));
        setAlt1(itm.coords.altitude);
      }
    }, []);
  
    let idx = forms.findIndex((obj => obj.id == id));
    let item = forms[idx];
  
    const [point, setPoint] = useState({});
  
  
    const handleGPS = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          setLat1(parseFloat(position.coords.latitude));
          setLng1(parseFloat(position.coords.longitude));
          setAcc1(parseFloat(position.coords.accuracy));
          setAlt1(position.coords.altitude);
  
          savePoint(position);
  
        }, (error) => {showNotification({
          title: 'Check your location settings',
          message: 'Seems like your device is not configured well',
          color: 'red'
        })})
      } else {
        showNotification({
          title: 'Geolocation error',
          message: 'Your device does not support geolocation'
        })
      }
    }

    const savePoint = useCallback((pos) => {
      let idx = answers.findIndex((obj => obj.id == id));
      let item = answers[idx];
      item.response = {latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy, altitude: pos.coords.altitude};
    }, []);
  
  
    return (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <Group position='right' mb={10}>
      {lat1 === '' ? <ActionIcon onClick={() => {handleGPS()}} ><Gps /></ActionIcon> : null}
      </Group>
      <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
      <Grid columns={12}>
        <Grid.Col span={3}>
          <Group direction='column'>
          <TextInput disabled={locked} value={lat1} onChange={(e) => {setLat1(e.currentTarget.value)}} size='sm' label='Latitude' />
            <TextInput disabled={locked}  value={lng1} onChange={(e) => {setLng1(e.currentTarget.value)}} size='sm' label='Longitude' />
            <TextInput disabled={locked} value={alt1} onChange={(e) => {setAlt1(e.currentTarget.value)}}  size='sm' label="Altitude" />
            <TextInput disabled={locked} value={acc1} onChange={(e) => {setAcc1(e.currentTarget.value)}}  size='sm' label="Accuracy" />
          </Group>
        </Grid.Col>
  
        <Grid.Col span={9}>                
        <Map
    style="mapbox://styles/mapbox/streets-v9"
    containerStyle={{
      height: '100%',
      width: '100%'
    }}
    zoom={lat1 !== null ? [20] : [0]}
    center={lat1 !== null ? [lng1, lat1] : center}
  >
  {lat1 !== null ? (
    <Marker
    coordinates={[lng1, lat1]}
    anchor="bottom">
      <img height={30} width={30} src={MapIcon}/>
  </Marker>
  ) : null}
  </Map>      </Grid.Col>
      </Grid>
      </MediaQuery>
  
      <MediaQuery largerThan='md' styles={{display: 'none'}}>
      <Group direction='column'>
      <TextInput disabled={locked} value={lat1} onChange={(e) => {setLat1(e.currentTarget.value)}} size='sm' label='Latitude' />
            <TextInput disabled={locked}  value={lng1} onChange={(e) => {setLng1(e.currentTarget.value)}} size='sm' label='Longitude' />
            <TextInput disabled={locked} value={alt1} onChange={(e) => {setAlt1(e.currentTarget.value)}}  size='sm' label="Altitude" />
            <TextInput disabled={locked} value={acc1} onChange={(e) => {setAcc1(e.currentTarget.value)}}  size='sm' label="Accuracy" />
          </Group>
      </MediaQuery>
    </InputWrapper>
    )
  }
  
  const retrievePolylineLoc = (id) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let ans = answers[idx];
      console.log(ans.response.length - 1);
       return  ans.response.length - 1;
    } else {
      return null;
    }
  }
  
  const handlePolyline = (id, p) => {
    const Map = ReactMapboxGl({
      accessToken: accessToken,
    });
  
    const [lat1, setLat1] = useState(-1.234);
    const [lng1, setLng1] = useState(36.754);
    const [acc1, setAcc1] = useState(0);
    const [alt1, setAlt1] = useState(0);
    const [locked, setLocked] = useState(false);
  
    const [res, setRes] = useState([]);
  
    const [polyline, setPolyline] = useState([]);
    const [coords, setCoords] = useState([]);
  
    let idx = forms.findIndex((obj => obj.id == id));
    let item = forms[idx];
  
    let arr = [];
  
    const handleGPS = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          setLat1(parseFloat(position.coords.latitude));
          setLng1(parseFloat(position.coords.longitude));
          setAcc1(parseFloat(position.coords.accuracy));
          setAlt1(parseFloat(position.coords.altitude));
  
          let chunk = [parseFloat(position.coords.longitude), parseFloat(position.coords.latitude)];
          setCoords(prevArr => [...prevArr, chunk]);
  
          let chunk2 = {latitude: parseFloat(position.coords.latitude), longitude: parseFloat(position.coords.longitude), accuracy: parseFloat(position.coords.accuracy), altitude: position.coords.altitude }

          setPolyline(prevArr => [...prevArr, chunk2]);
  
          savePoint(position);
          arr.push(chunk);
  
        }, (error) => {showNotification({
          title: 'Check your location settings',
          message: 'Seems like your device is not configured well',
          color: 'red'
        })})
      } else {
        showNotification({
          title: 'Geolocation error',
          message: 'Your device does not support geolocation'
        })
      }
    }

    const savePoint = useCallback((pos) => {
      let chunk = {latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy, altitude: pos.coords.altitude};
      setRes(chunk);
    }, []);

  
    const lockCoordinate = () => {
      setLocked(true);
      let idx = answers.findIndex((obj => obj.id == id));
      let item = answers[idx];
      item.response = polyline;
    }
  
    return (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <Group position='right' mb={10}>
      {polyline.length > 1 ? <ActionIcon title='Close Polygon' onClick={() => {lockCoordinate()}}><Lock color='red' size={30} /></ActionIcon>
  : null} 
        {!locked ? <ActionIcon onClick={() => {handleGPS()}} ><Gps color='green' /></ActionIcon> : null}
      </Group>
      <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
      <Grid columns={12}>
        <Grid.Col span={3}>
          <Group direction='column'>
          <Group>
          {polyline.map((item, index) => {
            <ActionIcon key={index} >
              <CircleCheck size={13} />
            </ActionIcon>
          })}
        </Group>
            <TextInput disabled={locked} value={lat1} onChange={(e) => {setLat1(e.currentTarget.value)}} size='sm' label='Latitude' />
            <TextInput disabled={locked}  value={lng1} onChange={(e) => {setLng1(e.currentTarget.value)}} size='sm' label='Longitude' />
            <TextInput disabled={locked} value={alt1} onChange={(e) => {setAlt1(e.currentTarget.value)}}  size='sm' label="Altitude" />
            <TextInput disabled={locked} value={acc1} onChange={(e) => {setAcc1(e.currentTarget.value)}}  size='sm' label="Accuracy" />
          </Group>
        </Grid.Col>
  
        <Grid.Col span={9}>                
        <Map
    style="mapbox://styles/mapbox/streets-v9"
    containerStyle={{
      height: '100%',
      width: '100%'
    }}
    zoom={polyline.length > 0 ? [20] : [0]}
    center={[lng1, lat1]}
    onClick={(event) => {
      console.log(event);
    }}
  >
  {polyline.length > 0 ? polyline.map((item, index) => {
    return (
      <Marker
            key={`marker-${index}`}
            coordinates={[parseFloat(item.longitude), parseFloat(item.latitude)]}
            anchor="bottom"
          >
            <Pin />
          </Marker>
    )
  }) : null}
  </Map>      </Grid.Col>
      </Grid>
      </MediaQuery>
  
      <MediaQuery largerThan='md' styles={{display: 'none'}}>
      <Group direction='column'>
      <TextInput disabled={locked} value={lat1} onChange={(e) => {setLat1(e.currentTarget.value)}} size='sm' label='Latitude' />
            <TextInput disabled={locked}  value={lng1} onChange={(e) => {setLng1(e.currentTarget.value)}} size='sm' label='Longitude' />
            <TextInput disabled={locked} value={alt1} onChange={(e) => {setAlt1(e.currentTarget.value)}}  size='sm' label="Altitude" />
            <TextInput disabled={locked} value={acc1} onChange={(e) => {setAcc1(e.currentTarget.value)}}  size='sm' label="Accuracy" />
       </Group>
      </MediaQuery>
    </InputWrapper>
    )
  }
  
  const retrievePolygonLoc = (id) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let ans = answers[idx];
       return  ans.response.length - 1;
    } else {
      return null;
    }
  }
  
  const handlePolygon = (id, p) => {
    const Map = ReactMapboxGl({
      accessToken: accessToken,
    });
  
    const [lat1, setLat1] = useState(-1.234);
    const [lng1, setLng1] = useState(36.567);
    const [acc1, setAcc1] = useState(0);
    const [alt1, setAlt1] = useState(0);
    const [locked, setLocked] = useState(false);
  
    const [res, setRes] = useState([]);
  
    const [polygon, setPolygon] = useState([]);
    const [coords, setCoords] = useState([]);
  
    let idx = forms.findIndex((obj => obj.id == id));
    let item = forms[idx];
  
    let arr = [];
  
    const handleGPS = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          setLat1(parseFloat(position.coords.latitude));
          setLng1(parseFloat(position.coords.longitude));
          setAcc1(parseFloat(position.coords.accuracy));
          setAlt1(parseFloat(position.coords.altitude));
  
          let chunk = [parseFloat(position.coords.longitude), parseFloat(position.coords.latitude)];
          setCoords(prevArr => [...prevArr, chunk]);
          let chunk2 = {latitude: parseFloat(position.coords.latitude), longitude: parseFloat(position.coords.longitude), accuracy: parseFloat(position.coords.accuracy), altitude: position.coords.altitude }
          setPolygon(prevArr => [...prevArr, chunk2]);
  
          savePoint(position);
          arr.push(chunk);
  
        }, (error) => {showNotification({
          title: 'Check your location settings',
          message: 'Seems like your device is not configured well',
          color: 'red'
        })})
      } else {
        showNotification({
          title: 'Geolocation error',
          message: 'Your device does not support geolocation'
        })
      }
    }

    const savePoint = useCallback((pos) => {
      let chunk = {latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy, altitude: pos.coords.altitude};
      setRes(chunk);
    }, []);

  
    const lockCoordinate = () => {
      setLocked(true);
      let idx = answers.findIndex((obj => obj.id == id));
      let item = answers[idx];
      item.response = polygon;
    }
  
    return (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <Group position='right' mb={10}>
      {polygon.length > 2 ? <ActionIcon title='Close Polygon' onClick={() => {lockCoordinate()}}><Lock color='red' size={30} /></ActionIcon>
  : null} 
        {!locked ? <ActionIcon onClick={() => {handleGPS()}} ><Gps color='green' /></ActionIcon> : null}
      </Group>
      <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
      <Grid columns={12}>
        <Grid.Col span={3}>
          <Group direction='column'>
          <Group>
          {polygon.map((item, index) => {
            <ActionIcon key={index} >
              <CircleCheck size={13} />
            </ActionIcon>
          })}
        </Group>
            <TextInput disabled={locked} value={lat1} onChange={(e) => {setLat1(e.currentTarget.value)}} size='sm' label='Latitude' />
            <TextInput disabled={locked}  value={lng1} onChange={(e) => {setLng1(e.currentTarget.value)}} size='sm' label='Longitude' />
            <TextInput disabled={locked} value={alt1} onChange={(e) => {setAlt1(e.currentTarget.value)}}  size='sm' label="Altitude" />
            <TextInput disabled={locked} value={acc1} onChange={(e) => {setAcc1(e.currentTarget.value)}}  size='sm' label="Accuracy" />
          </Group>
        </Grid.Col>
  
        <Grid.Col span={9}>                
        <Map
    style="mapbox://styles/mapbox/streets-v9"
    containerStyle={{
      height: '100%',
      width: '100%'
    }}
    zoom={polygon.length > 0 ? [20] : [0]}
    center={[lng1, lat1]}
    onClick={(event) => {
      console.log(event);
    }}
  >
  {polygon.length > 0 ? polygon.map((item, index) => {
    return (
      <Marker
            key={`marker-${index}`}
            coordinates={[parseFloat(item.longitude), parseFloat(item.latitude)]}
            anchor="bottom"
          >
            <Pin />
          </Marker>
    )
  }) : null}
  </Map>      </Grid.Col>
      </Grid>
      </MediaQuery>
  
      <MediaQuery largerThan='md' styles={{display: 'none'}}>
      <Group direction='column'>
      <TextInput disabled={locked} value={lat1} onChange={(e) => {setLat1(e.currentTarget.value)}} size='sm' label='Latitude' />
            <TextInput disabled={locked}  value={lng1} onChange={(e) => {setLng1(e.currentTarget.value)}} size='sm' label='Longitude' />
            <TextInput disabled={locked} value={alt1} onChange={(e) => {setAlt1(e.currentTarget.value)}}  size='sm' label="Altitude" />
            <TextInput disabled={locked} value={acc1} onChange={(e) => {setAcc1(e.currentTarget.value)}}  size='sm' label="Accuracy" />
       </Group>
      </MediaQuery>
    </InputWrapper>
    )
  }

  const items = forms.map((item, index) => (
    <Card key={item.id} shadow='md' className={classes.maincard}>
      {item.type == 1 ? (
        <Card>
            {handleQuestion(item.question.questionType, item.id, item.parent)}
        </Card>
      ) : item.type == 2 ? (
        <Card mt={20} style={{borderLeftWidth: 5, borderLeftColor: obj.Color}} >
                  <Text mb={10}>{item.question.title}</Text>
                  <Text size='xs' color='gray'>{item.question.description}</Text>
        </Card>
      ) : item.type == 3 ? (
        <Card mt={20} shadow={'sm'} >
                <Image style={{marginLeft: '1%', marginRight: '1%'}} height={200} src={item.image} />
        </Card>
      ) : item.type == 4 ? (
        <Card mt={20} shadow='sm'>
  
        </Card>
      ) : (
        <Card mt={20} shadow='sm'>
            <Text size="xl" weight={500} mt="md" ml="md" >{item.title}</Text>
            <Text color='gray' ml='md' mt='md' mb={20}>{item.description}</Text>
        </Card>
      )}
    </Card>
  ));

  return (
    <>
      {items}
    </>
  )
}

const submitAnswers = async (e) => {

  for(let i=0; i<filesArr.length; i++){
    let item = filesArr[i];

    let idx = answers.findIndex((obj => obj.position == item.position));
    let obj = answers[idx];

    obj.response = item.file;
    
  }

  storeFiles();

  const body = {
    response: answers,
    response_id: uuid(),
    form_id: pid
  };

   try {
    await fetch('/api/createresponse', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    }).then(function(res){
      if(res.status == 200){
        setSubmitted(true);
      }
    })
  } catch(error){
    console.log(error);
  } 

  
}
    
  return (
      <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        other: {
          RobotoFamily: 'Roboto, sans-serif',
          SplashFamily: 'Splash, sans-serif',
          SansSerif: { fontFamily: 'Greycliff CF, sans-serif' },
        }
      }}
    >
    <NotificationsProvider position="top-right" zIndex={2077} >
    <AppShell
      styles={{
        main: {
          background: done ? obj.background : 'gray',
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      >

          <>
          <Helmet title = {obj === null ? "GeoPsy Collect Form" : obj.title}
          htmlAttributes={{ lang: "en" }}
          meta={[
        {
          name: `description`,
          content: obj === null ? "Derive patterns and insights from complex data" : obj.description,
        },
        {
          property: "og:url",
          content: "https://collect-v2.vercel.app"
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:title",
          content: obj === null ? "GeoPsy Collect | Survey Form" : obj.title
        },
        {
          property: "og:description",
          content: obj === null ? "Derive patterns and insights from complex data with ease." : obj.description,
        },
        {
          property: "og:image",
          content: SuccessImage
        }, 
        {
          property: "twitter:card",
          content: "GeoPsy Collect | Derive insights and patterns from complex data with ease."
        },
        {
          property: "twitter:creator",
          content: "David Kitavi | GeoPsy Collect"
        },
        {
          property: "twitter:title",
          content: obj === null ? "GeoPsy Collect | Survey Form" : obj.title
        },
        {
          property: "twitter:description",
          content:  obj === null ? "Derive patterns and insights from complex data with ease." : obj.description,
        },
        {
          property: "twitter:image",
          content: SuccessImage
        }
      ]}
   />
          {done && !nullform && !submitted ? (
            <>
            <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
            <div style={{marginRight: 300, marginLeft: 300}}>
              <form onSubmit={(e) => {submitAnswers(e)}}  >
              {obj.header_image !== null && obj.header_image !== undefined ? ( 
                <Card mt={20} shadow={'sm'} >
                        <Image  height={400} src={obj.header_image} />
                </Card>
               ) : null}
          <Box mt={20} className={classes.wrapper} style={{borderTopWidth: 10, borderTopColor: obj.color, borderLeftWidth: 5, borderLeftColor: '#2f5496'}} >
            <Text style={{fontFamily: obj.headerfont, fontSize: parseInt(obj.headersize)}} weight={500}  mt="md" ml="md" >{obj.title}</Text>
            <Text color='gray'  ml='md' mt='md' mb={20}>{obj.description === 'Form description' ? "" : obj.description}</Text>
            <Text ml='md' mt='md' mb={20} color='dimmed'><span style={{color: 'red'}} >*</span> Required</Text>
          </Box>
            {forms.length > 0 && obj.active ? (
              <RenderQuestions />
            ) : forms.length > 0 && !obj.active ? (
              <Paper mt={20} p='md' >
              <Alert icon={<AlertCircle size={16} />} title="Bummer" color="red">
      This form is no longer receiving responses.
    </Alert>
            </Paper>
            ) : null}

          {forms.length > 0 && obj.active ? (
            <>
            <Group  ml="md" mt={20} position="left">
              <Text ><strong>Note: </strong>Do not submit your passwords or any other personal information.</Text>
            </Group>
            <Group  ml="md" position="left">
              <Text >This form violates our <Anchor>Terms</Anchor>? Report <Anchor>here</Anchor></Text>
            </Group>
            <Group ml="md" mt={20} position='left'>
            <Button onClick={() => {submitAnswers()}} style={{backgroundColor: obj.color}}  color={obj.color} >Submit</Button>
          </Group>
          </>
            ) : null}

            </form>
          </div>
            </MediaQuery>
            <MediaQuery largerThan='md' styles={{display: 'none'}}>
            <div style={{marginRight: '1%', marginLeft: '1%'}}>
              <form >
          <Box mt={20} className={classes.wrapper} style={{borderTopWidth: 10, borderTopColor: obj.color, borderLeftWidth: 5, borderLeftColor: '#2f5496'}} >
            <Text style={{fontFamily: obj.headerfont, fontSize: parseInt(obj.headersize)}} weight={500}  mt="md" ml="md" >{obj.title}</Text>
            <Text color='gray'  ml='md' mt='md' mb={20}>{obj.description === 'Form description' ? "" : obj.description}</Text>
            <Text ml='md' mt='md' mb={20} color='dimmed'><span style={{color: 'red'}} >*</span> Required</Text>
          </Box>
          {forms.length > 0 && obj.active ? (
              <RenderQuestions />
            ) : forms.length > 0 && !obj.active ? (
              <Paper mt={20} p='md' >
              <Alert icon={<AlertCircle size={16} />} title="Bummer" color="red">
      This form is no longer receiving responses.
    </Alert>
            </Paper>
            ) : null}

          {forms.length > 0 && obj.active ? (
            <>
            <Group  ml="md" mt={20}>
              <Text ><strong>Note: </strong>Do not submit your passwords or any other personal information.</Text>
            </Group>
            <Group  ml="md">
              <Text >This form violates our <Anchor>Terms</Anchor>? Report <Anchor>here</Anchor></Text>
            </Group>
            <Group ml="md" mt={20} position='center'>
            <Button onClick={() => {submitAnswers()}} style={{backgroundColor: obj.color}}  color={obj.color} >Submit</Button>
          </Group>
          </>
            ) : null}
          </form>
          </div>
            </MediaQuery>
              </>
          ) : done && !nullform && submitted ? (
              <Paper mt={20} p='md' style={{backgroundColor: obj.background}} >
                <Group position='center'>
                  <Check color='green' size={100} />
                </Group>
              <Group mt={20} position='center'>
                Success! Your response has been recorded.
              </Group>
    <Group mt={20} position='center'>
                  {obj.show_link_to_submit_another_response ? (
                    <Button style={{backgroundColor: obj.color}} color={obj.color} onClick={() => {submitAnotherResponse()}} >Submit Another Response</Button>
                  ) : null}
                </Group>
            </Paper>
          ) : done && nullform ? (
            <Paper mt={20} p='md' mr={'10%'} ml={'10%'} >
              <Alert icon={<AlertCircle size={16} />} title="Bummer!" color="red">
      Something terrible happened! This form cannot be found!
    </Alert>
            </Paper>
          ) : null}

         
          </>

    </AppShell>
    </NotificationsProvider>
    </MantineProvider>
  );
}