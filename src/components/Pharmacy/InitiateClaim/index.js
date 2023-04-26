import Main from '../../../template';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import VerifyPrescriptionCode from './VerifyPrescriptionCode';
import DisburseMedicine from './DisburseMedicine';
// 34298248
const Index = () => {
  const [step, setStep] = useState(0);
  const [prescriptionValue, setGetPrescriptionValue] = useState();
  return (
    <Main>
      {step === 0 && (
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: -30 }}>
          <HiOutlineArrowLeft size={30} />
          <div>
            <h3 className="mbZero">Initial Claim</h3>
            <h5 className="mbZero">Initiate the claim for a Patient</h5>
          </div>
        </Link>
      )}
      {step === 1 && (
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: -30 }}>
          <HiOutlineArrowLeft size={30} />
          <div>
            <h3 className="mbZero">Prescription</h3>
            <h5 className="mbZero">
              Prescription Code: {prescriptionValue?.prescription_meta?.prescription_otp}
            </h5>
          </div>
        </Link>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          marginTop: 35,
          marginLeft: 50,
        }}
      >
        {step === 0 && (
          <VerifyPrescriptionCode
            setGetPrescriptionValue={setGetPrescriptionValue}
            setStep={setStep}
          />
        )}
        {step === 1 && <DisburseMedicine prescriptionValue={prescriptionValue} setStep={setStep} />}
      </div>
    </Main>
  );
};

export default Index;
