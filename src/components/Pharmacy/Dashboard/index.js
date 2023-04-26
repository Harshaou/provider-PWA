import Main from '../../../template';
import styles from './index.module.css';
import BreadCrumbs from './components/BreadCrumbs';
import { useEffect, useState } from 'react';
import SnapshotCards from './components/SnapshotCards';
import visitIcon from '../../../img/new-visit.png';
import { Button } from 'antd';
import PrescriptionModal from './components/PrescriptionModal';
import VisitModal from './components/VisitModal';
import { useLocation } from 'react-router-dom';
import ClaimsTable from './ClaimsTable';


const Dashboard = () => {

  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  const { openVisitModal } = useLocation().state || false

  useEffect(() => { setIsPrescriptionModalOpen(openVisitModal) }, [openVisitModal])

  useEffect(() => { window.history.replaceState({}, document.title) }, [])

  return (
    <Main pageName="Dashboard">
      <div className={styles.dashboardContainer} style={{ marginTop: '-25px' }}>
        <BreadCrumbs BreadCrumbsItems={[{ label: `Hello, ${JSON.parse(localStorage.getItem('providerUser')).name}` }, { label: `${JSON.parse(localStorage.getItem('providerUser')).role.replaceAll('_', ' ')}` }]} />

        {/* <div style={{ display: 'flex', gap: '5%' }}>
          <SnapshotCards items={[
            { label: 'Total Claims', value: 2 },
            { label: 'Pending Claims', value: 3 },
            { label: 'In Progress Claims', value: 0 },
            { label: 'Total Claims', value: 3 }]} />
        </div> */}

        <div style={{ display: 'flex', gap: '15px' }}>
          <div className={styles.actionCard}>
            {/* <img src={visitIcon} alt="" className={styles.actionCardImg} /> */}
            <div className={styles.actionCardContent}>
              <h3 style={{ fontSize: 24 }}>Do you have Prescription OTP?</h3>
              <p style={{ marginTop: '-10px' }}>
                To fill prescription, patients must provide the unique prescription OTP to proceed with automated claim filing.
              </p>
              <Button
                onClick={() => setIsPrescriptionModalOpen(true)}
                type="primary"
                shape="round"
                className={styles.actionCardButton}
              >
                Fill Prescription
              </Button>
            </div>
          </div>
          <div className={styles.actionCard}>
            {/* <img src={visitIcon} alt="" className={styles.actionCardImg} /> */}
            <div className={styles.actionCardContent}>
              <h3 style={{ fontSize: 24 }}>Do you have Visit ID?</h3>
              <p style={{ marginTop: '-10px' }}>
                Patients must provide Visit ID received from Provider to proceed with manual claim filing.
              </p>
              <Button
                onClick={() => setIsVisitModalOpen(true)}
                type="primary"
                shape="round"
                className={styles.actionCardButton}
              >
                File Claim
              </Button>
            </div>
          </div>

          <VisitModal isModalOpen={isVisitModalOpen} setIsModalOpen={setIsVisitModalOpen} />
          <PrescriptionModal isModalOpen={isPrescriptionModalOpen} setIsModalOpen={setIsPrescriptionModalOpen} />
        </div>

        <ClaimsTable />
      </div>
    </Main>
  );
};

export default Dashboard;
