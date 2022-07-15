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
import { ColorPicker, FileText, Eye, Search, CircleDot, DotsVertical, Palette, X, Edit, CirclePlus, FileImport, ClearFormatting, Photo, Video, LayoutList, Check, Selector, ChevronDown, AlignCenter, Checkbox, GridPattern, GridDots, Calendar, Clock, Line, Polygon, FileUpload, Location, Copy, Trash, LayoutGrid, Plus, ChevronUp, ArrowBack, Send, Stack, Minus, CircleMinus, Upload, Link } from 'tabler-icons-react';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical } from 'tabler-icons-react';
import { uuid } from 'uuidv4';
import { useUser } from 'lib/hooks';
import { PlusCircledIcon, SliderIcon, TextAlignLeftIcon } from '@modulz/radix-icons';
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

const initialState = {
  FormName: 'Untitled Form',
  ActiveTab: 0,
  CustomTheme: false,
  Color: '#5F3DC4',
  Background: backgrounds[1].value,
  HeaderFont: 'Roboto',
  HeaderSize: 24,
  QuestionFont: 'Roboto',
  QuestionSize: 12,
  TextFont: 'Roboto',
  TextSize: 11,
  HeaderImage: null,
  CollectEmailAddress: false,
  AllowResponseEditing: false,
  LimitToOneResponse: false,
  ShowProgressBar: false,
  ShuffleQuestionOrder: false,
  ConfirmationMessage: 'Your response has been recorded',
  ShowLinkToSubmitAnotherResponse: false,
  CollectEmailAddressByDefault: false,
  MakeQuestionsRequiredByDefault: false
}

const FormContext = React.createContext({
  state: initialState,
  dispatch: () => {}
});

function FormReducer(state, action){
  switch (action.type) {
    case 'UPDATE_FORM_NAME':
      return {
        ...state,
        FormName: action.formname
      };
      break;

    case 'UPDATE_ACTIVE_TAB':
      return {
        ...state,
        ActiveTab: action.activetab
      };
      break;

    case 'UPDATE_CUSTOM_THEME':
      return {
        ...state,
        CustomTheme: action.customtheme
      };
      break;

    case 'UPDATE_COLOR':
      return {
        ...state,
        Color: action.color
      };
      break;

    case 'UPDATE_BACKGROUND':
      return {
        ...state,
        Background: action.background
      };
      break;

    case 'UPDATE_HEADER_FONT':
      return {
        ...state,
        HeaderFont: action.headerfont
      };
      break;

    case 'UPDATE_HEADER_SIZE':
        return {
          ...state,
          HeaderSize: action.headersize
        };
        break;

    case 'UPDATE_QUESTION_FONT':
      return {
        ...state,
        QuestionFont: action.questionfont
      };
      break;

    case 'UPDATE_QUESTION_SIZE':
      return {
        ...state,
        QuestionSize: action.questionsize
      };
      break;

    case 'UPDATE_TEXT_FONT':
      return {
        ...state,
        TextFont: action.textfont
      };
      break;

    case 'UPDATE_TEXT_SIZE':
      return {
        ...state,
        TextSize: action.textsize
      };
      break;

    case 'UPDATE_HEADER_IMAGE':
      return {
        ...state,
        HeaderImage: action.headerimage
      };
      break;

    case 'COLLECT_EMAIL_ADDRESS':
      return {
        ...state,
        CollectEmailAddress: action.collectemailaddress
      };
      break;

    case 'ALLOW_RESPONSE_EDITING':
      return {
        ...state,
        AllowResponseEditing: action.allowresponseediting
      };
      break;

    case 'LIMIT_TO_ONE_RESPONSE':
      return {
        ...state,
        LimitToOneResponse: action.limittooneresponse
      };
      break;

    case 'SHOW_PROGRESS_BAR':
      return {
        ...state,
        ShowProgressBar: action.showprogressbar
      };
      break;

    case 'SHUFFLE_QUESTION_ORDER':
      return {
        ...state,
        ShuffleQuestionOrder: action.shufflequestionorder
      };
      break;

    case 'CONFIRMATION_MESSAGE':
      return {
        ...state,
        ConfirmationMessage: action.confirmationmessage
      };
      break;

    case 'SHOW_LINK_TO_SUBMIT_ANOTHER_RESPONSE':
      return {
        ...state,
        ShowLinkToSubmitAnotherResponse: action.showlinktosubmitanotherresponse
      };
      break;

    case 'COLLECT_EMAIL_ADDRESS_BY_DEFAULT':
      return {
        ...state,
        CollectEmailAddress: action.collectemailaddressbydefault
      };
      break;

    case 'MAKE_QUESTIONS_REQUIRED_BY_DEFAULT':
      return {
        ...state,
        MakeQuestionsRequiredByDefault: action.makequestionsrequiredbydefault
      };
      break;

    default:
      return state;
  }
}
export function HeaderPage() {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [readonly, setReadOnly] = useState(true);
  const { state, dispatch } = React.useContext(FormContext);
  const [formname, setFormName] = useState(state.FormName)
  const [color, setColor] = useState(state.Color);
  const [customtheme, setCustomTheme] = useState(state.CustomTheme);

  const handleFocus = (e) => {
    e.target.select();
    setReadOnly(false);
  }

  const handleTabChange = (val) => {
    dispatch({type: 'UPDATE_ACTIVE_TAB', activetab: val});
    setActiveTab(val);
  }

  const handleBlur = (e) => {
    setReadOnly(true);
    var regExp = /[a-zA-Z]/g;
    if(regExp.test(formname)){
      dispatch({type: 'UPDATE_FORM_NAME', formname: formname});
    }

  }

  const handleCustomTheme = () => {
    dispatch({type: 'UPDATE_CUSTOM_THEME', customtheme: true});
  }

  const deployForm = async () => {
    let formbuild_data = JSON.parse(localStorage.getItem('geopsy-collect-formbuild-data'));

    if(formbuild_data == null){
      return false;
    }

    const body = {
      title: formbuild_data.title,
      form_id: formbuild_data.form_id,
      user_id: formbuild_data.user_id,
      header_image: formbuild_data.header_image,
      description: formbuild_data.description,
      color: formbuild_data.color,
      background: formbuild_data.background,
      headerfont: formbuild_data.headerfont,
      headersize: formbuild_data.headersize,
      questionfont: formbuild_data.questionfont,
      textfont: formbuild_data.textfont,
      textsize: formbuild_data.textsize,
      question: formbuild_data.question,
      collect_email_address: formbuild_data.collect_email_address,
      allow_response_editing: formbuild_data.allow_response_editing,
      limit_to_one_response: formbuild_data.limit_to_one_response,
      show_progress_bar: formbuild_data.show_progress_bar,
      shuffle_question_order: formbuild_data.shuffle_question_order,
      confirmation_message: formbuild_data.confirmation_message,
      show_link_to_submit_another_response: formbuild_data.show_link_to_submit_another_response,

    };

    try {
      await fetch('/api/createform', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      }).then(function(res) {
        if(res.status === 200) {
          showNotification({
            title: `Form deployed successfully`,
            message: 'You will automatically be redirected to the main dashboard in 5 Seconds',
            color: 'teal',
            icon: <Check />,
          });

          setTimeout(function(){window.location = '/v2/dashboard';}, 5000)
        } else {
          showNotification({
            title: 'Error!',
            message: 'Your form could not be deployed',
            color: 'red',
          })
        }
      }).catch(function(error){
        console.log(error.message);
      }) 
    } catch(error) {
      console.log(error.message)
    }

  }

  React.useEffect(() => {
    document.title = 'Build Form - GeoPsy Collect: Cloud';
  }, [state.FormName])

  React.useEffect(() => {
    let questions_required = localStorage.getItem('make-questions-required-by-default');
    if(questions_required !== null){
      dispatch({type: 'MAKE_QUESTIONS_REQUIRED_BY_DEFAULT', makequestionsrequiredbydefault: questions_required});
    }
  }, [])

  React.useEffect(() => {
    let collect_email = localStorage.getItem("collect-email-address-by-default");
    if(collect_email !== null){
      dispatch({type: 'COLLECT_EMAIL_ADDRESS_BY_DEFAULT', collectemailaddress: collect_email})
    }
  }, [])


  return (
    <Header height={115} className={classes.header} mb={120}>
      <>
      <Group position='apart' grow>
      <Group my={10} >
          <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
          <FileText color={state.Color} size={55} />
          </MediaQuery>
          <TextInput size='lg' style={{fontFamily: state.HeaderFont, fontSize: state.HeaderSize}} variant={readonly ? 'unstyled' : null} readOnly={readonly} onChange={(e) => {setFormName(e.currentTarget.value)}} onFocus={(e) => {handleFocus(e)}} onBlur={() => {handleBlur()}} value={formname} />
        </Group>

        <Group position='right'  >
          <Group className={classes.links}  >
          <ActionIcon disabled={state.CustomTheme} onClick={() => {handleCustomTheme()}} mr={20} title='Customize theme' >
      <Palette />
    </ActionIcon>
    <Button onClick={() => {deployForm()}} mr={20} style={{backgroundColor: state.Color}} color={state.Color} >Deploy</Button>

          </Group>
          <MediaQuery largerThan='md' styles={{display: 'none'}}>
            <Menu control={   <ActionIcon>
            <DotsVertical />
          </ActionIcon>}>
            <Menu.Item onClick={() => {handleCustomTheme()}} icon={<Palette />}>Customize theme</Menu.Item>
            <Menu.Item onClick={() => {deployForm()}} icon={<Send />}>Deploy</Menu.Item>
          </Menu>
          </MediaQuery>

        </Group>
      </Group>
      <Tabs color={state.Color} active={activeTab} onTabChange={(val) => {handleTabChange(val)}} position='center' style={{backgroundColor: 'white', left: 0, right: 0}} >
      <Tabs.Tab color={state.Color} label="Questions" ></Tabs.Tab>
      <Tabs.Tab label="Preview"></Tabs.Tab>
      <Tabs.Tab label="Settings" ></Tabs.Tab>
      </Tabs>
      </>
    </Header>
  );
}

export default function AppShellDemo() {
  //useUser({ redirectTo: '/auth/login' });
  let user2 = useUser();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [state, dispatch] = React.useReducer(FormReducer, initialState);
  const { classes } = useStyles();
  const [formdesc, setFormDesc] = useState("Form description")
  const [readonly, setReadOnly] = useState(true);
  const { ref, focused2 } = useFocusWithin();
  const [headerFont, setHeaderFont] = useState('Roboto');
  const [headerSize, setHeaderSize] = useState(24);
  const [checked, setChecked] = useState('violet');
  const [bgchecked, setBgChecked] = useState(state.Background);
  const [forms, setForms] = useState([]);
  const [handler, setHandler] = useState(false);
  const [handlerxs, setHandlerXS] = useState(false);
  const [menuid, setMenuId] = useState('');
  const [minimenu, setMiniMenu] = useState('');
  const [minimenuopen, setMiniMenuOpen] = useState(false);
  const [minimenuopenxs, setMiniMenuOpenXS] = useState(false);
  const [responsechevdown, setResponseChevDown] = useState(true);
  const [presentationchevdown, setPresentationChevDown] = useState(true);
  const [formchevdown, setFormChevDown] = useState(true);
  const [questionchevdown, setQuestionChevDown] = useState(true);
  const [img, setImg] = useState('');
  const [res, setRes] = useState([]);
  const [imagemodal, setImageModal] = useState(false);
  const [selectedimage, setSelectedImage] = useState('');
  const [headerimg, setHeaderImg] = useState('');
  const [video, setVideo] = useState('');
  const [videores, setVideoRes] = useState([]);
  const [videomodalopened, setVideoModalOpened] = useState(false);
  const [videoselected, setVideoSelected] = useState('');
  const Access_Key = 'SZMxfetdVLzmhlllpelhSjdTiHYhEEnqInpun7hQZFw';
  const video_key = 'AIzaSyDMzfZMNpyPU8zrBu7BiLIrzuldHQgsJ8k';
  const [linkctx, setLinkCtx] = useState({
    state: false,
    id: null
  });
  const [data, setData] = useState([

  ]);

  /**
   * Controller for handling menu in lg device
   * @param {*} id 
   */

  const handleMenuClick = (id) => {
    setMenuId(id);
    setHandler(!handler)
  }

  /**
   * Controller for xs menu
   * @param {*} id 
   */

  const handleMenuClickXS = (id) => {
    setMenuId(id);
    setHandlerXS(!handlerxs)
  }

  const makeQuestionsRequiredByDefault = (e) => {
    localStorage.setItem('make-questions-required-by-default', e.currentTarget.checked);
    dispatch({type: 'MAKE_QUESTIONS_REQUIRED_BY_DEFAULT', makequestionsrequiredbydefault: e.currentTarget.checked});

  }

  const collectEmailAddresses = (e) => {
    dispatch({type: 'COLLECT_EMAIL_ADDRESS', collectemailaddress: e.currentTarget.checked});
  }

  const allowResponseEditing = (e) => {
    dispatch({type: 'ALLOW_RESPONSE_EDITING', allowresponseediting: e.currentTarget.checked})
  }

  const limitToOneResponse = (e) => {
    dispatch({type: 'LIMIT_TO_ONE_RESPONSE', limittooneresponse: e.currentTarget.checked})
  }

  const showProgressBar = (e) => {
    dispatch({type: 'SHOW_PROGRESS_BAR', showprogressbar: e.currentTarget.checked})
  }

  const shuffleQuestionOrder = (e) => {
    dispatch({type: 'SHUFFLE_QUESTION_ORDER', shufflequestionorder: e.currentTarget.checked})
  }

  const editConfirmationMessage = (e) => {
    dispatch({type: 'CONFIRMATION_MESSAGE', confirmationmessage: e.target.textContent})
  }

  const showLinkToSubmitAnotherResponse = (e) => {
    dispatch({type: 'SHOW_LINK_TO_SUBMIT_ANOTHER_RESPONSE', showlinktosubmitanotherresponse: e.currentTarget.checked})
  }

  const collectEmailAddressByDefault = (e) => {
    localStorage.setItem("collect-email-address-by-default", e.currentTarget.checked);
    dispatch({type: 'COLLECT_EMAIL_ADDRESS_BY_DEFAULT', collectemailaddress: e.currentTarget.checked})
  }

  const linkQuestion = (id) => {
    let idx = forms.findIndex((obj => obj.id == id));

    let q = forms[idx];

    q.linked = true;
    setForms([...forms]);
  }

  const unlinkQuestion = (id) => {
    let idx = forms.findIndex((obj => obj.id == id));
    let q = forms[idx];

    let linked_pos = q.linked_position;

    let idx2 = forms.findIndex((obj => obj.position == linked_pos)); // finding the index of the linked question.
    forms.splice(idx2, 1); // delete the linked question

    q.linked = false;
    q.linked_question = null;
    q.linked_parameters = null;
    q.linked_position = null;
    setForms([...forms]);
  }


  const handleClosCustomTheme = () => {
    dispatch({type: 'UPDATE_CUSTOM_THEME', customtheme: false});
  }

  const handleColors = (color) => {
    let clrIndex = color_strings.indexOf(color);
    dispatch({type: 'UPDATE_COLOR', color: colors[clrIndex]});
    setChecked(color);
  }

  const handleBgColors = (bg) => {
    dispatch({type: 'UPDATE_BACKGROUND', background: bg});
    setBgChecked(bg);
  }

  const handleFocus = (e) => {
    e.target.select();
    setReadOnly(false);
  }

  const handleBlur = (e) => {
    setReadOnly(true);
  }

  React.useEffect(() => {
    const savedata = () => {
      let data = {
        title: state.FormName,
        form_id: uuid(),
        user_id: user2.user._id,
        description: formdesc,
        color: state.Color,
        background: state.Background,
        headerfont: state.HeaderFont,
        header_image: state.HeaderImage,
        headersize: state.HeaderSize,
        questionfont: state.QuestionFont,
        textfont: state.TextFont,
        textsize: state.TextSize,
        question: forms,
        collect_email_address: state.CollectEmailAddress,
        allow_response_editing: state.AllowResponseEditing,
        limit_to_one_response: state.LimitToOneResponse,
        show_progress_bar: state.ShowProgressBar,
        shuffle_question_order: state.ShuffleQuestionOrder,
        confirmation_message: state.ConfirmationMessage,
        show_link_to_submit_another_response: state.ShowLinkToSubmitAnotherResponse
      }
      localStorage.setItem('geopsy-collect-formbuild-data', JSON.stringify(data));
    }

    if(user2){
      savedata();
    }
  }, [forms, state]);
  
  const createNewQuestion = (link_id, params) => {
    let id = uuid();
    let pos = forms.length+1;

    let chunk = {id: id,  question: {
      questionType: 'Short Answer',
      defaultValue: 'Question',
      required: state.MakeQuestionsRequiredByDefault,
      description: false,
      descriptionValue: '',
      dropdownOptions: null,
      responseValidation: false,
      responseValidationValue: {},
      radioOptions: null,
      checkboxOptions: null,
      dropdownOptions: null,
      uploadSize: '10',
      uploadSpecifics: {
        document: false,
        spreadshit: false,
        pdf: false,
        video: false,
        presentation: false,
        drawing: false,
        image: true,
        audio: false
      },
      linearFrom: 0,
      linearTo: 5,
      linearLabel1: '',
      linearLabel2: '',
      gridRadioRow: null,
      gridRadioColumn: null,
      gridCheckboxRow: null,
      gridCheckboxColumn: null,
      pointSource: 'gps',
      pointBackgroundCheck: true,
      pointLaskKnownLocation: false,
      pointCustomTile: true,
      polylineSource: 'gps',
      polylineMinPairs: '2',
      polylineMaxResponse: '1',
      polylineBackgroundCheck: true,
      polylineLastKnownLocation: false,
      polylineCustomTile: true,
      polygonSource: 'gps',
      polygonMinPairs: '3',
      polygonMaxResponse: '1',
      polygonBackgroundCheck: true,
      polygonLastKnownLocation: false,
      polygonCustomTile: true

    }, position: pos, linked:false, parent:link_id == null ? false : true, parentID: link_id, linked_parameters: null, linked_question: null, linked_position: null, type: 1};

    if(link_id !== null && link_id !== undefined){
      let idx = forms.findIndex((obj => obj.id == link_id));
      let q = forms[idx];
      
      q.linked_question = id;
      q.linked_parameters = params;
      q.linked_position = pos;
    }
    
    setForms(prevForms => [...prevForms, chunk]);
  }

  const linkedRadioOptions = (id) => {
    let idx = forms.findIndex((obj => obj.id == id));
    let q = forms[idx];

    if(q.question.radioOptions == null){
      return [];
    } else {
      return q.question.radioOptions
    }
  }

  const linkControls = (id) => {
    let option = linkedRadioOptions(id);
    const [selected, setSelected] = useState('');

    return (
          <>
          <Text>Show a question if response is:</Text>
          <Select value={selected} onChange={(val) => {setSelected(val)}}  data={option} />
          <Button variant='subtle'  color='dark' onClick={() => {createNewQuestion(id, selected)}}>Create the question</Button>
          </>
    )
  }

  const createTitleAndDescription = () => {
    let id = uuid();
    let chunk = {id: id, question: {title: 'Untitled title', description: 'Description(optional)',}, position: forms.length+1, type: 2};
    setForms(prevForms => [...prevForms, chunk]);
  };

  const createSectionImage = () => {
    let control = localStorage.getItem('gc-hi-param');
    if(control !== null){
      dispatch({type: 'UPDATE_HEADER_IMAGE', headerimage: selectedimage });
      setImg('');
      setSelectedImage('');
      setRes([]);
      setImageModal(false);
      localStorage.removeItem('gc-hi-param');

    } else {
      setImageModal(false);
      let id = uuid();
      let chunk = {id: id, image: selectedimage, type: 3};
      setForms(prevForms => [...prevForms, chunk]);
      setImg('');
      setSelectedImage('');
      setRes([]);
    }
    }

  const createImage = (param) => {
    if(param !== null){
      localStorage.setItem('gc-hi-param', param);
    }
    setImageModal(true);
  }

  const fetchImages = async() => {
    const data = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}`);
    const dataJ = await data.json();
    const result = dataJ.results;
    setRes(result);
  }

  const fetchVideos = async () => {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${video_key}&type=video&part=snippet&q=${video}`;

    const response = await fetch(url);
    const data = await response.json();
    setVideoRes(data.items);
  }

  const createSectionVideo = () => {
    setVideoModalOpened(false);
    let id = uuid();
    let chunk = {id: id, video: videoselected, type: 4};
    setForms(prevForms => [...prevForms, chunk]);
    setVideoSelected('');
    setVideo('');
    setVideoRes([]);
    setVideoModalOpened(false);
  }

  const createVideo = () => {
    setVideoModalOpened(true);
  }

  const createSection = () => {
    let id = uuid();
    let chunk = {id: id, title: 'Untitled Section', description: '', type: 5};
    setForms(prevForms => [...prevForms, chunk]);
  }

  const duplicateQuestion = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let content = forms[index];
    let chunk = {...content, id: uuid(), position: forms.length+1, linked: false, linked_question: null, linked_parameters: null, linked_position: null};
    setForms(prevForms => [...prevForms, chunk]);
  }

  const deleteQuestion = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let q = forms[index];

    if(q.linked){
      let pos = q.linked_position;
      let idx = forms.findIndex((obj => obj.position == pos));
      forms.splice(idx, 1);
    };

    let pos2 = q.position;
    let idx2 = forms.findIndex((obj => obj.linked_position == pos2));

    if(idx2 !== -1){
      let q = forms[idx2];
      q.linked = false;
      q.linked_question = null;
      q.linked_parameters = null;
      q.linked_position = null;
    }
    forms.splice(index, 1);
    setForms([...forms]);
  }

  const findFormIndex = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    return index;
  }

  const handleShortAnswer = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Short Answer';
  }

  const handleParagraph = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Paragraph';
  }

  const handleMultipleChoice = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Multiple Choice';
  }

  const handleCheckbox = (id) =>  {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Checkbox';
  }

  const handleDropdown = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Dropdown';
  }

  const handleFileUpload = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'File Upload';
  }

  const handleLinearScale = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Linear Scale';
  }

  const handleMultipleChoiceGrid = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Multiple Choice Grid';
  }

  const handleCheckboxGrid = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Checkbox Grid';
  }

  const handleDate = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Date';
  }

  const handleTime = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Time';
  }

  const handlePoint = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Point';
  }

  const handlePolyline = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Polyline';
  }

  const handlePolygon = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let question = forms[index];

    question.question.questionType = 'Polygon';
  }

  const matchIcon = (str) => {
    switch(str){
      case 'Short Answer':
        return <ClearFormatting />

      case 'Paragraph':
        return <AlignCenter />

      case 'Multiple Choice':
        return <Selector />

      case 'Checkbox':
        return <Checkbox />

      case 'Dropdown':
        return <IoMdArrowDropdownCircle />

      case 'File Upload':
        return <FileUpload />

      case 'Linear Scale':
        return <SliderIcon />

      case 'Multiple Choice Grid':
        return <GridDots />

      case 'Checkbox Grid':
        return <LayoutGrid />

      case 'Date':
        return <Calendar />

      case 'Time':
        return <Clock />

      case 'Point':
        return <Location />

      case 'Polyline':
        return <Line />

      case 'Polygon':
        return <Polygon />

      default:
        return null;
    }
  }

  const shortAnswerDetails = (id) => {
    return <Text size='xs' color='gray' >Short answer text</Text>
  }

  const paragraphDetails = (id) => {
    return <Text size='xs' color='gray' >Long answer text</Text>
  }

  const retrieveOptions = (id) => {
    let index = forms.findIndex((obj => obj.id == id));
    let q = forms[index];
    if(q.question.radioOptions == null){
      return [];
    }

    return q.question.radioOptions
  }

  const multipleChoiceDetails = (id) => {

    const [option, setOptions] = useState([]);
    const [opened, setOpened] = useState(false);
    const [radioerror, setRadioError] = useState(false);

    useEffect(() => {
        let opts =  retrieveOptions(id);
        setOptions(opts);
    }, []);

    const checkUniqueArray = (arr) => {
      let n = arr.length;
      let s = new Set();

      for(let i=0; i<n; i++){
        s.add(arr[i]);
      }

      return (s.size == n);
    }

    const OptionsForm = () => {
      const isMobile = useMediaQuery('(max-width: 755px');
      const [text, setText] = useState('');

      let tempArr = [];
      const createOptions = () => {
        if(!text.includes(',')){
          var regExp = /[a-zA-Z]/g;
          if(regExp.test(text)){
            let chunk = {label: text, id: uuid()};
            tempArr.push(chunk);
            setOptions(prevOptions => [...prevOptions, chunk]);
          } 
        } else {
          let arr = text.split(',');
          let arr2 = [];
          for(let i=0; i<arr.length; i++){
            var regExp = /[a-zA-Z]/g;
            if(regExp.test(arr[i])){
              arr2.push(arr[i].replace(/\s/g, ''));
              let chunk = {label: arr[i], id: uuid()};
              tempArr.push(chunk);
              setOptions(prevArr => [...prevArr, chunk]);
            }
          }

          setRadioError(!checkUniqueArray(arr2));

          
        }

            let newTempArr = [...new Set(tempArr)]
            let index = forms.findIndex((obj => obj.id == id));
            let q = forms[index];
            q.question.radioOptions = newTempArr;

            setOpened(false)
      }

      return (
        <form>
          <TextInput
            required
            label="Options"
            description="Separate option values using a comma"
            style={{ minWidth: isMobile ? 220 : 300 }}
            variant="default"
            value={text}
            onChange={(e) => {setText(e.currentTarget.value)}}
          />
  
    
          <Group position="apart" style={{ marginTop: 15 }}>
            <Anchor onClick={() => {setOpened(false)}} component="button" color="gray" size="sm">
              Cancel
            </Anchor>
            <Button onClick={() => {createOptions()}} type="button" size="sm">
              Save
            </Button>
          </Group>
        </form>
      );
    }

    const handleOpenPopover = () => {
      if(!opened) {
        setOptions([]);
        setOpened(true)
      } else {
        setOpened(false)
      }
    }


    const  AddButton = () => {
      return (
        <div onClick={() => {handleOpenPopover()}} style={{ display: 'flex', cursor: 'pointer' }}>
          <ActionIcon>
            {option.length > 0 ? ( <Edit size={13} />) : (<Plus size={13} />)}
          </ActionIcon>
    
          <div>
            {option.length > 0 ? (<Text>Edit Option Values</Text>) : (<Text>Add Option Values</Text>)}
            <Text size="xs" color="gray">
              Separated by comma
            </Text>
          </div>
        </div>
      );
    }

    const handleEditOption = (label, id) => {

    }
    return (
      <Group direction='column'>
        <Group position='apart'>
        <RadioGroup error={radioerror ? "Duplicate values will not be saved!" : null} orientation='vertical'>
        {option.map((item, index) => {
          return (
               <Radio key={index} value={item.label} label={item.label} />
              )
        })}
        <ActionIcon onClick={() => {handleEditOption(item.label, item.id)}} >
          <Edit />
        </ActionIcon>
        </RadioGroup>
        </Group>
        <Group>
        <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="top"
        placement="end"
        withCloseButton
        title="Add options"
        transition="pop-top-right"
        target={
            <AddButton />
        }
      >
      <OptionsForm />

        </Popover>

        </Group>
      </Group>
    )
  }

  const retrieveCheckboxex = (id) => {
    let index = forms.findIndex((obj => obj.id == id));
    let q = forms[index];
    if(q.question.checkboxOptions == null){
      return [];
    }

    return q.question.checkboxOptions
  }

  const checkboxDetails = (id) => {
    const [option, setOptions] = useState([]);
    const [opened, setOpened] = useState(false);
    const [radioerror, setRadioError] = useState(false);

    useEffect(() => {
        let opts =  retrieveCheckboxex(id);
        setOptions(opts);
    }, []);

    const checkUniqueArray = (arr) => {
      let n = arr.length;
      let s = new Set();

      for(let i=0; i<n; i++){
        s.add(arr[i]);
      }

      return (s.size == n);
    }

    const OptionsForm = () => {
      const isMobile = useMediaQuery('(max-width: 755px');
      const [text, setText] = useState('');

      let tempArr = [];
      const createOptions = () => {
        if(!text.includes(',')){
          var regExp = /[a-zA-Z]/g;
          if(regExp.test(text)){
            let chunk = {label: text, id: uuid()};
            tempArr.push(chunk);
            setOptions(prevOptions => [...prevOptions, chunk]);
          } 
        } else {
          let arr = text.split(',');
          let arr2 = [];
          for(let i=0; i<arr.length; i++){
            var regExp = /[a-zA-Z]/g;
            if(regExp.test(arr[i])){
              arr2.push(arr[i].replace(/\s/g, ''));
              let chunk = {label: arr[i], id: uuid()};
              tempArr.push(chunk);
              setOptions(prevArr => [...prevArr, chunk]);
            }
          }

          setRadioError(!checkUniqueArray(arr2));

          
        }

            let newTempArr = [...new Set(tempArr)]
            let index = forms.findIndex((obj => obj.id == id));
            let q = forms[index];
            q.question.checkboxOptions = newTempArr;

            setOpened(false)
      }

      return (
        <form>
          <TextInput
            required
            label="Options"
            description="Separate option values using a comma"
            style={{ minWidth: isMobile ? 220 : 300 }}
            variant="default"
            value={text}
            onChange={(e) => {setText(e.currentTarget.value)}}
          />
  
    
          <Group position="apart" style={{ marginTop: 15 }}>
            <Anchor onClick={() => {setOpened(false)}} component="button" color="gray" size="sm">
              Cancel
            </Anchor>
            <Button onClick={() => {createOptions()}} type="button" size="sm">
              Save
            </Button>
          </Group>
        </form>
      );
    }

    const handleOpenPopover = () => {
      if(!opened) {
        setOptions([]);
        setOpened(true)
      } else {
        setOpened(false)
      }
    }


    const  AddButton = () => {
      return (
        <div onClick={() => {handleOpenPopover()}} style={{ display: 'flex', cursor: 'pointer' }}>
          <ActionIcon>
            {option.length > 0 ? ( <Edit size={13} />) : (<Plus size={13} />)}
          </ActionIcon>
    
          <div>
            {option.length > 0 ? (<Text>Edit Option Values</Text>) : (<Text>Add Option Values</Text>)}
            <Text size="xs" color="gray">
              Separated by comma
            </Text>
          </div>
        </div>
      );
    }

    const handleEditOption = (label, id) => {

    }
    return (
      <Group direction='column'>
        <Group position='apart'>
        <CheckboxGroup error={radioerror ? "Duplicate values will not be saved!" : null} orientation='vertical'>
        {option.map((item, index) => {
          return (
               <MantineCheckbox key={index} value={item.label} label={item.label} />
              )
        })}
        <ActionIcon onClick={() => {handleEditOption(item.label, item.id)}} >
          <Edit />
        </ActionIcon>
        </CheckboxGroup>
        </Group>
        <Group>
        <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="top"
        placement="end"
        withCloseButton
        title="Add options"
        transition="pop-top-right"
        target={
            <AddButton />
        }
      >
      <OptionsForm />

        </Popover>

        </Group>
      </Group>
    )
  }

  const dropdownDetails = (id) => {
    const [option, setOptions] = useState([]);
    const [opened, setOpened] = useState(false);
    const [radioerror, setRadioError] = useState(false);

    const checkUniqueArray = (arr) => {
      let n = arr.length;
      let s = new Set();

      for(let i=0; i<n; i++){
        s.add(arr[i]);
      }

      return (s.size == n);
    }

    const OptionsForm = () => {
      const isMobile = useMediaQuery('(max-width: 755px');
      const [text, setText] = useState('');
        let tempArr = [];
      const createOptions = () => {
        if(!text.includes(',')){
          var regExp = /[a-zA-Z]/g;
          if(regExp.test(text)){
            let chunk = {label: text, value: arr[i], id: uuid()};
            tempArr.push(chunk);
            setOptions(prevOptions => [...prevOptions, chunk]);
          } 
        } else {
          let arr = text.split(',');
          let arr2 = [];
          for(let i=0; i<arr.length; i++){
            var regExp = /[a-zA-Z]/g;
            if(regExp.test(arr[i])){
              arr2.push(arr[i].replace(/\s/g, ''));
              let chunk = {label: arr[i], value: arr[i], id: uuid()};
              tempArr.push(chunk);
              setOptions(prevArr => [...prevArr, chunk]);
            }
          }

          setRadioError(!checkUniqueArray(arr2));
          
        }

        let newTempArr = [...new Set(tempArr)]
        let index = forms.findIndex((obj => obj.id == id));
        let q = forms[index];
        q.question.dropdownOptions = newTempArr;

        setOpened(false)
      }

      return (
        <form>
          <TextInput
            required
            label="Options"
            description="Separate option values using a comma"
            style={{ minWidth: isMobile ? 220 : 300 }}
            variant="default"
            value={text}
            onChange={(e) => {setText(e.currentTarget.value)}}
          />
  
    
          <Group position="apart" style={{ marginTop: 15 }}>
            <Anchor onClick={() => {setOpened(false)}} component="button" color="gray" size="sm">
              Cancel
            </Anchor>
            <Button onClick={() => {createOptions()}} type="button" size="sm">
              Save
            </Button>
          </Group>
        </form>
      );
    }

    const handleOpenPopover = () => {
      if(!opened) {
        setOptions([]);
        setOpened(true)
      } else {
        setOpened(false)
      }
    }


    const  AddButton = () => {
      return (
        <div onClick={() => {handleOpenPopover()}} style={{ display: 'flex', cursor: 'pointer' }}>
          <ActionIcon>
            {option.length > 0 ? ( <Edit size={13} />) : (<Plus size={13} />)}
          </ActionIcon>
    
          <div>
            {option.length > 0 ? (<Text>Edit Option Values</Text>) : (<Text>Add Option Values</Text>)}
            <Text size="xs" color="gray">
              Separated by comma
            </Text>
          </div>
        </div>
      );
    }

    const handleEditOption = (label, id) => {

    }
    return (
      <Group direction='column'>
        <Select error={radioerror ? "Dropdown items should be unique " : null} data={option} />
        <Group>
        <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="top"
        placement="end"
        withCloseButton
        title="Add options"
        transition="pop-top-right"
        target={
            <AddButton />
        }
      >
      <OptionsForm />

        </Popover>

        </Group>
      </Group>
    )
  }

  const fileUploadDetails = (id) => {
    const [specific, setSpecific] = useState(false);
    const [specifics, setSpecifics] = useState({
      document: false,
      spreadshit: false,
      pdf: false,
      video: false,
      presentation: false,
      drawing: false,
      image: true,
      audio: false
    });

    const [maxSize, setMaxSize] = useState('10');

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.uploadSize = maxSize;
    }, [maxSize]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.uploadSpecifics = specifics;
    }, [specifics]);


    return (
      <Group direction='column' style={{width: '100%'}}>
        <Group position='apart'>
          <Text>Allow only specific file types</Text>
          <Switch checked={specific} onChange={(e) => {setSpecific(e.currentTarget.checked)}} />
        </Group>
        {specific ? (
          <Group>
            <SimpleGrid cols={2}>
              <MantineCheckbox checked={specifics.document} onChange={(e) => {setSpecifics(prevSpecifics => ({...prevSpecifics, document: e.target.checked}))}} label="Document" />
              <MantineCheckbox checked={specifics.spreadshit} onChange={(e) => {setSpecifics(prevSpecifics => ({...prevSpecifics, spreadshit: e.target.checked}))}}  label="Spreadshit" />
              <MantineCheckbox checked={specifics.pdf} onChange={(e) => {setSpecifics(prevSpecifics => ({...prevSpecifics, pdf: e.target.checked}))}}  label="PDF" />
              <MantineCheckbox checked={specifics.video} onChange={(e) => {setSpecifics(prevSpecifics => ({...prevSpecifics, video: e.target.checked}))}}  label="Video" />
              <MantineCheckbox checked={specifics.presentation} onChange={(e) => {setSpecifics(prevSpecifics => ({...prevSpecifics, presentation: e.target.checked}))}}  label="Presentation" />
              <MantineCheckbox checked={specifics.drawing} onChange={(e) => {setSpecifics(prevSpecifics => ({...prevSpecifics, drawing: e.target.checked}))}}  label="Drawing" />
              <MantineCheckbox checked={specifics.image} onChange={(e) => {setSpecifics(prevSpecifics => ({...prevSpecifics, image: e.target.checked}))}}  label="Image" />
              <MantineCheckbox checked={specifics.audio} onChange={(e) => {setSpecifics(prevSpecifics => ({...prevSpecifics, audio: e.target.checked}))}}  label="Audio" />
            </SimpleGrid>
          </Group>
        ) : null}

        <Group position='apart' >
          <Text>Maximum file size</Text>
          <Select value={maxSize} onChange={(val) => {setMaxSize(val)}} data={[
            {label: '1MB', value: '1'},
            {label: '10MB', value: '10'},
          ]} />
        </Group>
        <Text size='xs' color='gray'>
          This form can accept upto 10MB
        </Text>

      </Group>
    )
  }

  const linearScaleDetails = (id) => {
    const [from, setFrom] = useState('0');
    const [to, setTo] = useState("5")

    const [label1, setLabel1] = useState('label(optional)');
    const [label2, setLabel2] = useState('label(optional)')

    const handleBlur1 = (str) => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.linearLabel1 = str;
      setLabel1(str);
    }

    const handleBlur2 = (str) => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.linearLabel2 = str;
      setLabel2(str);
    }

    const handleFrom = (val) => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.linearFrom = parseInt(val);

      setFrom(val);
    }

    const handleTo = (val) => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.linearTo = parseInt(val);

      setTo(val);
    }
    return (
      <>
      <Group grow>
        <Select  value={from} onChange={(val) => {handleFrom(val)}} rightSection={<ChevronDown size={14} />} data={[
          {label: "0", value: "0"},
          {label: '1', value: "1"}
        ]} />
        <Group position='center'>
        <Text>To</Text>
        </Group>
        <Select value={to} onChange={(val) => {handleTo(val)}} rightSection={<ChevronDown size={14} />} data={[
          {label: "2", value: "2"},
          {label: '3', value: "3"},
          {label: "4", value: "4"},
          {label: '5', value: "5"},
          {label: "6", value: "6"},
          {label: '7', value: "7"},
          {label: "8", value: "8"},
          {label: '9', value: "9"},
          {label: '10', value: "10"},
        ]} />
      </Group>
              <Group position='left'>
              <Text size='xs' color='gray'>{from}</Text>
              <Text contentEditable onBlur={(e) => {handleBlur1(e.target.textContent)}} >{label1}</Text>
            </Group>
            <Group position='left'>
              <Text size='xs' color='gray' >{to}</Text>
              <Text contentEditable onBlur={(e) => {handleBlur2(e.target.textContent)}} >{label2}</Text>
            </Group>
            </>
    )
  }

  const retrieveRadioRows = (id) => {
    let q = forms[forms.findIndex((obj => obj.id == id))];
    if(q.question.gridRadioRow == null){
      return [];
    } 

    return q.question.gridRadioRow
  }

  const retrieveGridCols = (id) => {
    let q = forms[forms.findIndex((obj => obj.id == id))];
    if(q.question.gridRadioColumn == null){
      return [];
    }

    return q.question.gridRadioColumn;
  }

  const multipleChoiceGridDetails = (id) => {
    const [option, setOptions] = useState([]);
    const [opened, setOpened] = useState(false);
    const [opened2, setOpened2] = useState(false);
    const [radioerror, setRadioError] = useState(false);
    const [cols, setCols] = useState([]);

    React.useEffect(() => {
      let r = retrieveRadioRows(id);
      setOptions(r);
    }, []);

    React.useEffect(() => {
      let c = retrieveGridCols(id);
      setCols(c);
    }, []);

    const incrementCols = () => {
      let chunk = {label: 'Column', id: uuid()};
      setCols(prevCols => [...prevCols, chunk])
    }
    const checkUniqueArray = (arr) => {
      let n = arr.length;
      let s = new Set();

      for(let i=0; i<n; i++){
        s.add(arr[i]);
      }

      return (s.size == n);
    }

    const OptionsForm = () => {
      const isMobile = useMediaQuery('(max-width: 755px');
      const [text, setText] = useState('');

      const createOptions = () => {
        let tempArr = [];
        if(!text.includes(',')){
          var regExp = /[a-zA-Z]/g;
          if(regExp.test(text)){
            let chunk = {label: text, value: arr[i], id: uuid()};
            tempArr.push(chunk)
            setOptions(prevOptions => [...prevOptions, chunk]);
          } 
        } else {
          let arr = text.split(',');
          let arr2 = [];
          for(let i=0; i<arr.length; i++){
            var regExp = /[a-zA-Z]/g;
            if(regExp.test(arr[i])){
              arr2.push(arr[i].replace(/\s/g, ''));
              let chunk = {label: arr[i], value: arr[i], id: uuid()};
              tempArr.push(chunk)
              setOptions(prevArr => [...prevArr, chunk]);
            }
          }

          setRadioError(!checkUniqueArray(arr2));
        }

        let idx = forms.findIndex((obj => obj.id == id));
        let q = forms[idx];

        q.question.gridRadioRow = [...new Set(tempArr)];

        setOpened(false)
      }

      return (
        <form>
          <TextInput
            required
            label="Options"
            description="Separate option values using a comma"
            style={{ minWidth: isMobile ? 220 : 300 }}
            variant="default"
            value={text}
            onChange={(e) => {setText(e.currentTarget.value)}}
          />
  
    
          <Group position="apart" style={{ marginTop: 15 }}>
            <Anchor onClick={() => {setOpened(false)}} component="button" color="gray" size="sm">
              Cancel
            </Anchor>
            <Button onClick={() => {createOptions()}} type="button" size="sm">
              Save
            </Button>
          </Group>
        </form>
      );
    }

    const ColumnsForm = () => {
      const isMobile = useMediaQuery('(max-width: 755px');
      const [text, setText] = useState('');

      const createOptions = () => {
        let tempArr = [];
        if(!text.includes(',')){
          var regExp = /[a-zA-Z]/g;
          if(regExp.test(text)){
            let chunk = {label: text, value: arr[i], id: uuid()};
            tempArr.push(chunk)
            setCols(prevOptions => [...prevOptions, chunk]);
          } 
        } else {
          let arr = text.split(',');
          let arr2 = [];
          for(let i=0; i<arr.length; i++){
            var regExp = /[a-zA-Z]/g;
            if(regExp.test(arr[i])){
              arr2.push(arr[i].replace(/\s/g, ''));
              let chunk = {label: arr[i], value: arr[i], id: uuid()};
              tempArr.push(chunk)
              setCols(prevArr => [...prevArr, chunk]);
            }
          }

          setRadioError(!checkUniqueArray(arr2));
        }

        let idx = forms.findIndex((obj => obj.id == id));
        let q = forms[idx];

        q.question.gridRadioColumn = [... new Set(tempArr)];

        setOpened2(false)
      }

      return (
        <form>
          <TextInput
            required
            label="Column"
            description="Separate column labels using a comma"
            style={{ minWidth: isMobile ? 220 : 300 }}
            variant="default"
            value={text}
            onChange={(e) => {setText(e.currentTarget.value)}}
          />
  
    
          <Group position="apart" style={{ marginTop: 15 }}>
            <Anchor onClick={() => {setOpened2(false)}} component="button" color="gray" size="sm">
              Cancel
            </Anchor>
            <Button onClick={() => {createOptions()}} type="button" size="sm">
              Save
            </Button>
          </Group>
        </form>
      );
    }

    const handleOpenPopover = () => {
      if(!opened) {
        setOptions([]);
        setOpened(true)
      } else {
        setOpened(false)
      }
    }

    const handleOpenPopover2 = () => {
      if(!opened2) {
        setCols([]);
        setOpened2(true)
      } else {
        setOpened2(false)
      }
    }


    const  AddButton = () => {
      return (
        <div onClick={() => {handleOpenPopover()}} style={{ display: 'flex', cursor: 'pointer' }}>
          <ActionIcon>
            {option.length > 0 ? ( <Edit size={13} />) : (<Plus size={13} />)}
          </ActionIcon>
    
          <div>
            {option.length > 0 ? (<Text>Edit Rows</Text>) : (<Text>Add Rows</Text>)}
            <Text size="xs" color="gray">
              Separated by comma
            </Text>
          </div>
        </div>
      );
    }

    const  AddButton2 = () => {
      return (
        <div onClick={() => {handleOpenPopover2()}} style={{ display: 'flex', cursor: 'pointer' }}>
          <ActionIcon>
            {option.length > 0 ? ( <Edit size={13} />) : (<Plus size={13} />)}
          </ActionIcon>
    
          <div>
            {option.length > 0 ? (<Text>Edit Columns</Text>) : (<Text>Add Columns</Text>)}
            <Text size="xs" color="gray">
              Separated by comma
            </Text>
          </div>
        </div>
      );
    }

    const  AddColumns = () => {
      return (
        <div onClick={() => {incrementCols()}} style={{ display: 'flex', cursor: 'pointer' }}>
          <ActionIcon>
            {option.length > 0 ? ( <Plus size={13} />) : (<Plus size={13} />)}
          </ActionIcon>
    
          <div>
            {option.length > 0 ? (<Text>Add Columns</Text>) : (<Text>Add Columns</Text>)}
          </div>
        </div>
      );
    }

    const handleEditOption = (label, id) => {

    }

    return (
      <Group position='apart' grow>
        <Group position='left'>
        <Group direction='column'>
        <Group position='apart'>
        <RadioGroup error={radioerror ? "Value options should be unique!" : null} orientation='vertical'>
        {option.map((item, index) => {
          return (
               <Radio disabled key={index} value={item.label} label={item.label} />
              )
        })}
        </RadioGroup>
        </Group>
        <Group>
        <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="top"
        placement="end"
        withCloseButton
        title="Add options"
        transition="pop-top-right"
        target={
            <AddButton />
        }
      >
      <OptionsForm />

        </Popover>

        </Group>
      </Group>
        </Group>

        <Group position='right'>
          <Group direction='column'>
            <RadioGroup>
            {cols.map((item, index) => {
              return (
                <Radio disabled value={index} label={item.label + (index+1)} />
              )
            })}
            </RadioGroup>
            <Group>
        <Popover
        opened={opened2}
        onClose={() => setOpened2(false)}
        position="top"
        placement="end"
        withCloseButton
        title="Add options"
        transition="pop-top-right"
        target={
            <AddButton2 />
        }
      >
      <ColumnsForm />

        </Popover>

        </Group>
          </Group>
        </Group>
      </Group>
    )

  }

  const retrieveGridCheckboxRows = (id) => {
    let idx = forms.findIndex((obj => obj.id == id));
    let q = forms[idx];

    if(q.question.gridCheckboxRow == null){
      return [];
    }

    return q.question.gridCheckboxRow
  }

  const retrieveGridCheckboxColumns = (id) => {
    let idx = forms.findIndex((obj => obj.id == id));
    let q = forms[idx];

    if(q.question.gridCheckboxColumn == null){
      return [];
    } 

    return q.question.gridCheckboxColumn;
  }

  const checkboxGridDetails = (id) => {
    const [option, setOptions] = useState([]);
    const [opened, setOpened] = useState(false);
    const [opened2, setOpened2] = useState(false);
    const [radioerror, setRadioError] = useState(false);
    const [cols, setCols] = useState([]);

    React.useEffect(() => {
      let c = retrieveGridCheckboxColumns(id);
      setCols(c);
    }, []);

    React.useEffect(() => {
      let r = retrieveGridCheckboxRows(id);
      setOptions(r);
    }, []);

    const checkUniqueArray = (arr) => {
      let n = arr.length;
      let s = new Set();

      for(let i=0; i<n; i++){
        s.add(arr[i]);
      }

      return (s.size == n);
    }

    const OptionsForm = () => {
      const isMobile = useMediaQuery('(max-width: 755px');
      const [text, setText] = useState('');

      const createOptions = () => {
        let tempArr = [];
        if(!text.includes(',')){
          var regExp = /[a-zA-Z]/g;
          if(regExp.test(text)){
            let chunk = {label: text, value: arr[i], id: uuid()};
            tempArr.push(chunk);
            setOptions(prevOptions => [...prevOptions, chunk]);
          } 
        } else {
          let arr = text.split(',');
          let arr2 = [];
          for(let i=0; i<arr.length; i++){
            var regExp = /[a-zA-Z]/g;
            if(regExp.test(arr[i])){
              arr2.push(arr[i].replace(/\s/g, ''));
              let chunk = {label: arr[i], value: arr[i], id: uuid()};
              tempArr.push(chunk);
              setOptions(prevArr => [...prevArr, chunk]);
            }
          }

          setRadioError(!checkUniqueArray(arr2));
        }

        let idx = forms.findIndex((obj => obj.id == id));
        let q = forms[idx];

        q.question.gridCheckboxRow = [...new Set(tempArr)];

        setOpened(false)
      }

      return (
        <form>
          <TextInput
            required
            label="Row Labels"
            description="Separate row labels using a comma"
            style={{ minWidth: isMobile ? 220 : 300 }}
            variant="default"
            value={text}
            onChange={(e) => {setText(e.currentTarget.value)}}
          />
  
    
          <Group position="apart" style={{ marginTop: 15 }}>
            <Anchor onClick={() => {setOpened(false)}} component="button" color="gray" size="sm">
              Cancel
            </Anchor>
            <Button onClick={() => {createOptions()}} type="button" size="sm">
              Save
            </Button>
          </Group>
        </form>
      );
    }

    const ColumnsForm = () => {
      const isMobile = useMediaQuery('(max-width: 755px');
      const [text, setText] = useState('');

      const createOptions = () => {
        let tempArr = [];
        if(!text.includes(',')){
          var regExp = /[a-zA-Z]/g;
          if(regExp.test(text)){
            let chunk = {label: text, value: arr[i], id: uuid()};
            tempArr.push(chunk);
            setCols(prevOptions => [...prevOptions, chunk]);
          } 
        } else {
          let arr = text.split(',');
          let arr2 = [];
          for(let i=0; i<arr.length; i++){
            var regExp = /[a-zA-Z]/g;
            if(regExp.test(arr[i])){
              arr2.push(arr[i].replace(/\s/g, ''));
              let chunk = {label: arr[i], value: arr[i], id: uuid()};
              tempArr.push(chunk);
              setCols(prevArr => [...prevArr, chunk]);
            }
          }

          setRadioError(!checkUniqueArray(arr2));
        }

        let idx = forms.findIndex((obj => obj.id == id));
        let q = forms[idx];

        q.question.gridCheckboxColumn = [...new Set(tempArr)];

        setOpened2(false)
      }

      return (
        <form>
          <TextInput
            required
            label="Column labels"
            description="Separate column labels using a comma"
            style={{ minWidth: isMobile ? 220 : 300 }}
            variant="default"
            value={text}
            onChange={(e) => {setText(e.currentTarget.value)}}
          />
  
    
          <Group position="apart" style={{ marginTop: 15 }}>
            <Anchor onClick={() => {setOpened2(false)}} component="button" color="gray" size="sm">
              Cancel
            </Anchor>
            <Button onClick={() => {createOptions()}} type="button" size="sm">
              Save
            </Button>
          </Group>
        </form>
      );
    }

    const handleOpenPopover = () => {
      if(!opened) {
        setOptions([]);
        setOpened(true)
      } else {
        setOpened(false)
      }
    }

    const handleOpenPopover2 = () => {
      if(!opened2) {
        setCols([]);
        setOpened2(true)
      } else {
        setOpened2(false)
      }
    }


    const  AddButton = () => {
      return (
        <div onClick={() => {handleOpenPopover()}} style={{ display: 'flex', cursor: 'pointer' }}>
          <ActionIcon>
            {option.length > 0 ? ( <Edit size={13} />) : (<Plus size={13} />)}
          </ActionIcon>
    
          <div>
            {option.length > 0 ? (<Text>Edit Rows</Text>) : (<Text>Add Rows</Text>)}
            <Text size="xs" color="gray">
              Separated by comma
            </Text>
          </div>
        </div>
      );
    }

    const  AddColumns = () => {
      return (
        <div onClick={() => {handleOpenPopover2()}} style={{ display: 'flex', cursor: 'pointer' }}>
          <ActionIcon>
            {cols.length > 0 ? ( <Plus size={13} />) : (<Plus size={13} />)}
          </ActionIcon>
    
          <div>
            {option.length > 0 ? (<Text>Add Columns</Text>) : (<Text>Add Columns</Text>)}
          </div>
        </div>
      );
    }

    const handleEditOption = (label, id) => {

    }

    return (
      <Group position='apart' grow>
        <Group position='left'>
        <Group direction='column'>
        <Group position='apart'>
        <CheckboxGroup error={radioerror ? "Value options should be unique!" : null} orientation='vertical'>
        {option.map((item, index) => {
          return (
               <MantineCheckbox disabled key={index} value={item.label} label={item.label} />
              )
        })}
        </CheckboxGroup>
        </Group>
        <Group>
        <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="top"
        placement="end"
        withCloseButton
        title="Add options"
        transition="pop-top-right"
        target={
            <AddButton />
        }
      >
      <OptionsForm />

        </Popover>

        </Group>
      </Group>
        </Group>

        <Group position='right'>
          <Group direction='column'>
            <CheckboxGroup>
            {cols.map((item, index) => {
              return (
                <MantineCheckbox disabled value={item.label} key={index} label={item.label} />
              )
            })}
            </CheckboxGroup>
            <Group>
        <Popover
        opened={opened2}
        onClose={() => setOpened2(false)}
        position="top"
        placement="end"
        withCloseButton
        title="Add options"
        transition="pop-top-right"
        target={
            <AddColumns />
        }
      >
      <ColumnsForm />

        </Popover>

        </Group>
          </Group>
        </Group>
      </Group>
    )

  }

  const dateDetails = (id) => {
    return (
    <DatePicker disabled placeholder='m, d, y' icon={<Calendar size={16} />} />
    )
  }

  const timeDetails = (id) => {
    return (
      <Group grow>
        <TimeInput disabled placeholder='H : m : s' icon={<Clock size={16} />} />
      </Group>
      )
  }

  const pointDetails = (id) => {
    const [source, setSource] = useState('gps');
    const [bgCheck, setBGCheck] = useState(true);
    const [lkl, setLKL] = useState(false);
    const [tile, setTile] = useState(true);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonSource = source;
    }, [source]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonBackgroundCheck = bgCheck;
    }, [bgCheck]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonLastKnownLocation = lkl;
    }, [lkl]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonCustomTile = tile;
    }, [tile]);
    return (
      <Group direction='column' style={{width: '100%'}}>

      <Group position='apart'>
        <Text>Select source of coordinates</Text>
        <Select value={source} onChange={(val) => {setSource(val)}} data={[
          {label: 'GPS', value: 'gps'},
          {label: 'IP Address', value: 'ip'},
          {label: 'Map Canvas', value: 'map'}
        ]} />
      </Group>

      {source === 'gps' ? (
        <>
            <Group position='apart'>
              <Text>Perform a background location check</Text>
              <Switch checked={bgCheck} onChange={(e) => {setBGCheck(e.currentTarget.checked)}}  />
            </Group>
            <Group position='apart'>
            <Text>Retrieve last known location</Text>
            <Switch checked={lkl} onChange={(e) => {setLKL(e.currentTarget.checked)}} />
          </Group>

          </>
      ) : null}
                    <Group position='apart'>
              <Text>Allow use of custom map tile</Text>
              <Switch checked={tile} onChange={(e) => {setTile(e.currentTarget.checked)}} />
            </Group>
      <Text size='xs' color='gray'>
        GeoPsy Collect uses Android's Fused Location Provider to provide high-accuracy gps coordinates
      </Text>

    </Group>
    )
  }

  const polylineDetails = (id) => {
    const [source, setSource] = useState('gps');
    const [min, setMin] = useState('3');
    const [max, setMax] = useState('1');
    const [bgCheck, setBGCheck] = useState(true);
    const [lkl, setLKL] = useState(false);
    const [tile, setTile] = useState(true);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonSource = source;
    }, [source]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonMinPairs = min;
    }, [min]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonMaxResponse = max;
    }, [max]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonBackgroundCheck = bgCheck;
    }, [bgCheck]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonLastKnownLocation = lkl;
    }, [lkl]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonCustomTile = tile;
    }, [tile]);
    return (
      <Group direction='column' style={{width: '100%'}}>

      <Group position='apart'>
        <Text>Select source of coordinates</Text>
        <Select value={source} onChange={(val) => {setSource(val)}} data={[
          {label: 'GPS', value: 'gps'},
          {label: 'Custom Input', value: 'input'},
          {label: 'Map Canvas', value: 'map'}
        ]} />
      </Group>

      <Group position='apart' >
        <Text>Minimum number of a pair of coordinates to create a polyline</Text>
        <Select value={min} onChange={(val) => {setMin(val)}} data={[
          {label: '2', value: '2'},
          {label: '3', value: '3'},
          {label: '4', value: '4'},
          {label: '5', value: '5'},
          {label: '6', value: '6'},
          {label: '7', value: '7'},
          {label: '8', value: '8'},
          {label: '9', value: '9'},
          {label: '10', value: '10'},
          {label: 'More than 10', value: '>10'}
        ]} />
      </Group>

      {source === 'gps' ? (
        <>
        
              <Group position='apart'>
              <Text>Perform a background location check</Text>
              <Switch checked={bgCheck} onChange={(e) => {setBGCheck(e.currentTarget.checked)}} />
            </Group>
            <Group position='apart'>
            <Text>Retrieve last known location</Text>
            <Switch checked={lkl} onChange={(e) => {setLKL(e.currentTarget.checked)}} />
          </Group>

          </>
      ) : null}
                    <Group position='apart'>
              <Text>Allow use of custom map tile</Text>
              <Switch checked={tile} onChange={(e) => {setTile(e.currentTarget.checked)}} />
            </Group>
      <Text size='xs' color='gray'>
        GeoPsy Collect uses Android's Fused Location Provider to provide high-accuracy gps coordinates
      </Text>

    </Group>
    )
  }

  const polygonDetails = (id) => {
    const [source, setSource] = useState('gps');
    const [min, setMin] = useState('3');
    const [max, setMax] = useState('1');
    const [bgCheck, setBGCheck] = useState(true);
    const [lkl, setLKL] = useState(false);
    const [tile, setTile] = useState(true);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonSource = source;
    }, [source]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonMinPairs = min;
    }, [min]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonMaxResponse = max;
    }, [max]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonBackgroundCheck = bgCheck;
    }, [bgCheck]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonLastKnownLocation = lkl;
    }, [lkl]);

    React.useEffect(() => {
      let idx = forms.findIndex((obj => obj.id == id));
      let q = forms[idx];

      q.question.polygonCustomTile = tile;
    }, [tile]);

    return (
      <Group direction='column' style={{width: '100%'}}>

      <Group position='apart'>
        <Text>Select source of coordinates</Text>
        <Select value={source} onChange={(val) => {setSource(val)}} data={[
          {label: 'GPS', value: 'gps'},
          {label: 'Custom Input', value: 'input'},
          {label: 'Map Canvas', value: 'map'}
        ]} />
      </Group>

      <Group position='apart' >
        <Text>Minimum number of a pair of coordinates to create a polygon</Text>
        <Select value={min} onChange={(val) => {setMin(val)}} data={[
          {label: '3', value: '3'},
          {label: '4', value: '4'},
          {label: '5', value: '5'},
          {label: '6', value: '6'},
          {label: '7', value: '7'},
          {label: '8', value: '8'},
          {label: '9', value: '9'},
          {label: '10', value: '10'},
          {label: 'More than 10', value: '>10'}
        ]} />
      </Group>

      {source === 'gps' ? (
        <>
              <Group position='apart'>
              <Text>Perform a background location check</Text>
              <Switch checked={bgCheck} onChange={(e) => {setBGCheck(e.currentTarget.checked)}} />
            </Group>
            <Group position='apart'>
            <Text>Retrieve last known location</Text>
            <Switch checked={lkl} onChange={(e) => {setLKL(e.currentTarget.checked)}} />
          </Group>

          </>
      ) : null}
                    <Group position='apart'>
              <Text>Allow use of custom map tile</Text>
              <Switch checked={tile} onChange={(e) => {setTile(e.currentTarget.checked)}} />
            </Group>
      <Text size='xs' color='gray'>
        GeoPsy Collect uses Android's Fused Location Provider to provide high-accuracy gps coordinates
      </Text>

    </Group>
    )
  }

  const questionDetails = (str, id) => {
    switch(str){
      case 'Short Answer':
        return shortAnswerDetails(id);

      case 'Paragraph':
        return paragraphDetails(id)

      case 'Multiple Choice':
        return multipleChoiceDetails(id);

      case 'Checkbox':
        return checkboxDetails(id);

      case 'Dropdown':
        return dropdownDetails(id);

      case 'File Upload':
        return fileUploadDetails(id);

      case 'Linear Scale':
        return linearScaleDetails(id);

      case 'Multiple Choice Grid':
        return multipleChoiceGridDetails(id);

      case 'Checkbox Grid':
        return checkboxGridDetails(id)

      case 'Date':
        return dateDetails(id);

      case 'Time':
        return timeDetails(id);

      case 'Point':
        return pointDetails(id);

      case 'Polyline':
        return polylineDetails(id);

      case 'Polygon':
        return polygonDetails(id);

      default:
        return null;
    }
  }

  const retrieveQuestion = (id) => {
    let index = forms.findIndex((obj => obj.id == id));
    let q = forms[index];

    return q.question.defaultValue;
  }

  const retrieveQuestionDescription = (id) => {
    let index = forms.findIndex((obj => obj.id == id));
    let q = forms[index];

    return q.question.descriptionValue;
  }

  const questionDescription = (id) => {
    let questionVal = retrieveQuestionDescription(id);
    if(questionVal == ''){
      questionVal = 'Question description(optional)'
    }
    const [question, setQuestion] = useState(questionVal);
    const [focused, setFocused] = useState(false);

    const handleBlur = () => {
      let index = forms.findIndex((obj => obj.id == id));
      let q = forms[index];

      q.question.descriptionValue = question;

      setForms([...forms]);
    }


    return (
      <Text size='xs' color='gray' contentEditable onBlur={() => {handleBlur()}} onInput={(e) => {setQuestion(e.currentTarget.textContent)}} >{questionVal}</Text>
    )
  }

  const makeQuestionRequired = (id, val) => {
    let index = forms.findIndex((obj => obj.id == id));
    let form = forms[index];
    form.question.required = !val;

    setForms([...forms])
  }

  const questionHasDescription = (id) => {
    setMiniMenuOpen(false);
    let index = forms.findIndex((obj => obj.id == id));
    let form = forms[index];

    let ctx = form.question.description;

    form.question.description = !ctx;
    setForms([...forms]);
  }

  const handleMiniMenu = (id) => {
    setMiniMenu(id);
    setMiniMenuOpen(!minimenuopen);
  }

  const handleMiniMenuXS = (id) => {
    setMiniMenu(id);
    setMiniMenuOpenXS(!minimenuopen);
  }

  const questionTitle = (id) => {
    let questionVal = retrieveQuestion(id);
    const [question, setQuestion] = useState(questionVal);

    const handleBlur = () => {
      let index = forms.findIndex((obj => obj.id == id));
      let q = forms[index];

      q.question.defaultValue = question;

      setForms([...forms]);
    }

    return (
      <Text contentEditable onBlur={() => {handleBlur()}} onInput={(e) => {setQuestion(e.currentTarget.textContent)}} >{questionVal}</Text>
    )
  }

  const retrieveTitle = (id) => {
    let index = forms.findIndex((obj => obj.id == id));
    let content = forms[index];

    return content.question.title;
  }

  const retrieveDescription = (id) => {
    let index = forms.findIndex((obj => obj.id == id));
    let content = forms[index];

    return content.question.description;
  }

  const titleAndDesc = (id) => {
    //let chunk = {id: id, title: '', description: '', type: 2};
    let t = retrieveTitle(id);
    let d = retrieveDescription(id);
    const ref = useRef();
    const [ctitle, setCTitle] = useState(t);
    const [cdesc, setCDesc] = useState(d);

    const handleBlur1 = (e) => {
      let index = forms.findIndex((obj => obj.id == id));
      let content = forms[index];
      content.question.title = e.currentTarget.textContent;

      setForms([...forms]);
    }

    const handleBlur2 = (e) => {
      let index = forms.findIndex((obj => obj.id == id));
      let content = forms[index];
      content.question.description = e.currentTarget.textContent;

      setForms([...forms]);
    }

    return (
      <>
      <Text contentEditable onBlur={(e) => {handleBlur1(e)}} >{ctitle}</Text>
      <Text size='xs' color='gray' contentEditable onBlur={(e) => {handleBlur2(e)}}>{cdesc}</Text>
      </>
    )

  }

  const retrieveSectionTitle = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let q = forms[index];

    if(q.title == ''){
      return 'Untitled Section';
    }

    return q.title;
  }

  const retrieveSectionDescription = (id) => {
    let index = forms.findIndex((obj => obj.id === id));
    let q = forms[index];

    if(q.description == ''){
      return 'Description (optional)';
    }
    return q.description;
  }

  const sectionTitleAndDescription = (id) => {
    const t = retrieveSectionTitle(id);
    let d = retrieveSectionDescription(id);

    const [stitle, setSTitle] = useState(t);
    const [sdesc, setSDesc] = useState(d);

    const handleBlur1 = (e) => {
      let index = forms.findIndex((obj => obj.id == id));
      let content = forms[index];
      content.title = e.currentTarget.textContent;

      setForms([...forms]);
    }

    const handleBlur2 = (e) => {
      let index = forms.findIndex((obj => obj.id == id));
      let content = forms[index];
      content.description = e.currentTarget.textContent;

      setForms([...forms]);
    }

    return(
      <>
      <Text contentEditable onBlur={(e) => {handleBlur1(e)}} >{stitle}</Text>
      <Text size='xs' color='gray' contentEditable onBlur={(e) => {handleBlur2(e)}}>{sdesc}</Text>
      </>
    )
  }

  const DndListHandleXS = () => {
    const { classes, cx } = useStyles();
    const [state, handlers] = useListState(forms);
    const [focused, setFocused] = useState({
      id: null,
      state: false,
    })

    const items = state.map((item, index) => (
      <Draggable key={item.id} index={index} draggableId={item.id}>
        {(provided, snapshot) => (
          <Card shadow={'md'} className={cx(classes.maincard, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}>
            {item.type == 1 ? (
                        <Card
                        className={classes.item}
                      >
                        <div {...provided.dragHandleProps} className={classes.dragHandle}>
                          {state.length > 1 ? (<GripVertical size={18} />) : null}
                        </div>
                        <Group style={{width: '100%'}} position='apart' grow>
                        <Group style={{width: '100%'}} direction='column' >
                          {questionTitle(item.id)}                     
                          {item.question.description ? questionDescription(item.id) : null }
                          {questionDetails(item.question.questionType, item.id)}
                        </Group>
                      <Group position='right'>
                        <Menu  onClick={() => {handleMenuClickXS(item.id)}} opened={handlerxs} position='right' control={<UnstyledButton
                    sx={(theme) => ({
                      display: 'block',
                      width: '100%',
                      padding: theme.spacing.md,
                      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
              
                      '&:hover': {
                        backgroundColor:
                          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                      },
                    })}
                  >
                    <Group>
                      {matchIcon(item.question.questionType)}
              
                      <div style={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
                        {item.question.questionType}
                        </Text>
            
                      </div>
              
                      <ChevronDown size={16} />
                    </Group>
                  </UnstyledButton>}>
                                <Menu.Item  onClick={() => {handleShortAnswer(menuid)}} icon={<ClearFormatting />}>Short Answer</Menu.Item>
                                <Menu.Item onClick={() => {handleParagraph(menuid)}} icon={<AlignCenter />}>Paragraph</Menu.Item>
                                <Divider />
                                <Menu.Item  onClick={() => {handleMultipleChoice(menuid)}} icon={<Selector />}>Multiple Choice</Menu.Item>
                                <Menu.Item  onClick={() => {handleCheckbox(menuid)}} icon={<Checkbox />}>Checkbox</Menu.Item>
                                <Menu.Item onClick={() => {handleDropdown(menuid)}} icon={<IoMdArrowDropdownCircle />}>Dropdown</Menu.Item>
                                <Divider />
                                <Menu.Item onClick={() => {handleFileUpload(menuid)}} icon={<FileUpload />}>File Upload</Menu.Item>
                                <Divider />
                                <Menu.Item  onClick={() => {handleLinearScale(menuid)}} icon={<SliderIcon />}>Linear Scale</Menu.Item>
                                <Menu.Item  onClick={() => {handleMultipleChoiceGrid(menuid)}} icon={<GridDots />}>Multiple Choice Grid</Menu.Item>
                                <Menu.Item  onClick={() => {handleCheckboxGrid(menuid)}} icon={ <LayoutGrid />}>Checkbox Grid</Menu.Item>
                                <Divider />
                                <Menu.Item  onClick={() => {handleDate(menuid)}} icon={<Calendar />}>Date</Menu.Item>
                                <Menu.Item  onClick={() => {handleTime(menuid)}} icon={<Clock />}>Time</Menu.Item>
                                <Divider />
                                <Menu.Item  onClick={() => {handlePoint(menuid)}} icon={<Location />}>Point</Menu.Item>
                                <Menu.Item  onClick={() => {handlePolyline(menuid)}} icon={<Line />}>Polyline</Menu.Item>
                                <Menu.Item  onClick={() => {handlePolygon(menuid)}} icon={<Polygon />}>Polygon</Menu.Item>
                              </Menu>
                        </Group>
                        </Group>
                      </Card>
            ): item.type == 2 ? (
              <Card shadow={'sm'}>
                <Card.Section>
                <Group style={{width: '100%'}} direction='column'>
                  {titleAndDesc(item.id)}
                </Group>
                </Card.Section>
              </Card>
            ) : item.type == 3 ? (
              <Card shadow={'sm'} >
                <Image style={{marginLeft: '10%', marginRight: '10%'}} height={200} src={item.image} />
              </Card>
            ) : item.type == 4 ? (
              <Card shadow={'sm'} >

              </Card>
            ) : (
              <Card shadow={'sm'} >
              <Group style={{width: '100%'}} direction='column'>
                  {sectionTitleAndDescription(item.id)}
              </Group>
              </Card>
            )}
          <Divider />
            <Group my={20} position='right' style={{width: '100%'}}>
              <ActionIcon title="Duplicate" onClick={() => {duplicateQuestion(item.id)}} >
                <Copy />
              </ActionIcon>
              <ActionIcon title='Delete' onClick={() => {deleteQuestion(item.id)}}>
                <Trash />
              </ActionIcon>
                 {item.type === 1 ? (
                  <Switch checked={item.question.required} onChange={() => {makeQuestionRequired(item.id, item.question.required)}} label={item.question.required ? "Required" : "optional"} color={color_strings[colors.indexOf(state.Color)]} />
                 ) : null}             
                {item.type === 1 ? (
                <Menu opened={minimenuopenxs && item.id === minimenu} placement='center' position='bottom' control={<ActionIcon onClick={() => {handleMiniMenuXS(item.id)}} ><DotsVertical /></ActionIcon>}>
                <Menu.Label >Show</Menu.Label>
                <Menu.Item onClick={() => {questionHasDescription(minimenu)}} icon={item.question.description ? <Check /> : null} >Description</Menu.Item>
                <Menu.Item>Response Validation</Menu.Item>
              </Menu>
                ) : null}
              {item.type === 1 && item.question.questionType == 'Multiple Choice' ? (
                <ActionIcon title='Link question' >
                  <Stack />
                </ActionIcon>
              ) : null}
            </Group>
          </Card>
        )}
      </Draggable>
    ));

    return (
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          handlers.reorder({ from: source.index, to: destination.index });
          setTimeout(function(){console.log(state)}, 1000)
        }}
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }


  const DndListHandle = () => {
    const { classes, cx } = useStyles();
    const [state, handlers] = useListState(forms);
    const [focused, setFocused] = useState({
      id: null,
      state: false,
    })

    const items = state.map((item, index) => (
      <Draggable key={item.id} index={index} draggableId={item.id}>
        {(provided, snapshot) => (
          <Card shadow={'md'} className={cx(classes.maincard, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}>
            {item.type == 1 ? (
                        <Card
                        className={classes.item}
                      >
                        <div {...provided.dragHandleProps} className={classes.dragHandle}>
                          {state.length > 1 ? (<GripVertical size={18} />) : null}
                        </div>
                        <Group style={{width: '100%'}} position='apart' grow>
                        <Group style={{width: '100%'}} direction='column' >
                          {questionTitle(item.id)}                     
                          {item.question.description ? questionDescription(item.id) : null }
                          {questionDetails(item.question.questionType, item.id)}
                        </Group>
                      <Group position='right'>
                        <Menu  onClick={() => {handleMenuClick(item.id)}} opened={handler} position='right' control={<UnstyledButton
                    sx={(theme) => ({
                      display: 'block',
                      width: '100%',
                      padding: theme.spacing.md,
                      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
              
                      '&:hover': {
                        backgroundColor:
                          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                      },
                    })}
                  >
                    <Group>
                      {matchIcon(item.question.questionType)}
              
                      <div style={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
                        {item.question.questionType}
                        </Text>
            
                      </div>
              
                      <ChevronDown size={16} />
                    </Group>
                  </UnstyledButton>}>
                                <Menu.Item  onClick={() => {handleShortAnswer(menuid)}} icon={<ClearFormatting />}>Short Answer</Menu.Item>
                                <Menu.Item onClick={() => {handleParagraph(menuid)}} icon={<AlignCenter />}>Paragraph</Menu.Item>
                                <Divider />
                                <Menu.Item  onClick={() => {handleMultipleChoice(menuid)}} icon={<Selector />}>Select One</Menu.Item>
                                <Menu.Item  onClick={() => {handleCheckbox(menuid)}} icon={<Checkbox />}>Select Multiple</Menu.Item>
                                <Menu.Item onClick={() => {handleDropdown(menuid)}} icon={<IoMdArrowDropdownCircle />}>Dropdown</Menu.Item>
                                <Divider />
                                <Menu.Item onClick={() => {handleFileUpload(menuid)}} icon={<FileUpload />}>File Upload</Menu.Item>
                                <Divider />
                                <Menu.Item  onClick={() => {handleLinearScale(menuid)}} icon={<SliderIcon />}>Linear Scale</Menu.Item>
                                <Menu.Item  onClick={() => {handleMultipleChoiceGrid(menuid)}} icon={<GridDots />}>Select One Grid</Menu.Item>
                                <Menu.Item  onClick={() => {handleCheckboxGrid(menuid)}} icon={ <LayoutGrid />}>Select Multiple Grid</Menu.Item>
                                <Divider />
                                <Menu.Item  onClick={() => {handleDate(menuid)}} icon={<Calendar />}>Date</Menu.Item>
                                <Menu.Item  onClick={() => {handleTime(menuid)}} icon={<Clock />}>Time</Menu.Item>
                                <Divider />
                                <Menu.Item  onClick={() => {handlePoint(menuid)}} icon={<Location />}>Point</Menu.Item>
                                <Menu.Item  onClick={() => {handlePolyline(menuid)}} icon={<Line />}>Polyline</Menu.Item>
                                <Menu.Item  onClick={() => {handlePolygon(menuid)}} icon={<Polygon />}>Polygon</Menu.Item>
                              </Menu>
                        </Group>
                        </Group>
                      </Card>
            ): item.type == 2 ? (
              <Card className={classes.item} shadow={'sm'}>
                                        <div {...provided.dragHandleProps} className={classes.dragHandle}>
                          {state.length > 1 ? (<GripVertical size={18} />) : null}
                        </div>
                <Card.Section>
                <Group style={{width: '100%'}} direction='column'>
                  {titleAndDesc(item.id)}
                </Group>
                </Card.Section>
              </Card>
            ) : item.type == 3 ? (
              <Card className={classes.item} shadow={'sm'} >
                                        <div {...provided.dragHandleProps} className={classes.dragHandle}>
                          {state.length > 1 ? (<GripVertical size={18} />) : null}
                        </div>
                <Image style={{marginLeft: '10%', marginRight: '10%'}} height={200} src={item.image} />
              </Card>
            ) : item.type == 4 ? (
              <Card shadow={'sm'} >

              </Card>
            ) : (
              <Card className={classes.item} shadow={'sm'} >
                                        <div {...provided.dragHandleProps} className={classes.dragHandle}>
                          {state.length > 1 ? (<GripVertical size={18} />) : null}
                        </div>
              <Group style={{width: '100%'}} direction='column'>
                  {sectionTitleAndDescription(item.id)}
              </Group>
              </Card>
            )}
          <Divider />
          {item.linked ? (
            <>
            <Group style={{width: '100%'}}  my={20} mb={20} position='center' >
           { linkControls(item.id) }
            </Group>
          <Divider />
          </>
          ): null}

            <Group my={20} position='right' style={{width: '100%'}}>
              <ActionIcon title="Duplicate" onClick={() => {duplicateQuestion(item.id)}} >
                <Copy />
              </ActionIcon>
              <ActionIcon title='Delete' onClick={() => {deleteQuestion(item.id)}}>
                <Trash />
              </ActionIcon>
                 {item.type === 1 ? (
                  <Switch checked={item.question.required} onChange={() => {makeQuestionRequired(item.id, item.question.required)}} label={item.question.required ? "Required" : "optional"} color={color_strings[colors.indexOf(state.Color)]} />
                 ) : null}             
                {item.type === 1 ? (
                <Menu opened={minimenuopen && item.id === minimenu} placement='center' position='bottom' control={<ActionIcon onClick={() => {handleMiniMenu(item.id)}} ><DotsVertical /></ActionIcon>}>
                <Menu.Label >Show</Menu.Label>
                <Menu.Item onClick={() => {questionHasDescription(minimenu)}} icon={item.question.description ? <Check /> : null} >Description</Menu.Item>
                <Menu.Item>Response Validation</Menu.Item>
              </Menu>
                ) : null}
                              {item.type === 1 && item.question.questionType == 'Multiple Choice' && !item.linked ? (
                <ActionIcon onClick={()=> {linkQuestion(item.id)}} title='Link question.' >
                  <Stack />
                </ActionIcon>
              ) : item.type === 1 && item.question.questionType == 'Multiple Choice' && item.linked && item.linked_position !== null ? (
                <ActionIcon onClick={()=> {unlinkQuestion(item.id)}} title={`Question linked with question number ${item.linked_position}. Unlink question`} >
                <X />
              </ActionIcon>
              ) :  null}
            </Group>

          </Card>
        )}
      </Draggable>
    ));

    return (
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          handlers.reorder({ from: source.index, to: destination.index });
          setTimeout(function(){console.log(state)}, 1000)
        }}
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  const swatches = Object.keys(theme.colors).map((color) => (
    <ColorSwatch title={color} component="button" onClick={() => handleColors(color)} key={color} color={theme.fn.rgba(theme.colors[color][8], 1.0)} >
      {checked === color ? <Check size={13} color='white' /> : null}
    </ColorSwatch>
  ));

  const bgSwatches = backgrounds.map((item) => {
    return (
      <ColorSwatch title={item.label + ' ' + item.value} component="button" onClick={() => handleBgColors(item.value)} key={item.value} color={item.value} >
      {bgchecked === item.color ? <Check size={13}  /> : null}
    </ColorSwatch>
    )
  });

    
  return (
    <FormContext.Provider value={{state, dispatch}}>
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
          background: state.Background,
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      aside={
        state.CustomTheme ? (
          <Aside mt={15} width={{ sm: 200, lg: 300 }}>
            <Paper  shadow={'md'} p="md" >
            <Group position='apart'>
              <Group position='left'>
                <Palette />
                <Text>Theme</Text>
              </Group>
              <ActionIcon onClick={() => {handleClosCustomTheme()}} >
                <X />
              </ActionIcon>
            </Group>
            </Paper>
            <Aside.Section grow component={ScrollArea} >
            <Text ml={20} my={20} weight={500} >Text style</Text>
            <Group ml={20} mr={20} position='apart' grow>
            <InputWrapper mt={10} label="Header">
            <Select mb={10} value={state.HeaderFont} onChange={(val) => {dispatch({type: 'UPDATE_HEADER_FONT', headerfont: val})} } data={[
                {label: 'Roboto', value: 'Roboto'},
                {label: 'Splash', value: 'Splash'},
                {label: 'Open Sans', value: 'Open Sans'},
              ]} />
            <Select value={''+state.HeaderSize} onChange={(val) => {dispatch({type: 'UPDATE_HEADER_SIZE', headersize: parseInt(val)})}} data={[
              {label: '18', value: '18'},
              {label: '19', value: '19'},
              {label: '20', value: '20'},
              {label: '21', value: '21'},
              {label: '22', value: '22'},
              {label: '23', value: '23'},
              {label: '24', value: '24'}
            ]} />
            </InputWrapper>
            </Group>
            <Group ml={20} mr={20} position='apart' grow>
            <InputWrapper mt={10} label="Question">
            <Select mb={10} value={state.QuestionFont} onChange={(val) => {dispatch({type: 'UPDATE_QUESTION_FONT', questionfont: val})}} data={[
                {label: 'Roboto', value: 'Roboto'},
                {label: 'Splash', value: 'Splash'},
                {label: 'Open Sans', value: 'Open Sans'},
              ]} />
            <Select value={''+state.QuestionSize} onChange={(val) => {dispatch({type: 'UPDATE_QUESTION_SIZE', questionsize: parseInt(val)})}} data={[
              {label: '12', value: '12'},
              {label: '13', value: '13'},
              {label: '14', value: '14'},
              {label: '15', value: '15'},
              {label: '16', value: '16'},
              {label: '17', value: '17'},
              {label: '18', value: '18'}
            ]} />
            </InputWrapper>
            </Group>
            <Group ml={20} mr={20} position='apart' grow>
            <InputWrapper mt={10} label="Text">
            <Select mb={10} value={state.TextFont} onChange={(val) => {dispatch({type: 'UPDATE_TEXT_FONT', textfont: val})}} data={[
                {label: 'Roboto', value: 'Roboto'},
                {label: 'Splash', value: 'Splash'},
                {label: 'Open Sans', value: 'Open Sans'},
              ]} />
            <Select value={''+state.TextSize} onChange={(val) => {dispatch({type: 'UPDATE_TEXT_SIZE', textsize: parseInt(val)})}} data={[
              {label: '9', value: '9'},
              {label: '10', value: '10'},
              {label: '11', value: '11'},
              {label: '12', value: '12'},
            ]} />
            </InputWrapper>
            </Group>
            <Group spacing='xs' direction='column' ml={20} mr={20} grow>
            <Text my={20} weight={500} >Header</Text>
            <Button onClick={() => {createImage(true)}} variant='outline' leftIcon={<Photo />}>Choose Image</Button>
            </Group>
            <Group spacing='xs' direction='column' ml={20} mr={20} grow>
              <Text my={20} weight={500}>Color</Text>
              <Group>
              {swatches}
              </Group>
            </Group>
            <Group mb={30} spacing='xs' direction='column' ml={20} mr={20} grow>
              <Text my={20} weight={500}>Background Color</Text>
              <Group>
              {bgSwatches}
              </Group>
            </Group>
            </Aside.Section>
          </Aside>

        ) : null
      }
      header={
        state.ActiveTab !== 1 ? (
          <Header height={100} p="md">
          <HeaderPage />
        </Header>
        ) : null
      }
    >
      {state.ActiveTab == 0 ? (
        <>
        {imagemodal ? (
                <Modal overflow='inside' opened={imagemodal} size='100%' >
                  <Group mb={20}>
                    <TextInput width={'100%'} placeholder='Search images...' value={img} onChange={(e) => {setImg(e.currentTarget.value)}} />
                    <Button disabled={img !== '' ? false : true} leftIcon={<Search />} onClick={() => {fetchImages()}} >
                      Search free online photos
                    </Button>
                    <Button leftIcon={<Upload />} variant="outline" >
                      Upload
                    </Button>
                    <Button leftIcon={<Link />} variant="outline" >
                      Image URL
                    </Button>
                    
                  </Group>
                  <Divider />
                  <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
                  <SimpleGrid style={{height: 250}} mt={20} cols={4}>
                  {res.length > 0 && res.map((item) => {
                    return (
                      <div style={{backgroundColor: item.urls.full === selectedimage ? 'gray' : 'transparent', cursor: 'pointer'}} key={item.urls.small} >
                      <Image  width={200}
                      height={80}
                        onClick={() => {setSelectedImage(item.urls.full)}} radius="md" src={item.urls.small} alt={item.alt_description} />
                      </div>
                    )
                  })}
                  </SimpleGrid>
                  </MediaQuery>

                  <MediaQuery largerThan="md" styles={{display: 'none'}}>
                  <SimpleGrid style={{height: 250}} mt={20} cols={1}>
                  {res.length > 0 && res.map((item) => {
                    return (
                      <div style={{backgroundColor: item.urls.full === selectedimage ? 'gray' : 'transparent', cursor: 'pointer'}} key={item.urls.small} >
                      <Image  width={200}
                      height={80}
                        onClick={() => {setSelectedImage(item.urls.full)}} radius="md" src={item.urls.small} alt={item.alt_description} />
                      </div>
                    )
                  })}
                  </SimpleGrid>
                  </MediaQuery>
                  <Divider />
                  <Group mt={20} mb={20} position='right'>
                    <Button size='sm' onClick={() => {setImageModal(false)}} variant='subtle'>Cancel</Button>
                    <Button disabled={selectedimage === '' ? true : false} size='sm' onClick={() => {createSectionImage()}} variant='outline'>Set Image</Button>
                  </Group>
              </Modal>
        ) : null}

        {videomodalopened ? (
                          <Modal overflow='inside' opened={videomodalopened} size='100%' >
                          <Group mb={20} position='apart' grow>
                            <TextInput placeholder='Search youtube videos...' value={video} onChange={(e) => {setVideo(e.currentTarget.value)}} />
                            <ActionIcon onClick={() => {fetchVideos()}} >
                              <Search />
                            </ActionIcon>
                          </Group>
                          <Divider />
                          <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
                          <SimpleGrid style={{height: 250}} mt={20} cols={3}>
                          {videores.length > 0 && videores.map((item) => {
                            return (
                              <div style={{backgroundColor: item.id.videoId === videoselected ? 'gray' : 'transparent', cursor: 'pointer'}} >
                                <iframe onClick={() => {setSelectedVideo(item.id.videoId)}} width={400} height={200} src={"https://www.youtube.com/embed/"+item.id.videoId+"?controls=0"} />
                              </div>
                            )
                          })}
                          </SimpleGrid>
                          </MediaQuery>
        
                          <MediaQuery largerThan="md" styles={{display: 'none'}}>
                          <SimpleGrid style={{height: 250}} mt={20} cols={1}>
                          {videores.length > 0 && videores.map((item) => {
                            return (
                              <div style={{backgroundColor: item.id.videoId === videoselected ? 'gray' : 'transparent', cursor: 'pointer'}} >
                                <iframe onClick={() => {setSelectedVideo(item.id.videoId)}} width={200} height={80} src={"https://www.youtube.com/embed/"+item.id.videoId+"?controls=0"} />
                              </div>
                            )
                          })}
                          </SimpleGrid>
                          </MediaQuery>
                          <Divider />
                          <Group mt={20} mb={20} position='right'>
                            <Button size='sm' onClick={() => {setVideoModalOpened(false)}} variant='subtle'>Cancel</Button>
                            <Button disabled={videoselected === '' ? true : false} size='sm' onClick={() => {createSectionVideo()}} variant='outline'>Set Image</Button>
                          </Group>
                      </Modal>
        ) : null}
        <MediaQuery largerThan={'md'} styles={{display: 'none'}}>
          <div>
        <Box mt={20} className={classes.wrapper} style={{borderTopWidth: 5, borderTopColor: state.Color, borderLeftWidth: 3, borderLeftColor: '#2f5496'}} >
          <Text size="xl" weight={500} style={{fontFamily: state.HeaderFont, fontSize: state.HeaderSize}}  mt="md" ml="md" >{state.FormName}</Text>
          <TextInput  size='xs' style={{fontFamily: state.TextFont, fontSize: state.TextSize}} mb={20} mt="xs" ml="md" mr="md" variant={readonly ? 'unstyled' : null} readOnly={readonly} onChange={(e) => {setFormDesc(e.currentTarget.value)}} onFocus={(e) => {handleFocus(e)}} onBlur={(e) => {handleBlur(e)}} placeholder="Description (optional)"  />
        </Box>
  
        <DndListHandleXS />

                  
        {!videomodalopened || !imagemodal ? ( 
                    <Group style={{backgroundColor: 'white', width: '100%', right: '1%', left: '1%', position: 'fixed', bottom: 0}} position='apart' grow>

                    <ActionIcon mb={20} mt={10} onClick={() => {createNewQuestion()}} title='Add Question'>
                      <CirclePlus  />
                    </ActionIcon>
                    <ActionIcon mb={20} mt={10}  title='Import Questions'>
                      <FileImport />
                    </ActionIcon>
                    <ActionIcon mb={20} mt={10}  onClick={() => {createTitleAndDescription()}} title='Add title and description' >
                      <ClearFormatting />
                    </ActionIcon>
                    <ActionIcon mb={20} mt={10}  onClick={() => {createImage()}}  title='Add Image'>
                      <Photo />
                    </ActionIcon>
                    <ActionIcon mb={20} mt={10}  onClick={() => {createVideo()}} title='Add Video' >
                      <Video />
                    </ActionIcon>
                    <ActionIcon mb={20} mt={10}  onClick={() => {createSection()}} title='Add Section' >
                      <LayoutList />
                    </ActionIcon>
                </Group>
        ) : null}

        </div>
        </MediaQuery>
  
        <MediaQuery smallerThan={"lg"} styles={{display: 'none'}}>
        <div style={{marginRight: state.CustomTheme ? 0: 330, marginLeft: 200}}>
        {state.HeaderImage !== null ? ( 
                <Card mt={20} shadow={'sm'} >
                        <Image  height={200} src={state.HeaderImage} />
                </Card>
               ) : null} 
        <Box mt={20} className={classes.wrapper} style={{borderTopWidth: 10, borderTopColor: state.Color, borderLeftWidth: 5, borderLeftColor: '#2f5496'}} >
          <Text size="xl" weight={500} style={{fontFamily: state.HeaderFont, fontSize: state.HeaderSize}}  mt="md" ml="md" >{state.FormName}</Text>
          <TextInput  size='xs' style={{fontFamily: state.TextFont, fontSize: state.TextSize}} mb={20} mt="xs" ml="md" mr="md" variant={readonly ? 'unstyled' : null} readOnly={readonly} onChange={(e) => {setFormDesc(e.currentTarget.value)}} onFocus={(e) => {handleFocus(e)}} onBlur={(e) => {handleBlur(e)}} placeholder="Description (optional)"  />
        </Box>
        <DndListHandle />
  
        {!videomodalopened || !imagemodal ? ( 
          <Menu hidden={videomodalopened || imagemodal} style={{alignItems: 'center', position: 'fixed', bottom: 0, right: '10%'}} placement='center' shadow='xl'  size={60} control={<p></p>} opened ={!state.CustomTheme && (!videomodalopened || imagemodal)}>
            <Group mt={20} mb={20} position='center'>
              <ActionIcon onClick={() => {createNewQuestion()}} title='Add Question'>
                <CirclePlus  />
              </ActionIcon>
            </Group>
            <Group mb={20} position='center'>
              <ActionIcon title='Import Questions'>
                <FileImport />
              </ActionIcon>
            </Group>
            <Group mb={20} position='center'>
              <ActionIcon onClick={() => {createTitleAndDescription()}} title='Add title and description' >
                <ClearFormatting />
              </ActionIcon>
            </Group>
            <Group mb={20} position='center'>
              <ActionIcon onClick={() => {createImage()}}  title='Add Image'>
                <Photo />
              </ActionIcon>
            </Group>
            <Group hidden mb={20} position='center'>
              <ActionIcon onClick={() => {createVideo()}} title='Add Video' >
                <Video />
              </ActionIcon>
            </Group>
            <Group mb={20} position='center'>
              <ActionIcon onClick={() => {createSection()}} title='Add Section' >
                <LayoutList />
              </ActionIcon>
            </Group>
          </Menu>
        ) : null }
        </div>
        </MediaQuery>
        </>
      ) : state.ActiveTab == 1 ? (
          <>
          <MediaQuery smallerThan='lg' styles={{display: 'none'}}>
          <div style={{marginRight: state.CustomTheme ? 0: 300, marginLeft: 300}}>
          <Group>
            <ActionIcon title='Navigate back to builder' onClick={() => {dispatch({type: 'UPDATE_ACTIVE_TAB', activetab: 0});}} >
              <ArrowBack color={state.Color} />
            </ActionIcon>
          </Group>
        <Box mt={20} className={classes.wrapper} style={{borderTopWidth: 10, borderTopColor: state.Color, borderLeftWidth: 5, borderLeftColor: '#2f5496'}} >
          <Text size="xl" weight={500} style={{fontFamily: state.HeaderFont, fontSize: state.HeaderSize}}  mt="md" ml="md" >{state.FormName}</Text>
          <Text color='gray' style={{fontFamily: state.TextFont, fontSize: state.TextSize}} ml='md' mt='md' mb={20}>{formdesc}</Text>
          
        </Box>
          {forms.length > 0 && forms.map((item) => {
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
              ) : item.question.questionType === 'Dropdown' ? (
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
                <Card mt={20} style={{borderLeftWidth: 5, borderLeftColor: state.Color}} >
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
          <Text size="xl" weight={500} style={{fontFamily: state.HeaderFont, fontSize: state.HeaderSize}}  mt="md" ml="md" >{item.title}</Text>
          <Text color='gray' style={{fontFamily: state.TextFont, fontSize: state.TextSize}} ml='md' mt='md' mb={20}>{item.description}</Text>
              </Card>
            )
          )
        })}
        <Group mt={20} position='apart'>
          <Button color={state.Color}>Submit</Button>
        </Group>
        </div>
          </MediaQuery>

          <MediaQuery largerThan='md' styles={{display: 'none'}}>

          <div style={{marginRight: 10, marginLeft: 10}}>
        <Box mt={20} className={classes.wrapper} style={{borderTopWidth: 10, borderTopColor: state.Color, borderLeftWidth: 5, borderLeftColor: '#2f5496'}} >
          <Text size="xl" weight={500} style={{fontFamily: state.HeaderFont, fontSize: state.HeaderSize}}  mt="md" ml="md" >{state.FormName}</Text>
          <Text color='gray' style={{fontFamily: state.TextFont, fontSize: state.TextSize}} ml='md' mt='md' mb={20}>{formdesc}</Text>
        </Box>
          {forms.length > 0 && forms.map((item) => {
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
            ) : item.question.questionType === 'Dropdown' ? (
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
              <Card mt={20} style={{borderLeftWidth: 5, borderLeftColor: state.Color}} >
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
        <Text size="xl" weight={500} style={{fontFamily: state.HeaderFont, fontSize: state.HeaderSize}}  mt="md" ml="md" >{item.title}</Text>
        <Text color='gray' style={{fontFamily: state.TextFont, fontSize: state.TextSize}} ml='md' mt='md' mb={20}>{item.description}</Text>
            </Card>
          )
        )
      })}
          <Group mt={20} position='apart'>
                   <Button color={state.Color}>Submit</Button>
        </Group>
        </div>
          </MediaQuery>
          </>
      ) : state.ActiveTab == 2 ? (
        <>
        <MediaQuery smallerThan="lg" styles={{display: 'none'}}>
        <div style={{marginLeft: '25%', marginRight: '25%', marginTop: 10}} >
        <Card >
        <Text mb={10}>Settings</Text>
        <Divider mt={20} />
        <Group mt={10}  grow>
          <InputWrapper label="Responses" description="Manage how responses are collected and managed"></InputWrapper>
          <Group position='right'>
          <ActionIcon onClick={() => {setResponseChevDown(!responsechevdown)}} >
            {responsechevdown ? <ChevronDown /> : <ChevronUp />}
          </ActionIcon>
          </Group>
        </Group>
        {!responsechevdown ? (
          <>
            <Group ml={20} mt={20} mb={20} grow>
              <InputWrapper label="Collect email addresses" description="This option requires responders to be signed in"></InputWrapper>
              <Group position='right'>
              <Switch checked={state.CollectEmailAddress} onChange={(e) => {collectEmailAddresses(e)}} />
              </Group>
            </Group>
            <Group ml={20} mb={20}  grow>
              <InputWrapper label="Allow response editing" description="Responses can be changed after being submitted"></InputWrapper>
              <Group position='right'>
              <Switch checked={state.AllowResponseEditing} onChange={(e) => {allowResponseEditing(e)}} />
              </Group>
            </Group>
            <Group ml={20} mb={20}  grow>
              <InputWrapper label="Limit to one response" description="This option requires responders to be signed in"></InputWrapper>
              <Group position='right'>
              <Switch checked={state.LimitToOneResponse} onChange={(e) => {limitToOneResponse(e)}} />
              </Group>
            </Group>
          </>
        ) : null}
        <Divider mt={20} />
        <Group mt={10}  grow>
          <InputWrapper label="Presentation" description="Manage how form and responses are presented"></InputWrapper>
          <Group position='right'>
          <ActionIcon onClick={() => {setPresentationChevDown(!presentationchevdown)}} >
            {presentationchevdown ? <ChevronDown /> : <ChevronUp />}
          </ActionIcon>
          </Group>
        </Group>
        {!presentationchevdown ? (
          <>
          <Group grow ml={20} mt={20} mb={20} >
            <Text size='xs' color='gray'>Form Presentation</Text>
          </Group>
            <Group ml={20} mb={20}  grow>
              <InputWrapper label="Show progress bar"></InputWrapper>
              <Group position='right'>
              <Switch checked={state.ShowProgressBar} onChange={(e) => {showProgressBar(e)}} />
              </Group>
            </Group>
            <Group ml={20} mb={20}  grow>
              <InputWrapper label="Shuffle question order"></InputWrapper>
              <Group position='right'>
              <Switch checked={state.ShuffleQuestionOrder} onChange={(e) => {shuffleQuestionOrder(e)}} />
              </Group>
            </Group>
            <Group grow ml={20} mb={20} >
            <Text size='xs' color='gray'>After Submission</Text>
          </Group>
            <Group ml={20} mb={20}  grow>
              <InputWrapper label="Confirmation message" description="Your response has been recorded"></InputWrapper>
              <Group position='right'>
              <Button variant='subtle'>Edit</Button>
              </Group>
            </Group>
            <Group ml={20} mb={20}  grow>
              <InputWrapper label="Show link to submit another response"></InputWrapper>
              <Group position='right'>
              <Switch checked={state.ShowLinkToSubmitAnotherResponse} onChange={(e) => {showLinkToSubmitAnotherResponse(e)}} />
              </Group>
              </Group>
            </>
        ) : null}
        </Card>

        <Card mt={20}>
        <Text mb={10}>Defaults</Text>
        <Divider mt={20} />
        <Group mt={10}  grow>
          <InputWrapper label="Form Defaults" description="Settings applied to this form and new forms"></InputWrapper>
          <Group position='right'>
          <ActionIcon onClick={() => {setFormChevDown(!formchevdown)}} >
            {formchevdown ? <ChevronDown /> : <ChevronUp />}
          </ActionIcon>
          </Group>
        </Group>
        {!formchevdown ? (
          <>
            <Group ml={20} mt={20} mb={20} grow>
              <InputWrapper label="Collect email address by default" ></InputWrapper>
              <Group position='right'>
              <Switch checked={state.CollectEmailAddressByDefault} onChange={(e) => {collectEmailAddressByDefault(e)}} />
              </Group>
            </Group>
          </>
        ) : null}
        <Divider mt={20} />
        <Group mt={10}  grow>
          <InputWrapper label="Question Defaults" description="Settings applied to all questions"></InputWrapper>
          <Group position='right'>
          <ActionIcon onClick={() => {setQuestionChevDown(!questionchevdown)}} >
            {questionchevdown ? <ChevronDown /> : <ChevronUp />}
          </ActionIcon>
          </Group>
        </Group>
        {!questionchevdown ? (
          <>
            <Group ml={20} mt={20} mb={20} grow>
              <InputWrapper label="Make questions required by default" ></InputWrapper>
              <Group position='right'>
              <Switch checked={state.MakeQuestionsRequiredByDefault} onChange={(e) => {makeQuestionsRequiredByDefault(e)}} />
              </Group>
            </Group>
          </>
        ) : null}
        </Card>
        </div>
        </MediaQuery>

        <MediaQuery largerThan="md" styles={{display: 'none'}}>
        <div style={{marginLeft: '1%', marginRight: '1%', marginTop: 10}} >
        <Card >
        <Text mb={10}>Settings</Text>
        </Card>
        </div>
        </MediaQuery>
        </>
      ) : null}
    </AppShell>
    </NotificationsProvider>
    </MantineProvider>
    </FormContext.Provider>
  );
}