import { Steps } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPreAuthDetail } from '../../../store/preAuthSlice';
import Main from '../../../template';
import HamburgerMenu from '../../Common/HamburgerMenu';
import styles from './index.module.css';
import MemberCard from '../../Common/MemberCard';

const PreAuthDetails = () => {
  const { preauth_id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPreAuthDetail(preauth_id));
  }, []);

  console.log('preauth_id', preauth_id);

  const { preAuthDetails } = useSelector((state) => state.preAuth);

  const { Step } = Steps;

  const [memberHover, setMemberHover] = useState(false);

  return (
    <Main>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginTop: '-50px' }}>
        <a href="/pre-auths" className={styles.breadCrumb1}>
          Pre Auth /{' '}
        </a>
        <MemberCard setHover={setMemberHover} visitID={preAuthDetails?.visit_id} />
      </div>
      <h3 className={styles.headerText}>
        Pre-Auth #{preAuthDetails?.timeline[0]?.pre_authorisation_id}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <div
            className={styles.cardShadow}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '17px',
              width: '55%',
              filter: memberHover ? 'blur(2px)' : null,
            }}
          >
            <h3 className={styles.cardTitle}>Pre-Auth Status</h3>

            <h4 className={styles.cardSubTitle} style={{ marginTop: '-20px' }}>
              Real-time Pre-Auth Status Timeline. You are able to see the real-time pre-auth status.
            </h4>

            <Steps progressDot current={0} direction="vertical">
              {preAuthDetails?.timeline?.map((item, index) => (
                <Step
                  key={index}
                  title={<p className={styles.stepTitle}>{item?.status}</p>}
                  description={
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className={styles.stepStatus}>{item?.remarks}</p>
                      <p className={styles.stepTime}>{item?.updated_timestamp}</p>
                    </div>
                  }
                />
              ))}
            </Steps>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default PreAuthDetails;
