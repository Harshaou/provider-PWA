import { useEffect, useState } from 'react';
import styles from './index.module.css';
import AntTable from './AntTable';
import { Pagination } from 'antd';
import RequestPreAuth from './Modal';
import Main from '../../template';
import TopNav from '../../components/Common/TopNavDashboard';
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data, content } = useSelector((state) => state.payment);
  const [tab, setTab] = useState('Pending Payments');

  useEffect(() => {
    if (data === null) {
      setTab('Pending Payments');
    }
  }, [data]);

  return (
    <Main>
      <>
        <div className="mtLarge">
          <div className="mlLarge">
            <TopNav
              tab={tab}
              setTab={setTab}
              options={['Pending Payments', 'Paid Payments', 'All']}
              width={300}
              notification
            />
          </div>

          <div className={styles.table}>
            <AntTable data={content} />
          </div>
          {content?.length > 5 && (
            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
              <Pagination onChange={(e) => setPage(e - 1)} size="small" total={50} />
            </div>
          )}
        </div>
        <RequestPreAuth isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      </>
    </Main>
  );
};

export default Index;
