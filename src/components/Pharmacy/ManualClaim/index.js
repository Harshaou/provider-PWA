import Main from '../../../template';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MemberSearch from './MemberSearch';
import ClaimPage from './ClaimPage';
// 34298248
const Index = () => {
  const [step, setStep] = useState(0);
  const [memberInfo, setMemberInfo] = useState();
  return (
    <Main>
      {step === 0 && (
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: -30 }}>
          <HiOutlineArrowLeft size={30} />
          <div>
            <h3 className="mbZero">Manual Claim</h3>
            <h5 className="mbZero">lorem lpisum</h5>
          </div>
        </Link>
      )}
      {step === 1 && (
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: -30 }}>
          <HiOutlineArrowLeft size={30} />
          <div>
            <h3 className="mbZero">Manual claim</h3>
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
        {step === 0 && <MemberSearch setMemberInfo={setMemberInfo} setStep={setStep} />}
        {step === 1 && <ClaimPage member={memberInfo} setStep={setStep} />}
      </div>
    </Main>
  );
};

export default Index;
