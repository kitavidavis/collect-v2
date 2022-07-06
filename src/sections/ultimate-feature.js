/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import SectionHeading from 'components/section-heading';
import Feature from 'components/cards/feature';

import Wifi from 'assets/illustrations/34.png';
import Location from 'assets/illustrations/51.png';
import Charts from 'assets/illustrations/72.png';
import Smart from 'assets/illustrations/443.png';
import Integratable from 'assets/illustrations/78.png';
import Dashboards from 'assets/illustrations/478.png';
import { Group } from '@mantine/core';

const data = [
  {
    id: 1,
    icon: Wifi,
    title: 'Offline-First App',
    description: `Retrieve data at any point without worrying about server synchronization.`,
  },
  {
    id: 2,
    icon: Location,
    title: 'Location Fused Service Providers',
    description: `Achieve high accuracy by utilizing wifi networks and telecommunication service providers`,
  },
  {
    id: 3,
    icon: Smart,
    title: 'Smart Data Collection',
    description: `Integrate smart devices such as smart total station and stream data to your forms..`,
  },
  {
    id: 4,
    icon: Charts,
    title: 'Embeddable Charts',
    description: `Derive patterns and insights from your form response using intuitive charts.`,
  },
  {
    id: 5,
    icon: Integratable,
    title: 'Declarative & Extensive',
    description: `Tap into GeoPsy Collect APIs and embed forms onto your applications.`,
  },
  {
    id: 6,
    icon: Dashboards,
    title: 'Share Insights',
    description: `Create custom dashboards using your form response and let the world discover meanings out of of your research.`,
  },
];

const UltimateFeatures = () => {
  return (
    <Box as="section" id="features" sx={styles.section}>
      <Container>
        <Group position='center'>
        <SectionHeading
          sx={styles.heading}
          slogan="Core Features"
          title="Ultimate features of GeoPsy Collect"
        />
        </Group>
        <Box sx={styles.features}>
          {data?.map((item) => (
            <Feature className="feature-item" key={item.id} data={item} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default UltimateFeatures;

const styles = {
  section: {
    backgroundColor: '#F9FAFC',
    pt: [8, null, null, null, 10, 14],
    pb: [8, null, null, null, 15, 16, 19],
    position: 'relative',
  },
  heading: {
    marginBottom: [50, 50, 80],
    p: {
      maxWidth: 490,
    },
  },
  features: {
    gap: [35, null, null, 40, '50px 30px', 60],
    display: ['grid', 'grid'],
    maxWidth: 1030,
    margin: '0 auto',
    gridTemplateColumns: [
      'repeat(1, 1fr)',
      null,
      null,
      'repeat(2, 1fr)',
      'repeat(3, 1fr)',
    ],
    '.feature-item': {
      display: ['block'],
      textAlign: 'center',
      maxWidth: [290, 260, null, 280, 'none'],
      m: ['0 auto', '0 auto', '0 auto', '0 auto', '0 auto', 0],
      figure: {
        m: ['0 0 20px'],
      },
      h4: {
        mb: ['15px', '15px', '20px'],
      },
      p: {
        fontSize: ['14px', '14px', '16px', '16px', '14px', '16px'],
      },
    },
  },
};
