import React from 'react';
import styles from './index.module.css';
import { Popover, Typography } from 'antd';
import demoUser from '../../../img/demoUser.png';
import newEmail from '../../../img/newEmail.png';
import newPhone from '../../../img/newPhone.png';
import closeIcon from '../../../img/close-modal.png';

const Member = ({ member, visit }) => {
  const { Paragraph } = Typography;
  return (
    <div className={styles.memberCard}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img
          src={demoUser}
          style={{
            marginRight: '15px',
            width: '100px',
            transition: 'all 0.25s ease-in-out',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
          }}
        >
          <p style={{ marginBottom: 0, marginTop: 10 }} className={styles.nameText}>
            {visit.name}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <p className={styles.dataTableLabel} style={{ marginBottom: '5px' }}>
              Member No.
            </p>
            <p className={styles.memberTitle2} style={{ marginBottom: '5px' }}>
              #{member.member_number}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Popover
                id="pop-over"
                content={
                  <Paragraph style={{ marginBottom: '0px' }} copyable>
                    {member.contact_number}
                  </Paragraph>
                }
                style={{ borderRadius: '15px' }}
              >
                <img src={newPhone} style={{ width: '35px', height: '35px' }} />
              </Popover>
              <Popover
                id="pop-over"
                content={
                  <Paragraph style={{ marginBottom: '0px' }} copyable>
                    {member.email}
                  </Paragraph>
                }
              >
                <img src={newEmail} style={{ width: '35px', height: '35px' }} />
              </Popover>
            </div>

            <div className={styles.memberStatus}>Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
