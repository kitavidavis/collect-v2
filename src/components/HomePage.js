import Head from 'next/head';
import { GoBackHeader } from './DashboardHeader/DashboardHeader';
import { DashboardList } from './DashboardsList/DashboardList';


export function HomePage({ data }) {
      
  return (
    <>
      <Head>
        <title>Dashboards | Collect </title>
      </Head>
      <div id="main">
        <DashboardList groups={data} />
      </div>
    </>
  );
}