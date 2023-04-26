import Main from '../../../template';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import VerifyPrescriptionCode from './VerifyPrescriptionCode';
import DisburseMedicine from './DisburseMedicine';
import HamburgerMenu from '../../Common/HamburgerMenu';
import { UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

const Index = () => {
  const [step, setStep] = useState(0);

  const location = useLocation();
  const data = location.state?.data;

  return (
    <Main>
      <Breadcrumb style={{ marginTop: -30 }}>
        <Breadcrumb.Item>
          <Link to="/claim">Pharmacy</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{data?.patient_name}</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          marginTop: 20,
        }}
      >
        <DisburseMedicine prescriptionValue={data} setStep={setStep} />
      </div>
    </Main>
  );
};

export default Index;
