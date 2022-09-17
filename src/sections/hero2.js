import { Title, Text, Container, Button, Overlay, createStyles } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 280,
    paddingBottom: 230,
    backgroundImage:
      'url(https://cdn.pixabay.com/photo/2018/07/15/11/27/online-3539412__340.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '@media (max-width: 520px)': {
      paddingTop: 220,
      paddingBottom: 190,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    '@media (max-width: 520px)': {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: 'rgba(255, 255, 255, .4)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .45) !important',
    },
  },
}));

export function HeroImageBackground() {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Automated {' '}
          <Text component="span" inherit className={classes.highlight}>
            Data
          </Text>
          {' '}Collection
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
                Build more reliable, data-driven, intuitive and spatially-centered outputs
                by automating logic and spatial data flow. GeoPsy Collect is also designed for developers
                who can extend the functionalities or use in other platforms.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button component='a' href='/auth/register' className={classes.control} variant="white" size="lg">
            Get started
          </Button>
          <Button component='a' href='/auth/login' className={cx(classes.control, classes.secondaryControl)} size="lg">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}