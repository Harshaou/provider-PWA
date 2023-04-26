import React, { useState } from 'react';
import styles from './index.module.css';
import { UserOutlined } from '@ant-design/icons';
import MemberCard from './MemberCard';

const HamburgerMenu = ({ parentUrl, parentTitle, name, visitNumber }) => {
  const [memberHover, setMemberHover] = useState(false);
  return (
    <>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginTop: '-50px' }}>
        <a href={parentUrl} className={styles.breadCrumb1}>
          {parentTitle} /{' '}
        </a>
        <div onClick={(e) => setMemberHover(true)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
            <UserOutlined />
            <h4 className={styles.breadCrumb2}>{name}</h4>
          </div>
        </div>
      </div>
      <MemberCard setHover={setMemberHover} visitID={visitNumber} />
    </>
  );
};

export default HamburgerMenu;
