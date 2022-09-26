import { Anchor, Box, Container, Group, Text } from '@mantine/core';
import useStyles from './footer.style';

export function Footer() {
  const { classes } = useStyles();
  return (
    <Container className={classes.wrapper} size="xl">
      <Group className={classes.footer} position="apart" >
        <Group position='left'>
          <Text size='xs' >Copyright &copy;{new Date().getFullYear() }GeoPsy Research, All rights reserved</Text>
        </Group>
        <Group position='right'>
          <Anchor size='xs' href='#terms'>Terms</Anchor>
          <Anchor size='xs' href='#privacy'>Data Privacy</Anchor>
          <Anchor size='xs' href='#contact'>Contact us</Anchor>
        </Group>
      </Group>
    </Container>
  );
}