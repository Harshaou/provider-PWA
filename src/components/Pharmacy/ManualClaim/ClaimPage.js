import { Button, Input, notification, Radio, Table } from 'antd';
import CollapseInfo from './CollapseWithInfo';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { initiatePharmacyClaim } from '../../../store/pharmacySlice';
import { useNavigate } from 'react-router-dom';
import avatar from '../../../img/avatar.png';
import ManualClaimForm from './ManualClaimForm';

import styles from '../index.module.css';

const ClaimPage = ({ member }) => {
  console.log('member', member);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      <CollapseInfo member={member} />
      <div style={{ backgroundColor: 'white', padding: 15, position: 'relative' }}>
        <p style={{ fontWeight: 600, fontSize: 18, marginBottom: 5 }}>
          Fill the form to create a claim
        </p>
        <div className={styles.manualForm}>
          <div style={{ display: 'flex', gap: 15, padding: 20 }}>
            <img
              style={{ width: 50, height: 50, borderRadius: '50%' }}
              src={member.data?.files?.profile_pic ? member.data.files.profile_pic?.url : avatar}
              alt=""
            />
            <div>
              <h5 style={{ fontWeight: 700 }} className="mbZero">
                {member?.data?.name}
              </h5>
              <p style={{ color: '#f87d4e', fontSize: 10 }}>{member?.data?.card_number}</p>
            </div>
          </div>
          <ManualClaimForm member={member} />
        </div>
      </div>
    </div>
  );
};

export default ClaimPage;
