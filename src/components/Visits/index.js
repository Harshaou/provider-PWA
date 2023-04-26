import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../template';
import styles from './index.module.css';
import bannerIcon from '../../img/new-visit.png';
import { SearchOutlined } from '@ant-design/icons';
import NewVisit from '../Dashboard/visit';
import { getVisits } from '../../store/visitSlice';
import VisitTable from './VisitTable';
import UsePagination from '../Common/UsePagination';

const Visits = () => {
  const [isVisitModalVisible, setIsVisitModalVisible] = useState(false);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVisits(page));
  }, [dispatch, page]);

  const { data } = useSelector((state) => state.visit);

  return (
    <Main>
      <h3 className={styles.headerText}>Visit Log</h3>
      <div className={styles.banner}>
        <img src={bannerIcon} style={{ width: '112px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 19px' }}>
          <h3 className={styles.bannerText}>Create a new Patient Visit</h3>
          <h4 className={styles.bannerSubText}>
            To schedule a visit, patients must provide their Member Number or NIDA number and
            undergo 2FA with an OTP sent to their registered number.
          </h4>
        </div>
        <Button
          type="primary"
          className={styles.bannerBtn}
          onClick={() => setIsVisitModalVisible(true)}
        >
          New Visit
        </Button>
      </div>
      <NewVisit isModalOpen={isVisitModalVisible} setIsModalOpen={setIsVisitModalVisible} />
      <div className={styles.tableContainer}>
        <div
          style={{
            display: 'flex',
            marginTop: '20px',
            padding: '24px',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          <p className={styles.tableTitle}>Existing Visits</p>
          <Input
            className={styles.tableSearchBox}
            placeholder="Search Visit"
            prefix={
              <SearchOutlined
                style={{ fontSize: '24px', marginLeft: '5px', marginRight: '10px' }}
              />
            }
          />
        </div>
        <VisitTable data={data?.content ? data?.content : []} />
        <UsePagination page={page} setPage={setPage} data={data} />
      </div>
    </Main>
  );
};

export default Visits;
