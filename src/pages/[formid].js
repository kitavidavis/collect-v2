import React, { useEffect, useRef, useState } from 'react';
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
import { IoMdArrowDropdownCircle, IoMdSave } from 'react-icons/io';
import { DatePicker, TimeInput } from '@mantine/dates';
import { NotificationsProvider } from '@mantine/notifications';
import { showNotification } from '@mantine/notifications'
import ReactMapboxGl, { Layer, Feature, Marker, Source } from 'react-mapbox-gl';
import { UploadAudio, UploadVideo, UploadPresentation, UploadDocument, UploadSpreadshit, UploadPDF, UploadImage, UploadAny } from '../components/upload';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from 'components/pin';
import MapIcon from 'components/marker.gif'
import { pointRadial } from 'd3';
const accessToken = 'pk.eyJ1IjoiZGF2aXNraXRhdmkiLCJhIjoiY2w0c2x2NjNwMGRvbDNrbGFqYW9na2NtaSJ9.q5rs7WMJE8oaBQdO4zEAcg';
const Map = ReactMapboxGl({
  accessToken: accessToken,
});
 
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

  const [errors, setErrors] = useState([]);
  const [answers, setAnswers] = useState([]);

  useDocumentTitle(obj === null ? 'Loading...' : obj.title + ' | '+ obj.description)

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
}, [router])


const handleShortAnswer = (id) => {
  const [text, setText] = useState('');
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

    React.useEffect(() => {
      let idx = answers.findIndex((obj => obj.id == id));
      if(idx !== -1){
        let chunk = answers[idx];
        chunk.response = text;
      } else {
        let chunk = {id: id, response: text};
        setAnswers(prevAns => [...prevAns, chunk]);
      }
    }, [text]);
  return (
          <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>

<TextInput value={text} onChange={(e) => {setText(e.currentTarget.value)}} />

</InputWrapper>
    
  )
}

const handleParagraph = (id) => {
  const [text, setText] = useState('');
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

React.useEffect(() => {
  let idx = answers.findIndex((obj => obj.id == id));
  if(idx !== -1){
    let chunk = answers[idx];
    chunk.response = text;
  } else {
    let chunk = {id: id, response: text};
    setAnswers(prevAns => [...prevAns, chunk]);
  }
}, [text])
  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>

    <Textarea value={text} onChange={(e) => {setText(e.currentTarget.value)}}  />

    </InputWrapper>
  )
}

const handleMultipleChoice = (id) => {
  const [str, setStr] = useState('');
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  React.useEffect(() => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = str;
    } else {
      let chunk = {id: id, response: str};
      setAnswers(prevAns => [...prevAns, chunk]);
    }
  }, [str]);
  return (
    <RadioGroup onChange={(val) => {setStr(val)}} value={str} required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
        {item.question.radioOptions.length > 0 && item.question.radioOptions.map((radio) => {
          return (
            <Radio value={radio.label} label={radio.label} key={radio.id} />
          )
        })}
      </RadioGroup>
  )
}

const handleCheckbox = (id) => {
  const [str, setStr] = useState([]);
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  React.useEffect(() => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = str;
    } else {
      let chunk = {id: id, response: str};
      setAnswers(prevAns => [...prevAns, chunk]);
    }
  }, [str]);

  return (
    <CheckboxGroup onChange={setStr} value={str} required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
    {item.question.checkboxOptions.length > 0 && item.question.checkboxOptions.map((check) => {
      return (
        <MantineCheckbox key={check.id} value={check.label} label={check.label} />
      )
    })}
  </CheckboxGroup>
  )
}

const handleDropdown = (id) => {
  const [str, setStr] = useState('');
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  React.useEffect(() => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = str;
    } else {
      let chunk = {id: id, response: str};
      setAnswers(prevAns => [...prevAns, chunk]);
    }
  }, [str]);

  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <Select onChange={(val) => {setStr(val)}} data={item.question.dropdownOptions} />
    </InputWrapper>
  )
}

const handleFileUpload = (id) => {
  let idx = forms.findIndex((obj => obj.id == id));
  let q = forms[idx];
  let item = forms[idx];
  
  return (
    q.question.uploadSpecifics.document ? (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <UploadDocument />
      </InputWrapper>
    ) : q.question.uploadSpecifics.spreadshit ? (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <UploadSpreadshit />
      </InputWrapper>
    ) : q.question.uploadSpecifics.pdf ? (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <UploadPDF />
      </InputWrapper>
    ) : q.question.uploadSpecifics.video ? (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <UploadVideo />
      </InputWrapper>
    ) : q.question.uploadSpecifics.audio ? (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <UploadAudio />
      </InputWrapper>
    ) : q.question.uploadSpecifics.presentation ? (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <UploadPresentation />
      </InputWrapper>
    ) : q.question.uploadSpecifics.image ? (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <UploadImage />
      </InputWrapper>
    ) : (
      <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <UploadAny />
      </InputWrapper>
    )
  )
}

const handleLinearScale = (id) => {
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];
  const [value, setValue] = useState(item.question.linearFrom)

  React.useEffect(() => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = value;
    } else {
      let chunk = {id: id, response: value};
      setAnswers(prevAns => [...prevAns, chunk]);
    }
  }, [value]);
  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>

<Slider min={item.question.linearFrom} max={item.question.linearTo} value={value} onChange={(val) => {setValue(val)}} marks={[{value: item.question.linearFrom, label: item.question.linearLabel1}, {value: item.question.linearTo, label: item.question.linearLabel2}]} />

    </InputWrapper>
  )
}

const handleDate = (id) => {
  const [date, setDate] = useState(new Date());
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  React.useEffect(() => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = date;
    } else {
      let chunk = {id: id, response: date};
      setAnswers(prevAns => [...prevAns, chunk]);
    }
  }, [date]);

  return (
  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
    <DatePicker value={date} onChange={(val) => {setDate(val)}} />
  </InputWrapper>
  )
}

const handleTime = (id) => {
  const [time, setTime] = useState(new Date());
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  React.useEffect(() => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = time;
    } else {
      let chunk = {id: id, response: time};
      setAnswers(prevAns => [...prevAns, chunk]);
    }
  }, [time]);

  return (
  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
    <TimeInput value={time} onChange={(val) => {setTime(val)}} />
  </InputWrapper>
  )
}

const handlePoint = (id) => {
  const [lat1, setLat1] = useState(null);
  const [lng1, setLng1] = useState(null);
  const [acc1, setAcc1] = useState(null);
  const [alt1, setAlt1] = useState(null);
  const [locked, setLocked] = useState(false);

  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  const [point, setPoint] = useState({});


  const handleGPS = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        setLat1(parseFloat(position.coords.latitude));
        setLng1(parseFloat(position.coords.longitude));
        setAcc1(parseFloat(position.coords.accuracy));
        setAlt1(parseFloat(position.coords.altitude));

        setPoint(position);

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

  const lockCoordinate = () => {

    let idx = answers.findIndex((obj => obj.id == id));
    if(idx == -1){
      let chunk = {id: id, response: point };
      setAnswers(prevArr => [...prevArr, chunk]);
    } else {
      let item = answers[idx];
      item.response = point;
    }

    setLocked(!locked);
  }

  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
    <Group position='right' mb={10}>
    {!locked ? <ActionIcon onClick={() => {handleGPS()}} ><Gps /></ActionIcon> : null}
      {lat1 !== null ? <ActionIcon onClick={() => {lockCoordinate()}}>{!locked ? <Lock /> : <LockOpen />}</ActionIcon>
: null} 
    </Group>
    <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
    <Grid columns={12}>
      <Grid.Col span={3}>
        <Group direction='column'>
          <TextInput disabled={locked} value={lat1} size='sm' label='Latitude' />
          <TextInput disabled={locked}  value={lng1} size='sm' label='Longitude' />
          <TextInput disabled={locked} value={alt1}  size='sm' label="Altitude" />
          <TextInput disabled={locked} value={acc1}  size='sm' label="Accuracy" />
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
          <TextInput value={lat1} size='sm' label='Latitude' />
          <TextInput  value={lng} size='sm' label='Longitude' />
          <TextInput value={alt1}  size='sm' label="Altitude" />
          <TextInput value={acc1}  size='sm' label="Accuracy" />
        </Group>
    </MediaQuery>
  </InputWrapper>
  )
}

const handlePolyline = (id) => {
  const [lat1, setLat1] = useState(null);
  const [lng1, setLng1] = useState(null);
  const [acc1, setAcc1] = useState(null);
  const [alt1, setAlt1] = useState(null);
  const [locked, setLocked] = useState(false);

  const [polyline, setPolyline] = useState([]);
  const [coords, setCoords] = useState([]);

  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];


  const handleGPS = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        setLat1(parseFloat(position.coords.latitude));
        setLng1(parseFloat(position.coords.longitude));
        setAcc1(parseFloat(position.coords.accuracy));
        setAlt1(parseFloat(position.coords.altitude));

        let chunk = [parseFloat(position.coords.longitude), parseFloat(position.coords.latitude)];
        setCoords(prevArr => [...prevArr, chunk]);

        setPolyline(prevArr => [...prevArr, position]);

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

  const lockCoordinate = () => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx == -1){
      let chunk = {id: id, response: polyline};
      setAnswers(prevArr => [...prevArr, chunk]);
    } else {
      let item = answers[idx];
      item.response = polyline;
    }
    setLocked(!locked);
  }

  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
    <Group position='right' mb={10}>
    {!locked ? <ActionIcon onClick={() => {handleGPS()}} ><Gps /></ActionIcon> : null}
      {polyline.length > 2 ? <ActionIcon onClick={() => {lockCoordinate()}}>{!locked ? <Lock /> : <LockOpen />}</ActionIcon>
: null} 
    </Group>
    <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
    <Grid columns={12}>
      <Grid.Col span={3}>
        <Group direction='column'>
          <TextInput disabled={locked} value={lat1} size='sm' label='Latitude' />
          <TextInput disabled={locked}  value={lng1} size='sm' label='Longitude' />
          <TextInput disabled={locked} value={alt1}  size='sm' label="Altitude" />
          <TextInput disabled={locked} value={acc1}  size='sm' label="Accuracy" />
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
{coords.map((item, index) => {
  return (
    <Marker
          key={`marker-${index}`}
          coordinates={[item[0], item[1]]}
          anchor="bottom"
        >
          <Pin />
        </Marker>
  )
})}
</Map>      </Grid.Col>
    </Grid>
    </MediaQuery>

    <MediaQuery largerThan='md' styles={{display: 'none'}}>
    <Group direction='column'>
          <TextInput value={lat1} size='sm' label='Latitude' />
          <TextInput  value={lng} size='sm' label='Longitude' />
          <TextInput value={alt1}  size='sm' label="Altitude" />
          <TextInput value={acc1}  size='sm' label="Accuracy" />
        </Group>
    </MediaQuery>
  </InputWrapper>
  )
}

const handlePolygon = (id) => {
  const [lat1, setLat1] = useState(null);
  const [lng1, setLng1] = useState(null);
  const [acc1, setAcc1] = useState(null);
  const [alt1, setAlt1] = useState(null);
  const [locked, setLocked] = useState(false);

  const [polygon, setPolygon] = useState([]);
  const [coords, setCoords] = useState([]);

  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];


  const handleGPS = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        setLat1(parseFloat(position.coords.latitude));
        setLng1(parseFloat(position.coords.longitude));
        setAcc1(parseFloat(position.coords.accuracy));
        setAlt1(parseFloat(position.coords.altitude));

        let chunk = [parseFloat(position.coords.longitude), parseFloat(position.coords.latitude)];
        setCoords(prevArr => [...prevArr, chunk]);

        setPolygon(prevArr => [...prevArr, position]);

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

  const lockCoordinate = () => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx == -1){
      let chunk = {id: id, response: polygon};
      setAnswers(prevArr => [...prevArr, chunk]);
    } else {
      let item = answers[idx];
      item.response = polygon;
      setAnswers([...answers]);
    }

    setLocked(!locked);
  }

  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
    <Group position='right' mb={10}>
      {!locked ? <ActionIcon onClick={() => {handleGPS()}} ><Gps /></ActionIcon> : null}
      {polygon.length > 2 ? <ActionIcon onClick={() => {lockCoordinate()}}>{!locked ? <Lock /> : <LockOpen />}</ActionIcon>
: null} 
    </Group>
    <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
    <Grid columns={12}>
      <Grid.Col span={3}>
        <Group direction='column'>
          <TextInput disabled={locked} value={lat1} size='sm' label='Latitude' />
          <TextInput disabled={locked}  value={lng1} size='sm' label='Longitude' />
          <TextInput disabled={locked} value={alt1}  size='sm' label="Altitude" />
          <TextInput disabled={locked} value={acc1}  size='sm' label="Accuracy" />
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
  onClick={(event) => {
    console.log(event);
  }}
>
{coords.map((item, index) => {
  return (
    <Marker
          key={`marker-${index}`}
          coordinates={[item[0], item[1]]}
          anchor="bottom"
        >
          <Pin />
        </Marker>
  )
})}
</Map>      </Grid.Col>
    </Grid>
    </MediaQuery>

    <MediaQuery largerThan='md' styles={{display: 'none'}}>
    <Group direction='column'>
          <TextInput value={lat1} size='sm' label='Latitude' />
          <TextInput  value={lng} size='sm' label='Longitude' />
          <TextInput value={alt1}  size='sm' label="Altitude" />
          <TextInput value={acc1}  size='sm' label="Accuracy" />
        </Group>
    </MediaQuery>
  </InputWrapper>
  )
}

const handleQuestion = (q, id) => {
  switch(q) {
    case 'Short Answer':
      return handleShortAnswer(id);

    case 'Paragraph':
      return handleParagraph(id);


    case 'Multiple Choice':
      return handleMultipleChoice(id);


    case 'Checkbox':
      return handleCheckbox(id);

    case 'Dropdown':
      return handleDropdown(id);

    case 'File Upload':
      return handleFileUpload(id);

    case 'Linear Scale':
      return handleLinearScale(id);

    case 'Multiple Choice Grid':
      return handleMultipleChoiceGrid(id);

    case 'Checkbox Grid':
      return handleCheckboxGrid(id);

    case 'Date':
      return handleDate(id);

    case 'Time':
      return handleTime(id);

    case 'Point':
      return handlePoint(id);

    case 'Polyline':
      return handlePolyline(id);

    case 'Polygon':
      return handlePolygon(id);

    default:
      console.log('undefined');
  }
}

const RenderQuestions = () => {
  const items = forms.map((item, index) => (
    <Card key={item.id} shadow='md' className={classes.maincard}>
      {item.type == 1 ? (
        <Card>
            {handleQuestion(item.question.questionType, item.id)}
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
          {done && !nullform ? (
            <>
            <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
            <div style={{marginRight: 300, marginLeft: 300}}>
              {obj.header_image !== null && obj.header_image !== undefined ? ( 
                <Card mt={20} shadow={'sm'} >
                        <Image  height={400} src={obj.header_image} />
                </Card>
               ) : null}
          <Box mt={20} className={classes.wrapper} style={{borderTopWidth: 10, borderTopColor: obj.color, borderLeftWidth: 5, borderLeftColor: '#2f5496'}} >
            <Text style={{fontFamily: obj.headerfont, fontSize: parseInt(obj.headersize)}} weight={500}  mt="md" ml="md" >{obj.title}</Text>
            <Text color='gray'  ml='md' mt='md' mb={20}>{obj.description}</Text>
            
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
            <Group mt={20} position='center'>
            <Button onClick={() => {console.log(answers)}} style={{backgroundColor: obj.color}}  color={obj.color}>Submit</Button>
          </Group>
            ) : null}
          </div>
            </MediaQuery>
            <MediaQuery largerThan='md' styles={{display: 'none'}}>
            <div style={{marginRight: '1%', marginLeft: '1%'}}>
            {obj.header_image !== null && obj.header_image !== undefined ? ( 
                <Card mt={20} shadow={'sm'} >
                        <Image  height={400} src={obj.header_image} />
                </Card>
               ) : null}
          <Box mt={20} className={classes.wrapper} style={{borderTopWidth: 10, borderTopColor: obj.color, borderLeftWidth: 5, borderLeftColor: '#2f5496'}} >
            <Text style={{fontFamily: obj.headerfont, fontSize: parseInt(obj.headersize)}} weight={500}  mt="md" ml="md" >{obj.title}</Text>
            <Text color='gray'  ml='md' mt='md' mb={20}>{obj.description}</Text>
          </Box>
            {forms.length > 0 ? (
              <RenderQuestions />
            ) : null}
          <Group mt={20} position='center'>
            <Button onClick={() => {console.log(answers)}} style={{backgroundColor: obj.color}} color={obj.color}>Submit</Button>
          </Group>
          </div>
            </MediaQuery>
              </>
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