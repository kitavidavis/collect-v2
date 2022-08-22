import React, { useState, useCallback, useEffect } from 'react';
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
  Group,
  Divider,
  Notification,
  Container
} from '@mantine/core';
import { useViewportSize, useScrollLock, useWindowScroll } from '@mantine/hooks';
import { GoogleButton, TwitterButton } from './SocialButtons';
import { BsArrowRight } from 'react-icons/bs';
import InternetBar from 'components/internet';
import { signIn } from "next-auth/react";
import { Router } from 'react-router-dom';
import { useUser } from 'lib/hooks';
import { setLoginSession } from 'lib/auth';
import { LogoBlue } from 'components/logo';
const axios = require('axios');

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://cdn.pixabay.com/photo/2013/06/20/13/52/world-140304_960_720.jpg)',
  },

  form: {
    minHeight: 900,
    maxWidth: 450,

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

export function Login() {
  useUser({redirectTo: '/v2/', redirectIfFound: true});

  const { classes } = useStyles();
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('demo@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [showpass, setShowPass] = useState(false);
  const [checked, setChecked] = useState(true);
  const [online, setOnline] = useState(true);
  const [errorMSG, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState({
    invalid: false,
    message:  ''
  });
  const [error, setError] = useState({
    email:{
        error: false,
        message: ''
    },
    password: {
        error: false,
        message: ''
    }
  });

  const { height, width } = useViewportSize();
  const [scrollLocked, setScrollLocked] = useScrollLock(false);
  const [scroll, scrollTo] = useWindowScroll();

  React.useEffect(() => {
    scrollTo({y: 0})
    //setScrollLocked(true);
  }, []);

  React.useEffect(() => {
    console.log('')
  }, [login])

  const handleInput = (text, type) => {
    switch(type){
        case 'email':
            setEmail(text);
            setError({
                ...error,
                email: {
                    error: false,
                    message: ''
                }
            });
            break;

        default:
            setPassword(text);
            setError({
                ...error,
                password: {
                    error: false,
                    message: ''
                }
            });

    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if(email === null || email === ''){
        setError({
            ...error,
            email: {
                error: true,
                message: 'Empty email'
            }
        });

        return false;
    }

    if(password === null || password === ''){
        setError({
            ...error,
            password: {
                error: true,
                message: 'Empty password'
            }
        });

        return false;
    }

    processLogin(e);
  }

  const processLogin = async(e) => {
    setLoading(true);
    const body = {
      username: email,
      password: password,
    }

  try {
      await fetch("/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      }).then(function(res){
        setLoading(false);
        if(res.status === 200){
          window.location = '/v2/'
        } else {
          setInvalid({
            invalid: true,
            message: 'Invalid username or password'
          });
        }
      }).catch(function(err){
        console.log(err);
      })
    } catch(error){
      setErrorMsg(error.message);
    } 
  }

  return (
    <>
    {!online ? <InternetBar /> : null}
    <MediaQuery smallerThan={'md'} styles={{display: 'none'}}>
            <Grid columns={12}>
        <Grid.Col span={4}>
        <Paper className={classes.form} radius={0} p={50}>
        <Group position='center' mb={25} mt={25}>
        <LogoBlue />
        </Group>
        <Group grow direction='column' mb="md" mt="md">
        <GoogleButton onClick={() => signIn("google")} radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or" labelPosition="center" my="lg" />

      {invalid.invalid ? (
        <Notification mb={5} onClose={() => {setInvalid({invalid: false, message: null})}} closeButtonProps={{ 'aria-label': 'Hide notification' }} color="red" title="Error!">
        Your email or password is invalid.
      </Notification>
      ) : null}

{login ? (
        <Notification mb={5} >
        Success! Redirecing to your account...
      </Notification>
      ) : null}

        <TextInput value={email} error={error.email.error ? error.email.message : false} onChange={(e) => {handleInput(e.target.value.toLowerCase(), 'email')}} label="Email address" size="sm" />
        {showpass ? (<PasswordInput label="Password" value={password} onChange={(e) => {handleInput(e.target.value, 'password')}} error={error.password.error ? error.password.message : false} mt="xs" size="sm" />) : null}
        {showpass ? (<Checkbox label="Keep me logged in" onChange={() => {setChecked(!checked)}} checked={checked} mt="xl" size="sm" />) : null}
        <Grid mt={30} columns={12}>
            <Grid.Col span={5}>
            <Button loading={loading} disabled={email === null || email === '' ? true : false} onClick={(e) => {showpass ? handleLogin(e) : setShowPass(true)}} fullWidth mt="xl" size="sm">
         {showpass ? "Sign In" :  " Next"}
        </Button>
            </Grid.Col>

            <Grid.Col span={7} >
        <Text mt="xl" size='sm'>
          Don&apos;t have an account?{' '}<a href='/auth/register' style={{textDecoration: 'none', color: '#1864AB'}} >Register</a>
        </Text>
            </Grid.Col>
        </Grid>
      </Paper>
        </Grid.Col>
        <Grid.Col       sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        backgroundSize: 'cover',
        backgroundImage:
      `url(${require ('assets/images/auntum.svg')})`,
        bottom: 0,
        borderRadius: theme.radius.md,
        cursor: 'pointer',

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
      })}  span={8}>

        <Title order={2} pt={100} ml={50} className={classes.bannerTitle} style={{color: 'white'}}>Collect Quality Data Easily<br /> With GeoPsy Collect</Title>
        <Text mt={30} ml={50} size='lg' color='white' >Build rich location-linked forms and collect <br />quality data from extreme environments <br /> without using internet.</Text>
    
        <Text mt={30} ml={50} size="lg" > <a style={{color: '#37B24D'}}  href='#'>Explore Tutorials <BsArrowRight style={{marginTop: 10,}} /></a> </Text>
        </Grid.Col>
    </Grid>
    </MediaQuery>
    <MediaQuery largerThan={'md'} styles={{display: 'none'}}>
      <Container size={420} style={{height: height}} >
      <Paper className={classes.form} mt={20} mb={20} radius='md' pt={30} withBorder p={10}>
        <Group grow direction='column' mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or" labelPosition="center" my="lg" />

      {invalid.invalid ? (
        <Notification mb={5} onClose={() => {setInvalid({invalid: false, message: null})}} closeButtonProps={{ 'aria-label': 'Hide notification' }} color="red" title="Error!">
        Your email or password is invalid.
      </Notification>
      ) : null}

        <TextInput value={email} error={error.email.error ? error.email.message : false} onChange={(e) => {handleInput(e.target.value, 'email')}} label="Email address" size="sm" />
        <PasswordInput label="Password" value={password} onChange={(e) => {handleInput(e.target.value, 'password')}} error={error.password.error ? error.password.message : false} mt="xs" size="sm" />
        <Checkbox label="Keep me logged in" onChange={() => {setChecked(!checked)}} checked={checked} mt="xl" size="sm" />
            <Button  loading={loading} onClick={(e) => {handleLogin(e)}} fullWidth mt="xl" size="sm">
         Sign In
        </Button>
        <Text mt="xl" size='sm'>
          Don&apos;t have an account?{' '}<a href='/auth/register' style={{textDecoration: 'none', color: '#1864AB'}} >Register</a>
        </Text>
      </Paper>
      </Container>
    </MediaQuery>
    </>
  );
}