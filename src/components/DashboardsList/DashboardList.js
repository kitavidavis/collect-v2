import { Container, SimpleGrid, Title, Text } from '@mantine/core';
import { DashboardCard } from '../DashboardCard/DashboardCard';
import useStyles from './DashboardList.style';


export function DashboardList({ groups }) {
  const { classes } = useStyles();

  const items = groups.map((group) => {
    const cards = group.categories.map((category) => (
      <DashboardCard
        key={category._id}
        category={category}
      />
    ));


    return (
      group.categories.length > 0 ? (
        <div key={group.name} className={classes.group}>
        <div className={classes.header}>
          <Title className={classes.title} order={2}>
            {group.name}
          </Title>

          <Text size="sm" color="dimmed" className={classes.count}>
            {group.categories.length} dashboards
          </Text>
        </div>

        <SimpleGrid
          id="cards-grid"
          cols={4}
          breakpoints={[
            { maxWidth: 1000, cols: 3 },
            { maxWidth: 755, cols: 2 },
            { maxWidth: 500, cols: 1 },
          ]}
        >
          {cards}
        </SimpleGrid>
      </div>
      ) : null
    );
  });

  return (
    <Container size="xl" px="md" className={classes.wrapper}>
      {items}
    </Container>
  );
}