import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const truncate = (input, length) => {
  if (input.length > length) {
     return input.substring(0, length) + '...';
  }
  return input;
};

export function UserInfo({ avatar, name, title, phone, email }) {
  const { classes } = useStyles();
  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={72} radius="xl" />
        <div>
          <Text size="lg" weight={500} className={classes.name} color="white" >
            {truncate(name, 15)}
          </Text>

          <Text size="xs" color="dimmed">
            {truncate(title, 27)}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <IconAt stroke={1.5} size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {truncate(email, 17)}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {truncate(phone, 17)}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}