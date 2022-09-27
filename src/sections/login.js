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
  Container,
  SimpleGrid,
  useMantineColorScheme
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
import { HEADER_HEIGHT } from 'components/landing/layout/header/header.style';
import Link from 'next/link';

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

  image: {
    minHeight: 700,
    width: 800,
    flex: 1,
    backgroundImage: `url(assets/images/auntum.svg)`,
    backgroundSize: 'auto 60%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 0,
    display: theme.dir === 'rtl' ? 'none' : undefined,

    '@media (max-width: 1230px)': {
      display: 'none',
    },
  },
}));

export function Login() {
  useUser({redirectTo: '/v2/', redirectIfFound: true});
  const theme = useMantineColorScheme();
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div style={{backgroundColor: "#F1F3F5"}} >
    {!online ? <InternetBar /> : null}
    <SimpleGrid
      cols={2}
      spacing="lg"
      breakpoints={[
        { maxWidth: 980, cols: 2, spacing: 'md' },
        { maxWidth: 755, cols: 1, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
    >
        <Paper radius={0} p={50}>

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

        <TextInput required value={email} error={error.email.error ? error.email.message : false} onChange={(e) => {handleInput(e.target.value.toLowerCase(), 'email')}} label="Email address" size="sm" />
        <PasswordInput required label="Password" value={password} onChange={(e) => {handleInput(e.target.value, 'password')}} error={error.password.error ? error.password.message : false} mt="xs" size="sm" />
        <Checkbox label="Keep me logged in" onChange={() => {setChecked(!checked)}} checked={checked} mt="xl" size="sm" />
            <Button loading={loading} disabled={email === null || email === '' ? true : false} onClick={(e) => {handleLogin(e)}} fullWidth mt="xl" size="sm">
         Sign In
        </Button>
        <Text mt="xl" size='sm'>
          Don&apos;t have an account?{' '}<Link href='/auth/register' passHref >Register</Link>
        </Text>
      </Paper>

        <Box   sx={(theme) => ({
        [theme.fn.smallerThan('md')]: { display: 'none' },
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        backgroundSize: 'cover',
        height: (height - HEADER_HEIGHT),
        backgroundRepeat: 'no-repeat',
        backgroundImage:
      `url(${require ('assets/images/auntum.svg')})`,
        bottom: 0,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        padding: 0,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
      })}  span={8}>

        <Title order={2} pt={100} ml={50} style={{color: 'white'}}>Collect Quality Data Easily<br /> With GeoPsy Collect</Title>
        <Text mt={30} ml={50} size='lg' color='white' >Build rich location-linked forms and collect <br />quality data from extreme environments <br /> without using internet.</Text>
    
        <Text mt={30} ml={50} size="lg" > <a style={{color: '#37B24D'}} target="_blank"  href='https://geopsy-collect.gitbook.io/home/'>Explore Tutorials <BsArrowRight style={{marginTop: 10,}} /></a> </Text>
        </Box>
        </SimpleGrid>
    </div>
  );
}