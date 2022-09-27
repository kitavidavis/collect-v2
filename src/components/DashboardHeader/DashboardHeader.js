import Link from 'next/link';
import { Title, Anchor, Center, Box, Group, ActionIcon, Tooltip, Button } from '@mantine/core';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons';
import useStyles from './DashboardHeader.style';
import { Plus } from 'tabler-icons-react';

export function DashboardHeader({ category }) {
  const { classes, theme } = useStyles();
  return (
    <>
      <Link href="/#main" passHref>
        <Anchor>
          <Center inline>
            {theme.dir === 'rtl' ? <IconArrowRight size={14} /> : <IconArrowLeft size={14} />}
            <Box component="span" ml={5}>
              Back to all dashboards
            </Box>
          </Center>
        </Anchor>
      </Link>

      <Title className={classes.title}>{category.name}</Title>
    </>
  );
}

export function GoBackHeader() {
    const { classes, theme } = useStyles();
    return (
      <Group position='apart' mb={20}>
        <Group position='left'>
        <Link href="/v2/" passHref>
          <Anchor size='xs' >
            <Center inline>
              {theme.dir === 'rtl' ? <IconArrowRight size={14} /> : <IconArrowLeft size={14} />}
              <Box component="span" ml={5}>
                Main Dashboard
              </Box>
            </Center>
          </Anchor>
        </Link>
        </Group>

      </Group>
    );
  }
