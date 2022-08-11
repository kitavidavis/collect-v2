import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
  } from '@mantine/core';
  import { IconCheck } from '@tabler/icons';
  import image from 'assets/illustrations/creation.svg';
  
  const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 4,
    },
  
    content: {
      maxWidth: 480,
      marginRight: theme.spacing.xl * 3,
  
      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 44,
      lineHeight: 1.2,
      fontWeight: 900,
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: 28,
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        flex: 1,
      },
    },
  
    image: {
      flex: 1,
  
      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },
  
    highlight: {
      position: 'relative',
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      borderRadius: theme.radius.sm,
      padding: '4px 12px',
    },
  }));
  
  export function Hero() {
    const { classes } = useStyles();
    return (
      <div>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                A <span className={classes.highlight}>modern</span> Geospatial <br /> data kit
              </Title>
              <Text color="dimmed" mt="md">
                Collect quality data easily than ever before - GeoPsy Collect includes modern technologies, integretable with popular hardware and software devices, to 
                cover you in any situation.
              </Text>
  
              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconCheck color='#3929CB' size={12} stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>ODK based</b> – Build, collect and aggregate your data easily.
                </List.Item>
                <List.Item>
                  <b>Apen & Accessible</b> – Simply tap to the API and retrieve all your data. 
                </List.Item>
                <List.Item>
                  <b>Interactive</b> – Generate awesome and complex charts or dashboards using your data.
                </List.Item>
              </List>
  
              <Group mt={30}>
                <Button style={{backgroundColor: '#3929CB'}} radius="xl" size="md" className={classes.control}>
                  Get started
                </Button>
                <Button variant="default" radius="xl" size="md" className={classes.control}>
                  Documentation
                </Button>
              </Group>
            </div>
            <Image src={image} className={classes.image} />
          </div>
        </Container>
      </div>
    );
  }