import Link from 'next/link';
import { Card, CardSection, Text, Image, useMantineTheme } from '@mantine/core';
import useStyles from './DashboardCard.style';

export function DashboardCard({ categoryID, category, className }) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  return (
    <Link href={`/dashboards/${categoryID}`} passHref>
      <Card component="a" className={cx(classes.card, className)} radius="md">
        <CardSection className={classes.imageWrapper}>
          <Image
            className={classes.image}
            src={category.images}
            alt={category.name}
          />
        </CardSection>

        <Text className={classes.title}>{category.name}</Text>
        <Text className={classes.description} size="xs">
          Brief Description
        </Text>
      </Card>
    </Link>
  );
}