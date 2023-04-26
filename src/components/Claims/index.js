import { useState } from 'react';
import { Menu } from 'antd';
import Main from '../../template';
import OpenVisit from './OpenVisit';

import SubmittedClaim from './SubmittedClaim';
import styles from './index.module.css';

const Index = () => {
  const [current, setCurrent] = useState('0');
  const items = [
    {
      label: 'Claim Queue',
      key: '0',
    },
    {
      label: 'Submitted Claims',
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

      {current === '0' ? <OpenVisit /> : <SubmittedClaim />}
    </Main>
  );
};

export default Index;
