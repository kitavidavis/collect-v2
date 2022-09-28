import Link from 'next/link';
import { Card, CardSection, Text, Image, useMantineTheme } from '@mantine/core';
import useStyles from './DashboardCard.style';

export function DashboardCard({ category, className }) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  return (
    <Link href={`/v2/app/dashboards/${category.dashboardId}`} passHref >
      <Card component="a" className={cx(classes.card, className)} radius="md">
        <CardSection className={classes.imageWrapper}>
          <Image
            className={classes.image}
            src={theme.colorScheme === "dark" ? "https://geopsycollect.s3.us-east-2.amazonaws.com/grids-dark.svg" : "https://geopsycollect.s3.us-east-2.amazonaws.com/grids-light.svg" }
            alt={category.title}
          />
        </CardSection>

        <Text className={classes.title}>{category.title}</Text>
        <Text className={classes.description} size="xs">
          {category.description ? category.description : ""}
        </Text>
      </Card>
    </Link>
  );
}