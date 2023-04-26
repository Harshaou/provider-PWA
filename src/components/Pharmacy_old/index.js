import { useEffect, useState } from 'react';
import Main from '../../template';
import OpenVisit from './OpenVisit';
import ManualClaimTable from './ManualClaimTable';
import AddBox from '../Common/AddBoxNew';
import { useDispatch, useSelector } from 'react-redux';
import UsePagination from '../Common/UsePagination';
import TopNav from '../Common/TopTabs';
import { Menu } from 'antd';
import { getPharmacyClaimList, getPharmacyManualClaimList } from '../../store/pharmacySlice';
import styles from './index.module.css';

const Index = () => {
  const [current, setCurrent] = useState('0');
  const { data } = useSelector((state) => state.pharmacy);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [tab, setTab] = useState({ title: 'Claim', key: 'Claim' });

  const items = [
    {
      label: 'Claim',
      key: '0',
    },
    {
      label: 'Manual Claim',
      key: '1',
    },
  ];

  return (
    <Main>
      <h3 className={styles.headerText}>Claims</h3>
      <Menu
        onClick={(e) => setCurrent(e.key)}
        defaultSelectedKeys={['0']}
        mode="horizontal"
        items={items}
        style={{ backgroundColor: '#ffffff00', border: 'none' }}
      />
      <div className={styles.divider} />

      {current === '0' ? <OpenVisit /> : <ManualClaimTable />}
    </Main>
  );
};

export default Index;
