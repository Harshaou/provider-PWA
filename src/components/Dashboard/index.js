import Main from '../../template';
import { Breadcrumb } from 'antd';
import styles from './index.module.css';
import DashboardItems from './DashboardItems';
import VisitsTable from './VisitsTable';

const Index = () => {
  const providerUser =
    localStorage.getItem('providerUser') && JSON.parse(localStorage.getItem('providerUser'));

  return (
    <Main pageName="Dashboard">
      <div className={styles.dashboardContainer}>
        <Breadcrumb>
          <Breadcrumb.Item
            style={{
              fontWeight: 500,
              color: 'black',
            }}
          >
            Hello {providerUser?.name}
          </Breadcrumb.Item>

          <Breadcrumb.Item>{providerUser && providerUser?.role?.replace('_', ' ')}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ display: 'flex', gap: '5%' }}>
          <DashboardItems />
          {/* <TodayTip /> */}
        </div>
        <VisitsTable />
      </div>
    </Main>
  );
};

export default Index;
