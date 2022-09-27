import Head from 'next/head';
import { GoBackHeader } from './DashboardHeader/DashboardHeader';
import { DashboardList } from './DashboardsList/DashboardList';


export function HomePage({ componentsCountByCategory }) {
    const CATEGORIES = [
        {
          name: 'Public',
          categories: [
            { slug: 'tuk-forests', name: 'TUK Forests', images: "https://cdn.pixabay.com/photo/2022/09/19/15/19/meerkat-7465819_960_720.jpg" },
            { slug: 'embu-hills', name: 'Embu Hills', images: "https://cdn.pixabay.com/photo/2022/09/19/15/19/meerkat-7465819_960_720.jpg" },
            { slug: 'green-lands', name: 'Green Lands', images: "https://cdn.pixabay.com/photo/2022/09/19/15/19/meerkat-7465819_960_720.jpg" },
            { slug: 'maize', name: 'Maize', images: "https://cdn.pixabay.com/photo/2022/09/19/15/19/meerkat-7465819_960_720.jpg" },
          ],
        },
      ];
      
  return (
    <>
      <Head>
        <title>Dashboards | Collect </title>
      </Head>
      <div id="main">
        <GoBackHeader />
        <DashboardList groups={CATEGORIES} componentsCountByCategory={componentsCountByCategory} />
      </div>
    </>
  );
}