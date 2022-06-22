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
} from '@mantine/core';
import { useViewportSize, useScrollLock } from '@mantine/hooks';
import { GoogleButton, TwitterButton } from './SocialButtons';
import countries from './countries';
import { PasswordRequirement } from 'components/password-requirements';
import { getStrength } from 'components/password-requirements';
import { useRouter } from 'next/router';
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
  const { height, width } = useViewportSize();
  const [scrollLocked, setScrollLocked] = useScrollLock(false);
  const counties = KenyaCounties.getAll().sort(SortCounties);

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [popover2Opened, setPopover2Opened] = useState(false);
  const [value, setValue] = useState(''); //password

  const [errorMSG, setErrorMsg] = useState('');

  const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
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
        alert("User exists");
      }
    }).catch(function(err){
      console.log(err);
    })
} catch(error){
  console.log(error);
}

}
  return (
    < >
    <MediaQuery smallerThan={'md'} styles={{display: 'none'}}>
            <Grid columns={12}>
            <Grid.Col span={4}>
        <Box
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        backgroundSize: 'cover',
        backgroundImage:
      `url(${require ('assets/images/auntum2.svg')})`,
        textAlign: 'center',
        height: '100%',
        width: '100%',
        borderRadius: theme.radius.md,
        cursor: 'pointer',

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
      })}
    >
    </Box>
        </Grid.Col>
        <Grid.Col span={8}>
        <Paper className={classes.form} radius={0} p={10}>
        <Title order={2} className={classes.title} mt="md" mb={30}>
          Create your account
        </Title>

        
        <Group grow direction='column' mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or" labelPosition="center" my="lg" />

        <TextInput value={email} onChange={(e) => {setEmail(e.target.value.toLowerCase())} } label="Email address" mt="xs" size="sm" />
        <TextInput value={firstname} onChange={(e) => {setFirstname(e.target.value)}} label="First Name" size='sm' mt={'xs'} />
        <TextInput value={lastname} onChange={(e) => {setLastname(e.target.value)}} label="Last Name" size='sm' mt={'xs'} />
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
        <TextInput value={phone} onChange={(e) => {setPhone(e.target.value)}} label="Phone Number" mt="xs" size="sm" />
        <TextInput value={company} onChange={(e) => {setCompany(e.target.value)}} label="Company Name" size='sm' mt={'xs'} />
        <Select value={job} onChange={(val) => {setJob(val)}} searchable label="Job Function" size='sm' mt={'xs'} data={[
            {label: 'Student', value: 'Student'},
            {label: 'Software Developer/Engineer', value: 'Software Developer'},
            {label: 'GIS Technician', value: 'GIS Technician'},
            {label: 'Product Manager', value: 'Product Manager'},
            {label: 'IT Executive(CIO, CTO, VP Engineering)', value: 'IT Executive'},
            {label: 'Business Executive(CEO, COO, CMO)', value: 'Business Executive'}
        ]} />
        <Select value={country} onChange={(val) => {setCountry(val)}} searchable label="Country" size='sm' mt={'xs'} data={countries} />
        <Checkbox  value={privacyCheck} onChange={() => {setPrivacyCheck(!privacyCheck)}}  label="I accept the privacy policy and terms of service." mt="xl" size="sm" />
        <Button disabled={!privacyCheck || email === '' || value === ''} type='submit' onClick={(e) => {handleSubmit(e)}} fullWidth mt="xl" size="md">
          Sign Up
        </Button>

        <Text align="center" mt="md">
          Already have an account?{' '}<a href='/auth/login' style={{textDecoration: 'none', color: '#1864AB'}} >Sign In now</a>
        </Text>
      </Paper>
        </Grid.Col>
    </Grid>
    </MediaQuery>
    <MediaQuery largerThan={'md'} styles={{display: 'none'}}>
    <Paper className={classes.form} radius={0} p={10}>
        <Title order={2} align='center' className={classes.title} mt="md" mb={30}>
          Create your account
        </Title>

        
        <Group grow direction='column' mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or" labelPosition="center" my="lg" />

        <TextInput value={email} onChange={(e) => {setEmail(e.target.value)} } label="Email address" mt="xs" size="sm" />
        <TextInput label="First Name" size='sm' mt={'xs'} />
        <TextInput label="Last Name" size='sm' mt={'xs'} />
        <Popover
      opened={popover2Opened}
      position="bottom"
      placement="start"
      withArrow
      mt={'xs'}
      styles={{ popover: { width: '100%' } }}
      trapFocus={false}
      transition="pop-top-left"
      onFocusCapture={() => setPopover2Opened(true)}
      onBlurCapture={() => setPopover2Opened(false)}
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
        <TextInput label="Phone Number" mt="xs" size="sm" />
        <TextInput label="Company Name" size='sm' mt={'xs'} />
        <Select searchable label="Job Function" size='sm' mt={'xs'} data={[
            {label: 'Student', value: 'Student'},
            {label: 'Software Developer/Engineer', value: 'Software Developer'},
            {label: 'GIS Technician', value: 'GIS Technician'},
            {label: 'Product Manager', value: 'Product Manager'},
            {label: 'IT Executive(CIO, CTO, VP Engineering)', value: 'IT Executive'},
            {label: 'Business Executive(CEO, COO, CMO)', value: 'Business Executive'}
        ]} />
        <Select searchable label="Country" size='sm' mt={'xs'} data={countries} />
        <Checkbox label="I accept the privacy policy and terms of service." mt="xl" size="sm" checked={privacyCheck} onChange={() => {setPrivacyCheck(!privacyCheck)}} />
        <Button disabled={!privacyCheck} fullWidth mt="xl" size="md">
          Sign Up
        </Button>

        <Text align="center" mt="md">
          Already have an account?{' '}<a href='/auth/login' style={{textDecoration: 'none', color: '#1864AB'}} >Sign In now</a>
        </Text>
      </Paper>
    </MediaQuery>
    </>
  );
}