import { Menu } from 'antd';
import { useState } from 'react';
import Main from '../../template';
import styles from './index.module.css';
import OpenVisit from './OpenVisit';
import SubmittedPreAuth from './SubmittedPreAuth';

const PreAuths = () => {
  const [current, setCurrent] = useState('0');
  const items = [
    {
      label: 'Open Visits',
      key: '0',
    },
    {
      label: 'Submitted Pre-Auths',
      key: '1',
    },
  ];

  return (
    <Main>
      <h3 className={styles.headerText}>Pre-Auths</h3>
      <Menu
        onClick={(e) => setCurrent(e.key)}
        defaultSelectedKeys={['0']}
        mode="horizontal"
        items={items}
        style={{ backgroundColor: '#ffffff00', border: 'none' }}
      />
      <div className={styles.divider} />

      {current === '0' ? <OpenVisit /> : <SubmittedPreAuth />}
    </Main>
  );
};

export default PreAuths;
