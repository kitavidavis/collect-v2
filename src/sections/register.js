import React, {useState, useEffect} from 'react';
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Grid,
  Box,
  MediaQuery,
  Select,
  Divider,
  Group,
  Progress, 
  Popover,
  SimpleGrid,
  Stepper,
  Anchor
} from '@mantine/core';
import { useViewportSize, useScrollLock } from '@mantine/hooks';
import { GoogleButton, TwitterButton } from './SocialButtons';
import countries from './countries';
import { PasswordRequirement } from 'components/password-requirements';
import { getStrength } from 'components/password-requirements';
import { useRouter } from 'next/router';
import { LogoBlue } from 'components/logo';
import { StyledStepper } from 'components/StyledStepper';
import { HEADER_HEIGHT } from 'components/landing/layout/header/header.style';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';
import Link from 'next/link';
const KenyaCounties = require('kenyacounties');

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://cdn.pixabay.com/photo/2013/06/20/13/52/world-140304_960_720.jpg)',
  },

  form: {
    minHeight: 900,
    maxWidth: 400,

    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: '#37B24D',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  bannerTitle: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export function SortCounties( a, b ) {
    if ( a.label < b.label ){
      return -1;
    }
    if ( a.label > b.label ){
      return 1;
    }
    return 0;
  }

export function Register() {
  const Router = useRouter();
  const { classes } = useStyles();
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [country, setCountry] = useState('');
  const [job, setJob] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [active, setActive] = useState(0);
  const { height, width } = useViewportSize();
  const [scrollLocked, setScrollLocked] = useScrollLock(false);
  const counties = KenyaCounties.getAll().sort(SortCounties);

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [popover2Opened, setPopover2Opened] = useState(false);
  const [value, setValue] = useState(''); //password

  const [errorMSG, setErrorMsg] = useState('');

  const requirements = [

  ];

  
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';


  useEffect(() => {
    let stored_email = localStorage.getItem("geopsy-collect-getstarted");
    if(stored_email !== null){
      setEmail(stored_email);
      localStorage.removeItem('geopsy-collect-getstarted');
    }
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Hola');

  if(errorMSG) setErrorMsg('')

  const body = {
    username: email,
    password: value,
    firstname: firstname,
    lastname: lastname,
    phone: phone, 
    job: job,
    country: country,
    privacyCheck: privacyCheck,
    company: company,
    gender: null,
    county: null,
    avater: null
  };

  try {
    await fetch('/api/signup', {
      method: 'Post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    }).then(function(res){
      console.log(res);
      if(res.status === 200){
        Router.push('/auth/login')
      } else {
        setErrorMsg("User exists!");
      }
    }).catch(function(err){
      setErrorMsg(err.message);
    })
} catch(error){
  setErrorMsg(err.message);
}

}
  return (
    <SimpleGrid
      cols={2}
      spacing="lg"
      breakpoints={[
        { maxWidth: 980, cols: 2, spacing: 'md' },
        { maxWidth: 755, cols: 1, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
    >
        <Box
      sx={(theme) => ({
        [theme.fn.smallerThan('md')]: { display: 'none' },
        backgroundSize: 'cover',
        height: (height - HEADER_HEIGHT),
        backgroundRepeat: 'no-repeat',
        backgroundImage:
      `url(${require ('assets/images/auntum.svg')})`,
        bottom: 0,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        padding: 0,
      })}
    >
      <Title order={2} pt={100} ml={50} className={classes.bannerTitle} style={{color: 'white'}}>Collect Quality Data Easily<br /> With GeoPsy Collect</Title>
        <Text mt={30} ml={50} size='lg' color='white' >Build rich location-linked forms and collect <br />quality data from extreme environments <br /> without using internet.</Text>
    
        <Text mt={30} ml={50} size="lg" > <a style={{color: '#37B24D'}} target="_blank"  href='https://geopsy-collect.gitbook.io/home/'>Explore Tutorials</a> </Text>

    </Box>
        <Paper radius={0} p={10}>

        <StyledStepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Step 1" description="Login Details">
          <Title mb={20} style={{fontWeight: 300}} >Login Details</Title>
        <TextInput value={email} onChange={(e) => {setEmail(e.target.value.toLowerCase())} } label="Email address" mt="xs" size="sm" />
        <Popover
      opened={popoverOpened}
      position="bottom"
      placement="start"
      withArrow
      mt={'xs'}
      styles={{ popover: { width: '100%' } }}
      trapFocus={false}
      transition="pop-top-left"
      onFocusCapture={() => setPopoverOpened(true)}
      onBlurCapture={() => setPopoverOpened(false)}
      target={
        <PasswordInput
          required
          size='sm'
          label="Password"
          placeholder=""
          description="Strong password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      }
    >
      <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
      <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
      {checks}
    </Popover>

    <Button disabled={email === "" || value === ""} mt={30} onClick={() => {setActive(1)}} rightIcon={<ChevronRight />}>Continue</Button>
        </Stepper.Step>
        <Stepper.Step label="Step 2" description="Personal Details" >
        <Title mb={20} style={{fontWeight: 300}} >Personal Details</Title>
        <TextInput placeholder='John' required value={firstname} onChange={(e) => {setFirstname(e.target.value)}} label="First Name" size='sm' mt={'xs'} />
        <TextInput placeholder='Doe' required value={lastname} onChange={(e) => {setLastname(e.target.value)}} label="Last Name" size='sm' mt={'xs'} />
        <TextInput placeholder='07000000' required value={phone} onChange={(e) => {setPhone(e.target.value)}} label="Phone Number" mt="xs" size="sm" />
    
        <Group mt={30} position='left'>
        <Button onClick={() => {setActive(0)}} variant="subtle" color="gray" leftIcon={<ChevronLeft />} >Back</Button>
        <Button disabled={firstname === "" || lastname === "" || phone === ""} onClick={() => {setActive(2)}} rightIcon={<ChevronRight />}>Continue</Button>
        </Group>
        </Stepper.Step>
        <Stepper.Step label="Step 3" description="Other Details" >
        <Title mb={20} style={{fontWeight: 300}} >Other Details</Title>
        <TextInput description="Institution where you work(optional)" value={company} onChange={(e) => {setCompany(e.target.value)}} label="Company Name" size='sm' mt={'xs'} />
        <Select required description="Your current role" value={job} onChange={(val) => {setJob(val)}} searchable label="Job Function" size='sm' mt={'xs'} data={[
            {label: 'Student', value: 'Student'},
            {label: 'Software Developer/Engineer', value: 'Software Developer'},
            {label: 'GIS Technician', value: 'GIS Technician'},
            {label: 'Product Manager', value: 'Product Manager'},
            {label: 'IT Executive(CIO, CTO, VP Engineering)', value: 'IT Executive'},
            {label: 'Business Executive(CEO, COO, CMO)', value: 'Business Executive'}
        ]} />
        <Select required value={country} description="Country of residence" onChange={(val) => {setCountry(val)}} searchable label="Country" size='sm' mt={'xs'} data={countries} />
        <Checkbox  value={privacyCheck} checked={privacyCheck} onChange={() => {setPrivacyCheck(!privacyCheck)}} label={
        <>
          Accepts{' '}
          <Anchor size="sm" href="/" target="_blank">
            terms and conditions
          </Anchor>
        </>
      } mt="xl" size="sm" />
        <Group mt={30} position='left'>
        <Button onClick={() => {setActive(1)}} variant="subtle" color="gray" leftIcon={<ChevronLeft />} >Back</Button>
        <Button disabled={!privacyCheck || email === '' || value === ''} type='submit' onClick={(e) => {handleSubmit(e)}}>
          Sign Up
        </Button>
        </Group>

        </Stepper.Step>
        </StyledStepper>

        {errorMSG !== "" ? (
        <Text color="red" align="center" mt="md">
        {errorMSG}
      </Text>
        ) : null}
        <Text align="center" mt="md">
          Already have an account?{' '}<Link href='/auth/login' passHref >Sign In now</Link>
        </Text>
      </Paper>
    </SimpleGrid>
    
  );
}