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
import { ColorPicker, FileText, Eye, Search, CircleDot, DotsVertical, Palette, X, Edit, CirclePlus, FileImport, ClearFormatting, Photo, Video, LayoutList, Check, Selector, ChevronDown, AlignCenter, Checkbox, GridPattern, GridDots, Calendar, Clock, Line, Polygon, FileUpload, Location, Copy, Trash, LayoutGrid, Plus, ChevronUp, ArrowBack, Send, Stack } from 'tabler-icons-react';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical } from 'tabler-icons-react';
import { uuid } from 'uuidv4';
import { useRouter } from 'next/router';
import { useUser } from 'lib/hooks';
import { SliderIcon, TextAlignLeftIcon } from '@modulz/radix-icons';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { DatePicker, TimeInput } from '@mantine/dates';
import { NotificationsProvider } from '@mantine/notifications';
import { showNotification } from '@mantine/notifications'

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
React.useEffect(() => {
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
                item.question.questionType === 'Short Answer' ? (
                  <Card key={item.id} mt={20} >
                  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    <TextInput />
                  </InputWrapper>
                </Card>
                ) : item.question.questionType === 'Paragraph' ? (
                  <Card key={item.id} mt={20} >
                  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    <Textarea />
                  </InputWrapper>
                </Card>
                ) : item.question.questionType === 'Multiple Choice' ? (
                  <Card mt={20} >
                  <RadioGroup required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    {item.question.radioOptions.length > 0 && item.question.radioOptions.map((radio) => {
                      return (
                        <Radio value={radio.label} label={radio.label} key={radio.id} />
                      )
                    })}
                  </RadioGroup>
                </Card>
                ) : item.question.questionType === 'Checkbox' ? (
                  <Card key={item.id} mt={20} >
                  <CheckboxGroup required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    {item.question.checkboxOptions.length > 0 && item.question.checkboxOptions.map((check) => {
                      return (
                        <MantineCheckbox key={check.id} value={check.label} label={check.label} />
                      )
                    })}
                  </CheckboxGroup>
                </Card>
                ) : item.question.questionType === 'dropdown' ? (
                  <Card mt={20} >
                  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    <Select data={item.question.dropdownOptions} />
                  </InputWrapper>
                </Card>
                ) : item.question.questionType === 'File Upload' ? (
                  <Card mt={20} >
                  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    <Button leftIcon={<Photo />}>Upload</Button>
                  </InputWrapper>
                </Card>
                ) : item.question.questionType === 'Linear Scale' ? (
                  <Card mt={20} >
                  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    <Slider />
                  </InputWrapper>
                </Card>
                ) : item.question.questionType === 'Multiple Choice Grid' ? (
                  <Card mt={20} >
                  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    <TextInput />
                  </InputWrapper>
                </Card>
                ) : item.question.questionType === 'Checkbox Grid' ? (
                  <Card mt={20} >
                  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    <TextInput />
                  </InputWrapper>
                </Card>
                ) : item.question.questionType === 'Date' ? (
                  <Card mt={20} >
                  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    <DatePicker />
                  </InputWrapper>
                </Card>
                ) : item.question.questionType === 'Time' ? (
                  <Card mt={20} >
                  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    <TimeInput />
                  </InputWrapper>
                </Card>
                ) : item.question.questionType === 'Point' ? (
                  <Card mt={20} >
                  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    <TextInput />
                  </InputWrapper>
                </Card>
                ) : item.question.questionType === 'Polyline' ? (
                  <Card mt={20} >
                  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    <TextInput />
                  </InputWrapper>
                </Card>
                ) : item.question.questionType === 'Polygon' ? (
                  <Card mt={20} >
                  <InputWrapper required={item.question.required} label={item.question.defaultValue} description={item.question.descriptionValue}>
                    <TextInput />
                  </InputWrapper>
                </Card>
                ) : null
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