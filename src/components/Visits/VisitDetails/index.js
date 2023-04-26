import Main from '../../../template';
import styles from './index.module.css';
import { Button, Collapse } from 'antd';
import claimformIcon from '../../../img/claimform.png';
import { useEffect, useState } from 'react';
import { generateClaimForm } from '../../Common/GenerateClaimForm';

import CloseVisitModal from './components/CloseVisitModal';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitsDetailById } from '../../../store/visitSlice';
import CloseVisit from '../../Common/CloseVisit';
import Benefits from './Benefits';
import MemberCard from '../../Common/MemberCard';

const VisitDetails = () => {
  const [memberHover, setMemberHover] = useState(false);
  const [isCloseVisitModalOpen, setIsCloseVisitModalOpen] = useState(false);

  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    if (params?.visitID) {
      dispatch(getVisitsDetailById(params?.visitID));
    }
  }, []);

  const { visitDetail } = useSelector((state) => state.visit);

  return (
    <Main>
      <CloseVisitModal
        setIsModalOpen={setIsCloseVisitModalOpen}
        isModalOpen={isCloseVisitModalOpen}
      />

      <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginTop: '-50px' }}>
        <a href="/visits" className={styles.breadCrumb1}>
          Patient Visit /{' '}
        </a>
        <MemberCard setHover={setMemberHover} visitID={params?.visitID} />
      </div>

      <h3 className={styles.headerText}>Visit #{visitDetail?.visit_id}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', gap: '15px', maxHeight: '25vh', position: 'relative' }}>
          <div
            className={styles.cardShadow}
            style={{
              position: 'relative',
              display: 'flex',
              width: '50%',
              filter: memberHover ? 'blur(2px)' : null,
            }}
          >
            <img src={claimformIcon} style={{ width: '50px', alignSelf: 'flex-start' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 15px',
                position: 'relative',
              }}
            >
              <h3 className={styles.bannerText}>Generate Claim Form</h3>
              <h4 className={styles.bannerSubText} style={{ marginBottom: '40px' }}>
                Click on the button below to generate claim form. After claim form is generated, you
                will able to take a print. It’s simple and fast!
              </h4>
              <Button
                type="primary"
                className={styles.bannerBtn}
                onClick={() =>
                  generateClaimForm('/ClaimsForm.pdf', visitDetail?.member, {
                    name: visitDetail?.attending_doctor_name,
                    discipline: visitDetail?.attending_doctor_discipline,
                  })
                }
              >
                Generate Claim form
              </Button>
            </div>
          </div>
          <div
            className={styles.cardShadow}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              width: '50%',
              filter: memberHover ? 'blur(2px)' : null,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 0px',
                position: 'relative',
              }}
            >
              <h3 className={styles.bannerText}>Close Visit</h3>
              <h4 className={styles.bannerSubText} style={{ marginBottom: '40px' }}>
                Click on the button below to close this visit for the patient
              </h4>
              <Button
                type="primary"
                className={styles.bannerBtn}
                style={{ width: '95px' }}
                danger
                onClick={() => setIsCloseVisitModalOpen(true)}
              >
                Close Visit
              </Button>
            </div>
          </div>
        </div>
        <div
          className={styles.cardShadow}
          style={{
            marginBottom: 30,
            filter: memberHover ? 'blur(2px)' : null,
          }}
        >
          <Benefits data={visitDetail?.benefit} />
        </div>
        <CloseVisit
          status={visitDetail?.status}
          page="visitDetail"
          visitNumber={visitDetail?.visit_id}
          isModalOpen={isCloseVisitModalOpen}
          setIsModalOpen={setIsCloseVisitModalOpen}
        />
      </div>
    </Main>
  );
};

export default VisitDetails;
