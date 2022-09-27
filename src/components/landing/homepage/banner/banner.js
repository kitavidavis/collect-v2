import { IconExternalLink, IconUserCheck } from '@tabler/icons';
import {
  Title,
  Overlay,
  Group,
  Text,
  Button,
  ThemeIcon,
  SimpleGrid,
  Container,
  useMantineTheme,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import data from './data';
import useStyles from './banner.style';

export function Banner() {
  const { classes, cx } = useStyles();
  const [, scrollTo] = useWindowScroll();
  const theme = useMantineTheme();

  const features = data.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon className={classes.featureIcon} size={44}>
        <feature.icon size={24} stroke={1.5} />
      </ThemeIcon>

      <div className={classes.featureBody}>
        <Text className={classes.featureTitle}>{feature.title}</Text>
        <Text className={classes.featureDescription}>{feature.description}</Text>
      </div>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Container size="xl" px="md">
        <div className={classes.image} />
        <Overlay
          gradient={`linear-gradient(45deg, ${
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
          } 25%, rgba(0, 0, 0, 0) 95%)`}
          opacity={0.5}
          zIndex={1}
        />

        <div className={classes.body}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Enabling Automated Geospatial</span>
            <br /> Workflows
          </Title>

          <Text className={classes.description}>
            Collecting spatial data in low-tech areas has never been easy. GeoPsy Collect combines all the features that make form design
            easy and user-focused, together with all the core functionalities needed to collect, store and visualize data. With QGIS plugin, it provides
            an automated workflow for collecting data.
          </Text>

          <Group className={classes.controls}>
            <Button
              className={cx(classes.control, classes.controlMain)}
              component="a"
              href='https://geopsy-collect.gitbook.io/home/'
              target="_blank"
            >
              Documentation & Tutorials
            </Button>
            <Button
              className={cx(classes.control, classes.controlSecondary)}
              leftIcon={<IconUserCheck size={16} />}
              component="a"
              href="/auth/login"
            >
              Login
            </Button>
            <Button
              className={cx(classes.control, classes.controlSecondary)}
              rightIcon={<IconExternalLink size={16} stroke={1.5} />}
              component="a"
              href="/auth/register"
            >
              Get started
            </Button>
          </Group>
          <SimpleGrid
            cols={3}
            spacing="xl"
            className={classes.features}
            style={{ marginTop: 100 }}
            breakpoints={[{ maxWidth: 755, cols: 1, spacing: 'lg' }]}
          >
            {features}
          </SimpleGrid>
        </div>
      </Container>
    </div>
  );
}