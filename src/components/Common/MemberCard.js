import styles from './index.module.css';
import { Popover, Typography } from 'antd';
import demoUser from '../../img/avatar.png';
import newEmail from '../../img/newEmail.png';
import newPhone from '../../img/newPhone.png';
import { useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { baseUrl } from '../../utils';
import avatar from '../../img/avatar.png';

const MemberCard = ({ visitID, setHover }) => {
  const [member, setMemberData] = useState();

  useEffect(() => {
    if (visitID) {
      getMember();
    }
  }, [visitID]);

  const getMember = async () => {
    let token = localStorage.getItem('x-auth-token');
    await fetch(`${baseUrl}/provider/visit/${visitID}/member-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMemberData(res?.result?.member);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const { Paragraph } = Typography;
  const [memberHover, setMemberHover] = useState(false);
  return (
    <div
      onMouseEnter={(e) => setMemberHover(true, setHover(true))}
      onMouseLeave={(e) => setMemberHover(false, setHover(false))}
    >
      <h4 className={styles.breadCrumb2} style={{ cursor: 'default' }}>
        Member #{member?.member_number}
        <InfoCircleOutlined
          style={{ marginLeft: '10px', marginTop: '-2px', fontSize: '18px', fontWeight: '500' }}
        />
      </h4>
      {memberHover ? (
        <div className={styles.memberCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                marginTop: '0px',
              }}
            >
              <p className={styles.nameText}>{member?.name}</p>
              {memberHover ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <p className={styles.dataTableLabel} style={{ marginBottom: '3px' }}>
                    Member No.
                  </p>
                  <p className={styles.memberTitle2} style={{ marginBottom: '5px' }}>
                    #{member?.member_number}
                  </p>
                </div>
              ) : null}
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                {memberHover ? (
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
                          {member?.contact_number}
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
                          {member?.email}
                        </Paragraph>
                      }
                    >
                      <img src={newEmail} style={{ width: '35px', height: '35px' }} />
                    </Popover>
                  </div>
                ) : (
                  <p className={styles.memberTitle2}>#{member?.member_number}</p>
                )}

                <div className={styles.memberStatus}>Active</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '46px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className={styles.dataTableLabel}>NIDA/Passport No.</p>
              <Paragraph copyable={member?.nida ? true : false} className={styles.dataTableValue}>
                {member?.nida || '--'}
              </Paragraph>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className={styles.dataTableLabel}>Member No.</p>
              <Paragraph copyable className={styles.dataTableValue}>
                {member?.member_number}
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
        </div>
      ) : null}
    </div>
  );
};

export default MemberCard;
