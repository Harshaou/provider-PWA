import React, { useEffect, useState } from 'react';

import { Button } from 'antd';
import styles from './index.module.css';
import visitIcon from '../../img/new-visit.png';
import NewVisit from './visit';
import { useDispatch, useSelector } from 'react-redux';
import { getSnapShot } from '../../store/dashboardSlice';

const DashboardItems = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    dispatch(getSnapShot());
  }, []);

  const { snapshot } = useSelector((state) => state.dashboard);

  let arr = [
    { text: 'Open Visit', value: snapshot?.total_visits, color: '#E3F5FF' },
    { text: 'Prescriptions Created', value: snapshot?.total_prescriptions, color: '#CFDFEB' },
    { text: 'Total Pre-Auths', value: snapshot?.total_pre_auths, color: '#CFDFEB' },
    { text: 'Total Claims', value: snapshot?.total_claims, color: '#E3F5FF' },
  ];

  const dispatch = useDispatch();

  const providerUser =
    localStorage.getItem('providerUser') && JSON.parse(localStorage.getItem('providerUser'));

  return (
    <div
      style={{
        display: 'grid',
        gap: 20,
        width: '100%',
      }}
    >
      {(providerUser?.role === 'Admin' || providerUser?.role === 'Super_Admin') && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          {arr.map((item, index) => (
            <div
              className={styles.componentItem}
              style={{
                backgroundColor: item.color,
              }}
              key={index}
            >
              <div>
                <p style={{ marginBottom: 3, fontSize: 13, fontWeight: 500 }}>{item.text}</p>
                <p style={{ fontSize: 32, fontWeight: 500, marginBottom: 0 }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          height: 180,
          display: 'flex',
          gap: 15,
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 15,
          paddingTop: 20,
        }}
      >
        <img src={visitIcon} alt="" style={{ height: 70 }} />
        <div style={{ width: '85%' }}>
          <h3 style={{ fontSize: 28 }}>Create a new Patient Visit</h3>
          <p>
            To schedule a visit, patients must provide their Member Number or NIDA number and
            undergo 2FA with an OTP sent to their registered number. booom
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            type="primary"
            shape="round"
            className={styles.visitButtonStyle}
          >
            New Visit
          </Button>
        </div>
      </div>
      <NewVisit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default DashboardItems;
