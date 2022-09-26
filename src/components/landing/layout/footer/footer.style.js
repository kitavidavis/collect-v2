import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  footer: {
    paddingBottom: theme.spacing.md
  },
  wrapper: {
    position: 'relative',
    minHeight: 30,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
  },
}));