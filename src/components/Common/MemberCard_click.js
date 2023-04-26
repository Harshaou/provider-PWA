import styles from './index.module.css';
import { Popover, Spin, Typography } from 'antd';

import newEmail from '../../img/newEmail.png';
import newPhone from '../../img/newPhone.png';
import closeIcon from '../../img/close-modal.png';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../utils';
import avatar from '../../img/avatar.png';

const MemberCard = ({ visitNumber, setHover }) => {
  const { Paragraph } = Typography;

  const [member, setMemberData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMember();
  }, []);

  const getMember = async () => {
    let token = localStorage.getItem('x-auth-token');
    await fetch(`${baseUrl}/provider/visit/${visitNumber}/member-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setMemberData(res?.result?.member);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  };

  return (
    <div className={styles.memberCard}>
      {loading ? (
        <Spin />
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              style={{
                marginRight: '15px',
                width: 100,
                height: 100,
                borderRadius: '50%',
                transition: 'all 0.25s ease-in-out',
              }}
              src={member?.profile_pic_url ? member?.profile_pic_url : avatar}
              alt=""
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
              <img
                onClick={() => {
                  setHover(false);
                }}
                src={closeIcon}
                alt=""
                style={{
                  height: 20,
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  cursor: 'pointer',
                }}
              />
              <p style={{ marginBottom: 0, marginTop: 10 }} className={styles.nameText}>
                {member?.name}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
              >
                <p className={styles.dataTableLabel} style={{ marginBottom: '0px' }}>
                  Member No.
                </p>
                <p className={styles.memberTitle2} style={{ marginBottom: '5px' }}>
                  #{member?.member_number}
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
                    alignItems: 'center',
                  }}
                >
                  {member?.contact_number && (
                    <Popover
                      id="pop-over"
                      content={
                        <Paragraph style={{ marginBottom: '0px' }} copyable>
                          {member?.contact_number}
                        </Paragraph>
                      }
                      style={{ borderRadius: '15px' }}
                    >
                      <img src={newPhone} style={{ width: '35px', height: '35px' }} />
                    </Popover>
                  )}

                  {member?.email && (
                    <Popover
                      id="pop-over"
                      content={
                        <Paragraph style={{ marginBottom: '0px' }} copyable>
                          {member?.email}
                        </Paragraph>
                      }
                    >
                      <img src={newEmail} style={{ width: '35px', height: '35px' }} />
                    </Popover>
                  )}
                </div>

                <div className={styles.memberStatus}>Active</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '46px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className={styles.dataTableLabel}>Visit ID</p>
              <Paragraph copyable={visitNumber ? true : false} className={styles.dataTableValue}>
                {visitNumber || '--'}
              </Paragraph>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className={styles.dataTableLabel}>NIDA/Passport No.</p>
              <Paragraph copyable={member?.nida ? true : false} className={styles.dataTableValue}>
                {member?.nida || '--'}
              </Paragraph>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className={styles.dataTableLabel}>Member No.</p>
              <Paragraph copyable className={styles.dataTableValue}>
                {member?.member_number || '--'}
              </Paragraph>
            </div>

          </div>

          <div className={styles.divider} style={{ marginTop: '8px' }}></div>
          <h4 className={styles.memberTitle2}>Other Information</h4>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className={styles.dataTableLabel}>Gender</p>
              <p className={styles.dataTableValue}>{member?.gender || '--'}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className={styles.dataTableLabel}>Date of Birth</p>
              <p className={styles.dataTableValue}>{member?.date_of_birth || '--'}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className={styles.dataTableLabel}>Blood Group</p>
              <p className={styles.dataTableValue}>{member?.blood_group || '--'}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberCard;
