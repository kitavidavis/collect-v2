import React from 'react';
import { Button, ButtonProps, Group } from '@mantine/core';
import { GoogleIcon } from './GoogleIcon';
import { FacebookIcon } from './FacebookIcon';
import { TwitterIcon } from './TwitterIcon';

export function GoogleButton(props) {
  return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}

export function FacebookButton(props) {
  return (
    <Button
      leftIcon={<FacebookIcon />}
      sx={(theme) => ({
        backgroundColor: '#4267B2',
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.fn.darken('#4267B2', 0.1),
        },
      })}
      {...props}
    />
  );
}



// Twitter button as anchor
export function TwitterButton(props) {
  return <Button component="a" leftIcon={<TwitterIcon />} variant="default" {...props} />;
}



export function SocialButtons() {
  return (
    <Group position="center" sx={{ padding: 15 }}>
      <GoogleButton>Continue with Google</GoogleButton>
      <TwitterButton href="https://twitter.com/mantinedev" target="_blank">
        Follow on Twitter
      </TwitterButton>
      <FacebookButton>Sign in with Facebook</FacebookButton>
    </Group>
  );
}