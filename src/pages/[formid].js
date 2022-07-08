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
} from '@mantine/core';
import { createStyles, Autocomplete, Group, } from '@mantine/core';
import { useBooleanToggle, useFocusWithin, useMediaQuery, useScrollLock } from '@mantine/hooks';
import { ColorPicker, FileText, Eye, Search, CircleDot, DotsVertical, Palette, X, Edit, CirclePlus, FileImport, ClearFormatting, Photo, Video, LayoutList, Check, Selector, ChevronDown, AlignCenter, Checkbox, GridPattern, GridDots, Calendar, Clock, Line, Polygon, FileUpload, Location, Copy, Trash, LayoutGrid, Plus, ChevronUp, ArrowBack, Send, Stack, Gps, CircleCheck } from 'tabler-icons-react';
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
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
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
  const [answers, setAnswers] = useState([]);

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
            console.log('Null Form');
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
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  const handleBlur = (text) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = text;
    } else {
      let chunk = {id: id, response: text};
      setAnswers(prevAns => [...prevAns, chunk]);
    }
  }
  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>

    <TextInput onBlur={(e) => {handleBlur(e.target.textContent)}} />

    </InputWrapper>
  )
}

const handleParagraph = (id) => {
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  const handleBlur = (text) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = text;
    } else {
      let chunk = {id: id, response: text};
      setAnswers(prevAns => [...prevAns, chunk]);
    }
  }
  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>

    <Textarea onBlur={(e) => {handleBlur(e.target.textContent)}} />

    </InputWrapper>
  )
}

const handleMultipleChoice = (id) => {
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  const handleBlur = (str) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = str;
    } else {
      let chunk = {id: id, response: str};
      setAnswers(prevAns => [...prevAns, chunk]);
    }
  }
  return (
    <RadioGroup onChange={(val) => {handleBlur(val)}} required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
        {item.question.radioOptions.length > 0 && item.question.radioOptions.map((radio) => {
          return (
            <Radio value={radio.label} label={radio.label} key={radio.id} />
          )
        })}
      </RadioGroup>
  )
}

const handleCheckbox = (id) => {
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  const handleBlur = (str) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = str;
    } else {
      let chunk = {id: id, response: str};
      setAnswers(prevAns => [...prevAns, chunk]);
    }

  }
  return (
    <CheckboxGroup onChange={(val) => {handleBlur(val)}} required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
    {item.question.checkboxOptions.length > 0 && item.question.checkboxOptions.map((check) => {
      return (
        <MantineCheckbox key={check.id} value={check.label} label={check.label} />
      )
    })}
  </CheckboxGroup>
  )
}

const handleDropdown = (id) => {
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  const handleBlur = (str) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = str;
    } else {
      let chunk = {id: id, response: str};
      setAnswers(prevAns => [...prevAns, chunk]);
    }

  }
  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
      <Select onChange={(val) => {handleBlur(val)}} data={item.question.dropdownOptions} />
    </InputWrapper>
  )
}

const handleFileUpload = (id) => {
  return (
    <Button variant='unstyled' size='xs'>Upload File</Button>
  )
}

const handleLinearScale = (id) => {
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  const handleBlur = (v) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = v;
    } else {
      let chunk = {id: id, response: v};
      setAnswers(prevAns => [...prevAns, chunk]);
    }
  }
  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>

<Slider min={item.question.linearFrom} max={item.question.linearTo} onChange={(val) => {handleBlur(val)}} marks={[{value: item.question.linearFrom, label: item.question.linearLabel1}, {value: item.question.linearTo, label: item.question.linearLabel2}]} />

    </InputWrapper>
  )
}

const handleDate = (id) => {
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  const handleBlur = (v) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = v;
    } else {
      let chunk = {id: id, response: v};
      setAnswers(prevAns => [...prevAns, chunk]);
    }

  }

  return (
  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
    <DatePicker onChange={(val) => {handleBlur(val)}} />
  </InputWrapper>
  )
}

const handleTime = (id) => {
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  const handleBlur = (v) => {
    let idx = answers.findIndex((obj => obj.id == id));
    if(idx !== -1){
      let chunk = answers[idx];
      chunk.response = v;
    } else {
      let chunk = {id: id, response: v};
      setAnswers(prevAns => [...prevAns, chunk]);
    }

  }

  return (
  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
    <TimeInput onChange={(val) => {handleBlur(val)}} />
  </InputWrapper>
  )
}

const handlePoint = (id) => {
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];


  const handleGPS = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        document.getElementById('lat-'+id).value = position.coords.latitude;
        document.getElementById('lng-'+id).value = position.coords.longitude;
        document.getElementById('acc-'+id).value =  position.coords.accuracy;
        document.getElementById('alt-'+id).value = position.coords.altitude;

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

  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
    <Group position='right'>
      <ActionIcon onClick={() => {handleGPS()}} title='Capture Point'>
        <Gps />
      </ActionIcon>
      <ActionIcon title='Delete Point' >
        <Trash />
      </ActionIcon>
    </Group>
    <Grid columns={12}>
      <Grid.Col span={3}>
        <Group direction='column'>
          <TextInput id={'lat-'+id} size='sm' label='Latitude' />
          <TextInput id={'lng-'+id} size='sm' label='Longitude' />
          <TextInput id={'alt-'+id}  size='sm' label="Altitude" />
          <TextInput id={'acc-'+id}  size='sm' label="Accuracy" />
        </Group>
      </Grid.Col>

      <Grid.Col span={9}>                
      <Map
  style="mapbox://styles/mapbox/streets-v9"
  containerStyle={{
    height: '100%',
    width: '100%'
  }}
  center={center}
>
{lat !== '' ? (
    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
    <Feature coordinates={[parseFloat(lng), parseFloat(lat)]} />
  </Layer>
) : null}
</Map>      </Grid.Col>
    </Grid>
  </InputWrapper>
  )
}

const handlePolyline = (id) => {
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];

  const handleGPS = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        document.getElementById('lat-'+id).value = position.coords.latitude;
        document.getElementById('lng-'+id).value = position.coords.longitude;
        document.getElementById('acc-'+id).value =  position.coords.accuracy;
        document.getElementById('alt-'+id).value = position.coords.altitude;
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

  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
    <Group position='right'>
      <ActionIcon onClick={() => {handleGPS()}} title='Capture Point'>
        <Gps />
      </ActionIcon>
      <ActionIcon title='Finish' >
        <IoMdSave />
      </ActionIcon>
      <ActionIcon title='Delete Point' >
        <Trash />
      </ActionIcon>
    </Group>
    <Grid columns={12}>
      <Grid.Col span={3}>
        <Group direction='column'>
          <TextInput id={'lat-'+id} size='sm' label='Latitude' />
          <TextInput id={'lat-'+id} size='sm' label='Longitude' />
          <TextInput id={'lat-'+id} size='sm' label="Altitude" />
          <TextInput id={'lat-'+id} size='sm' label="Accuracy" />
        </Group>
      </Grid.Col>

      <Grid.Col span={9}>                
      <Map
  style="mapbox://styles/mapbox/streets-v9"
  containerStyle={{
    height: '100%',
    width: '100%'
  }}
  center={center}
>
{lat !== '' ? (
    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
    <Feature coordinates={[parseFloat(lng), parseFloat(lat)]} />
  </Layer>
) : null}
</Map>      </Grid.Col>
    </Grid>
  </InputWrapper>
  )
}

const handlePolygon = (id) => {
  let idx = forms.findIndex((obj => obj.id == id));
  let item = forms[idx];
  let arr = [];
  const handleGPS = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        document.getElementById('lat-'+id).value = position.coords.latitude;
        document.getElementById('lng-'+id).value = position.coords.longitude;
        document.getElementById('acc-'+id).value =  position.coords.accuracy;
        document.getElementById('alt-'+id).value = position.coords.altitude;
        arr.push(position);
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

  const closePolygon = () => {
    if(arr.length < 3){
      showNotification({
        title: 'Error!',
        message: "Pick atleast three points to close polygon",
        color: 'red'
      });
    } else {
      showNotification({
        title: 'Done',
        message: 'Polygon created'
      })
    }
  }

  return (
    <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
    <Group position='right'>
      <ActionIcon id={'gps-'+id} onClick={() => {handleGPS()}} title='Capture Point'>
        <Gps />
      </ActionIcon>
      <ActionIcon id={'close-'+id} onClick={() => {closePolygon()}} title='Close Polygon'>
        <LoopIcon />
      </ActionIcon>
      <ActionIcon title='Delete Point' >
        <Trash />
      </ActionIcon>
    </Group>
    <Grid columns={12}>
      <Grid.Col span={3}>
        <Group spacing='xs'></Group>
        {arr.map((item, index) => {
          return (
            <CircleCheck key={index} size={10} />
          )
        })}
        <Group direction='column'>
          <TextInput id={'lat-'+id} size='sm' label='Latitude' />
          <TextInput id={'lng-'+id} size='sm' label='Longitude' />
          <TextInput id={'alt-'+id} size='sm' label="Altitude" />
          <TextInput id={'acc-'+id}  size='sm' label="Accuracy" />
        </Group>
      </Grid.Col>

      <Grid.Col span={9}>                
      <Map
  style="mapbox://styles/mapbox/streets-v9"
  containerStyle={{
    height: '100%',
    width: '100%'
  }}
  center={center}
>
{lat !== '' ? (
    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
    <Feature coordinates={[parseFloat(lng), parseFloat(lat)]} />
  </Layer>
) : null}
</Map>      </Grid.Col>
    </Grid>
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
          {done ? (
            <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
            <div style={{marginRight: 300, marginLeft: 300}}>
          <Box mt={20} className={classes.wrapper} style={{borderTopWidth: 10, borderTopColor: obj.color, borderLeftWidth: 5, borderLeftColor: '#2f5496'}} >
            <Text size="xl" weight={500}  mt="md" ml="md" >{obj.title}</Text>
            <Text color='gray'  ml='md' mt='md' mb={20}>{obj.description}</Text>
            
          </Box>
            {forms.length > 0 ?  forms.map((item) => {
            return (
              item.type === 1 ? (
                <Card key={item.id} mt={20}>
                  {handleQuestion(item.question.questionType, item.id)}
                </Card>
                             ) : item.type === 2 ? (
                  <Card mt={20} style={{borderLeftWidth: 5, borderLeftColor: obj.Color}} >
                  <Text mb={10}>{item.question.title}</Text>
                  <Text size='xs' color='gray'>{item.question.description}</Text>
                </Card>
              ): item.type === 3 ? (
                <Card mt={20} shadow={'sm'} >
                <Image style={{marginLeft: '10%', marginRight: '10%'}} height={200} src={item.image} />
              </Card>
              ) : item.type === 4 ? (
                <Card mt={20} shadow='sm'>
  
                </Card>
              ) : (
                <Card mt={20} shadow='sm'>
            <Text size="xl" weight={500} mt="md" ml="md" >{item.title}</Text>
            <Text color='gray' ml='md' mt='md' mb={20}>{item.description}</Text>
                </Card>
              )
            )
          }) : null}
          <Group mt={20} position='apart'>
            <Button color={obj.color}>Submit</Button>
          </Group>
          </div>
            </MediaQuery>
          ) : null}

         
          </>

    </AppShell>
    </NotificationsProvider>
    </MantineProvider>
  );
}